import Link from "next/link";
import styles from "./login.module.css";

export default function Login() {
  return (
    <main className={styles.loginPage}>
      <section className={styles.card}>
        <div className={styles.logo}>eBanking</div>

        <span className={styles.label}>WELCOME BACK</span>

        <h1>Sign in to your account</h1>

        <p>
          Access your eBanking dashboard and manage your finances securely.
        </p>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="name@example.com"
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
            />
          </div>

          <div className={styles.remember}>
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button type="submit">
            Sign In
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