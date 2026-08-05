import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>
                <span />
                <span />
              </span>

              <span className={styles.logoText}>
                e<span>Banking</span>
              </span>
            </Link>

            <p>
              Secure digital banking for modern users, powered by fast
              transfers and blockchain verification.
            </p>
          </div>

          <div className={styles.linksGroup}>
            <div>
              <h3>Company</h3>

              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <div>
              <h3>Banking</h3>

              <Link href="/login">Log in</Link>
              <Link href="/register">Open Account</Link>
              <Link href="/services">Transfers</Link>
              <Link href="/services">Transactions</Link>
            </div>

            <div>
              <h3>Security</h3>

              <span>Blockchain Verification</span>
              <span>Encrypted Passwords</span>
              <span>Secure Authentication</span>
              <span>Transaction Integrity</span>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} eBanking. All rights reserved.
          </p>

          <div className={styles.bottomLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <div className={styles.glow} />
    </footer>
  );
};

export default Footer;