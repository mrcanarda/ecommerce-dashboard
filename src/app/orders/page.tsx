'use client'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { ordersApi } from '@/api/orders'
import { orders as fallbackOrders } from '@/data/mockData'
import styles from './page.module.scss'
import type { Order } from '@/types'

type StatusFilter = 'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

const statusConfig: Record<string, { label: string; className: string }> = {
  pending:    { label: 'Pending',    className: 'pending' },
  processing: { label: 'Processing', className: 'processing' },
  shipped:    { label: 'Shipped',    className: 'shipped' },
  delivered:  { label: 'Delivered',  className: 'delivered' },
  cancelled:  { label: 'Cancelled',  className: 'cancelled' },
}

export default function OrdersPage() {
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [allOrders, setAllOrders] = useState<Order[]>(fallbackOrders)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const data = await ordersApi.getAll({
          status: filter === 'all' ? undefined : filter,
          limit: 50,
        })
        setAllOrders(data.data)
        setTotal(data.total)
      } catch {
        // fallback mock data
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [filter])

  return (
    <DashboardLayout>
      <div className={styles.page}>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Total Orders</span>
            <span className={styles.summaryValue}>{total || 1429}</span>
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

        <div className={styles.actions}>
          <div className={styles.filters}>
            {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as StatusFilter[]).map((f) => (
              <button
                key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button className={styles.exportBtn}>↓ Export</button>
        </div>

        <div className={styles.card}>
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
              Loading...
            </div>
          ) : (
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
                  {allOrders.map((order, index) => {
                    const status = statusConfig[order.status]
                    return (
                      <tr key={order.id} className={styles.row} style={{ animationDelay: `${index * 50}ms` }}>
                        <td><span className={styles.orderId}>{order.id}</span></td>
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
                        <td><span className={styles.total}>${order.total.toFixed(2)}</span></td>
                        <td>
                          <span className={`${styles.badge} ${styles[status.className]}`}>
                            {status.label}
                          </span>
                        </td>
                        <td>
                          <span className={styles.date}>
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric',
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
          )}
        </div>

      </div>
    </DashboardLayout>
  )
}