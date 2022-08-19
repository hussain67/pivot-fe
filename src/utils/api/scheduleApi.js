import Axios from "axios";
//import { toast } from "react-toastify";
//import { getItemFromLocalStorage } from "../localstorage";
import { authorizationHeader } from "../authorizationHeader";
export const createSchedule = async ({ title, id, time }) => {
  try {
    const response = await Axios.post("api/v1/schedule", { title, id, time }, authorizationHeader());

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
  //const token = getItemFromLocalStorage("token");
  try {
    const response = await Axios.get("api/v1/schedule/presenter", authorizationHeader());
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeScheduleById = async id => {
  try {
    const response = await Axios.delete(`/api/v1/schedule/${id}`, authorizationHeader());

    return response.data.status;
  } catch (error) {
    console.log(error.response.data);
  }
};
