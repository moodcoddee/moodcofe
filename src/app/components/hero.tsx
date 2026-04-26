'use client';

import dynamic from 'next/dynamic';
import styles from './hero.module.scss';
const CoffeeScene = dynamic(() => import('./CoffeeScene'), {
  ssr: false,
});
const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.scene}>
        <CoffeeScene />
      </div>
      <div className={styles.title}>
        <h1>
          MOOD
          <br />
          COFFEE
        </h1>
        <p>Your daily dose of caffeine and positivity</p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => {
            window.location.href = 'tel:2489405521';
          }}
        >
          Call Us
        </button>
      </div>
      <div className={styles.bottom}>
        <div className={styles.hours}>
          <p className={styles.hoursText}>Opening Hours</p>
          <p>
            Mon–Thu &nbsp;&nbsp;&nbsp;07AM – 09PM
            <br />
            Friday &nbsp;&nbsp;&nbsp;&nbsp;07AM – 10PM
            <br />
            Saturday &nbsp;&nbsp;09AM – 10PM
            <br />
            Sunday &nbsp;&nbsp;&nbsp;&nbsp;09AM – 09PM
          </p>
        </div>
      </div>
      <div className={styles.leftCorners}></div>
    </section>
  );
};

export default Hero;
