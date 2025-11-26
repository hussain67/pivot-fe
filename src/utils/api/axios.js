import axios from "axios";

export let url;

if (process.env.NODE_ENV === "production") {
	url = "https://pivot-be.onrender.com";
} else {
	url = "http://localhost:9090";
}

// axios.defaults.baseURL = url;

export const apiClient = axios.create({
	baseURL: url
});

apiClient.interceptors.response.use(
	response => response,
	error => {
		if (!error.response) {
			console.error("Global Network Error:", error);
			throw new Error("Server unreachable");
		} else {
			console.error("Global Error:", error.response.status);
		}

		console.log("message", error.message);
		// console.log("response", error.response);
		return Promise.reject(error);
	}
);
