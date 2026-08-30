"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

type Account = {
  id: number;
  iban: string;
  balance: string | number;
  currency: string;
  account_type: string;
  status: string;
};

type Transaction = {
  id: number;
  sender_account_id: number;
  receiver_account_id?: number | null;
  recipient_iban: string;
  amount: string | number;
  description: string | null;
  status: string;
  transaction_hash: string;
  created_at: string;
  transaction_type: "sent" | "received";
};

export default function Dashboard() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [initials, setInitials] = useState("");

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        router.push("/login");
        return;
      }

      try {
        const user = JSON.parse(storedUser);

        setUserName(user.full_name);

        const generatedInitials = user.full_name
          .split(" ")
          .map((name: string) => name.charAt(0))
          .join("")
          .toUpperCase()
          .slice(0, 2);

        setInitials(generatedInitials);

        const [accountsResponse, transactionsResponse] =
          await Promise.all([
            fetch("http://localhost:5000/api/accounts", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),

            fetch("http://localhost:5000/api/transactions", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        if (
          accountsResponse.status === 401 ||
          transactionsResponse.status === 401
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          router.push("/login");
          return;
        }

        const accountsData =
          await accountsResponse.json();

        const transactionsData =
          await transactionsResponse.json();

        if (accountsResponse.ok) {
          setAccounts(accountsData.accounts || []);
        }

        if (transactionsResponse.ok) {
          setTransactions(
            transactionsData.transactions || []
          );
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  // ==============================
  // TOTAL BALANCE
  // ==============================

  const totalBalance = accounts.reduce(
    (total, account) =>
      total + Number(account.balance),
    0
  );

  // ==============================
  // TOTAL INCOME
  // ==============================

  const totalIncome = transactions
    .filter(
      (transaction) =>
        transaction.transaction_type === "received"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  // ==============================
  // TOTAL EXPENSES
  // ==============================

  const totalExpenses = transactions
    .filter(
      (transaction) =>
        transaction.transaction_type === "sent"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  // ==============================
  // RECENT TRANSACTIONS
  // ==============================

  const recentTransactions =
    transactions.slice(0, 3);

  // ==============================
  // FORMAT MONEY
  // ==============================

  const formatMoney = (amount: number) => {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // ==============================
  // FORMAT DATE
  // ==============================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <main className={styles.dashboard}>
      {/* SIDEBAR */}

      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          eBanking
        </div>

        <nav className={styles.nav}>
          <Link
            href="/dashboard"
            className={styles.active}
          >
            Overview
          </Link>

          <Link href="/dashboard/accounts">
            Accounts
          </Link>

          <Link href="/dashboard/transfer">
            Transfer
          </Link>

          <Link href="/dashboard/transactions">
            Transactions
          </Link>

          <Link href="/dashboard/notifications">
            Notifications
          </Link>

          <Link href="/dashboard/settings">
            Settings
          </Link>
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Logout
        </button>
      </aside>

      {/* CONTENT */}

      <section className={styles.content}>
        {/* TOP BAR */}

        <div className={styles.topbar}>
          <div>
            <span>
              Welcome back,
            </span>

            <h1>
              {userName || "User"}
            </h1>
          </div>

          <div className={styles.avatar}>
            {initials || "U"}
          </div>
        </div>

        {/* CARDS */}

        <section className={styles.cards}>
          {/* BALANCE */}

          <div className={styles.balanceCard}>
            <span>
              Total Balance
            </span>

            <h2>
              €{formatMoney(totalBalance)}
            </h2>

            <p>
              {accounts.length > 0
                ? `${accounts.length} active account${
                    accounts.length > 1
                      ? "s"
                      : ""
                  }`
                : "No active accounts"}
            </p>
          </div>

          {/* INCOME */}

          <div className={styles.statCard}>
            <span>
              Income
            </span>

            <h3>
              €{formatMoney(totalIncome)}
            </h3>
          </div>

          {/* EXPENSES */}

          <div className={styles.statCard}>
            <span>
              Expenses
            </span>

            <h3>
              €{formatMoney(totalExpenses)}
            </h3>
          </div>
        </section>

        {/* RECENT TRANSACTIONS */}

        <section className={styles.transactions}>
          <div className={styles.sectionTitle}>
            <h2>
              Recent Transactions
            </h2>

            <Link href="/dashboard/transactions">
              View all
            </Link>
          </div>

          {loading && (
            <p>
              Loading transactions...
            </p>
          )}

          {!loading &&
            recentTransactions.length === 0 && (
              <p>
                No transactions yet.
              </p>
            )}

          {!loading &&
            recentTransactions.map(
              (transaction) => {
                const isReceived =
                  transaction.transaction_type ===
                  "received";

                return (
                  <div
                    key={transaction.id}
                    className={
                      styles.transaction
                    }
                  >
                    <div>
                      <strong>
                        {transaction.description ||
                          (isReceived
                            ? "Money Received"
                            : "Money Transfer")}
                      </strong>

                      <span>
                        {formatDate(
                          transaction.created_at
                        )}
                      </span>
                    </div>

                    <strong
                      className={
                        isReceived
                          ? styles.income
                          : styles.expense
                      }
                    >
                      {isReceived ? "+" : "-"}€
                      {formatMoney(
                        Number(
                          transaction.amount
                        )
                      )}
                    </strong>
                  </div>
                );
              }
            )}
        </section>
      </section>
    </main>
  );
}