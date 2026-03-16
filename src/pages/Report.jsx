import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { submitReport } from '../utils/firebaseHelpers'
import styles from './Report.module.css'

const SCAM_TYPES = [
  'Fake KYC / Bank Call',
  'Fake Prize / Lottery',
  'OLX / Resale Fraud',
  'Fake Job Offer',
  'Emergency / Relative Scam',
  'Phishing Link',
  'Investment Scam',
  'Impersonation (Police/Govt)',
  'Other',
]

const INITIAL = {
  upiId: '',
  phone: '',
  scamType: '',
  description: '',
  reporterName: '',
}

export default function Report() {
  const [params] = useSearchParams()
  const [form, setForm]       = useState({ ...INITIAL, upiId: params.get('upi') || '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.upiId.trim() && !form.phone.trim()) {
      setError('Please enter at least a UPI ID or phone number.')
      return
    }
    if (!form.scamType) {
      setError('Please select a scam type.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await submitReport(form)
      setSuccess(true)
      setForm(INITIAL)
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✅</div>
            <h2>Report Submitted!</h2>
            <p>
              Thank you. Your report has been saved and will help protect
              others from this scam. Every report matters.
            </p>
            <div className={styles.successActions}>
              <button className={styles.btnPrimary} onClick={() => setSuccess(false)}>
                + Submit Another Report
              </button>
              <Link to="/feed" className={styles.btnSecondary}>View Recent Reports</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className="container">

        <div className={styles.header}>
          <h1 className="fade-up">Report a UPI Scam</h1>
          <p className="fade-up-2">
            Got scammed or spotted a fraud UPI ID? Report it here in 30 seconds —
            no login needed. Your report protects thousands of others.
          </p>
        </div>

        <div className={styles.layout}>
          {/* ── FORM ── */}
          <form className={`${styles.formCard} fade-up-2`} onSubmit={handleSubmit} noValidate>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Scammer Details</h3>
              <p className={styles.formSectionNote}>Fill at least one of UPI ID or Phone Number</p>

              <div className={styles.field}>
                <label htmlFor="upiId">UPI ID</label>
                <input
                  id="upiId"
                  name="upiId"
                  type="text"
                  placeholder="e.g. scammer@paytm"
                  value={form.upiId}
                  onChange={handleChange}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Scam Details</h3>

              <div className={styles.field}>
                <label htmlFor="scamType">Type of Scam <span className={styles.required}>*</span></label>
                <select
                  id="scamType"
                  name="scamType"
                  value={form.scamType}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select scam type --</option>
                  {SCAM_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="description">
                  What happened? <span className={styles.optional}>(optional but helpful)</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe how the scam worked. The more detail, the better others can recognize it."
                  value={form.description}
                  onChange={handleChange}
                  maxLength={500}
                />
                <span className={styles.charCount}>{form.description.length}/500</span>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Your Details</h3>

              <div className={styles.field}>
                <label htmlFor="reporterName">Your Name <span className={styles.optional}>(optional)</span></label>
                <input
                  id="reporterName"
                  name="reporterName"
                  type="text"
                  placeholder="Anonymous"
                  value={form.reporterName}
                  onChange={handleChange}
                  maxLength={40}
                />
              </div>
            </div>

            {error && <p className={styles.errorMsg}>⚠️ {error}</p>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading
                ? <><span className={styles.spinner} /> Submitting...</>
                : '🚨 Submit Report'}
            </button>

            <p className={styles.disclaimer}>
              By submitting you confirm this report is truthful to the best of your knowledge.
              We do not store your IP address or personal data.
            </p>

          </form>

          {/* ── SIDEBAR ── */}
          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h4>What to include</h4>
              <ul>
                <li>The exact UPI ID or number used by the scammer</li>
                <li>What type of scam it was</li>
                <li>A short description of how it happened</li>
              </ul>
            </div>

            <div className={styles.sideCard}>
              <h4>Also report to authorities</h4>
              <ul>
                <li>
                  <strong>Cybercrime Portal:</strong>{' '}
                  <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer">
                    cybercrime.gov.in
                  </a>
                </li>
                <li><strong>Helpline:</strong> Call <strong>1930</strong></li>
                <li><strong>Bank:</strong> Call your bank immediately to freeze the UPI</li>
              </ul>
            </div>

            <div className={styles.sideCard} style={{ background: 'var(--red-light)', borderColor: 'var(--red)' }}>
              <h4 style={{ color: 'var(--red-dark)' }}>🚨 Lost money?</h4>
              <p style={{ fontSize: 13, color: 'var(--red-dark)', lineHeight: 1.6 }}>
                Call <strong>1930</strong> immediately. The faster you report,
                the higher the chance of recovering your money.
              </p>
            </div>
          </aside>
        </div>

      </div>
    </div>
  )
}
