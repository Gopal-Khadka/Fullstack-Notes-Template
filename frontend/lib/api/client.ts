import { createClient } from "../client/client";

const apiClient = createClient({
	baseURL: "http://localhost:8000",
}).instance;

apiClient.interceptors.request.use(
	(config) => {
		console.log(
			`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`,
		);
		return config;
	},
	(error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("❌ API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	},
);
