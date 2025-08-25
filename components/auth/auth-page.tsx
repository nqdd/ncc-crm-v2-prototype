"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"
import { useAuth } from "./auth-provider"

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const { login, signup } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onLogin={login} onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSignup={signup} onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  )
}
