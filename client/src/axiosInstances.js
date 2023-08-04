import axios from "axios";

export const server = axios.create({
    baseURL: "http://localhost:8080/api/",
})

server.interceptors.request.use(
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
    baseURL: "http://localhost:8080/api/authentication/"
})