import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { incomeAPI } from '../services/api'
import '../styles/forms.css'

function AddIncome() {
  const navigate = useNavigate()

  const [source, setSource] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  

  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  function validate() {
    const newErrors = {}
    if (!source.trim()) newErrors.source = 'Income source is required.'
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

    setLoading(true)
    try {
      await incomeAPI.create({
        source,
        amount: parseFloat(amount),
        date,
        note: note || null
      })

      navigate('/transactions')
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to add income. Please try again.'
      setServerError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-layout">
      <Navbar />
      <div className="page-content">
        <h1 className="page-title">Add Income</h1>

        <div className="form-page">
          <div className="form-card">
            {serverError && <div className="alert alert-error">{serverError}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="source">Income Source</label>
                <input
                  id="source"
                  type="text"
                  placeholder="e.g., Part-time Work, Scholarship"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
                {errors.source && <div className="field-error">{errors.source}</div>}
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
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? 'Saving...' : 'Add Income'}
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

export default AddIncome
