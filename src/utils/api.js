import axios from "axios";

const pivotApi = axios.create({
    baseURL: "https://rhs-pivot-backend.herokuapp.com/api"
});

export const getSlides = (sessionId) => {
    return pivotApi.get(`/presentations/${sessionId}`).then(res => {
        console.log(res);
        return res.data.presentation;
    })
}
