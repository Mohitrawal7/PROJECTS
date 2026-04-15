import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Demo credentials
const DEMO_USER = { email: 'admin@codeforchange.org', password: 'cfc2025', name: 'Admin', role: 'Admin' }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('cfc_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  const login = (email, password) => {
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const u = { email: DEMO_USER.email, name: DEMO_USER.name, role: DEMO_USER.role }
      setUser(u)
      localStorage.setItem('cfc_user', JSON.stringify(u))
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('cfc_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
