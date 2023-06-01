import React from "react";
import "../styles/loan.css";

function Loan() {
  const data = [
    { index: 1, nft: "NFT 1", borrowedAmount: "$100", timeDuration: "30 days" },
    { index: 2, nft: "NFT 2", borrowedAmount: "$200", timeDuration: "60 days" },
    { index: 3, nft: "NFT 3", borrowedAmount: "$150", timeDuration: "45 days" },
  ];
  return (
    <div className="loan-page">
      <div>
        <h1 className="loan-history-heading">History</h1>
        <div className="loan-table">
          <table>
            <thead>
              <tr>
                <th>Index No.</th>
                <th>NFT</th>
                <th>Borrowed Amount</th>
                <th>Time Duration</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.index}>
                  <td>{item.index}</td>
                  <td>{item.nft}</td>
                  <td>{item.borrowedAmount}</td>
                  <td>{item.timeDuration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Loan;
