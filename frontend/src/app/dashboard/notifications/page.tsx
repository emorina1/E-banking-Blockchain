"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./notifications.module.css";

type Notification = {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function NotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadNotifications = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }

        if (!response.ok) {
          setMessage(data.message || "Could not load notifications");
          return;
        }

        setNotifications(data.notifications || []);
      } catch (error) {
        setMessage("Could not connect to the server");
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [router]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getNotificationType = (title: string) => {
    const lowerTitle = title.toLowerCase();

    if (
      lowerTitle.includes("received") ||
      lowerTitle.includes("completed")
    ) {
      return "success";
    }

    if (
      lowerTitle.includes("security") ||
      lowerTitle.includes("verification")
    ) {
      return "security";
    }

    return "warning";
  };

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBanking</div>

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
            Stay informed about important transactions and account activity.
          </p>
        </div>

        <section className={styles.notificationList}>
          {loading && <p>Loading notifications...</p>}

          {!loading && message && <p>{message}</p>}

          {!loading &&
            !message &&
            notifications.length === 0 && (
              <p>No notifications yet.</p>
            )}

          {!loading &&
            !message &&
            notifications.map((notification) => {
              const type = getNotificationType(notification.title);

              return (
                <article
                  className={styles.notification}
                  key={notification.id}
                >
                  <div
                    className={`${styles.icon} ${
                      type === "warning"
                        ? styles.warning
                        : type === "security"
                        ? styles.security
                        : styles.success
                    }`}
                  >
                    {type === "warning"
                      ? "!"
                      : type === "security"
                      ? "◆"
                      : "✓"}
                  </div>

                  <div className={styles.notificationContent}>
                    <strong>{notification.title}</strong>

                    <p>{notification.message}</p>

                    <span>
                      {formatDate(notification.created_at)}
                    </span>
                  </div>
                </article>
              );
            })}
        </section>
      </section>
    </main>
  );
}