import React, { useState } from "react";
import pivot_logo from "../img/pivot.logo.jpg";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import { FaTimes } from "react-icons/fa";

const SmallSidebar = () => {
  const { showSidebar, setShowSidebar } = useContext(userContext);

  return (
    <div className={showSidebar ? "small-sidebar small-sidebar--show" : "small-sidebar"}>
      <div className="small-sidebar__content">
        <button className="btn-small-sidebar-close" onClick={() => setShowSidebar(false)}>
          <FaTimes />
        </button>
        <img src={pivot_logo}></img>
        <h2>small sidebar</h2>
      </div>
    </div>
  );
};

export default SmallSidebar;
