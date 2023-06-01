import React from "react";
import "../styles/assets.css";
import Table from "./Table";
// import Moralis from "moralis";

function Assets() {
  return (
    <div>
      <div className="asset-page">
        <div className="table-asset-div">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Assets;
