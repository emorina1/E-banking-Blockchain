"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./transactions.module.css";

type Transaction = {
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

type VerificationResult = {
  valid: boolean;
  message: string;
};

export default function AdminTransactionsPage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [verifications, setVerifications] = useState<
    Record<number, VerificationResult>
  >({});

  const [verifyingId, setVerifyingId] = useState<number | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
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
          "http://localhost:5000/api/admin/transactions",
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
          setMessage(data.message || "Could not load transactions");
          return;
        }

        setTransactions(data.transactions || []);
      } catch (error) {
        setMessage("Could not connect to the server");
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [router]);

  const verifyTransaction = async (transactionId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      setVerifyingId(transactionId);

      const response = await fetch(
        `http://localhost:5000/api/transactions/verify/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setVerifications((prev) => ({
          ...prev,
          [transactionId]: {
            valid: false,
            message: data.message || "Verification failed",
          },
        }));

        return;
      }

      setVerifications((prev) => ({
        ...prev,
        [transactionId]: {
          valid: data.valid,
          message: data.message,
        },
      }));
    } catch (error) {
      setVerifications((prev) => ({
        ...prev,
        [transactionId]: {
          valid: false,
          message: "Could not verify transaction",
        },
      }));
    } finally {
      setVerifyingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const formatMoney = (amount: string | number) => {
    return Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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

          <Link href="/admin/users">
            Users
          </Link>

          <Link
            href="/admin/transactions"
            className={styles.active}
          >
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
          <span>TRANSACTION MONITORING</span>

          <h1>System transactions</h1>

          <p>
            Monitor and verify financial transactions using SHA-256
            integrity verification.
          </p>
        </div>

        <section className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span>ID</span>
            <span>Recipient IBAN</span>
            <span>Amount</span>
            <span>Verification</span>
          </div>

          {loading && (
            <div className={styles.row}>
              <span>Loading transactions...</span>
            </div>
          )}

          {!loading && message && (
            <div className={styles.row}>
              <span>{message}</span>
            </div>
          )}

          {!loading &&
            !message &&
            transactions.length === 0 && (
              <div className={styles.row}>
                <span>No transactions found.</span>
              </div>
            )}

          {!loading &&
            !message &&
            transactions.map((transaction) => {
              const verification = verifications[transaction.id];

              return (
                <div
                  className={styles.row}
                  key={transaction.id}
                >
                  <strong>
                    TRX-{transaction.id}
                  </strong>

                  <span>
                    {transaction.recipient_iban}
                  </span>

                  <span>
                    €{formatMoney(transaction.amount)}
                  </span>

                  <div className={styles.verifyArea}>
                    {!verification && (
                      <button
                        type="button"
                        className={styles.verifyButton}
                        onClick={() =>
                          verifyTransaction(transaction.id)
                        }
                        disabled={verifyingId === transaction.id}
                      >
                        {verifyingId === transaction.id
                          ? "Verifying..."
                          : "Verify"}
                      </button>
                    )}

                    {verification?.valid && (
                      <span className={styles.verified}>
                        ✓ Integrity Verified
                      </span>
                    )}

                    {verification && !verification.valid && (
                      <span className={styles.failed}>
                        ⚠ Integrity Check Failed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
        </section>
      </section>
    </main>
  );
}