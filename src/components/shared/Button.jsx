import React from "react";
import "../../App.css";

function Button(props) {
  const { color, text } = props;
  switch (color) {
    case "blue":
      return <div className={`blue-btn body-medium font-bold`}>{text}</div>;
    case "white":
      return <div className={`white-btn body-medium font-bold`}>{text}</div>;
    default:
      return <div className={`blue-btn body-medium font-bold`}>{text}</div>;
  }
}

export default Button;
