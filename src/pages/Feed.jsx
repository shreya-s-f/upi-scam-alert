import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRecentReports } from '../utils/firebaseHelpers'
import styles from './Feed.module.css'

const TYPE_COLORS = {
  'Fake KYC / Bank Call':        { bg: '#FFF0F0', color: '#B01820' },
  'Fake Prize / Lottery':        { bg: '#FFFBEB', color: '#92400e' },
  'OLX / Resale Fraud':          { bg: '#EFF6FF', color: '#1e40af' },
  'Fake Job Offer':              { bg: '#F5F3FF', color: '#5b21b6' },
  'Emergency / Relative Scam':   { bg: '#FFF0F0', color: '#B01820' },
  'Phishing Link':               { bg: '#ECFDF5', color: '#065f46' },
  'Investment Scam':             { bg: '#FFFBEB', color: '#92400e' },
  'Impersonation (Police/Govt)': { bg: '#FFF0F0', color: '#B01820' },
  'Other':                       { bg: '#F5F5F5', color: '#4B4B4B' },
}

function formatDate(ts) {
  if (!ts) return ''
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  const now = new Date()
  const diff = Math.floor((now - d) / 1000)
  if (diff < 60)   return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function maskUPI(upi) {
  if (!upi) return ''
  const [name, bank] = upi.split('@')
  if (!name) return upi
  const masked = name.slice(0, 3) + '***' + (name.length > 6 ? name.slice(-2) : '')
  return bank ? `${masked}@${bank}` : masked
}

function maskPhone(phone) {
  if (!phone || phone.length < 6) return phone
  return phone.slice(0, 3) + '****' + phone.slice(-3)
}

export default function Feed() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [filter, setFilter]   = useState('All')

  const ALL_TYPES = ['All', ...Object.keys(TYPE_COLORS)]

  useEffect(() => {
    getRecentReports(40)
      .then(data => { setReports(data); setLoading(false) })
      .catch(() => { setError('Could not load reports. Check your internet connection.'); setLoading(false) })
  }, [])

  const filtered = filter === 'All'
    ? reports
    : reports.filter(r => r.scamType === filter)

  return (
    <div className={styles.page}>
      <div className="container">

        <div className={styles.header}>
          <div>
            <h1 className="fade-up">Recent Community Reports</h1>
            <p className="fade-up-2">
              Latest scams reported by people across India.
              UPI IDs are partially masked for privacy.
            </p>
          </div>
          <Link to="/report" className={styles.reportBtn}>+ Report a Scam</Link>
        </div>

        {/* Filter bar */}
        <div className={styles.filterBar}>
          {ALL_TYPES.slice(0, 6).map(t => (
            <button
              key={t}
              className={`${styles.filterChip} ${filter === t ? styles.active : ''}`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className={styles.loadingWrap}>
            <div className={styles.loadingSpinner} />
            <p>Loading reports...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className={styles.errorBox}>
            <p>⚠️ {error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className={styles.emptyBox}>
            <p>😶 No reports yet{filter !== 'All' ? ` for "${filter}"` : ''}.</p>
            <Link to="/report">Be the first to report →</Link>
          </div>
        )}

        {/* Feed grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className={styles.grid}>
            {filtered.map((r, i) => {
              const colors = TYPE_COLORS[r.scamType] || TYPE_COLORS['Other']
              return (
                <div
                  key={r.id}
                  className={styles.card}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className={styles.cardTop}>
                    <span
                      className={styles.typeBadge}
                      style={{ background: colors.bg, color: colors.color }}
                    >
                      {r.scamType || 'Unknown'}
                    </span>
                    <span className={styles.timeAgo}>{formatDate(r.createdAt)}</span>
                  </div>

                  {(r.upiId || r.phone) && (
                    <div className={styles.upiRow}>
                      {r.upiId && (
                        <span className={styles.upiChip}>
                          💳 {maskUPI(r.upiId)}
                        </span>
                      )}
                      {r.phone && (
                        <span className={styles.upiChip}>
                          📱 {maskPhone(r.phone)}
                        </span>
                      )}
                    </div>
                  )}

                  {r.description && (
                    <p className={styles.desc}>{r.description}</p>
                  )}

                  <div className={styles.cardFooter}>
                    <span className={styles.reporter}>
                      Reported by {r.reporterName || 'Anonymous'}
                    </span>
                    {r.upiId && (
                      <Link
                        to={`/check?q=${encodeURIComponent(r.upiId)}`}
                        className={styles.checkLink}
                      >
                        Check →
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <p className={styles.note}>
            Showing {filtered.length} most recent reports.
            Data is community-submitted and not verified by any authority.
          </p>
        )}

      </div>
    </div>
  )
}
