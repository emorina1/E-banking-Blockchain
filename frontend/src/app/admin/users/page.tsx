import Link from "next/link";
import styles from "./users.module.css";

const users = [
  {
    name: "Elsa Morina",
    email: "elsa@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    name: "Ardit Krasniqi",
    email: "ardit@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    name: "Admin User",
    email: "admin@ebankin.com",
    role: "Admin",
    status: "Active",
  },
];

export default function AdminUsersPage() {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBankin</div>
        <span className={styles.adminLabel}>ADMIN PANEL</span>

        <nav>
          <Link href="/admin">Overview</Link>
          <Link href="/admin/users" className={styles.active}>
            Users
          </Link>
          <Link href="/admin/transactions">Transactions</Link>
          <Link href="/">Logout</Link>
        </nav>
      </aside>

      <section className={styles.content}>
        <div className={styles.header}>
          <div>
            <span>USER MANAGEMENT</span>
            <h1>Registered users</h1>
            <p>View users registered in the eBankin system.</p>
          </div>
        </div>

        <section className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span>User</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
          </div>

          {users.map((user, index) => (
            <div className={styles.row} key={index}>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              <span>{user.role}</span>
              <span className={styles.status}>{user.status}</span>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}