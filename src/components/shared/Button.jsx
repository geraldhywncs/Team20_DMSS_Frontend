import React from "react";
import "../../App.css";

function Button(props) {
  const { color, text, onClick } = props;

  // Use a button element for interactivity
  switch (color) {
    case "blue":
      return (
        <button className={`blue-btn body-medium font-bold`} onClick={onClick}>
          {text}
        </button>
      );
    case "white":
      return (
        <button className={`white-btn body-medium font-bold`} onClick={onClick}>
          {text}
        </button>
      );
    default:
      return (
        <button className={`blue-btn body-medium font-bold`} onClick={onClick}>
          {text}
        </button>
      );
  }
}

export default Button;
