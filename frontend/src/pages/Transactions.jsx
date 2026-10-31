import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { expenseAPI, incomeAPI } from '../services/api'
import '../styles/transactions.css'

function formatRupees(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0 })
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

const CATEGORIES = ['All', 'Food', 'Travel', 'Shopping', 'Bills', 'Education', 'Entertainment', 'Health', 'Other']

function Transactions() {
  const navigate = useNavigate()

  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Filter state
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')      // All, Income, Expense
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    loadTransactions()
  }, [])

  async function loadTransactions() {
    try {
      setLoading(true)
      const [expRes, incRes] = await Promise.all([
        expenseAPI.getAll(),
        incomeAPI.getAll()
      ])
      setExpenses(expRes.data)
      setIncome(incRes.data)
    } catch (err) {
      setError('Unable to load transactions.')
    } finally {
      setLoading(false)
    }
  }

  // Ask user to confirm, then delete
  async function handleDelete(id, type) {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return

    try {
      if (type === 'Expense') {
        await expenseAPI.delete(id)
        setExpenses(prev => prev.filter(e => e.id !== id))
      } else {
        await incomeAPI.delete(id)
        setIncome(prev => prev.filter(i => i.id !== id))
      }
    } catch (err) {
      alert('Failed to delete transaction. Please try again.')
    }
  }

  function handleEdit(id, type) {
    navigate(`/edit/${type.toLowerCase()}/${id}`)
  }

  // Combine income and expense into a single list for display
  const allTransactions = [
    ...expenses.map(e => ({ ...e, type: 'Expense', displayTitle: e.title })),
    ...income.map(i => ({ ...i, type: 'Income', displayTitle: i.source, category: '—' }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date))

  // Apply all active filters
  const filtered = allTransactions.filter(t => {
    const matchSearch = search === '' ||
      t.displayTitle.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'All' || t.type === typeFilter
    const matchCategory = categoryFilter === 'All' ||
      (t.type === 'Expense' && t.category === categoryFilter)
    const matchDate = dateFilter === '' || t.date === dateFilter

    return matchSearch && matchType && matchCategory && matchDate
  })

  return (
    <div className="page-layout">
      <Navbar />
      <div className="page-content">
        <h1 className="page-title">Transactions</h1>

        {error && <div className="alert alert-error">{error}</div>}

        {/* Filters */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
            ))}
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading">Loading transactions...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <p>No transactions found.</p>
            {allTransactions.length === 0 && (
              <p>Start by adding your first income or expense.</p>
            )}
          </div>
        ) : (
          <div className="transaction-table-wrapper">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={`${t.type}-${t.id}`}>
                    <td>{formatDate(t.date)}</td>
                    <td>{t.displayTitle}</td>
                    <td>
                      <span className={`type-badge ${t.type === 'Income' ? 'badge-income' : 'badge-expense'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td>{t.category}</td>
                    <td className={t.type === 'Income' ? 'amount-income' : 'amount-expense'}>
                      {t.type === 'Income' ? '+' : '-'}{formatRupees(t.amount)}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-edit" onClick={() => handleEdit(t.id, t.type)}>
                          Edit
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(t.id, t.type)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  )
}

export default Transactions
