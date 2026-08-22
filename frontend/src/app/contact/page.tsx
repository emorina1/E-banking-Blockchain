import styles from "./contact.module.css";

export default function Contact() {
  return (
    <main className={styles.contact}>
      <section className={styles.hero}>
        <span className={styles.label}>CONTACT US</span>

        <h1>
          We&apos;re here to <span>help you.</span>
        </h1>

        <p>
          Have a question about eBankin? Send us a message and our team will
          get back to you.
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.info}>
          <div className={styles.infoCard}>
            <span>Email</span>
            <strong>support@ebanking.com</strong>
          </div>

          <div className={styles.infoCard}>
            <span>Phone</span>
            <strong>+383 44 000 000</strong>
          </div>

          <div className={styles.infoCard}>
            <span>Location</span>
            <strong>Prishtina, Kosovo</strong>
          </div>
        </div>

        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" placeholder="Your name" />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="your@email.com" />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="subject">Subject</label>
            <input id="subject" type="text" placeholder="How can we help?" />
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={6}
              placeholder="Write your message..."
            />
          </div>

          <button type="submit">Send Message</button>
        </form>
      </section>
    </main>
  );
}