import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/api/authApi";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { removeItemsFromLocalStorage, getItemFromLocalStorage } from "../utils/localstorage";
import { useEffect } from "react";
import pivot_logo from "../img/pivot.logo.jpg";

const NavPresenter = ({ showSidebar, setShowSidebar, text }) => {
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
				<button
					type="button"
					className="btn btn-toggle"
					onClick={toggleSidebar}
				>
					<FaAlignLeft />
				</button>
				<img
					src={pivot_logo}
					alt=""
				/>
				<h1 className="navbar__text">Presentation:{text} </h1>
				<div
					className="navbar__btn-container"
					onClick={() => setShowLogout(!showLogout)}
				>
					<button
						type="button"
						className="btn btn-user"
					>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>
					<div className={showLogout ? "navbar-dropdown navbar-dropdown--show" : "navbar-dropdown"}>
						<button
							type="button"
							className="btn btn-dropdown"
							onClick={() => {
								const response = logoutUser();
								if (response) {
									removeItemsFromLocalStorage();
									navigate("/");
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

export default NavPresenter;
