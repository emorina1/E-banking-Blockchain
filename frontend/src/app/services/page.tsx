import styles from "./services.module.css";

const services = [
  {
    number: "01",
    title: "Account Management",
    description:
      "View your balance and manage your personal banking account from one secure dashboard.",
  },
  {
    number: "02",
    title: "Money Transfers",
    description:
      "Send money securely between accounts with clear transaction status.",
  },
  {
    number: "03",
    title: "Transaction History",
    description:
      "Review previous payments and transfers in a simple transaction history.",
  },
  {
    number: "04",
    title: "Blockchain Verification",
    description:
      "Each completed transaction receives a cryptographic hash for integrity verification.",
  },
  {
    number: "05",
    title: "Notifications",
    description:
      "Receive simple notifications for important account and transaction activity.",
  },
  {
    number: "06",
    title: "Secure Authentication",
    description:
      "Access your account through secure login and protected user authentication.",
  },
];

export default function Services() {
  return (
    <main className={styles.services}>
      <section className={styles.hero}>
        <span className={styles.label}>OUR SERVICES</span>

        <h1>
          Everything you need for
          <span> modern digital banking.</span>
        </h1>

        <p>
          eBankin provides simple and secure banking features designed for
          everyday financial management.
        </p>
      </section>

      <section className={styles.grid}>
        {services.map((service) => (
          <article className={styles.card} key={service.number}>
            <div className={styles.top}>
              <span>{service.number}</span>
              <span className={styles.arrow}>↗</span>
            </div>

            <h2>{service.title}</h2>

            <p>{service.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}