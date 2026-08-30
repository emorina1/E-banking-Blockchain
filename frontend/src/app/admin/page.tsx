"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

type AdminUser = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  phone?: string | null;
  created_at: string;
};

type AdminTransaction = {
  id: number;
  sender_account_id: number;
  receiver_account_id?: number | null;
  recipient_iban: string;
  amount: string | number;
  description?: string | null;
  status: string;
  transaction_hash?: string | null;
  created_at: string;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminDashboard = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        router.push("/login");
        return;
      }

      try {
        const user = JSON.parse(storedUser);

        if (user.role !== "admin") {
          router.push("/dashboard");
          return;
        }

        const [usersResponse, transactionsResponse] = await Promise.all([
          fetch("http://localhost:5000/api/admin/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          fetch("http://localhost:5000/api/admin/transactions", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (
          usersResponse.status === 401 ||
          usersResponse.status === 403 ||
          transactionsResponse.status === 401 ||
          transactionsResponse.status === 403
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }

        const usersData = await usersResponse.json();
        const transactionsData = await transactionsResponse.json();

        if (usersResponse.ok) {
          setUsers(usersData.users || []);
        }

        if (transactionsResponse.ok) {
          setTransactions(transactionsData.transactions || []);
        }
      } catch (error) {
        console.error("Admin dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAdminDashboard();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const totalVolume = useMemo(() => {
    return transactions.reduce(
      (total, transaction) => total + Number(transaction.amount),
      0
    );
  }, [transactions]);

  const recentActivity = useMemo(() => {
    const userActivities = users.map((user) => ({
      type: "user",
      id: `user-${user.id}`,
      title: "New user registered",
      subtitle: user.email,
      date: user.created_at,
    }));

    const transactionActivities = transactions.map((transaction) => ({
      type: "transaction",
      id: `transaction-${transaction.id}`,
      title: "Transfer completed",
      subtitle: `Transaction #TRX-${transaction.id}`,
      date: transaction.created_at,
    }));

    return [...userActivities, ...transactionActivities]
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 3);
  }, [users, transactions]);

  const formatMoney = (amount: number) => {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatActivityDate = (date: string) => {
    const activityDate = new Date(date);
    const today = new Date();

    const isToday =
      activityDate.getDate() === today.getDate() &&
      activityDate.getMonth() === today.getMonth() &&
      activityDate.getFullYear() === today.getFullYear();

    if (isToday) {
      return "Today";
    }

    return activityDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBanking</div>

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

          <button
            type="button"
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </button>
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

            <h2>{loading ? "..." : users.length}</h2>

            <p>Registered users</p>
          </article>

          <article className={styles.card}>
            <span>Transactions</span>

            <h2>{loading ? "..." : transactions.length}</h2>

            <p>Total transactions</p>
          </article>

          <article className={styles.card}>
            <span>Transaction Volume</span>

            <h2>
              {loading ? "..." : `€${formatMoney(totalVolume)}`}
            </h2>

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

          {loading && <p>Loading activity...</p>}

          {!loading && recentActivity.length === 0 && (
            <p>No recent activity.</p>
          )}

          {!loading &&
            recentActivity.map((activity) => (
              <div key={activity.id} className={styles.row}>
                <div>
                  <strong>{activity.title}</strong>
                  <span>{activity.subtitle}</span>
                </div>

                <span>{formatActivityDate(activity.date)}</span>
              </div>
            ))}
        </section>
      </section>
    </main>
  );
}