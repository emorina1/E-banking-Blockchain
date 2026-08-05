import styles from "./Hero.module.css";

import HeroContent from "./HeroContent";
import Phone3D from "./BankCard3D";
import BackgroundEffects from "./BackgroundEffects";

const Hero = () => {
  return (
    <section className={styles.hero}>

      <BackgroundEffects />

      <div className={styles.container}>

        <HeroContent />

        <Phone3D />

      </div>

    </section>
  );
};

export default Hero;