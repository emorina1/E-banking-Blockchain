import Link from "next/link";
import styles from "./accounts.module.css";

export default function AccountsPage() {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBankin</div>

        <nav>
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/accounts" className={styles.active}>
            Accounts
          </Link>
          <Link href="/dashboard/transfer">Transfer</Link>
          <Link href="/dashboard/transactions">Transactions</Link>
          <Link href="/dashboard/notifications">Notifications</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </nav>
      </aside>

      <section className={styles.content}>
        <div className={styles.header}>
          <div>
            <span>My Accounts</span>
            <h1>Your banking accounts</h1>
          </div>

          <Link href="/dashboard/transfer" className={styles.transferButton}>
            Make Transfer
          </Link>
        </div>

        <section className={styles.accountsGrid}>
          <article className={styles.primaryAccount}>
            <div className={styles.accountTop}>
              <div>
                <span>Current Account</span>
                <h2>€12,480.50</h2>
              </div>

              <span className={styles.status}>Active</span>
            </div>

            <div className={styles.details}>
              <div>
                <span>IBAN</span>
                <strong>KS05 1234 5678 9012</strong>
              </div>

              <div>
                <span>Currency</span>
                <strong>EUR</strong>
              </div>
            </div>
          </article>

          <article className={styles.accountCard}>
            <div className={styles.accountTop}>
              <div>
                <span>Savings Account</span>
                <h2>€4,250.00</h2>
              </div>

              <span className={styles.status}>Active</span>
            </div>

            <div className={styles.details}>
              <div>
                <span>IBAN</span>
                <strong>KS05 9876 5432 1098</strong>
              </div>

              <div>
                <span>Currency</span>
                <strong>EUR</strong>
              </div>
            </div>
          </article>
        </section>

        <section className={styles.infoBox}>
          <div>
            <span>Total balance</span>
            <strong>€16,730.50</strong>
          </div>

          <p>
            Your total balance combines funds from all active eBankin accounts.
          </p>
        </section>
      </section>
    </main>
  );
}