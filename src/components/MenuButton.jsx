import React from "react";
import "./MenuButton.css";

const MenuButton = ({ onClick }) => {
  return (
    <button className="menu-button" onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default MenuButton;
