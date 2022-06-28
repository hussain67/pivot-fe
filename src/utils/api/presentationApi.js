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

export const getPresentationById = async id => {
  try {
    const response = await Axios.get(`/api/v1/presentations/${id}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
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

export const uploadSlideImage = async formData => {
  try {
    const response = await Axios.post("/api/v1/presentations/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(response.data.image.src);
    return response.data.image.src;
  } catch (error) {
    console.log(error);
  }
};

export const createSlide = async (id, slide) => {
  try {
    const response = await Axios.post(`/api/v1/presentations/${id}/slides`, slide);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllSlides = async id => {
  try {
    const response = await Axios.get(`/api/v1/presentations/${id}/slides`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
