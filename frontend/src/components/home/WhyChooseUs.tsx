import styles from "./WhyChooseUs.module.css";

const features = [
  {
    title: "Secure Authentication",
    description:
      "Login protected with encrypted passwords and JWT authentication.",
  },
  {
    title: "Blockchain Verification",
    description:
      "Every transaction receives a unique cryptographic hash for integrity.",
  },
  {
    title: "24/7 Digital Banking",
    description:
      "Access your accounts anytime from anywhere with a responsive platform.",
  },
  {
    title: "Fast Money Transfer",
    description:
      "Transfer money between users instantly with complete transparency.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.tag}>WHY CHOOSE US</span>

          <h2>
            Banking designed for the future, powered by security.
          </h2>

          <p>
            Our platform combines modern e-banking with blockchain technology to
            provide fast, transparent and secure financial services.
          </p>

          <div className={styles.stats}>
            <div>
              <h3>99.9%</h3>
              <span>System Availability</span>
            </div>

            <div>
              <h3>24/7</h3>
              <span>Online Banking</span>
            </div>

            <div>
              <h3>256-bit</h3>
              <span>Encryption</span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {features.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>✓</div>

              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;