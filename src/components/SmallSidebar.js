import React, { useState } from "react";
import pivot_logo from "../img/pivot.logo.jpg";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import { FaTimes } from "react-icons/fa";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { showSidebar, setShowSidebar } = useContext(userContext);

  const toggleSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className={showSidebar ? "sidebar-small  sidebar-small--show" : "sidebar-small"}>
      <div className="small-sidebar__content">
        <button className="btn-small-sidebar-close" onClick={toggleSidebar}>
          <FaTimes />
        </button>
        <img src={pivot_logo}></img>
        <NavLinks toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
};

export default SmallSidebar;
