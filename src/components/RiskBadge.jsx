import styles from './RiskBadge.module.css'

// level: 'danger' | 'warning' | 'safe' | 'unknown'
export default function RiskBadge({ level, count = 0 }) {
  const config = {
    danger:  { label: '🚨 HIGH RISK',    desc: `Reported ${count} time${count !== 1 ? 's' : ''}`, cls: styles.danger },
    warning: { label: '⚠️ SUSPICIOUS',   desc: `Reported ${count} time${count !== 1 ? 's' : ''}`, cls: styles.warning },
    safe:    { label: '✅ NOT REPORTED',  desc: 'No reports found in our database', cls: styles.safe },
    unknown: { label: '❓ UNKNOWN',       desc: 'Could not determine status', cls: styles.unknown },
  }

  const c = config[level] || config.unknown

  return (
    <div className={`${styles.badge} ${c.cls}`}>
      <span className={styles.label}>{c.label}</span>
      <span className={styles.desc}>{c.desc}</span>
    </div>
  )
}
