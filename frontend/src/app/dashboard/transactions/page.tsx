"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
  transaction_type: "sent" | "received";
};

type VerificationResult = {
  valid: boolean;
  message: string;
};

export default function TransactionsPage() {
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

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/transactions",
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

      setVerifications((prev) => ({
        ...prev,
        [transactionId]: {
          valid: response.ok && data.valid,
          message: data.message || "Verification failed",
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

  const totalIncome = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.transaction_type === "received")
      .reduce(
        (total, transaction) => total + Number(transaction.amount),
        0
      );
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.transaction_type === "sent")
      .reduce(
        (total, transaction) => total + Number(transaction.amount),
        0
      );
  }, [transactions]);

  const formatMoney = (amount: string | number) => {
    return Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBanking</div>

        <nav>
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/accounts">Accounts</Link>
          <Link href="/dashboard/transfer">Transfer</Link>

          <Link
            href="/dashboard/transactions"
            className={styles.active}
          >
            Transactions
          </Link>

          <Link href="/dashboard/notifications">
            Notifications
          </Link>

          <Link href="/dashboard/settings">
            Settings
          </Link>
        </nav>
      </aside>

      <section className={styles.content}>
        <div className={styles.header}>
          <div>
            <span>TRANSACTION HISTORY</span>

            <h1>Your transactions</h1>

            <p>
              Review your latest transfers and verify transaction
              integrity using SHA-256.
            </p>
          </div>

          <Link
            href="/dashboard/transfer"
            className={styles.transferButton}
          >
            New Transfer
          </Link>
        </div>

        <section className={styles.summary}>
          <div>
            <span>Total Income</span>
            <strong>
              €{formatMoney(totalIncome)}
            </strong>
          </div>

          <div>
            <span>Total Expenses</span>
            <strong>
              €{formatMoney(totalExpenses)}
            </strong>
          </div>

          <div>
            <span>Transactions</span>
            <strong>{transactions.length}</strong>
          </div>
        </section>

        <section className={styles.transactionCard}>
          <div className={styles.tableHeader}>
            <span>Transaction</span>
            <span>Date</span>
            <span>Verification</span>
            <span>Amount</span>
          </div>

          {loading && (
            <div className={styles.transactionRow}>
              <span>Loading transactions...</span>
            </div>
          )}

          {!loading && message && (
            <div className={styles.transactionRow}>
              <span>{message}</span>
            </div>
          )}

          {!loading &&
            !message &&
            transactions.length === 0 && (
              <div className={styles.transactionRow}>
                <span>No transactions found.</span>
              </div>
            )}

          {!loading &&
            !message &&
            transactions.map((transaction) => {
              const isReceived =
                transaction.transaction_type === "received";

              const verification =
                verifications[transaction.id];

              return (
                <div
                  className={styles.transactionRow}
                  key={transaction.id}
                >
                  <div>
                    <div className={styles.icon}>
                      {isReceived ? "↓" : "↑"}
                    </div>

                    <strong>
                      {transaction.description ||
                        (isReceived
                          ? "Money Received"
                          : "Money Transfer")}
                    </strong>
                  </div>

                  <span>
                    {formatDate(transaction.created_at)}
                  </span>

                  <div className={styles.verifyArea}>
                    {!verification && (
                      <button
                        type="button"
                        className={styles.verifyButton}
                        onClick={() =>
                          verifyTransaction(transaction.id)
                        }
                        disabled={
                          verifyingId === transaction.id
                        }
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

                    {verification &&
                      !verification.valid && (
                        <span className={styles.failed}>
                          ⚠ Integrity Check Failed
                        </span>
                      )}
                  </div>

                  <strong
                    className={
                      isReceived
                        ? styles.income
                        : styles.expense
                    }
                  >
                    {isReceived ? "+" : "-"}€
                    {formatMoney(transaction.amount)}
                  </strong>
                </div>
              );
            })}
        </section>
      </section>
    </main>
  );
}