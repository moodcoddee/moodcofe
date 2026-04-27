'use client';

import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import InfoPanel from './InfoPanel';
import styles from './hero.module.scss';

function isStoreOpen(): boolean {
  const tz = 'America/Detroit';
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === 'weekday')?.value;
  const h = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10);
  const m = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10);
  const hour = h + m / 60;

  if (weekday === 'Fri') return hour >= 7 && hour < 22;
  if (weekday === 'Sat') return hour >= 9 && hour < 22;
  if (weekday === 'Sun') return hour >= 9 && hour < 21;
  return hour >= 7 && hour < 21; // Mon–Thu
}

const CoffeeScene = dynamic(() => import('./CoffeeScene'), {
  ssr: false,
});

gsap.registerPlugin();

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 1.9,
      });

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

  const [beanSpeed, setBeanSpeed] = useState(0.6);
  const storeOpen = isStoreOpen();

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.navDot}>
        <span
          className={`${styles.dot} ${storeOpen ? styles.dotOpen : styles.dotClosed}`}
        />
        <span className={styles.navDotLabel}>
          {storeOpen ? 'Open' : 'Closed'}
        </span>
      </div>
      <div className={styles.scene}>
        <CoffeeScene speed={beanSpeed} />
      </div>
      <div className={styles.speedControl}>
        <span className={styles.speedLabel}>SPEED</span>
        <input
          type="range"
          min={0.1}
          max={3}
          step={0.05}
          value={beanSpeed}
          onChange={(e) => setBeanSpeed(parseFloat(e.target.value))}
          className={styles.speedSlider}
          aria-label="Bean speed"
        />
        <span className={styles.speedValue}>{beanSpeed.toFixed(1)}x</span>
      </div>
      <InfoPanel open={infoOpen} onClose={() => setInfoOpen(false)} />
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
        <button
          className={styles.infoButton}
          onClick={() => setInfoOpen((o) => !o)}
        >
          {infoOpen ? 'CLOSE' : 'INFO'}
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
      <div className={styles.leftCorners}>
        <a
          href="https://www.facebook.com/profile.php?id=61577057832400&rdid=gRJjpDSmdrVBXoq0&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18sNmkDehn%2F#"
          target="_blank"
          rel="noopener noreferrer"
        >
          &#9679;FACEBOOK
        </a>
        <a
          href="https://www.instagram.com/moodcoffeetroy?igsh=azRvZnU2dW12azRm"
          target="_blank"
          rel="noopener noreferrer"
        >
          &#9679;INSTAGRAM
        </a>
        <a
          href="https://www.tiktok.com/@moodcoffeetroy?_r=1&_t=ZP-95s6fIz07wd"
          target="_blank"
          rel="noopener noreferrer"
        >
          &#9679;TIKTOK
        </a>
      </div>
    </section>
  );
};

export default Hero;
