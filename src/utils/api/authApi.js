import Axios from "axios";
import { toast } from "react-toastify";
import { addItemToLocalStorage } from "../localstorage";

export const registerUser = async (name, email, password) => {
  try {
    const response = await Axios.post("/api/v1/auth/register", {
      name,
      email,
      password
    });
    toast.success(`Hello there ${response.data.user.name}`);

    addItemToLocalStorage("token", response.data.token);
    return response.data.user;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const loginUser = async (email, password) => {
  try {
    const { data } = await Axios.post("/api/v1/auth/login", { email, password });

    if (data.user) {
      toast.success(`Wellcome back ${data.user.name}`);

      addItemToLocalStorage("token", data.token);
      return data.user;
    }
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
export const logoutUser = async () => {
  try {
    const response = await Axios.post("/api/v1/auth/logout");
    toast.success(response.data.msg);
    //console.log(response.data.msg);
    return response.data.msg;
  } catch (error) {
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
