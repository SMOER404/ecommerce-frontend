import apiClient from "../api-client"
import type { User } from "@/types/user"

export interface AuthResponse {
  user: User
  accessToken: string
}

class AuthService {
  async login(email: string, password: string): Promise<User> {
    return apiClient.login(email, password)
  }

  async register(name: string, email: string, password: string): Promise<User> {
    return apiClient.register(name, email, password)
  }

  async logout(): Promise<void> {
    return apiClient.logout()
  }

  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>("/users/profile")
    return response.data
  }

  isAuthenticated(): boolean {
    return apiClient.isAuthenticated()
  }
}

export const authService = new AuthService()

