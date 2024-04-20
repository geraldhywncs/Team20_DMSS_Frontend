import React, { useState } from "react";
import "../../App.css";
import constants from "../../constants/constants";

function Header({ userId }) {
  const [userFirstName, setUserFirstName] = useState(
    localStorage.getItem("userFirstName") || ""
  );

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userFirstName");
    window.location.reload();
  };

  return (
    <React.Fragment>
      <nav className="Main-header">
        <div className="TopNav-header">
          <div className="Header-text">{constants.app.APP_TITLE}</div>
          {/* <div className="Header-text">{constants.app.TEMP_USER}</div> */}
          {userId ? (
            <div class="dropdown">
              <button class="dropbtn">
                {userFirstName ? userFirstName : "Loading..."}
                <button className="material-icons">expand_more</button>
              </button>
              <div class="dropdown-content">
                <a href="#" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Header;
