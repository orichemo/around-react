import React from "react";
import logo from "../images/header.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Around The U.S" />
    </header>
  );
}

export default Header;
