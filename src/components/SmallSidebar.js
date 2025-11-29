import { FaTimes } from "react-icons/fa";
import NavLinks from "./NavLinks";

const SmallSidebar = ({ showSidebar, setShowSidebar }) => {
	const toggleSidebar = () => {
		setShowSidebar(false);
	};

	return (
		<div className={showSidebar ? "sidebar-small  sidebar-small--show" : "sidebar-small"}>
			<div className="small-sidebar__content">
				<button
					className="btn-small-sidebar-close"
					onClick={toggleSidebar}
				>
					<FaTimes />
				</button>

				<div>
					<NavLinks toggleSidebar={toggleSidebar} />
				</div>
			</div>
		</div>
	);
};

export default SmallSidebar;
