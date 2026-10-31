import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import AddExpense from './pages/AddExpense'
import AddIncome from './pages/AddIncome'
import EditTransaction from './pages/EditTransaction'
import Budget from './pages/Budget'

// Main App component - sets up routing for all pages
function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider makes the logged-in user available everywhere in the app */}
      <AuthProvider>
        <Routes>
          {/* Public routes - no login needed */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes - must be logged in */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/add-expense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
          <Route path="/add-income" element={<ProtectedRoute><AddIncome /></ProtectedRoute>} />
          <Route path="/edit/:type/:id" element={<ProtectedRoute><EditTransaction /></ProtectedRoute>} />
          <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
