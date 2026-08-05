import styles from "./Services.module.css";

const services = [
  {
    number: "01",
    title: "Digital Accounts",
    description:
      "Manage your balance, personal information and banking activity from one secure dashboard.",
  },
  {
    number: "02",
    title: "Instant Transfers",
    description:
      "Send and receive money quickly with transparent transaction status and secure verification.",
  },
  {
    number: "03",
    title: "Blockchain Security",
    description:
      "Each completed transaction receives a unique cryptographic hash for improved integrity.",
  },
];

const Services = () => {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>
            <span className={styles.label}>OUR SERVICES</span>

            <h2>Modern banking services built around your needs.</h2>
          </div>

          <p>
            Everything you need to manage money digitally through a secure,
            simple and transparent e-banking platform.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <article className={styles.serviceCard} key={service.number}>
              <div className={styles.cardTop}>
                <span className={styles.number}>{service.number}</span>
                <span className={styles.arrow}>↗</span>
              </div>

              <div className={styles.icon}>
                {service.number === "01" && "◫"}
                {service.number === "02" && "↔"}
                {service.number === "03" && "◆"}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <div className={styles.line} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;