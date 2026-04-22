import { orders } from '@/data/mockData'
import styles from './RecentOrders.module.scss'
import type { Order } from '@/types'

const statusConfig: Record<Order['status'], { label: string; className: string }> = {
  pending:    { label: 'Pending',    className: 'pending' },
  processing: { label: 'Processing', className: 'processing' },
  shipped:    { label: 'Shipped',    className: 'shipped' },
  delivered:  { label: 'Delivered', className: 'delivered' },
  cancelled:  { label: 'Cancelled', className: 'cancelled' },
}

export default function RecentOrders() {
  const recent = orders.slice(0, 6)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Recent Orders</h3>
          <p className={styles.subtitle}>Latest 6 transactions</p>
        </div>
        <button className={styles.viewAll}>View all →</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((order) => {
              const status = statusConfig[order.status]
              return (
                <tr key={order.id} className={styles.row}>
                  <td>
                    <span className={styles.orderId}>{order.id}</span>
                  </td>
                  <td>
                    <div className={styles.customer}>
                      <span className={styles.avatar}>
                        {order.customer.avatar}
                      </span>
                      <span className={styles.customerName}>
                        {order.customer.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.total}>
                      ${order.total.toFixed(2)}
                    </span>
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
                      })}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}