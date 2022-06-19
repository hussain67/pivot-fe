import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BigSidebar, NavBar, SmallSidebar } from "../../components";
import { userContext } from "../../context/userContext";
const SharedLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <section>
      <userContext.Provider value={{ showSidebar, setShowSidebar }}>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </userContext.Provider>
    </section>
  );
};

export default SharedLayout;
