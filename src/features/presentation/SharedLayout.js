import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BigSidebar, SmallSidebar } from "../../components";
import NavPresenter from "../../components/NavPresenter";
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
						<NavPresenter />
						<Outlet />
					</div>
				</main>
			</userContext.Provider>
		</section>
	);
};

export default SharedLayout;
