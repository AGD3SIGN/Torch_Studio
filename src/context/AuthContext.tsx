import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
  name: string
  email: string
  plan: 'Free' | 'Creator' | 'Pro'
}

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'torch_auth'

const MOCK_USER: User = {
  name: 'Demo User',
  email: 'demo@torchstudio.com',
  plan: 'Creator',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      if (import.meta.env.DEV) console.error('Failed to parse stored auth state:', error)
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const signIn = async (email: string, _password: string): Promise<void> => {
    // DEMO ONLY: This is a mock authentication flow. Any email/password combination succeeds.
    // Before connecting to a real backend, replace with proper OAuth 2.0 or JWT flow
    // with server-issued httpOnly session cookies, never client-side localStorage.
    await new Promise((r) => setTimeout(r, 800))
    const loggedInUser: User = { ...MOCK_USER, email }
    setUser(loggedInUser)
  }

  const signOut = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
