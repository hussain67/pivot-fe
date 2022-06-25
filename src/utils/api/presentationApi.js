import Axios from "axios";
import { toast } from "react-toastify";

export const createPresentation = async title => {
  try {
    const response = await Axios.post("/api/v1/presentations", { title });
    console.log(response.data);
    toast.success(`Presentation ${response.data.title} created`);
    return response.data;
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
export const editPresentationById = async (id, title) => {
  try {
    const response = await Axios.patch(`/api/v1/presentations/${id}`, { title });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePresentationById = async id => {
  try {
    const response = await Axios.delete(`/api/v1/presentations/${id}`);
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error.response.data);
  }
};
