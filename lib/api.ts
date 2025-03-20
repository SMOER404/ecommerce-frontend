import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies (refresh token)
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for adding the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the error is 401 and we haven't already tried to refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the token
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true, // Important for accessing the refresh token cookie
        })

        const { accessToken } = response.data
        localStorage.setItem("accessToken", accessToken)

        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        // Retry the original request
        return api(originalRequest)
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem("accessToken")
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api

