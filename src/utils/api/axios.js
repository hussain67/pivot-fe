import axios from "axios";

export let url;

if (process.env.NODE_ENV === "production") {
	url = "https://pivot-be.onrender.com";
} else {
	url = "http://localhost:9090";
}

export const apiClient = axios.create({
	baseURL: url,
	timeout: 5000
});

apiClient.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error.request && !error.response) {
			console.error("Global Network Error:", error);
			console.log("Error", error);

			Promise.reject(error.message);
		} else {
			console.error("Server error:", error);
			throw new Error(error.response.status);
		}

		throw new Error("Something went wrong");
	}
);
