export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

