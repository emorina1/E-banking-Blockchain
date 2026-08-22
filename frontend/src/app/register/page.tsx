import Link from "next/link";
import styles from "./register.module.css";

export default function Register() {
  return (
    <main className={styles.registerPage}>
      <section className={styles.card}>
        <div className={styles.logo}>eBanking</div>

        <span className={styles.label}>CREATE ACCOUNT</span>

        <h1>Start banking smarter.</h1>

        <p>
          Create your eBankin account and manage your finances securely.
        </p>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit">Create Account</button>
        </form>

        <div className={styles.login}>
          <span>Already have an account?</span>
          <Link href="/login">Sign in</Link>
        </div>
      </section>
    </main>
  );
}