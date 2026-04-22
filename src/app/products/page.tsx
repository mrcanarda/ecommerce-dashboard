'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { products } from '@/data/mockData'
import { useState } from 'react'
import styles from './page.module.scss'

type FilterType = 'all' | 'active' | 'draft' | 'archived'

const statusConfig = {
  active:   { label: 'Active',   className: 'active' },
  draft:    { label: 'Draft',    className: 'draft' },
  archived: { label: 'Archived', className: 'archived' },
}

export default function ProductsPage() {
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = products.filter((p) =>
    filter === 'all' ? true : p.status === filter
  )

  return (
    <DashboardLayout>
      <div className={styles.page}>

        <div className={styles.actions}>
          <div className={styles.filters}>
            {(['all', 'active', 'draft', 'archived'] as FilterType[]).map((f) => (
              <button
                key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button className={styles.addBtn}>+ Add Product</button>
        </div>

        <div className={styles.card}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Sales</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, index) => {
                  const status = statusConfig[product.status]
                  return (
                    <tr key={product.id} className={styles.row} style={{ animationDelay: `${index * 50}ms` }}>
                      <td>
                        <div className={styles.productCell}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className={styles.productIcon}
                          />
                          <div className={styles.productInfo}>
                            <span className={styles.productName}>{product.name}</span>
                            <span className={styles.productId}>{product.id}</span>
                          </div>
                        </div>
                      </td>
                      <td><span className={styles.category}>{product.category}</span></td>
                      <td><span className={styles.price}>${product.price.toFixed(2)}</span></td>
                      <td>
                        <span className={`${styles.stock} ${product.stock === 0 ? styles.outOfStock : product.stock < 20 ? styles.lowStock : ''}`}>
                          {product.stock === 0 ? 'Out of stock' : product.stock}
                        </span>
                      </td>
                      <td><span className={styles.sales}>{product.sales}</span></td>
                      <td>
                        <span className={`${styles.badge} ${styles[status.className]}`}>
                          {status.label}
                        </span>
                      </td>
                      <td>
                        <div className={styles.rowActions}>
                          <button className={styles.actionBtn}>Edit</button>
                          <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>Delete</button>
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