import Link from "next/link";
import styles from "./transfer.module.css";

export default function TransferPage() {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBankin</div>

        <nav>
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/accounts">Accounts</Link>
          <Link href="/dashboard/transfer" className={styles.active}>
            Transfer
          </Link>
          <Link href="/dashboard/transactions">Transactions</Link>
          <Link href="/dashboard/notifications">Notifications</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </nav>
      </aside>

      <section className={styles.content}>
        <div className={styles.header}>
          <span>Money Transfer</span>
          <h1>Send money securely</h1>
          <p>
            Transfer funds between accounts through a simple and secure process.
          </p>
        </div>

        <section className={styles.transferCard}>
          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="fromAccount">From Account</label>

              <select id="fromAccount">
                <option>Current Account - €12,480.50</option>
                <option>Savings Account - €4,250.00</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="recipient">Recipient IBAN</label>

              <input
                id="recipient"
                type="text"
                placeholder="KS05 1234 5678 9012"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="recipientName">Recipient Name</label>

              <input
                id="recipientName"
                type="text"
                placeholder="Recipient full name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="amount">Amount</label>

              <div className={styles.amountInput}>
                <span>€</span>

                <input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="description">Description</label>

              <input
                id="description"
                type="text"
                placeholder="Optional payment description"
              />
            </div>

            <button type="submit">
              Continue Transfer
            </button>
          </form>

          <aside className={styles.summary}>
            <span>Transfer Summary</span>

            <div>
              <p>Available Balance</p>
              <strong>€12,480.50</strong>
            </div>

            <div>
              <p>Transfer Fee</p>
              <strong>€0.00</strong>
            </div>

            <div className={styles.security}>
              <span>✓</span>

              <p>
                Your transaction will be securely processed and verified.
              </p>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}