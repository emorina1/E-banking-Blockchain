"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./accounts.module.css";

type Account = {
  id: number;
  iban: string;
  balance: string | number;
  currency: string;
  account_type: string;
  status: string;
  created_at: string;
};

export default function AccountsPage() {
  const router = useRouter();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/accounts",
          {
            method: "GET",
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
          setMessage(data.message || "Could not load accounts");
          return;
        }

        setAccounts(data.accounts || []);
      } catch (error) {
        setMessage("Could not connect to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [router]);

  const totalBalance = accounts.reduce(
    (total, account) => total + Number(account.balance),
    0
  );

  const formatIBAN = (iban: string) => {
    return iban.match(/.{1,4}/g)?.join(" ") || iban;
  };

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBanking</div>

        <nav>
          <Link href="/dashboard">
            Overview
          </Link>

          <Link
            href="/dashboard/accounts"
            className={styles.active}
          >
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
      </aside>

      <section className={styles.content}>
        <div className={styles.header}>
          <div>
            <span>My Accounts</span>
            <h1>Your banking accounts</h1>
          </div>

          <Link
            href="/dashboard/transfer"
            className={styles.transferButton}
          >
            Make Transfer
          </Link>
        </div>

        {loading && (
          <p>Loading accounts...</p>
        )}

        {message && (
          <p>{message}</p>
        )}

        {!loading && !message && accounts.length === 0 && (
          <section className={styles.infoBox}>
            <div>
              <span>No accounts found</span>
              <strong>€0.00</strong>
            </div>

            <p>
              You currently do not have an active banking account.
            </p>
          </section>
        )}

        {!loading && accounts.length > 0 && (
          <>
            <section className={styles.accountsGrid}>
              {accounts.map((account, index) => (
                <article
                  key={account.id}
                  className={
                    index === 0
                      ? styles.primaryAccount
                      : styles.accountCard
                  }
                >
                  <div className={styles.accountTop}>
                    <div>
                      <span>{account.account_type}</span>

                      <h2>
                        €
                        {Number(account.balance).toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </h2>
                    </div>

                    <span className={styles.status}>
                      {account.status}
                    </span>
                  </div>

                  <div className={styles.details}>
                    <div>
                      <span>IBAN</span>

                      <strong>
                        {formatIBAN(account.iban)}
                      </strong>
                    </div>

                    <div>
                      <span>Currency</span>

                      <strong>
                        {account.currency}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <section className={styles.infoBox}>
              <div>
                <span>Total balance</span>

                <strong>
                  €
                  {totalBalance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>

              <p>
                Your total balance combines funds from all active
                eBanking accounts.
              </p>
            </section>
          </>
        )}
      </section>
    </main>
  );
}