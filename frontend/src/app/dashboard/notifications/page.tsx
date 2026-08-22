import Link from "next/link";
import styles from "./notifications.module.css";

const notifications = [
  {
    title: "Transfer completed",
    message: "Your transfer of €120.00 was completed successfully.",
    time: "10 minutes ago",
    type: "success",
  },
  {
    title: "Blockchain verification",
    message: "Transaction 8F2A...91BC was successfully verified.",
    time: "1 hour ago",
    type: "security",
  },
  {
    title: "New login detected",
    message: "A new login was detected on your eBankin account.",
    time: "Yesterday",
    type: "warning",
  },
  {
    title: "Salary received",
    message: "You received €2,450.00 in your current account.",
    time: "22 Aug 2026",
    type: "success",
  },
];

export default function NotificationsPage() {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBankin</div>

        <nav>
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/accounts">Accounts</Link>
          <Link href="/dashboard/transfer">Transfer</Link>
          <Link href="/dashboard/transactions">Transactions</Link>

          <Link
            href="/dashboard/notifications"
            className={styles.active}
          >
            Notifications
          </Link>

          <Link href="/dashboard/settings">Settings</Link>
        </nav>
      </aside>

      <section className={styles.content}>
        <div className={styles.header}>
          <span>NOTIFICATIONS</span>
          <h1>Account activity</h1>

          <p>
            Stay informed about important transactions and security activity.
          </p>
        </div>

        <section className={styles.notificationList}>
          {notifications.map((notification, index) => (
            <article className={styles.notification} key={index}>
              <div
                className={`${styles.icon} ${
                  notification.type === "warning"
                    ? styles.warning
                    : notification.type === "security"
                    ? styles.security
                    : styles.success
                }`}
              >
                {notification.type === "warning"
                  ? "!"
                  : notification.type === "security"
                  ? "◆"
                  : "✓"}
              </div>

              <div className={styles.notificationContent}>
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
                <span>{notification.time}</span>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}