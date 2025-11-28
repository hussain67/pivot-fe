import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/socketContext";

function JoinPresentation({ presentationName }) {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [usernameExists, setUsernameExists] = useState(false);
	const room = presentationName.trim().toLowerCase();
	const { socket } = useSocket();

	const handleSubmit = e => {
		e.preventDefault();
		socket.emit("join", { username, room }, (error, user) => {
			if (error) {
				setUsernameExists(true);
			} else {
				setUsernameExists(false);
				navigate(`/join-presentation/${username}/${presentationName}`);
			}
		});
	};
	return (
		<div className="form">
			<form
				className="form__container"
				onSubmit={handleSubmit}
			>
				{usernameExists ? <span className="form__alert">This username already taken, choose a diffrent username</span> : "Choose an username"}
				<div className="form__row">
					<input
						type="text"
						required
						name="username"
						id="username"
						className="form__input"
						value={username}
						onChange={e => {
							setUsername(e.target.value);
						}}
					></input>
				</div>
				<button
					type="submit"
					className=" btn btn__block"
				>
					Join presentation {presentationName}
				</button>
			</form>
		</div>
	);
}

export default JoinPresentation;
