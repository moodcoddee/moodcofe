'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './LoadScreen.module.scss';

const LoadScreen = () => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = Array.from(
      loaderRef.current?.querySelectorAll<HTMLElement>(`.${styles.wordmark} span`) ?? []
    );
    const bar = loaderRef.current?.querySelector<HTMLElement>(`.${styles.bar}`) ?? null;

    const tl = gsap.timeline({ paused: true });

    tl.to(lines, {
      y: '0%',
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    })
      .to(bar, { width: '100%', duration: 0.7, ease: 'power2.inOut' }, '-=0.2')
      .to(
        loaderRef.current,
        { yPercent: -100, duration: 0.7, ease: 'power3.inOut' },
        '+=0.15'
      );

    const play = () => tl.play();

    if (document.readyState === 'complete') {
      play();
    } else {
      window.addEventListener('load', play, { once: true });
    }

    return () => window.removeEventListener('load', play);
  }, []);

  return (
    <div ref={loaderRef} className={styles.loader}>
      <div className={styles.wordmark}>
        <span>MOOD</span>
        <span>COFFEE</span>
      </div>
      <div className={styles.bar} />
    </div>
  );
};

export default LoadScreen;
