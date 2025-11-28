import PresentationSchedule from "../presentation/PresentationSchedule";
import useGetScheduleParticipant from "./useGetScheduleParticipant";

// Data fetching
function SelectPresentation({ setPresentationName, setIsSelectedPresentation }) {
	const { isLoading, schedule, error } = useGetScheduleParticipant();
	return (
		<div>
			<h2 className="home-main__left-title">Scheduled Presentations</h2>

			{isLoading && <h1>Loading...</h1>}
			{schedule && (
				<PresentationSchedule
					schedule={schedule}
					setPresentationName={setPresentationName}
					setJoiningPresentation={setIsSelectedPresentation}
				/>
			)}
			{error && <p>{error}</p>}
		</div>
	);
}

export default SelectPresentation;
