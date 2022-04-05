import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const sessionId = "gtc4";
  return (
    <nav className="page-section nav-header">
      <Link to="/">Audience</Link>
      <Link to={`/presentations/${sessionId}`}>Presenter</Link>
    </nav>
  );
};

export default Nav;
