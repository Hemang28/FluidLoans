// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTLending {
    IERC20 public stablecoin; // Stablecoin contract
    ISuperfluid private _superfluid; // Superfluid contract
    IConstantFlowAgreementV1 private _cfa; // Constant Flow Agreement contract
    IERC721Enumerable public nft; // NFT contract

    // Borrowed amount for each borrower
    mapping(address => uint256) public borrowedAmount;

    // Active flow rates for each borrower
    mapping(address => int96) public userStreams;

    // Loan interest rate (APR * 1e16) for each borrower
    mapping(address => uint256) public loanInterestRate;

    // Loan start time for each borrower
    mapping(address => uint256) public loanStartTime;

    uint256 public constant SECONDS_PER_YEAR = 365 days;

    constructor(address _stablecoinAddress, address _superfluidAddress) {
        stablecoin = IERC20(_stablecoinAddress);
        _superfluid = ISuperfluid(_superfluidAddress);
        _cfa = IConstantFlowAgreementV1(
            IConstantFlowAgreementV1(
                address(
                    _superfluid.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
                        )
                    )
                )
            )
        );
    }

    /**
     * @dev Sets the NFT contract address.
     * @param _nftAddress The address of the NFT contract.
     */
    function setNFT(address _nftAddress) external {
        require(address(nft) == address(0), "NFT address already set");
        nft = IERC721Enumerable(_nftAddress);
    }

    /**
     * @dev Borrows stablecoins using the NFT as collateral.
     * @param _amount The amount of stablecoins to borrow.
     * @param _interestRate The loan interest rate (APR * 1e16).
     */
    function borrow(uint256 _amount, uint256 _interestRate,  address to,uint256 tokenId,address nftContractAddress) external {
        require(_amount > 0, "Amount must be greater than zero");
        require(_interestRate > 0, "Interest rate must be greater than zero");
        require(
            borrowedAmount[msg.sender] == 0,
            "Sender already has an outstanding loan"
        );
                require(
            nft.getApproved(tokenId) == address(this),
            "Contract must be approved to transfer the NFT"
        );

        //transfer nft
        IERC721 nftContract = IERC721(nftContractAddress);
        address from = msg.sender;

        require(
            nftContract.ownerOf(tokenId) == from,
            "You do not own this NFT"
        );

        nftContract.safeTransferFrom(from, to, tokenId);




        borrowedAmount[msg.sender] = _amount;
        loanInterestRate[msg.sender] = _interestRate;
        loanStartTime[msg.sender] = block.timestamp;

        uint256 streamRate = (_amount * _interestRate) / 100 / SECONDS_PER_YEAR; // Calculate the stream rate

        (, int96 inFlowRate, , ) = _cfa.getFlowByID(
            ISuperfluidToken(msg.sender),
            bytes32(uint256(uint160(address(this))))
        );

        require(inFlowRate == 0, "Borrower already has an active stream");

        _superfluid.callAgreement(
            _cfa,
            abi.encodeWithSelector(
                _cfa.createFlow.selector,
                address(stablecoin),
                msg.sender,
                streamRate,
                new bytes(0)
            ),
            "0x"
        );

        userStreams[msg.sender] = int96(int256(streamRate));
    }

    /**
     * @dev Repays a portion of the borrowed stablecoins.
     * @param _amount The amount of stablecoins to repay.
     */
    function repay(uint256 _amount) external {
        require(
            borrowedAmount[msg.sender] > 0,
            "Sender does not have an outstanding loan"
        );
        require(
            _amount > 0 && _amount <= borrowedAmount[msg.sender],
            "Invalid repayment amount"
        );

        borrowedAmount[msg.sender] -= _amount;
        if (borrowedAmount[msg.sender] == 0) {
            cancelStream(msg.sender);
        } else {
            uint256 newStreamRate = (borrowedAmount[msg.sender] *
                loanInterestRate[msg.sender]) /
                100 /
                SECONDS_PER_YEAR;
            updateStream(msg.sender, int96(int256(newStreamRate)));
        }

        stablecoin.transferFrom(msg.sender, address(this), _amount);
    }

    /**
     * @dev Cancels the active stream for a borrower.
     * @param _account The address of the borrower.
     */
    function cancelStream(address _account) private {
        require(
            borrowedAmount[_account] == 0,
            "Borrower still has an outstanding loan"
        );

        _superfluid.callAgreement(
            _cfa,
            abi.encodeWithSelector(
                _cfa.deleteFlow.selector,
                address(stablecoin),
                _account,
                address(this),
                new bytes(0)
            ),
            "0x"
        );

        userStreams[_account] = 0;
    }

    /**
     * @dev Updates the stream rate for a borrower.
     * @param _account The address of the borrower.
     * @param _newStreamRate The new stream rate.
     */
    function updateStream(address _account, int96 _newStreamRate) private {
        require(
            borrowedAmount[_account] > 0,
            "Borrower does not have an outstanding loan"
        );

        _superfluid.callAgreement(
            _cfa,
            abi.encodeWithSelector(
                _cfa.updateFlow.selector,
                address(stablecoin),
                _account,
                address(this),
                _newStreamRate,
                new bytes(0)
            ),
            "0x"
        );

        userStreams[_account] = _newStreamRate;
    }

    /**
     * @dev Liquidates a loan and transfers the collateral and repayment to the liquidator.
     * @param _account The address of the borrower.
     */
    function liquidate(address _account) external {
        require(
            borrowedAmount[_account] > 0,
            "Borrower does not have an outstanding loan"
        );

        cancelStream(_account);

        address liquidator = msg.sender;

        uint256 tokenID = nft.tokenOfOwnerByIndex(_account, 0);
        nft.transferFrom(_account, liquidator, tokenID);

        uint256 totalRepayment = borrowedAmount[_account];
        stablecoin.transferFrom(address(this), liquidator, totalRepayment);

        borrowedAmount[_account] = 0;
        loanInterestRate[_account] = 0;
        loanStartTime[_account] = 0;
        userStreams[_account] = 0;
    }
}
