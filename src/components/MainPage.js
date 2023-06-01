import React, { useState } from "react";
import Assets from "./Assets";
import Stream from "./Stream";
import Loan from "./Loan";
import "../styles/mainpage.css";

function MainPage() {
  const [display, setDisplay] = useState({
    asset: true,
    stream: false,
    loan: false,
  });

  return (
    <div className="compo-page">
      <div className="left">
        <ul>
          <li
            onClick={() =>
              setDisplay({ asset: true, stream: false, loan: false })
            }
          >
            Asset
          </li>
          <li
            onClick={() =>
              setDisplay({ asset: false, stream: true, loan: false })
            }
          >
            Stream
          </li>
          <li
            onClick={() =>
              setDisplay({ asset: false, stream: false, loan: true })
            }
          >
            Loan
          </li>
        </ul>
      </div>
      <div className="right">
        {display.asset ? <Assets /> : display.stream ? <Stream /> : <Loan />}
      </div>
    </div>
  );
}

export default MainPage;
