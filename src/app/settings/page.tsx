'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { useState } from 'react'
import styles from './page.module.scss'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [currency, setCurrency] = useState('USD')
  const [notifications, setNotifications] = useState({
    orders: true,
    customers: true,
    reports: false,
    marketing: false,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <DashboardLayout>
      <div className={styles.page}>

        {/* Two Column Layout */}
        <div className={styles.grid}>

          {/* LEFT — Profile */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Profile</h3>
            <p className={styles.sectionSubtitle}>Your account information</p>

            <div className={styles.card}>
              <div className={styles.profileTop}>
                <div className={styles.profileAvatar}>CA</div>
                <div className={styles.profileMeta}>
                  <span className={styles.profileName}>Can Arda</span>
                  <span className={styles.profilePlan}>Pro Plan</span>
                </div>
              </div>

              <div className={styles.fields}>
                <div className={styles.field}>
                  <label className={styles.label}>Full Name</label>
                  <div className={styles.input}>Can Arda</div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <div className={styles.input}>can@canarda.com</div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Role</label>
                  <div className={styles.input}>Administrator</div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Member Since</label>
                  <div className={styles.input}>January 2023</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Preferences */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Preferences</h3>
            <p className={styles.sectionSubtitle}>Customize your experience</p>

            <div className={styles.card}>

              {/* Currency */}
              <div className={styles.preferenceGroup}>
                <label className={styles.preferenceLabel}>Currency</label>
                <p className={styles.preferenceDesc}>Select your preferred currency</p>
                <select
                  className={styles.select}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="TRY">TRY — Turkish Lira</option>
                </select>
              </div>

              <div className={styles.divider} />

              {/* Notifications */}
              <div className={styles.preferenceGroup}>
                <label className={styles.preferenceLabel}>Notifications</label>
                <p className={styles.preferenceDesc}>Manage your notification preferences</p>

                <div className={styles.toggleList}>
                  {(Object.keys(notifications) as Array<keyof typeof notifications>).map((key) => (
                    <div key={key} className={styles.toggleRow}>
                      <div className={styles.toggleInfo}>
                        <span className={styles.toggleLabel}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        <span className={styles.toggleDesc}>
                          {key === 'orders' && 'Get notified on new orders'}
                          {key === 'customers' && 'Get notified on new customers'}
                          {key === 'reports' && 'Receive weekly reports'}
                          {key === 'marketing' && 'Receive marketing updates'}
                        </span>
                      </div>
                      <button
                        className={`${styles.toggle} ${notifications[key] ? styles.toggleOn : ''}`}
                        onClick={() =>
                          setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
                        }
                      >
                        <span className={styles.toggleThumb} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.divider} />

              {/* Save Button */}
              <button
                className={`${styles.saveBtn} ${saved ? styles.savedBtn : ''}`}
                onClick={handleSave}
              >
                {saved ? '✓ Saved!' : 'Save Preferences'}
              </button>

            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}