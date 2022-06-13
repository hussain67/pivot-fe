import React from "react";
import Register from "./Register";

function HomeMain(props) {
  return (
    <div className="home-main">
      <div className="home-main__left">
        <h2>The presentation will start in about 2 H:20 M : 10 S</h2>
        <h2>Join Prresentation</h2>
      </div>
      <div className="home-main__right">
        <Register />
      </div>
    </div>
  );
}

export default HomeMain;
