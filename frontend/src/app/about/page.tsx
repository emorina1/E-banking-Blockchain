import styles from "./about.module.css";

export default function About() {
  return (
    <main className={styles.about}>
      <section className={styles.hero}>
        <span className={styles.label}>ABOUT EBANKIN</span>

        <h1>
          Simple banking.
          <span> Smarter security.</span>
        </h1>

        <p>
          eBankin is a modern digital banking platform focused on secure,
          transparent and easy financial services.
        </p>
      </section>

      <section className={styles.cards}>
        <article>
          <span>01</span>
          <h2>Our Mission</h2>
          <p>
            To make everyday banking simple, secure and accessible through a
            modern digital platform.
          </p>
        </article>

        <article>
          <span>02</span>
          <h2>Our Vision</h2>
          <p>
            To combine modern e-banking with blockchain-based transaction
            verification.
          </p>
        </article>

        <article>
          <span>03</span>
          <h2>Our Security</h2>
          <p>
            Secure authentication and transaction integrity are central to the
            eBankin platform.
          </p>
        </article>
      </section>
    </main>
  );
}