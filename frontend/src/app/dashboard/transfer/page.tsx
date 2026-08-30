"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./transfer.module.css";

type Account = {
  id: number;
  iban: string;
  balance: string | number;
  currency: string;
  account_type: string;
  status: string;
};

export default function TransferPage() {
  const router = useRouter();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const [recipientIban, setRecipientIban] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  useEffect(() => {
    const loadAccounts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/accounts",
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
          setMessage(data.message || "Could not load accounts");
          return;
        }

        const loadedAccounts = data.accounts || [];

        setAccounts(loadedAccounts);

        if (loadedAccounts.length > 0) {
          setSelectedAccount(loadedAccounts[0]);
        }
      } catch (error) {
        setMessage("Could not connect to the server");
      } finally {
        setLoadingAccounts(false);
      }
    };

    loadAccounts();
  }, [router]);

  const handleAccountChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const accountId = Number(e.target.value);

    const account = accounts.find(
      (item) => item.id === accountId
    );

    setSelectedAccount(account || null);
  };

  const handleTransfer = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (!recipientIban || !amount) {
      setMessage("Recipient IBAN and amount are required");
      return;
    }

    if (Number(amount) <= 0) {
      setMessage("Amount must be greater than 0");
      return;
    }

    if (
      selectedAccount &&
      Number(amount) > Number(selectedAccount.balance)
    ) {
      setMessage("Insufficient balance");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/transactions/transfer",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            recipient_iban: recipientIban.replace(/\s/g, ""),
            amount: Number(amount),

            description:
              recipientName && description
                ? `${recipientName} - ${description}`
                : recipientName || description,
          }),
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
        setMessage(data.message || "Transfer failed");
        return;
      }

      setMessage("Transfer completed successfully");

      setRecipientIban("");
      setRecipientName("");
      setAmount("");
      setDescription("");

      // Merr balance-in e ri nga backend-i
      const accountsResponse = await fetch(
        "http://localhost:5000/api/accounts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const accountsData = await accountsResponse.json();

      if (accountsResponse.ok) {
        const updatedAccounts = accountsData.accounts || [];

        setAccounts(updatedAccounts);

        if (selectedAccount) {
          const updatedSelectedAccount =
            updatedAccounts.find(
              (account: Account) =>
                account.id === selectedAccount.id
            );

          setSelectedAccount(
            updatedSelectedAccount || updatedAccounts[0] || null
          );
        }
      }
    } catch (error) {
      setMessage("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (value: number | string) => {
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>eBanking</div>

        <nav>
          <Link href="/dashboard">Overview</Link>

          <Link href="/dashboard/accounts">
            Accounts
          </Link>

          <Link
            href="/dashboard/transfer"
            className={styles.active}
          >
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
          <span>Money Transfer</span>

          <h1>Send money securely</h1>

          <p>
            Transfer funds between accounts through a simple and secure process.
          </p>
        </div>

        <section className={styles.transferCard}>
          <form
            className={styles.form}
            onSubmit={handleTransfer}
          >
            <div className={styles.field}>
              <label htmlFor="fromAccount">
                From Account
              </label>

              <select
                id="fromAccount"
                value={selectedAccount?.id || ""}
                onChange={handleAccountChange}
                disabled={
                  loadingAccounts ||
                  accounts.length === 0
                }
              >
                {accounts.length === 0 ? (
                  <option value="">
                    No accounts available
                  </option>
                ) : (
                  accounts.map((account) => (
                    <option
                      key={account.id}
                      value={account.id}
                    >
                      {account.account_type} - €
                      {formatMoney(account.balance)}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="recipient">
                Recipient IBAN
              </label>

              <input
                id="recipient"
                type="text"
                placeholder="XK05 1234 5678 9012 3456"
                value={recipientIban}
                onChange={(e) =>
                  setRecipientIban(e.target.value)
                }
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="recipientName">
                Recipient Name
              </label>

              <input
                id="recipientName"
                type="text"
                placeholder="Recipient full name"
                value={recipientName}
                onChange={(e) =>
                  setRecipientName(e.target.value)
                }
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="amount">
                Amount
              </label>

              <div className={styles.amountInput}>
                <span>€</span>

                <input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="description">
                Description
              </label>

              <input
                id="description"
                type="text"
                placeholder="Optional payment description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />
            </div>

            {message && (
              <p>{message}</p>
            )}

            <button
              type="submit"
              disabled={
                loading ||
                accounts.length === 0
              }
            >
              {loading
                ? "Processing..."
                : "Send Transfer"}
            </button>
          </form>

          <aside className={styles.summary}>
            <span>Transfer Summary</span>

            <div>
              <p>Available Balance</p>

              <strong>
                €
                {selectedAccount
                  ? formatMoney(
                      selectedAccount.balance
                    )
                  : "0.00"}
              </strong>
            </div>

            <div>
              <p>Transfer Amount</p>

              <strong>
                €
                {amount
                  ? formatMoney(amount)
                  : "0.00"}
              </strong>
            </div>

            <div>
              <p>Transfer Fee</p>
              <strong>€0.00</strong>
            </div>

            <div className={styles.security}>
              <span>✓</span>

              <p>
                Your transaction will be securely processed and verified.
              </p>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}