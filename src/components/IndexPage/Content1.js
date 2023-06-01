import React from "react";
import "../../styles/content1.css";
import fluid from "../../assets/fluidloan2.png";

function Content1() {
  return (
    <div>
      <div className="content-1">
        <div className="content-1-i">
          <div className="content-1-ii">
            <h1 className="content-1-ii-title">Unlock the Power of NFTs</h1>
            <p className="content-1-ii-para">
              Our platform utilizes cutting-edge blockchain technology and smart
              contracts to ensure that your NFTs are protected throughout the
              lending process. Additionally, our transparent system provides
              real-time updates and comprehensive records, giving you full
              control and visibility over your transactions.
            </p>
          </div>
        </div>
        <div className="content-1-img">
          <img src={fluid} alt="not found" className="fluid-image-i"></img>
        </div>
      </div>
    </div>
  );
}

export default Content1;
