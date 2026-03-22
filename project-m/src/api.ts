// import { Config } from './../node_modules/@eslint/config-helpers/dist/esm/index.d';
import axios from "axios";

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

// Add token automatically
API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('access')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Response interceptor ( key part )
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.Config
        if (
            error.response?.status === 401 && 
            !originalRequest._retry
        ) {
            originalRequest._retry = true

            try {
                const refresh = localStorage.getItem('refresh')

                const res = await axios.post(
                    'http://127.0.0.1:8000/api/token/refresh/',
                    { refresh }
                )

                // save the new access token
                localStorage.setItem('access', res.data.access)

                // retry original request
                originalRequest.headers.Authorization = `Bearer ${res.data.access}`

                return API(originalRequest)
            } catch (err) {
                // refresh failed - logout
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')

                window.location.href = '/login'
            }
        }

        return Promise.reject(error)
    }
)


export default API