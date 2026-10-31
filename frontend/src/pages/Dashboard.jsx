import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SummaryCard from '../components/SummaryCard'
import { expenseAPI, incomeAPI, budgetAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import '../styles/dashboard.css'
import '../styles/transactions.css'

// Format a number as Indian Rupees: ₹1,500
function formatRupees(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0 })
}

// Format a date string as "07 Oct 2026"
function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function Dashboard() {
  const { user } = useAuth()

  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState([])
  const [budget, setBudget] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load all data when the dashboard opens
  useEffect(() => {
    loadDashboardData()
  }, [])

  async function loadDashboardData() {
    try {
      setLoading(true)
      const now = new Date()
      const month = now.getMonth() + 1
      const year = now.getFullYear()

      // Fetch expenses, income, and budget at the same time
      const [expRes, incRes, budRes] = await Promise.all([
        expenseAPI.getAll(),
        incomeAPI.getAll(),
        budgetAPI.get(month, year).catch(() => ({ data: null }))
      ])

      setExpenses(expRes.data)
      setIncome(incRes.data)
      // Budget API returns null or an object with "message" if not set
      if (budRes.data && budRes.data.amount) {
        setBudget(budRes.data)
      }
    } catch (err) {
      setError('Unable to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  // Calculate totals
  const totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0)
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0)
  const balance = totalIncome - totalExpenses

  // Budget calculations
  const budgetAmount = budget ? Number(budget.amount) : 0

  // Only count expenses from current month for budget comparison
  const now = new Date()
  const thisMonthExpenses = expenses.filter(e => {
    const d = new Date(e.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const monthlySpent = thisMonthExpenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const budgetRemaining = budgetAmount - monthlySpent
  const isOverBudget = budgetAmount > 0 && monthlySpent > budgetAmount

  // Calculate expense total per category
  const categoryTotals = {}
  expenses.forEach(exp => {
    const cat = exp.category
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(exp.amount)
  })

  // Show 5 most recent transactions (mix of income and expense, sorted by date)
  const allTransactions = [
    ...expenses.map(e => ({ ...e, type: 'Expense' })),
    ...income.map(i => ({ ...i, type: 'Income', title: i.source }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)

  if (loading) return (
    <div className="page-layout">
      <Navbar />
      <div className="loading">Loading dashboard...</div>
    </div>
  )

  return (
    <div className="page-layout">
      <Navbar />
      <div className="page-content">

        {/* Welcome message */}
        <div className="dashboard-welcome">
          <h2>Welcome back, {user?.name} 👋</h2>
          <p>Here's your financial summary.</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {/* Budget exceeded warning */}
        {isOverBudget && (
          <div className="budget-warning">
            ⚠️ You have exceeded your monthly budget of {formatRupees(budgetAmount)}!
          </div>
        )}

        {/* Main summary cards: Income, Expenses, Balance */}
        <div className="summary-grid">
          <SummaryCard
            label="Total Income"
            amount={formatRupees(totalIncome)}
            subText="All time"
            colorClass="card-income"
          />
          <SummaryCard
            label="Total Expenses"
            amount={formatRupees(totalExpenses)}
            subText="All time"
            colorClass="card-expense"
          />
          <SummaryCard
            label="Balance"
            amount={formatRupees(balance)}
            subText="Income − Expenses"
            colorClass="card-balance"
          />
        </div>

        {/* Budget summary row */}
        {budget ? (
          <div className="budget-grid">
            <SummaryCard label="Monthly Budget" amount={formatRupees(budgetAmount)} subText={`${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`} />
            <SummaryCard label="Spent This Month" amount={formatRupees(monthlySpent)} />
            <SummaryCard label="Budget Remaining" amount={formatRupees(budgetRemaining)} />
          </div>
        ) : (
          <div style={{ marginBottom: '24px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              No budget set for this month.{' '}
              <Link to="/budget">Set a budget →</Link>
            </p>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="section-heading">Recent Transactions</div>
        {allTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet.</p>
            <p>Start by adding your first income or expense.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '12px' }}>
              <Link to="/add-expense" className="btn btn-primary">Add Expense</Link>
              <Link to="/add-income" className="btn btn-success">Add Income</Link>
            </div>
          </div>
        ) : (
          <div className="transaction-table-wrapper" style={{ marginBottom: '28px' }}>
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.map((t, idx) => (
                  <tr key={idx}>
                    <td>{formatDate(t.date)}</td>
                    <td>{t.title}</td>
                    <td>
                      <span className={`type-badge ${t.type === 'Income' ? 'badge-income' : 'badge-expense'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td>{t.type === 'Income' ? '—' : t.category}</td>
                    <td className={t.type === 'Income' ? 'amount-income' : 'amount-expense'}>
                      {t.type === 'Income' ? '+' : '-'}{formatRupees(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '10px' }}>
              <Link to="/transactions" style={{ fontSize: '13px' }}>View all transactions →</Link>
            </div>
          </div>
        )}

        {/* Expense Category Summary */}
        {Object.keys(categoryTotals).length > 0 && (
          <>
            <div className="section-heading">Expense by Category</div>
            <div className="category-grid">
              {Object.entries(categoryTotals).map(([cat, total]) => (
                <div className="category-item" key={cat}>
                  <div className="cat-name">{cat}</div>
                  <div className="cat-amount">{formatRupees(total)}</div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Dashboard
