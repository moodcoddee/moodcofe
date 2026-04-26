'use client';

import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import InfoPanel from './InfoPanel';
import styles from './hero.module.scss';

const CoffeeScene = dynamic(() => import('./CoffeeScene'), {
  ssr: false,
});

gsap.registerPlugin();

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.9 });

      tl.from(`.${styles.title} h1`, {
        y: 80,
        opacity: 0,
        duration: 1,
      })
        .from(
          `.${styles.title} p`,
          { y: 20, opacity: 0, duration: 0.7 },
          '-=0.4'
        )
        .from(
          `.${styles.buttonContainer}`,
          { y: 30, opacity: 0, duration: 0.7 },
          '-=0.4'
        )
        .from(
          `.${styles.bottom}`,
          { y: 20, opacity: 0, duration: 0.7 },
          '-=0.4'
        )
        .from(
          `.${styles.leftCorners}`,
          {
            opacity: 0,
            scale: 0.8,
            transformOrigin: 'bottom left',
            duration: 0.6,
          },
          '-=0.5'
        );
    },
    { scope: containerRef }
  );

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.scene}>
        <CoffeeScene />
      </div>
      <button
        className={styles.infoButton}
        onClick={() => setInfoOpen((o) => !o)}
      >
        {infoOpen ? 'CLOSE' : 'INFO'}
      </button>
      <InfoPanel open={infoOpen} />
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
