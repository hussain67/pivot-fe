import React from "react";
import { useNavigate } from "react-router-dom";

function Presenter() {
	const navigate = useNavigate();
	return (
		<div className="home-hero">
			<div className="home-hero-banner">
				<h1>Presenter</h1>
				<p className="home-hero-info"> To create and display presentation and to conduct poll.</p>
				<button
					className="btn btn__hero"
					onClick={() => {
						navigate("/auth");
					}}
				>
					Login/Register{" "}
				</button>
			</div>
		</div>
	);
}

export default Presenter;
