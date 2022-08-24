import Axios from "axios";
//import { toast } from "react-toastify";
//Authorization header return an object which is used for sending Bearer token
import { getItemFromLocalStorage } from "../localstorage";
import { authorizationHeader } from "../authorizationHeader";

export const createPresentation = async title => {
  try {
    const response = await Axios.post("/api/v1/presentations/create", { title }, authorizationHeader());
    //toast.success(`Presentation ${response.data.title} created`);
    return response.data;
  } catch (error) {
    // toast.error(error.response.data.msg);
    console.log(error.response.data.msg);
  }
};

export const getPresentationById = async id => {
  try {
    const response = await Axios.get(`/api/v1/presentations/${id}`, authorizationHeader());
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPresentations = async () => {
  try {
    const response = await Axios.get("/api/v1/presentations", authorizationHeader());
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
};
export const editPresentationById = async (id, title) => {
  try {
    const response = await Axios.patch(`/api/v1/presentations/${id}`, { title }, authorizationHeader());
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePresentationById = async id => {
  try {
    const response = await Axios.delete(`/api/v1/presentations/${id}`, authorizationHeader());
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const uploadSlideImage = async formData => {
  const token = getItemFromLocalStorage("token");
  try {
    const response = await Axios.post("/api/v1/presentations/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",

        Authorization: `Bearer ${token}`
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
    const response = await Axios.post(`/api/v1/presentations/${id}/slides`, slide, authorizationHeader());
    //console.log(response.data);
    return response.data.slideId;
  } catch (error) {
    console.log(error);
  }
};

export const getSlideById = async (presentationId, slideId) => {
  try {
    const response = await Axios.get(`/api/v1/presentations/${presentationId}/slides/${slideId}`, authorizationHeader());
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteSlideById = async (presentationId, slideId) => {
  try {
    const response = await Axios.delete(`/api/v1/presentations/${presentationId}/slides/${slideId}`, authorizationHeader());
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateSlideById = async (presentationId, slideId, slide) => {
  try {
    const response = await Axios.patch(`/api/v1/presentations/${presentationId}/slides/${slideId}`, slide, authorizationHeader());
    //console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllSlides = async id => {
  try {
    const response = await Axios.get(`/api/v1/presentations/${id}/slides`, authorizationHeader());
    // console.log(response);
    return response.data.slides;
  } catch (error) {
    return error.response.status;
  }
};
