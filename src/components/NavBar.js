import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/authApi";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { removeUserFromLocalStorage } from "../utils/localstorage";

const NavBar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };
  return (
    <div className="navbar" onClick={toggleLogout}>
      <div className="navbar__center">
        <button type="button" className="btn-toggle">
          <FaAlignLeft />
        </button>
        <h1>Dashboard</h1>
        <div className="navbar__btn-container">
          <button type="button" className="btn-user">
            <FaUserCircle />
            Name
            <FaCaretDown />
          </button>
          <div className={showLogout ? "navbar-dropdown navbar-dropdown--show" : "navbar-dropdown"}>
            <button
              type="button"
              className="btn-dropdown"
              onClick={() => {
                const response = logoutUser();
                if (response) {
                  removeUserFromLocalStorage("user");
                  navigate("/home");
                }
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
