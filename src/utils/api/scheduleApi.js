import Axios from "axios";
import { toast } from "react-toastify";

export const createSchedule = async title => {
  try {
    const response = await Axios.post("api/v1/schedule", { title });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const getSchedule = async () => {
  try {
    const response = await Axios.get("api/v1/schedule");
    console.log(response.data);
    return response.data;
  } catch (error) {}
};
