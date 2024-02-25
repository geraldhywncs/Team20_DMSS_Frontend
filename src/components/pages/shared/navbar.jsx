import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleButton } from "../../../redux/userNavReducer";

function Navbar() {
  const dispatch = useDispatch();
  const navButtons = useSelector((state) => state.userNavbarStore.buttons);

  const handleButtonClick = (buttonName) => {
    dispatch(toggleButton({ buttonName }));
  };

  return (
    <nav className="Nav-bar">
      {navButtons.map((button, index) => (
        <div
          key={index}
          className={`Nav-button ${button.active ? "active" : ""}`}
          onClick={() => {
            handleButtonClick(button.name);
            console.log(button.name);
          }}
        >
          {button.name}
        </div>
      ))}
    </nav>
  );
}

export default Navbar;
