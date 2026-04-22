'use client'

import { usePathname } from 'next/navigation'
import styles from './Header.module.scss'

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard',  subtitle: 'Welcome back, Can' },
  '/products':  { title: 'Products',   subtitle: 'Manage your inventory' },
  '/orders':    { title: 'Orders',     subtitle: 'Track and manage orders' },
  '/customers': { title: 'Customers',  subtitle: 'Your customer base' },
  '/settings':  { title: 'Settings',   subtitle: 'Account preferences' },
}

export default function Header() {
  const pathname = usePathname()
  const current = Object.entries(pageTitles).find(([key]) =>
    pathname.startsWith(key)
  )
  const { title, subtitle } = current?.[1] ?? { title: 'Dashboard', subtitle: '' }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.right}>
        {/* Search */}
        <div className={styles.search}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
          />
          <span className={styles.searchShortcut}>⌘K</span>
        </div>

        {/* Notifications */}
        <button className={styles.iconBtn}>
          <span>🔔</span>
          <span className={styles.badge}>3</span>
        </button>

        {/* Date */}
        <div className={styles.date}>
          <span className={styles.dateText}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month:   'short',
              day:     'numeric',
            })}
          </span>
        </div>
      </div>
    </header>
  )
}