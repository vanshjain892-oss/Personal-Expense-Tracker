import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { expenseAPI } from '../services/api'
import '../styles/forms.css'

// Available expense categories as defined in PRD
const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Bills', 'Education', 'Entertainment', 'Health', 'Other'] 

function AddExpense() {
  const navigate = useNavigate()

  // Form state - each field has its own state variable
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')

  // UI state
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  // Validate the form fields
  function validate() {
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Expense title is required.'
    if (!amount) newErrors.amount = 'Amount is required.'
    else if (isNaN(amount) || Number(amount) <= 0) newErrors.amount = 'Amount must be greater than zero.'
    if (!category) newErrors.category = 'Please select a category.'
    if (!date) newErrors.date = 'Date is required.'
    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')

    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)
    try {
      await expenseAPI.create({
        title,
        amount: parseFloat(amount),
        category,
        date,
        note: note || null
      })

      // Go back to transactions after saving
      navigate('/transactions')
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to add expense. Please try again.'
      setServerError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-layout">
      <Navbar />
      <div className="page-content">
        <h1 className="page-title">Add Expense</h1>

        <div className="form-page">
          <div className="form-card">
            {serverError && <div className="alert alert-error">{serverError}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Expense Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g., Lunch, Bus fare"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <div className="field-error">{errors.title}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount (₹)</label>
                <input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                />
                {errors.amount && <div className="field-error">{errors.amount}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <div className="field-error">{errors.category}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && <div className="field-error">{errors.date}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="note">Note (optional)</label>
                <textarea
                  id="note"
                  placeholder="Add a short note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Add Expense'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddExpense
