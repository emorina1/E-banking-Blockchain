import Link from "next/link";
import styles from "./admin.module.css";

export default function AdminDashboard() {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBankin</div>

        <span className={styles.adminLabel}>ADMIN PANEL</span>

        <nav>
          <Link href="/admin" className={styles.active}>
            Overview
          </Link>

          <Link href="/admin/users">
            Users
          </Link>

          <Link href="/admin/transactions">
            Transactions
          </Link>

          <Link href="/">
            Logout
          </Link>
        </nav>
      </aside>

      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <span>Welcome back</span>
            <h1>Admin Dashboard</h1>
          </div>

          <div className={styles.avatar}>AD</div>
        </header>

        <section className={styles.stats}>
          <article className={styles.mainCard}>
            <span>Total Users</span>
            <h2>248</h2>
            <p>Registered users</p>
          </article>

          <article className={styles.card}>
            <span>Transactions</span>
            <h2>1,284</h2>
            <p>Total transactions</p>
          </article>

          <article className={styles.card}>
            <span>Transaction Volume</span>
            <h2>€84,520</h2>
            <p>Total processed</p>
          </article>
        </section>

        <section className={styles.activity}>
          <div className={styles.activityHeader}>
            <h2>Recent Activity</h2>

            <Link href="/admin/transactions">
              View all
            </Link>
          </div>

          <div className={styles.row}>
            <div>
              <strong>New user registered</strong>
              <span>elsa@example.com</span>
            </div>

            <span>Today</span>
          </div>

          <div className={styles.row}>
            <div>
              <strong>Transfer completed</strong>
              <span>Transaction #TRX-1048</span>
            </div>

            <span>Today</span>
          </div>

          <div className={styles.row}>
            <div>
              <strong>Transaction verified</strong>
              <span>Blockchain verification successful</span>
            </div>

            <span>Yesterday</span>
          </div>
        </section>
      </section>
    </main>
  );
}