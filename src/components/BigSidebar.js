import React from "react";

import NavLinks from "./NavLinks";

const BigSidebar = ({ showSidebar, setShowSidebar, setText }) => {
	return (
		<div className={showSidebar ? "sidebar-big " : "sidebar-big sidebar-big--hide"}>
			<div className="sidebar-big__content">
				<NavLinks setText={setText} />
			</div>
		</div>
	);
};

export default BigSidebar;
