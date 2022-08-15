import Axios from "axios";
//import { toast } from "react-toastify";

export const createSchedule = async ({ title, id, time }) => {
  try {
    const response = await Axios.post("api/v1/schedule", { title, id, time });

    return response.data.schedule;
  } catch (error) {
    console.log(error);
  }
};

export const getScheduleParticipant = async () => {
  try {
    const response = await Axios.get("api/v1/schedule/participant");
    return response.data;
  } catch (error) {}
};
export const getSchedulePresenter = async () => {
  try {
    const response = await Axios.get("api/v1/schedule/presenter");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeScheduleById = async id => {
  try {
    const response = await Axios.delete(`/api/v1/schedule/${id}`);

    return response.data.status;
  } catch (error) {
    console.log(error.response.data);
  }
};
