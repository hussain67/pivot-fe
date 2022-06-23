import Axios from "axios";
import { toast } from "react-toastify";

export const createPresentation = async title => {
  try {
    const response = await Axios.post("/api/v1/presentations", { title });
    toast.success(`Presentation ${response.data.presentation.title} created`);
    console.log(response.data.presentation);
    return response.data.presentation;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const getAllPresentations = async () => {
  try {
    const response = await Axios.get("/api/v1/presentations");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
