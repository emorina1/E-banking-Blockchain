import Link from "next/link";
import styles from "./transactions.module.css";

const transactions = [
  {
    id: "TRX-1048",
    user: "Elsa Morina",
    amount: "€120.00",
    status: "Verified",
  },
  {
    id: "TRX-1047",
    user: "Ardit Krasniqi",
    amount: "€350.00",
    status: "Completed",
  },
  {
    id: "TRX-1046",
    user: "Elsa Morina",
    amount: "€64.50",
    status: "Verified",
  },
];

export default function AdminTransactionsPage() {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBankin</div>
        <span className={styles.adminLabel}>ADMIN PANEL</span>

        <nav>
          <Link href="/admin">Overview</Link>
          <Link href="/admin/users">Users</Link>
          <Link href="/admin/transactions" className={styles.active}>
            Transactions
          </Link>
          <Link href="/">Logout</Link>
        </nav>
      </aside>

      <section className={styles.content}>
        <div className={styles.header}>
          <span>TRANSACTION MONITORING</span>
          <h1>System transactions</h1>
          <p>Monitor financial activity processed through eBankin.</p>
        </div>

        <section className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span>ID</span>
            <span>User</span>
            <span>Amount</span>
            <span>Status</span>
          </div>

          {transactions.map((transaction) => (
            <div className={styles.row} key={transaction.id}>
              <strong>{transaction.id}</strong>
              <span>{transaction.user}</span>
              <span>{transaction.amount}</span>
              <span className={styles.status}>{transaction.status}</span>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}