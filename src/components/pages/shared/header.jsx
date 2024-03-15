import React from "react";
import "../../../App.css";
import constants from "../../../constants/constants";

function Header() {
  return (
    <React.Fragment>
      <nav className="Main-header">
        <div className="TopNav-header">
          <div className="Header-text">{constants.app.APP_TITLE}</div>
          <div className="Header-text">{constants.app.TEMP_USER}</div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Header;
