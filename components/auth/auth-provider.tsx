"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: number
  name: string
  email: string
  role: string
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: { name: string; email: string; password: string; role: string }) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const mockUsers = [
  {
    id: 1,
    name: "John Admin",
    email: "admin@company.com",
    password: "admin123",
    role: "Administrator",
    permissions: ["all"],
  },
  {
    id: 2,
    name: "Jane Manager",
    email: "manager@company.com",
    password: "manager123",
    role: "Manager",
    permissions: ["contacts", "companies", "deals", "projects", "reports"],
  },
  {
    id: 3,
    name: "Bob Sales",
    email: "sales@company.com",
    password: "sales123",
    role: "Sales Rep",
    permissions: ["contacts", "companies", "deals"],
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("crm_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        permissions: foundUser.permissions,
      }
      setUser(userSession)
      localStorage.setItem("crm_user", JSON.stringify(userSession))
      return true
    }
    return false
  }

  const signup = async (userData: {
    name: string
    email: string
    password: string
    role: string
  }): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      return false
    }

    // Define permissions based on role
    const rolePermissions: Record<string, string[]> = {
      Administrator: ["all"],
      Manager: ["contacts", "companies", "deals", "projects", "reports"],
      "Sales Rep": ["contacts", "companies", "deals"],
      Support: ["contacts", "companies"],
    }

    const newUser = {
      id: mockUsers.length + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      permissions: rolePermissions[userData.role] || ["contacts"],
    }

    mockUsers.push(newUser)

    const userSession = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      permissions: newUser.permissions,
    }

    setUser(userSession)
    localStorage.setItem("crm_user", JSON.stringify(userSession))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("crm_user")
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    if (user.permissions.includes("all")) return true
    return user.permissions.includes(permission)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
