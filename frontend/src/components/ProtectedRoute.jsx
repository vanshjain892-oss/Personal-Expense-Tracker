import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// This component wraps any page that requires the user to be logged in.
// If not logged in, it redirects to the login page.
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
