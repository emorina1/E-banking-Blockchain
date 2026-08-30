"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./users.module.css";

type User = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  phone?: string | null;
  created_at: string;
};

export default function AdminUsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        router.push("/login");
        return;
      }

      try {
        const currentUser = JSON.parse(storedUser);

        if (currentUser.role !== "admin") {
          router.push("/dashboard");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }

        if (!response.ok) {
          setMessage(data.message || "Could not load users");
          return;
        }

        setUsers(data.users || []);
      } catch (error) {
        setMessage("Could not connect to the server");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBanking</div>

        <span className={styles.adminLabel}>
          ADMIN PANEL
        </span>

        <nav>
          <Link href="/admin">
            Overview
          </Link>

          <Link
            href="/admin/users"
            className={styles.active}
          >
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
        <div className={styles.header}>
          <div>
            <span>USER MANAGEMENT</span>

            <h1>Registered users</h1>

            <p>
              View users registered in the eBanking system.
            </p>
          </div>
        </div>

        <section className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span>User</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
          </div>

          {loading && (
            <div className={styles.row}>
              <span>Loading users...</span>
            </div>
          )}

          {!loading && message && (
            <div className={styles.row}>
              <span>{message}</span>
            </div>
          )}

          {!loading &&
            !message &&
            users.length === 0 && (
              <div className={styles.row}>
                <span>No users found.</span>
              </div>
            )}

          {!loading &&
            !message &&
            users.map((user) => (
              <div
                className={styles.row}
                key={user.id}
              >
                <strong>
                  {user.full_name}
                </strong>

                <span>
                  {user.email}
                </span>

                <span>
                  {user.role === "admin"
                    ? "Admin"
                    : "Customer"}
                </span>

                <span className={styles.status}>
                  Active
                </span>
              </div>
            ))}
        </section>
      </section>
    </main>
  );
}