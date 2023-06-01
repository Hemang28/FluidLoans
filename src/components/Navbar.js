import React from "react";
import "../styles/navbar.css";
import logo from "../assets/fluidloan-logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  return (
    <div>
      <div className="nav-bar">
        <div className="nav-left">
          <div className="nav-logo">
            <img src={logo} alt="not found" className="fluid-loan-logo"></img>
          </div>
          <div className="nav-title">
            <h1 className="fluid-loan-title">FluidLoan</h1>
          </div>
        </div>
        <div className="wallet-connect-btn">
          <ConnectButton />
        </div>
        {/* <div className="nav-right">
      <div className="connect-btn">
        <button>Conect Wallet</button>
      </div>
    </div> */}
      </div>
    </div>
  );
}

export default Navbar;
