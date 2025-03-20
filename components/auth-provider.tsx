"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authService } from "@/lib/services/auth-service"
import type { User } from "@/types/user"

interface AuthContextType {
  user: User | null
  loading: boolean
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  checkAuth: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const checkAuth = async () => {
    if (!authService.isAuthenticated()) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const userData = await authService.getProfile()
      setUser(userData)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [pathname])

  return <AuthContext.Provider value={{ user, loading, checkAuth }}>{children}</AuthContext.Provider>
}

