import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { budgetAPI, expenseAPI } from '../services/api'
import '../styles/forms.css'

function formatRupees(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0 })
}

function Budget() {
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  // Budget form state
  const [budgetAmount, setBudgetAmount] = useState('')
  const [month, setMonth] = useState(currentMonth)
  const [year, setYear] = useState(currentYear)

  // Loaded budget data
  const [currentBudget, setCurrentBudget] = useState(null)
  const [monthlySpent, setMonthlySpent] = useState(0)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Load current budget and expenses when page opens
  useEffect(() => {
    loadBudgetData()
  }, [month, year])

  async function loadBudgetData() {
    setLoading(true)
    setError('')
    try {
      // Load budget for selected month/year
      const budRes = await budgetAPI.get(month, year)
      if (budRes.data && budRes.data.amount) {
        setCurrentBudget(budRes.data)
        setBudgetAmount(budRes.data.amount)
      } else {
        setCurrentBudget(null)
        setBudgetAmount('')
      }

      // Load all expenses and filter for the selected month/year
      const expRes = await expenseAPI.getAll()
      const spent = expRes.data
        .filter(e => {
          const d = new Date(e.date)
          return d.getMonth() + 1 === month && d.getFullYear() === year
        })
        .reduce((sum, e) => sum + Number(e.amount), 0)
      setMonthlySpent(spent)
    } catch (err) {
      setError('Unable to load budget data.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!budgetAmount || Number(budgetAmount) <= 0) {
      setError('Please enter a valid budget amount.')
      return
    }

    setSaving(true)
    try {
      await budgetAPI.set({
        amount: parseFloat(budgetAmount),
        month,
        year
      })
      setSuccess('Budget saved successfully!')
      loadBudgetData()
    } catch (err) {
      setError('Failed to save budget. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const budget = currentBudget ? Number(currentBudget.amount) : 0
  const remaining = budget - monthlySpent
  const percentage = budget > 0 ? Math.min((monthlySpent / budget) * 100, 100) : 0
  const isOverBudget = budget > 0 && monthlySpent > budget

  const monthNames = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <div className="page-layout">
      <Navbar />
      <div className="page-content">
        <h1 className="page-title">Monthly Budget</h1>

        {/* Month/Year selector */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
          >
            {monthNames.slice(1).map((name, idx) => (
              <option key={idx + 1} value={idx + 1}>{name}</option>
            ))}
          </select>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', width: '90px' }}
            min="2020"
            max="2100"
          />
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {/* Budget stats */}
            {currentBudget && (
              <div className="budget-page-card">
                <div className="budget-stats">
                  <div className="budget-stat">
                    <div className="stat-label">Budget</div>
                    <div className="stat-value">{formatRupees(budget)}</div>
                  </div>
                  <div className="budget-stat">
                    <div className="stat-label">Spent</div>
                    <div className="stat-value" style={{ color: isOverBudget ? 'var(--danger)' : 'var(--text)' }}>
                      {formatRupees(monthlySpent)}
                    </div>
                  </div>
                  <div className="budget-stat">
                    <div className="stat-label">Remaining</div>
                    <div className="stat-value" style={{ color: remaining < 0 ? 'var(--danger)' : 'var(--success)' }}>
                      {formatRupees(remaining)}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="progress-wrapper">
                  <div className="progress-label">
                    <span>Spending progress</span>
                    <span>{Math.round(percentage)}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className={`progress-bar-fill ${isOverBudget ? 'over-budget' : ''}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Over budget warning */}
                {isOverBudget && (
                  <div className="alert alert-warning">
                    ⚠️ You have exceeded your budget for {monthNames[month]} {year}!
                  </div>
                )}
              </div>
            )}

            {/* Set/Update Budget Form */}
            <div className="form-page">
              <div className="form-card">
                <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
                  {currentBudget ? 'Update Budget' : 'Set Budget'} for {monthNames[month]} {year}
                </h3>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSave}>
                  <div className="form-group">
                    <label htmlFor="budgetAmount">Monthly Budget Amount (₹)</label>
                    <input
                      id="budgetAmount"
                      type="number"
                      placeholder="e.g., 20000"
                      value={budgetAmount}
                      onChange={(e) => setBudgetAmount(e.target.value)}
                      min="1"
                      step="1"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : currentBudget ? 'Update Budget' : 'Set Budget'}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Budget
