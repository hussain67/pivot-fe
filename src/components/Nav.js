import React from "react";
import { Link } from "react-router-dom";
import pivot_logo from "../img/pivot.logo.jpg";

const Nav = () => {
  const sessionId = "gtc4";
  return (
    <div className="nav__header">
      <img src={pivot_logo}></img>
    </div>
  );
};

export default Nav;
