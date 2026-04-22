'use client'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import KPICard from '@/components/ui/KPICard'
import RevenueChart from '@/components/charts/RevenueChart'
import CategoryChart from '@/components/charts/CategoryChart'
import RecentOrders from '@/components/ui/RecentOrders'
import { dashboardApi } from '@/api/dashboard'
import { kpiData as fallbackKpi } from '@/data/mockData'
import styles from './page.module.scss'
import type { KPIData } from '@/types'

export default function DashboardPage() {
  const [kpis, setKpis] = useState<KPIData[]>(fallbackKpi)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await dashboardApi.getSummary()
        setKpis([
          {
            title: 'Total Revenue',
            value: `$${data.totalRevenue.toLocaleString()}`,
            change: data.revenueChange,
            changeLabel: 'vs last month',
            icon: '💰',
          },
          {
            title: 'Total Orders',
            value: data.totalOrders.toLocaleString(),
            change: data.ordersChange,
            changeLabel: 'vs last month',
            icon: '📦',
          },
          {
            title: 'Total Customers',
            value: data.totalCustomers.toLocaleString(),
            change: data.customersChange,
            changeLabel: 'vs last month',
            icon: '👥',
          },
          {
            title: 'Avg Order Value',
            value: `$${data.avgOrderValue.toFixed(2)}`,
            change: data.avgOrderChange,
            changeLabel: 'vs last month',
            icon: '📊',
          },
        ])
      } catch {
        // fallback mock data kullan
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [])

  return (
    <DashboardLayout>
      <div className={styles.page}>
        <div className={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <KPICard key={kpi.title} data={kpi} delay={index * 100} />
          ))}
        </div>

        <div className={styles.chartsGrid}>
          <div className={styles.revenueChart}>
            <RevenueChart />
          </div>
          <div className={styles.categoryChart}>
            <CategoryChart />
          </div>
        </div>

        <div className={styles.ordersRow}>
          <RecentOrders />
        </div>
      </div>
    </DashboardLayout>
  )
}