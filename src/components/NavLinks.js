import { NavLink } from "react-router-dom";
import links from "../utils/links";

import React from "react";

const NavLinks = ({ setText }) => {
	// Function for setting text
	function handleClick(text) {
		setText(text);
	}
	return (
		<div className="navlink">
			{links.map(link => {
				const { id, text, path } = link;
				return (
					<NavLink
						className="navlink__link"
						key={id}
						to={path}
						onClick={() => handleClick(text)}
					>
						{text}
					</NavLink>
				);
			})}
		</div>
	);
};

export default NavLinks;
