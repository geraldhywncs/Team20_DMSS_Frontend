import React from "react";
import "../../App.css";

function Button(props) {
  const { color, text, onClick } = props;

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
    case "addCategory":
      return (
        <button className={`addCategoryButton text-xs`} onClick={onClick}>
          {text}
        </button>
      );
    case "deleteCategory":
      return (
        <button className={`deleteCategoryButton text-xs`} onClick={onClick}>
          {text}
        </button>
      );
    case "deleteTransactionButton":
      return (
        <button className={`deleteTransactionButton text-xs`} onClick={onClick}>
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
