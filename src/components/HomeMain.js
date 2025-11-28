import Participant from "../features/user/Participant";
import Presenter from "../features/user/Presenter";

function HomeMain({ socket }) {
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

export default HomeMain;
