import axios from "axios";

console.log(import.meta.env.VITE_SERVER_URL)
const AxiosUtil = axios.create({
    baseURL:import.meta.env.VITE_SERVER_URL
})

export default AxiosUtil