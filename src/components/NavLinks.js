import { NavLink } from "react-router-dom";
import links from "../utils/links";

import React from "react";

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="navlink">
      {links.map(link => {
        const { id, text, path } = link;
        return (
          <NavLink className="navlink__link" key={id} to={path} onClick={toggleSidebar}>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
