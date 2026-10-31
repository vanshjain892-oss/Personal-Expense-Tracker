import { createContext, useContext, useState, useEffect } from 'react'

// Create a context to store auth state (token, user info)
const AuthContext = createContext(null)

// AuthProvider wraps the whole app so any component can access auth state
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)      // Logged-in user info
  const [token, setToken] = useState(null)    // JWT token

  // When the app loads, check if a user is already logged in (from localStorage)
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Call this after successful login or register
  function login(userData, jwtToken) {
    setUser(userData)
    setToken(jwtToken)
    // Save to localStorage so user stays logged in after page refresh
    localStorage.setItem('token', jwtToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Call this when the user clicks Logout
  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // isAuthenticated is true if we have a token
  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook - lets any component access auth state easily
// Usage: const { user, logout } = useAuth()
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
