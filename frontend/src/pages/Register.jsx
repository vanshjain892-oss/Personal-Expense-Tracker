import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // UI state
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  // Validate all fields before submitting
  function validate() {
    const newErrors = {}

    if (!name.trim()) newErrors.name = 'Full name is required.'
    if (!email.trim()) newErrors.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email.'
    if (!password) newErrors.password = 'Password is required.'
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.'
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.'
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.'

    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')

    // Run validation
    const validationErrors = validate()
    setErrors(validationErrors)

    // Stop if there are validation errors
    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)
    try {
      const response = await authAPI.register({ name, email, password })
      const data = response.data

      // Auto-login after successful registration
      login(
        { userId: data.userId, name: data.name, email: data.email },
        data.token
      )

      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed. Please try again.'
      setServerError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">Personal Expense Tracker</div>
        <h1 className="auth-heading">Create Account</h1>

        {serverError && <div className="alert alert-error">{serverError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
