import Link from "next/link";
import styles from "./transactions.module.css";

const transactions = [
  {
    title: "Salary Received",
    date: "22 Aug 2026",
    amount: "+€2,450.00",
    type: "income",
    status: "Verified",
  },
  {
    title: "Netflix",
    date: "21 Aug 2026",
    amount: "-€12.99",
    type: "expense",
    status: "Completed",
  },
  {
    title: "Money Transfer",
    date: "20 Aug 2026",
    amount: "-€120.00",
    type: "expense",
    status: "Verified",
  },
  {
    title: "Online Purchase",
    date: "19 Aug 2026",
    amount: "-€64.50",
    type: "expense",
    status: "Completed",
  },
];

export default function TransactionsPage() {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBankin</div>

        <nav>
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/accounts">Accounts</Link>
          <Link href="/dashboard/transfer">Transfer</Link>

          <Link href="/dashboard/transactions" className={styles.active}>
            Transactions
          </Link>

          <Link href="/dashboard/notifications">Notifications</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </nav>
      </aside>

      <section className={styles.content}>
        <div className={styles.header}>
          <div>
            <span>TRANSACTION HISTORY</span>
            <h1>Your transactions</h1>
            <p>
              Review your latest payments, transfers and verified financial
              activity.
            </p>
          </div>

          <Link href="/dashboard/transfer" className={styles.transferButton}>
            New Transfer
          </Link>
        </div>

        <section className={styles.summary}>
          <div>
            <span>Total Income</span>
            <strong>€2,450.00</strong>
          </div>

          <div>
            <span>Total Expenses</span>
            <strong>€197.49</strong>
          </div>

          <div>
            <span>Transactions</span>
            <strong>4</strong>
          </div>
        </section>

        <section className={styles.transactionCard}>
          <div className={styles.tableHeader}>
            <span>Transaction</span>
            <span>Date</span>
            <span>Status</span>
            <span>Amount</span>
          </div>

          {transactions.map((transaction, index) => (
            <div className={styles.transactionRow} key={index}>
              <div>
                <div className={styles.icon}>
                  {transaction.type === "income" ? "↓" : "↑"}
                </div>

                <strong>{transaction.title}</strong>
              </div>

              <span>{transaction.date}</span>

              <span className={styles.status}>
                {transaction.status}
              </span>

              <strong
                className={
                  transaction.type === "income"
                    ? styles.income
                    : styles.expense
                }
              >
                {transaction.amount}
              </strong>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}