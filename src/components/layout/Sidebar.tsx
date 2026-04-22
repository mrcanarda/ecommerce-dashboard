'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.scss'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '▦' },
  { href: '/products',  label: 'Products',  icon: '◈' },
  { href: '/orders',    label: 'Orders',    icon: '◎' },
  { href: '/customers', label: 'Customers', icon: '◉' },
  { href: '/settings',  label: 'Settings',  icon: '◌' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <span className={styles.logoMark}>⬡</span>
        <span className={styles.logoText}>Orion</span>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <span className={styles.navLabel}>Main Menu</span>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navItem} ${
                  pathname.startsWith(item.href) ? styles.active : ''
                }`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navText}>{item.label}</span>
                {pathname.startsWith(item.href) && (
                  <span className={styles.activeDot} />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom */}
      <div className={styles.bottom}>
        <div className={styles.userCard}>
          <div className={styles.userAvatar}>CA</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Can Arda</span>
            <span className={styles.userRole}>Admin</span>
          </div>
        </div>
      </div>
    </aside>
  )
}