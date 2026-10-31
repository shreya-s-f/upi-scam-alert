import { useState } from 'react'
import { Link } from 'react-router-dom'
import { checkUPI } from '../utils/firebaseHelpers'
import RiskBadge from '../components/RiskBadge'
import styles from './Check.module.css'

export default function Check() {
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [result, setResult]     = useState(null)   // { riskLevel, count, reports }
  const [error, setError]       = useState('')
  const [searched, setSearched] = useState('')

  async function handleCheck(e) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const data = await checkUPI(input.trim())
      setResult(data)
      setSearched(input.trim())
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Format Firestore Timestamp → readable date
  function formatDate(ts) {
    if (!ts) return 'Unknown date'
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className={styles.page}>
      <div className="container">

        {/* ── Header ── */}
        <div className={styles.header}>
          <h1 className="fade-up">Check a UPI ID or Phone Number</h1>
          <p className="fade-up-2">
            Enter the UPI ID (e.g. <code>someone@paytm</code>) or mobile number
            you want to check against our fraud database.
          </p>
        </div>

        {/* ── Search Form ── */}
        <form className={`${styles.searchBox} fade-up-2`} onSubmit={handleCheck}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="e.g. scammer@ybl  or  9876543210"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="submit"
            className={styles.searchBtn}
            disabled={loading || !input.trim()}
          >
            {loading ? <span className={styles.spinner} /> : '🔍 Check Now'}
          </button>
        </form>

        {error && <p className={styles.errorMsg}>⚠️ {error}</p>}

        {/* ── Result ── */}
        {result && (
          <div className={`${styles.resultCard} fade-up`}>
            <div className={styles.resultHeader}>
              <div>
                <p className={styles.resultLabel}>Result for</p>
                <p className={styles.resultQuery}>{searched}</p>
              </div>
              <RiskBadge level={result.riskLevel} count={result.count} />
            </div>

            {result.riskLevel === 'safe' ? (
              <div className={styles.safeMsg}>
                <p>✅ This UPI ID / number has <strong>no reports</strong> in our database.</p>
                <p style={{ marginTop: 8, fontSize: 14, color: 'var(--muted)' }}>
                  This does not guarantee it is 100% safe — always be cautious before sending money to strangers.
                </p>
              </div>
            ) : (
              <div>
                <p className={styles.warningNote}>
                  {result.count >= 5
                    ? '🚨 This ID has been reported multiple times. Do NOT send any money.'
                    : '⚠️ This ID has been reported. Proceed with extreme caution.'}
                </p>

                {/* Individual reports */}
                <div className={styles.reportsList}>
                  {result.reports.map(r => (
                    <div key={r.id} className={styles.reportItem}>
                      <div className={styles.reportTop}>
                        <span className={styles.scamTypeBadge}>{r.scamType || 'Scam'}</span>
                        <span className={styles.reportDate}>{formatDate(r.createdAt)}</span>
                      </div>
                      {r.description && (
                        <p className={styles.reportDesc}>{r.description}</p>
                      )}
                      <p className={styles.reportBy}>Reported by: {r.reporterName || 'Anonymous'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.resultFooter}>
              <Link to={`/report?upi=${encodeURIComponent(searched)}`} className={styles.reportBtn}>
                + Add a Report for This ID
              </Link>
            </div>
          </div>
        )}

        {/* ── Tips ── */}
        <div className={`${styles.tipsBox} ${result ? '' : 'fade-up-3'}`}>
          <h3>🛡️ Quick Safety Tips</h3>
          <ul>
            <li>Never pay anyone who called <em>you</em> first — banks never ask for UPI PINs.</li>
            <li>Receiving money does NOT require you to enter your PIN.</li>
            <li>Verify UPI IDs carefully — scammers use IDs like <em>sbi.helpdesk@upi</em>.</li>
            <li>If unsure, call your bank's official helpline before sending.</li>
          </ul>
        </div>

      </div>
    </div>
  )
}
