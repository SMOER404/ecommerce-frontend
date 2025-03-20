import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios"

// Типы для ответов API
export interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
  headers: any
}

export interface ApiError {
  message: string
  status: number
  data?: any
}

class ApiClient {
  private client: AxiosInstance
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Важно для работы с cookies (refresh token)
    })

    // Перехватчик запросов для добавления токена авторизации
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    // Перехватчик ответов для обработки ошибок и обновления токена
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

        // Если ошибка 401 и мы еще не пытались обновить токен
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            // Пытаемся обновить токен
            const response = await this.refreshToken()

            // Если успешно, обновляем заголовок и повторяем запрос
            if (response && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${this.getAccessToken()}`
              return this.client(originalRequest)
            }
          } catch (refreshError) {
            // Если не удалось обновить токен, выходим из системы
            this.logout()
            return Promise.reject(refreshError)
          }
        }

        // Форматируем ошибку API
        const apiError: ApiError = {
          message: error.response?.data?.message || "An error occurred",
          status: error.response?.status || 500,
          data: error.response?.data,
        }

        return Promise.reject(apiError)
      },
    )
  }

  // Получение токена из localStorage
  private getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken")
    }
    return null
  }

  // Сохранение токена в localStorage
  private setAccessToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token)
    }
  }

  // Удаление токена из localStorage
  private removeAccessToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
    }
  }

  // Обновление токена
  private async refreshToken(): Promise<boolean> {
    try {
      const response = await this.client.get("/auth/refresh")
      const { accessToken } = response.data
      this.setAccessToken(accessToken)
      return true
    } catch (error) {
      this.removeAccessToken()
      return false
    }
  }

  // Выход из системы
  public async logout(): Promise<void> {
    try {
      await this.client.post("/auth/logout")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      this.removeAccessToken()
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
    }
  }

  // Методы для выполнения запросов
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<T>(url, config)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<T>(url, data, config)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<T>(url, data, config)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<T>(url, config)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  }

  // Методы для аутентификации
  public async login(email: string, password: string): Promise<any> {
    const response = await this.client.post("/auth/login", { email, password })
    const { accessToken, user } = response.data
    this.setAccessToken(accessToken)
    return user
  }

  public async register(name: string, email: string, password: string): Promise<any> {
    const response = await this.client.post("/auth/register", { name, email, password })
    const { accessToken, user } = response.data
    this.setAccessToken(accessToken)
    return user
  }

  // Проверка аутентификации
  public isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }
}

// Создаем и экспортируем экземпляр API-клиента
const apiClient = new ApiClient()
export default apiClient

