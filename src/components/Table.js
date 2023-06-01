import React, { useState } from "react";
import "../styles/table.css";
import Moralis from "moralis";

const Table = () => {
  const [data, setData] = useState([
    { index: 1, nft: "image-url-1", price: "$100", loanAvailable: true },
    { index: 2, nft: "image-url-2", price: "$200", loanAvailable: true },
    { index: 3, nft: "image-url-3", price: "$300", loanAvailable: true },
    // ... and so on
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loanAmount, setLoanAmount] = useState("");
  const handleLoanButtonClick = (item) => {
    setSelectedItem(item);
    setLoanAmount("");
  };
  const handleLoanAmountChange = (event) => {
    setLoanAmount(event.target.value);
  };
  const visibleData = data.slice(0, 10); // Show only the first 10 rows

  // const fetchAllNftsOfUser = async () => {
  //   try {
  //     await Moralis.start({
  //       apiKey: "YOUR_API_KEY",
  //     });

  //     const response = await Moralis.EvmApi.nft.getWalletNFTs({
  //       chain: "0x1",
  //       format: "decimal",
  //       mediaItems: false,
  //       address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  //     });

  //     console.log(response.raw);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <>
      <h3>NFT Showcase</h3>
      <div className="nft-table">
        <div className="one">
          <table>
            <thead>
              <tr>
                <th>Index No.</th>
                <th>NFT</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visibleData.map((item) => (
                <tr key={item.index}>
                  <td>{item.index}</td>
                  <td>
                    <img src={item.nft} alt="NFT" />
                  </td>
                  <td>{item.price}</td>
                  <td>
                    {item.loanAvailable ? (
                      <button
                        className="loan-button"
                        onClick={() => handleLoanButtonClick(item)}
                      >
                        Apply
                      </button>
                    ) : (
                      <span>Loan not available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="two">
          {selectedItem && (
            <div className="selected-details">
              <h2>Your NFT Details:</h2>
              <p>Index No.: {selectedItem.index}</p>
              <img src={selectedItem.nft} alt="NFT" />
              <p>Price: {selectedItem.price}</p>
              <p>
                Loan Amount Availability:{" "}
                {/* {selectedItem.loanAvailable ? "Available" : "Not Available"} */}
              </p>
              {selectedItem.loanAvailable && (
                <>
                  <button
                    className="apply-loan-btn"
                    onClick={() => console.log("Loan applied!")}
                  >
                    Apply Loan
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Table;
