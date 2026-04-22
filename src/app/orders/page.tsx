import DashboardLayout from '@/components/layout/DashboardLayout'
import { orders } from '@/data/mockData'
import styles from './page.module.scss'
import type { Order } from '@/types'

const statusConfig: Record<Order['status'], { label: string; className: string }> = {
  pending:    { label: 'Pending',    className: 'pending' },
  processing: { label: 'Processing', className: 'processing' },
  shipped:    { label: 'Shipped',    className: 'shipped' },
  delivered:  { label: 'Delivered', className: 'delivered' },
  cancelled:  { label: 'Cancelled', className: 'cancelled' },
}

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className={styles.page}>

        {/* Summary Cards */}
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Total Orders</span>
            <span className={styles.summaryValue}>1,429</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Pending</span>
            <span className={`${styles.summaryValue} ${styles.warning}`}>48</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Processing</span>
            <span className={`${styles.summaryValue} ${styles.info}`}>124</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Delivered</span>
            <span className={`${styles.summaryValue} ${styles.success}`}>1,187</span>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.actions}>
          <div className={styles.filters}>
            <button className={`${styles.filterBtn} ${styles.filterActive}`}>All</button>
            <button className={styles.filterBtn}>Pending</button>
            <button className={styles.filterBtn}>Processing</button>
            <button className={styles.filterBtn}>Shipped</button>
            <button className={styles.filterBtn}>Delivered</button>
            <button className={styles.filterBtn}>Cancelled</button>
          </div>
          <button className={styles.exportBtn}>↓ Export</button>
        </div>

        {/* Orders Table */}
        <div className={styles.card}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const status = statusConfig[order.status]
                  return (
                    <tr
                      key={order.id}
                      className={styles.row}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td>
                        <span className={styles.orderId}>{order.id}</span>
                      </td>
                      <td>
                        <div className={styles.customer}>
                          <span className={styles.avatar}>{order.customer.avatar}</span>
                          <div className={styles.customerInfo}>
                            <span className={styles.customerName}>{order.customer.name}</span>
                            <span className={styles.customerLocation}>{order.customer.location}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={styles.productCount}>
                          {order.products.length} item{order.products.length > 1 ? 's' : ''}
                        </span>
                      </td>
                      <td>
                        <span className={styles.total}>${order.total.toFixed(2)}</span>
                      </td>
                      <td>
                        <span className={`${styles.badge} ${styles[status.className]}`}>
                          {status.label}
                        </span>
                      </td>
                      <td>
                        <span className={styles.date}>
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td>
                        <div className={styles.rowActions}>
                          <button className={styles.actionBtn}>View</button>
                          <button className={styles.actionBtn}>Update</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}