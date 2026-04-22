import styles from './KPICard.module.scss'
import type { KPIData } from '@/types'

interface Props {
  data: KPIData
  delay?: number
}

export default function KPICard({ data, delay = 0 }: Props) {
  const isPositive = data.change >= 0

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={styles.top}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.icon}>{data.icon}</span>
      </div>

      <div className={styles.value}>{data.value}</div>

      <div className={styles.bottom}>
        <span className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(data.change)}%
        </span>
        <span className={styles.changeLabel}>{data.changeLabel}</span>
      </div>
    </div>
  )
}