import React from "react";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import NavLinks from "./NavLinks";
import pivot_logo from "../img/pivot.logo.jpg";

const BigSidebar = () => {
  const { showSidebar, setShowSidebar } = useContext(userContext);

  return (
    <div className={showSidebar ? "sidebar-big sidebar-big--hide" : "sidebar-big"}>
      <div className="sidebar-big__content">
        <img src={pivot_logo}></img>
        <NavLinks />
      </div>
    </div>
  );
};

export default BigSidebar;
