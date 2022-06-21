import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/api/authApi";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { removeItemsFromLocalStorage, getItemFromLocalStorage } from "../utils/localstorage";
import { userContext } from "../context/userContext";
import { useEffect } from "react";

const NavBar = () => {
  const { showSidebar, setShowSidebar } = useContext(userContext);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "User" });

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  useEffect(() => {
    const user = getItemFromLocalStorage("user");
    setUser(user);
  }, []);
  return (
    <div className="navbar">
      <div className="navbar__center">
        <button type="button" className="btn-toggle" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <h1 className="navbar__text">Dashboard</h1>
        <div className="navbar__btn-container" onClick={() => setShowLogout(!showLogout)}>
          <button type="button" className="btn-user">
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "navbar-dropdown navbar-dropdown--show" : "navbar-dropdown"}>
            <button
              type="button"
              className="btn-dropdown"
              onClick={() => {
                const response = logoutUser();
                if (response) {
                  removeItemsFromLocalStorage();
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
