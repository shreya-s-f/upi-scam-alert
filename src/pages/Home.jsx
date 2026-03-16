import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTotalReports } from '../utils/firebaseHelpers'
import styles from './Home.module.css'

const SCAM_TYPES = [
  { icon: '📞', title: 'Fake KYC Calls',     desc: 'Fraudsters pose as bank/NPCI agents asking you to "update KYC" via UPI.' },
  { icon: '🎁', title: 'Fake Prize / Lottery', desc: '"You won ₹50,000! Send ₹99 to claim." — classic advance-fee trap.' },
  { icon: '🛒', title: 'OLX / Resale Fraud',  desc: 'Buyer/seller asks for UPI payment but delivers nothing.' },
  { icon: '💼', title: 'Fake Job Offer',      desc: 'Pay a registration fee to get a job that does not exist.' },
  { icon: '🆘', title: 'Emergency Scam',      desc: 'Caller pretends to be a relative in trouble, urgently needs money.' },
  { icon: '🏦', title: 'Phishing Links',      desc: 'Fake UPI / bank links that steal your PIN when you enter it.' },
]

export default function Home() {
  const [totalReports, setTotalReports] = useState('...')

  useEffect(() => {
    getTotalReports()
      .then(n => setTotalReports(n.toLocaleString('en-IN')))
      .catch(() => setTotalReports('1,000+'))
  }, [])

  return (
    <div>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={`${styles.alertBanner} fade-up`}>
            🚨 India loses ₹7,000+ crore to UPI fraud every year
          </div>

          <h1 className={`${styles.heroTitle} fade-up-2`}>
            Check Before<br />
            <span className={styles.accent}>You Pay.</span>
          </h1>

          <p className={`${styles.heroSub} fade-up-3`}>
            Search any UPI ID or phone number against our community-reported
            fraud database — <strong>free, instant, no login needed.</strong>
          </p>

          <div className={`${styles.heroActions} fade-up-3`}>
            <Link to="/check" className={styles.btnPrimary}>🔍 Check a UPI ID</Link>
            <Link to="/report" className={styles.btnSecondary}>⚠️ Report a Scam</Link>
          </div>

          <div className={`${styles.statsRow} fade-up-3`}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{totalReports}</span>
              <span className={styles.statLabel}>Scams Reported</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>Free</span>
              <span className={styles.statLabel}>Always & Forever</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>0s</span>
              <span className={styles.statLabel}>No Login Needed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.steps}>
            {[
              { n: '01', title: 'Search',  desc: 'Enter any UPI ID (like name@upi) or phone number you want to check.' },
              { n: '02', title: 'Instant Result', desc: 'We check it against our community database and show you a risk score instantly.' },
              { n: '03', title: 'Stay Safe or Report', desc: "If you've been scammed, report it in 30 seconds so others are protected too." },
            ].map(s => (
              <div key={s.n} className={styles.step}>
                <span className={styles.stepNum}>{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCAM TYPES ── */}
      <section className={styles.section} style={{ background: 'var(--white)' }}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Common UPI Scams to Watch Out For</h2>
          <div className={styles.scamGrid}>
            {SCAM_TYPES.map(s => (
              <div key={s.title} className={styles.scamCard}>
                <span className={styles.scamIcon}>{s.icon}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className={styles.ctaBanner}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: 12 }}>Got Scammed? Help Others Stay Safe.</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 24, fontSize: 15 }}>
            Takes 30 seconds. No login. Your report protects thousands.
          </p>
          <Link to="/report" className={styles.ctaWhiteBtn}>Report a Scam Now →</Link>
        </div>
      </section>
    </div>
  )
}
