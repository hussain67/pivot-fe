import axios from "axios";

const pivotApi = axios.create({
    baseURL: "https://rhs-pivot-backend.herokuapp.com/api"
});

export const getSlides = (presentationId) => {
    return pivotApi.get(`/presentations/${presentationId}`).then(res => {
        return res.data.slides;
    })
}
