import axios from "axios";

const AxiosUtil = axios.create({
    baseURL:import.meta.env.VITE_SERVER_URL,
    withCredentials:true,
})

export default AxiosUtil