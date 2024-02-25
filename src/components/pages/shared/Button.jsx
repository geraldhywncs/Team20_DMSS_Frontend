import React, { useState } from "react";
import "../../../../src/App.css";

function Button(props) {
  const { color, text } = props;
  switch (color) {
    case "blue":
      return <div className={`blue-btn body-medium font-bold`}>{text}</div>;
    case "white":
      return <div className={`white-btn body-medium font-bold`}>{text}</div>;
  }
}

export default Button;
