import axios from "axios";
import authService from "./auth.service";

const apiService = axios.create({
    baseURL: "http://127.0.0.1:8080/"
});

apiService.interceptors.request.use(async config => {
    const token = authService.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
});


export default apiService;
