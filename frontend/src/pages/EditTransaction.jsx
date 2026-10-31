import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { expenseAPI, incomeAPI } from '../services/api'
import '../styles/forms.css'

const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Bills', 'Education', 'Entertainment', 'Health', 'Other']

// This page handles editing both expenses and income
// The "type" param from URL tells us which one (expense or income)
function EditTransaction() {
  const { type, id } = useParams()  // type = "expense" or "income", id = record ID
  const navigate = useNavigate()

  const isExpense = type === 'expense'

  // Form state
  const [title, setTitle] = useState('')      // For expense title
  const [source, setSource] = useState('')    // For income source
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')

  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Load existing data when the page opens
  useEffect(() => {
    loadData()
  }, [id, type])

  async function loadData() {
    try {
      setLoading(true)
      if (isExpense) {
        const res = await expenseAPI.getById(id)
        const e = res.data
        setTitle(e.title)
        setAmount(e.amount)
        setCategory(e.category)
        setDate(e.date)
        setNote(e.note || '')
      } else {
        const res = await incomeAPI.getById(id)
        const i = res.data
        setSource(i.source)
        setAmount(i.amount)
        setDate(i.date)
        setNote(i.note || '')
      }
    } catch (err) {
      setServerError('Failed to load transaction data.')
    } finally {
      setLoading(false)
    }
  }

  function validate() {
    const newErrors = {}
    if (isExpense) {
      if (!title.trim()) newErrors.title = 'Expense title is required.'
      if (!category) newErrors.category = 'Please select a category.'
    } else {
      if (!source.trim()) newErrors.source = 'Income source is required.'
    }
    if (!amount) newErrors.amount = 'Amount is required.'
    else if (isNaN(amount) || Number(amount) <= 0) newErrors.amount = 'Amount must be greater than zero.'
    if (!date) newErrors.date = 'Date is required.'
    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')

    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSaving(true)
    try {
      if (isExpense) {
        await expenseAPI.update(id, {
          title,
          amount: parseFloat(amount),
          category,
          date,
          note: note || null
        })
      } else {
        await incomeAPI.update(id, {
          source,
          amount: parseFloat(amount),
          date,
          note: note || null
        })
      }

      navigate('/transactions')
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to update. Please try again.'
      setServerError(msg)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="page-layout">
      <Navbar />
      <div className="loading">Loading...</div>
    </div>
  )

  return (
    <div className="page-layout">
      <Navbar />
      <div className="page-content">
        <h1 className="page-title">Edit {isExpense ? 'Expense' : 'Income'}</h1>

        <div className="form-page">
          <div className="form-card">
            {serverError && <div className="alert alert-error">{serverError}</div>}

            <form onSubmit={handleSubmit}>
              {isExpense ? (
                <div className="form-group">
                  <label htmlFor="title">Expense Title</label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && <div className="field-error">{errors.title}</div>}
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="source">Income Source</label>
                  <input
                    id="source"
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                  {errors.source && <div className="field-error">{errors.source}</div>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="amount">Amount (₹)</label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                />
                {errors.amount && <div className="field-error">{errors.amount}</div>}
              </div>

              {isExpense && (
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
              )}

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
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
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

export default EditTransaction
