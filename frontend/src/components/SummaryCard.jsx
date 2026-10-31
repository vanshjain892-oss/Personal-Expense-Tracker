// A simple card that shows a financial summary value (income, expense, balance, etc.)
function SummaryCard({ label, amount, subText, colorClass }) {
  return (
    <div className={`summary-card ${colorClass || ''}`}>
      <div className="card-label">{label}</div>
      <div className="card-amount">{amount}</div>
      {subText && <div className="card-sub">{subText}</div>}
    </div>
  )
}

export default SummaryCard
