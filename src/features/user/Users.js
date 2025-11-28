import Participant from "./Participant";
import Presenter from "./Presenter";

function Users({ socket }) {
	return (
		<>
			<div className="home-main">
				<div className="home-main__left">
					<Participant socket={socket} />
				</div>
				<div className="home-main__right">
					<Presenter />
				</div>
			</div>
		</>
	);
}

export default Users;
