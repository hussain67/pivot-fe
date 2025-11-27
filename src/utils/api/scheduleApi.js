import { apiClient } from "./axios";
import { authorizationHeader } from "../authorizationHeader";
export const createSchedule = async ({ title, id, time }) => {
	try {
		const response = await apiClient.post("api/v1/schedule", { title, id, time }, authorizationHeader());

		return response.data.schedule;
	} catch (error) {}
};

export const getScheduleParticipant = async () => {
	const response = await apiClient.get("api/v1/schedule/participant");
	console.log(response);
	return response.data;
};

export const getSchedulePresenter = async () => {
	//const token = getItemFromLocalStorage("token");
	try {
		const response = await apiClient.get("api/v1/schedule/presenter", authorizationHeader());
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const removeScheduleById = async id => {
	try {
		const response = await apiClient.delete(`/api/v1/schedule/${id}`, authorizationHeader());

		return response.data.status;
	} catch (error) {
		console.log(error.response.data);
	}
};
