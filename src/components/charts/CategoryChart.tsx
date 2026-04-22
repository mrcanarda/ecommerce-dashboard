'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { categoryData } from '@/data/mockData'
import styles from './CategoryChart.module.scss'

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <span className={styles.tooltipLabel}>{payload[0].name}</span>
        <span className={styles.tooltipValue}>{payload[0].value}%</span>
      </div>
    )
  }
  return null
}

export default function CategoryChart() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Sales by Category</h3>
        <p className={styles.subtitle}>Current period breakdown</p>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              animationDuration={1000}
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legend}>
        {categoryData.map((item) => (
          <div key={item.name} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ background: item.color }}
            />
            <span className={styles.legendName}>{item.name}</span>
            <span className={styles.legendValue}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}