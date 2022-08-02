import React from "react";
import pivot_logo from "../img/pivot.logo.jpg";

const NavCommon = () => {
  return (
    <div className="nav-common">
      <img src={pivot_logo} alt="logo"></img>
      <h1 className="nav-common__banner"> An Interactive Presentation App</h1>
    </div>
  );
};

export default NavCommon;
