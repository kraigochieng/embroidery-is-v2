import axios from "axios";

const prodServerUrl = "https://embroidery-is-v2-server.wittyfield-49acbf62.southafricanorth.azurecontainerapps.io"
const devServerUrl = "http://localhost:8080"
export const admin = axios.create({
    baseURL: `${prodServerUrl}/api/admin/`,
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
    baseURL: `${prodServerUrl}/api/auth/`
})