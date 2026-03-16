import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.brand}>🛡️ UPI<strong>Guard</strong></span>
          <p>Community-powered fraud protection for every Indian.</p>
        </div>
        <div className={styles.links}>
          <Link to="/check">Check UPI</Link>
          <Link to="/report">Report Scam</Link>
          <Link to="/feed">Recent Reports</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>Built to protect people. Not affiliated with NPCI or any bank. Data is community-reported.</p>
      </div>
    </footer>
  )
}
