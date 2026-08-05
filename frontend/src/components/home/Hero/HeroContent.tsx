import Link from "next/link";
import styles from "./Hero.module.css";

const HeroContent = () => {
  return (
    <div className={styles.heroText}>
      

      <h1>
        Build your <span>financial future</span> with smarter banking.
      </h1>

      <p>
        Experience secure digital banking with instant transfers,
        blockchain verification and complete control of your finances.
      </p>

      <div className={styles.buttons}>
        <Link href="/register" className={styles.primary}>
          Open Account
        </Link>

        <Link href="/services" className={styles.secondary}>
          Explore Services
        </Link>
      </div>

      <div className={styles.stats}>
        <div>
          <h3>10K+</h3>
          <span>Customers</span>
        </div>

        <div>
          <h3>24/7</h3>
          <span>Support</span>
        </div>

        <div>
          <h3>99.9%</h3>
          <span>Secure</span>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;