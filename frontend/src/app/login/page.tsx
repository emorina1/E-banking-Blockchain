"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setMessage("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.loginPage}>
      <section className={styles.card}>
        <div className={styles.logo}>eBanking</div>

        <span className={styles.label}>WELCOME BACK</span>

        <h1>Sign in to your account</h1>

        <p>
          Access your eBanking dashboard and manage your finances securely.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <div className={styles.passwordLabel}>
              <label htmlFor="password">Password</label>

              <Link href="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.remember}>
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">Remember me</label>
          </div>

          {message && (
            <p style={{ marginTop: "10px" }}>
              {message}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className={styles.register}>
          <span>Don&apos;t have an account?</span>

          <Link href="/register">
            Open an account
          </Link>
        </div>
      </section>
    </main>
  );
}