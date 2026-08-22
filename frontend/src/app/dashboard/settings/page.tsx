import Link from "next/link";
import styles from "./settings.module.css";

export default function SettingsPage() {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBankin</div>

        <nav>
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/accounts">Accounts</Link>
          <Link href="/dashboard/transfer">Transfer</Link>
          <Link href="/dashboard/transactions">Transactions</Link>
          <Link href="/dashboard/notifications">Notifications</Link>

          <Link href="/dashboard/settings" className={styles.active}>
            Settings
          </Link>
        </nav>
      </aside>

      <section className={styles.content}>
        <div className={styles.header}>
          <span>SETTINGS</span>
          <h1>Account settings</h1>
          <p>
            Manage your personal information and security preferences.
          </p>
        </div>

        <section className={styles.grid}>
          <div className={styles.card}>
            <h2>Personal Information</h2>

            <div className={styles.field}>
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" defaultValue="Elsa Morina" />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                defaultValue="elsa@example.com"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="text"
                defaultValue="+383 44 000 000"
              />
            </div>

            <button type="button">Save Changes</button>
          </div>

          <div className={styles.card}>
            <h2>Security</h2>

            <div className={styles.field}>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                type="password"
                placeholder="Current password"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                placeholder="New password"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
              />
            </div>

            <button type="button">Change Password</button>
          </div>
        </section>
      </section>
    </main>
  );
}