import styles from "./Hero.module.css";

const Phone3D = () => {
  return (
    <div className={styles.phoneContainer}>
      <div className={styles.bankCard}>
        <div className={styles.cardTop}>
          <h2>eBanking</h2>
          <span className={styles.contactless}>)))</span>
        </div>

        <div className={styles.chip} />

        <p className={styles.cardNumber}>
          5412&nbsp;&nbsp;8654&nbsp;&nbsp;9281&nbsp;&nbsp;4073
        </p>

        <div className={styles.cardBottom}>
          <div>
            <span>Card holder</span>
            <strong>ELSA MORINA</strong>
          </div>

          <div>
            <span>Valid thru</span>
            <strong>08/30</strong>
          </div>

          <div className={styles.cardCircles}>
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phone3D;