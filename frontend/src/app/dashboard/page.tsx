import Link from "next/link";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBankin</div>

        <nav>
          <Link href="/dashboard" className={styles.active}>
            Overview
          </Link>

          <Link href="/dashboard/accounts">Accounts</Link>

          <Link href="/dashboard/transfer">Transfer</Link>

          <Link href="/dashboard/transactions">Transactions</Link>

          <Link href="/dashboard/notifications">Notifications</Link>

          <Link href="/dashboard/settings">Settings</Link>
        </nav>
      </aside>

      <section className={styles.content}>
        <div className={styles.topbar}>
          <div>
            <span>Welcome back,</span>
            <h1>Elsa Morina</h1>
          </div>

          <div className={styles.avatar}>EM</div>
        </div>

        <section className={styles.cards}>
          <div className={styles.balanceCard}>
            <span>Total Balance</span>
            <h2>€12,480.50</h2>
            <p>+8.4% this month</p>
          </div>

          <div className={styles.statCard}>
            <span>Income</span>
            <h3>€2,450</h3>
          </div>

          <div className={styles.statCard}>
            <span>Expenses</span>
            <h3>€1,280</h3>
          </div>
        </section>

        <section className={styles.transactions}>
          <div className={styles.sectionTitle}>
            <h2>Recent Transactions</h2>

            <Link href="/dashboard/transactions">
              View all
            </Link>
          </div>

          <div className={styles.transaction}>
            <div>
              <strong>Salary Received</strong>
              <span>22 Aug 2026</span>
            </div>

            <strong className={styles.income}>
              +€2,450
            </strong>
          </div>

          <div className={styles.transaction}>
            <div>
              <strong>Netflix</strong>
              <span>21 Aug 2026</span>
            </div>

            <strong className={styles.expense}>
              -€12.99
            </strong>
          </div>

          <div className={styles.transaction}>
            <div>
              <strong>Money Transfer</strong>
              <span>20 Aug 2026</span>
            </div>

            <strong className={styles.expense}>
              -€120
            </strong>
          </div>
        </section>
      </section>
    </main>
  );
}