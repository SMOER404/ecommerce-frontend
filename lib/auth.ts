import api from "./api"
import type { User } from "@/types/user"

export interface AuthResponse {
  user: User
  accessToken: string
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", { email, password })
  localStorage.setItem("accessToken", response.data.accessToken)
  return response.data
}

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", { name, email, password })
  localStorage.setItem("accessToken", response.data.accessToken)
  return response.data
}

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout")
  localStorage.removeItem("accessToken")
}

export const getProfile = async (): Promise<User> => {
  const response = await api.get("/users/profile")
  return response.data
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("accessToken")
}

