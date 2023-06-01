import React from "react";
import "../../styles/content2.css";
import image from "../../assets/2fluidnft.png";
import { Link, useNavigate } from "react-router-dom";

function Content2() {
  return (
    <div>
      <div className="content-2">
        <div className="content-2-i">
          <img src={image} alt="not found" className="fluid-nft-image"></img>
        </div>
        <div className="content-2-ii">
          <h1 className="how-it-work-title">How it Works?</h1>
          <p className="how-it-work-content">
            Maximize your NFT assets with FluidLoan using Superfluid. Connect
            your NFTs, set lending terms, and earn fixed interest payments
            directly to your wallet. Retain ownership and control, with
            real-time updates and transparency.<b> Join us now </b>and unlock
            the power of NFT lending.
          </p>
          <Link to={"/dashboard"}>
            <button className="get-started-btn">
              <b>Get Now </b>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Content2;
