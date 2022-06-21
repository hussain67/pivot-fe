import Axios from "axios";
import { toast } from "react-toastify";

export const createPresentation = async title => {
  try {
    const response = await Axios.post("/api/v1/presentations", { title });
    toast.success(`Presentation ${response.data.presentation.title} created`);
    //console.log(response.data.presentation.title);
    return response.data.presentation.title;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
