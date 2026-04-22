import DashboardLayout from '@/components/layout/DashboardLayout'
import { customers } from '@/data/mockData'
import styles from './page.module.scss'

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className={styles.page}>

        {/* Summary Cards */}
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Total Customers</span>
            <span className={styles.summaryValue}>3,842</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Active</span>
            <span className={`${styles.summaryValue} ${styles.success}`}>3,104</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Inactive</span>
            <span className={`${styles.summaryValue} ${styles.danger}`}>738</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Avg. Spent</span>
            <span className={styles.summaryValue}>$2,384</span>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <div className={styles.filters}>
            <button className={`${styles.filterBtn} ${styles.filterActive}`}>All</button>
            <button className={styles.filterBtn}>Active</button>
            <button className={styles.filterBtn}>Inactive</button>
          </div>
          <button className={styles.exportBtn}>↓ Export</button>
        </div>

        {/* Customers Grid */}
        <div className={styles.grid}>
          {customers.map((customer, index) => (
            <div
              key={customer.id}
              className={styles.customerCard}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className={styles.cardTop}>
                <div className={styles.avatar}>{customer.avatar}</div>
                <span className={`${styles.statusBadge} ${styles[customer.status]}`}>
                  {customer.status}
                </span>
              </div>

              <div className={styles.customerInfo}>
                <h4 className={styles.customerName}>{customer.name}</h4>
                <p className={styles.customerEmail}>{customer.email}</p>
                <p className={styles.customerLocation}>📍 {customer.location}</p>
              </div>

              <div className={styles.divider} />

              <div className={styles.statsRow}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{customer.totalOrders}</span>
                  <span className={styles.statLabel}>Orders</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <span className={styles.statValue}>
                    ${customer.totalSpent.toLocaleString()}
                  </span>
                  <span className={styles.statLabel}>Spent</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <span className={styles.statValue}>
                    {new Date(customer.joinedAt).getFullYear()}
                  </span>
                  <span className={styles.statLabel}>Joined</span>
                </div>
              </div>

              <button className={styles.viewBtn}>View Profile →</button>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  )
}