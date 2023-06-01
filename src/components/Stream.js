import React from "react";
import "../styles/stream.css";

function Stream() {
  return (
    <div>
      <div className="stream-page">
        <div className="total-amount-stream">
          <label>Total Amount Stream</label>
          <br />
          <input className="input-fields"></input>
        </div>
        <div className="current-flow-rate">
          <br />
          <label>Current Flow Rate</label>
          <br />
          <input className="input-fields"></input>
        </div>
      </div>
    </div>
  );
}

export default Stream;
