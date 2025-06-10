import axios from "axios";
import { Navigate } from "react-router-dom";

const api = axios.create({
    baseURL: "https://be.staging.cbi.lksprov.id",
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            console.log("Token has expired")
            localStorage.clear();
            window.location.href = "/"
        }
        return Promise.reject(error);
    }
)

export default api;
