import axios  from "axios";
//IN production, there's no localhost so we have to make this dynamic
/*const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5050/api" : "/api"*/
const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL:BASE_URL,
})
export default axiosInstance;