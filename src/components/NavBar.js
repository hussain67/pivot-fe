import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/authApi";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { removeUserFromLocalStorage } from "../utils/localstorage";
import { userContext } from "../context/userContext";

const NavBar = () => {
  const { setShowSidebar } = useContext(userContext);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar__center">
        <button type="button" className="btn-toggle" onClick={() => setShowSidebar(true)}>
          <FaAlignLeft />
        </button>
        <h1 className="navbar__text">Dashboard</h1>
        <div className="navbar__btn-container" onClick={() => setShowLogout(!showLogout)}>
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
