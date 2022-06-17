import React from "react";
import { Outlet } from "react-router-dom";
import { BigSidebar, NavBar, SmallSidebar } from "../../components";

const SharedLayout = () => {
  return (
    <section>
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
    </section>
  );
};

export default SharedLayout;
