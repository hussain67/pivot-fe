import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BigSidebar, SmallSidebar } from "../../components";
import NavPresenter from "../../components/NavPresenter";
const SharedLayout = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	const [text, setText] = useState("Stats");
	return (
		<section>
			<article className="dashboard">
				<SmallSidebar
					showSidebar={showSidebar}
					setShowSidebar={setShowSidebar}
				/>
				<BigSidebar
					setText={setText}
					showSidebar={showSidebar}
					setShowSidebar={setShowSidebar}
				/>
				<div>
					<NavPresenter
						showSidebar={showSidebar}
						setShowSidebar={setShowSidebar}
						text={text}
					/>
					<Outlet />
				</div>
			</article>
			{/* </userContext.Provider> */}
		</section>
	);
};

export default SharedLayout;
