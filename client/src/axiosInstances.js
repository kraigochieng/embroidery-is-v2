import axios from "axios";

export const admin = axios.create({
    baseURL: import.meta.env.VITE_EMBROIDERY_IS_V2_SERVER_URL + "/admin/",
})

admin.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${sessionStorage.getItem("jwt")}`
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

// This isntance is for authentication. If it has an Authorization header, an error pops up
export const auth = axios.create({
    baseURL: import.meta.env.VITE_EMBROIDERY_IS_V2_SERVER_URL + "/auth/"
})