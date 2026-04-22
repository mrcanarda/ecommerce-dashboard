import DashboardLayout from '@/components/layout/DashboardLayout'
import KPICard from '@/components/ui/KPICard'
import RevenueChart from '@/components/charts/RevenueChart'
import CategoryChart from '@/components/charts/CategoryChart'
import RecentOrders from '@/components/ui/RecentOrders'
import { kpiData } from '@/data/mockData'
import styles from './page.module.scss'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className={styles.page}>

        {/* KPI Cards */}
        <div className={styles.kpiGrid}>
          {kpiData.map((kpi, index) => (
            <KPICard
              key={kpi.title}
              data={kpi}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className={styles.chartsGrid}>
          <div className={styles.revenueChart}>
            <RevenueChart />
          </div>
          <div className={styles.categoryChart}>
            <CategoryChart />
          </div>
        </div>

        {/* Recent Orders */}
        <div className={styles.ordersRow}>
          <RecentOrders />
        </div>

      </div>
    </DashboardLayout>
  )
}