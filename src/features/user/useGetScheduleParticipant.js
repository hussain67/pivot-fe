import { useEffect, useState } from "react";
import { getScheduleParticipant } from "../../utils/api/scheduleApi";

const useGetScheduleParticipant = () => {
	const [schedule, setSchedule] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		setIsLoading(true);
		getScheduleParticipant()
			.then(schedule => {
				setSchedule(schedule);
			})
			.catch(() => setError("Schedule could not be loaded"))
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	return { schedule, isLoading, error };
};

export default useGetScheduleParticipant;
