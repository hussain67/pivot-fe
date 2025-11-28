import Participant from "./Participant";
import Presenter from "./Presenter";

function Users() {
	return (
		<>
			<div className="home-main">
				<div className="home-main__left">
					<Participant />
				</div>
				<div className="home-main__right">
					<Presenter />
				</div>
			</div>
		</>
	);
}

export default Users;
