import React from "react";
import "../../../App.css";
import { APP_TITLE, TEMP_USER } from "../../../constants/constants";

function Header() {
  return (
    <React.Fragment>
      <nav class="text-white px-4" className="App-header">
        <div className="Header-text">{APP_TITLE}</div>
        <div className="Header-text">{TEMP_USER}</div>
      </nav>
    </React.Fragment>
  );
}

export default Header;
