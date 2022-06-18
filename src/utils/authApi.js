import Axios from "axios";
import { toast } from "react-toastify";
const pivotApi = "API";

export const getSlides = sessionId => {
  return Axios.get(`/presentations/${sessionId}`).then(res => {
    return res.data.presentation;
  });
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await Axios.post("/api/v1/auth/register", {
      name,
      email,
      password
    });

    return response.data.user;
  } catch (error) {
    console.log(error.response);
    toast.error(error.response.data.msg);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await Axios.post("api/v1/auth/login", { email, password });
    console.log(response);
    return response.data.user;
  } catch (error) {
    console.log(error);
  }
};
export const logoutUser = async () => {
  try {
    const response = await Axios.post("api/v1/auth/logout");
    toast.success(response.data.msg);
    return response.data.msg;
  } catch (error) {
    console.log(error.response);
    toast.error(error.response.data.msg);
  }
};

export const getInfo = async () => {
  try {
    const result = await Axios.get("/api/v1");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default pivotApi;
