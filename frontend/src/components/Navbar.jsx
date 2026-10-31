import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/navbar.css'

// Top navigation bar shown on all protected pages
function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* App logo/name */}
          <NavLink to="/dashboard" className="navbar-logo">
            Expense Tracker
          </NavLink>

          {/* Desktop nav links */}
          <ul className="navbar-links">
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/transactions">Transactions</NavLink></li>
            <li><NavLink to="/add-expense">Add Expense</NavLink></li>
            <li><NavLink to="/add-income">Add Income</NavLink></li>
            <li><NavLink to="/budget">Budget</NavLink></li>
          </ul>

          {/* Right side: user name and logout */}
          <div className="navbar-right">
            <span className="navbar-user">Hi, {user?.name}</span>
            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
            {/* Mobile hamburger button */}
            <button
              className="navbar-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`navbar-mobile ${mobileOpen ? 'open' : ''}`}>
        <NavLink to="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</NavLink>
        <NavLink to="/transactions" onClick={() => setMobileOpen(false)}>Transactions</NavLink>
        <NavLink to="/add-expense" onClick={() => setMobileOpen(false)}>Add Expense</NavLink>
        <NavLink to="/add-income" onClick={() => setMobileOpen(false)}>Add Income</NavLink>
        <NavLink to="/budget" onClick={() => setMobileOpen(false)}>Budget</NavLink>
        <button
          onClick={() => { handleLogout(); setMobileOpen(false) }}
          style={{ background: 'none', border: 'none', color: 'var(--danger)', padding: '10px 0', fontSize: '15px', cursor: 'pointer', textAlign: 'left' }}
        >
          Logout
        </button>
      </div>
    </>
  )
}

export default Navbar
