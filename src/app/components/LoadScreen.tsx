'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './LoadScreen.module.scss';

const R = 80;
const HALF_CIRC = Math.PI * R;

const SMILE_PATH = 'M 72,72 Q 100,92 128,72';
const SMILE_LEN = 62;

const LoadScreen = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const arcFillRef = useRef<SVGPathElement>(null);
  const smileRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const lines = Array.from(
      loaderRef.current?.querySelectorAll<HTMLElement>(
        `.${styles.wordmark} span`
      ) ?? []
    );

    gsap.set(arcFillRef.current, { strokeDashoffset: HALF_CIRC });
    gsap.set(smileRef.current, { strokeDashoffset: SMILE_LEN, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(lines, { y: '0%', duration: 0.8, stagger: 0.12, ease: 'power3.out' })
      .to(
        arcFillRef.current,
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
        },
        '-=0.2'
      )
      .to(
        smileRef.current,
        {
          opacity: 1,
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
        },
        '<'
      )
      .to(
        labelRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.1'
      )
      .to(
        loaderRef.current,
        { yPercent: -100, duration: 0.7, ease: 'power3.inOut' },
        '+=0.5'
      );

    const play = () => tl.play();
    if (document.readyState === 'complete') {
      play();
    } else {
      window.addEventListener('load', play, { once: true });
    }
    return () => window.removeEventListener('load', play);
  }, []);

  const arcPath = `M ${100 - R},100 A ${R},${R} 0 0,1 ${100 + R},100`;

  return (
    <div ref={loaderRef} className={styles.loader}>
      <div className={styles.content}>
        <div className={styles.wordmark}>
          <span>MOOD</span>
          <span>COFFEE</span>
        </div>

        <div className={styles.gauge}>
          <svg viewBox="16 16 168 92" className={styles.gaugeSvg} aria-hidden>
            <path
              d={arcPath}
              fill="none"
              stroke="rgba(27,12,1,0.12)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              ref={arcFillRef}
              d={arcPath}
              fill="none"
              stroke="#1b0c01"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={HALF_CIRC}
              strokeDashoffset={HALF_CIRC}
            />
            <path
              ref={smileRef}
              d={SMILE_PATH}
              fill="none"
              stroke="#1b0c01"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={SMILE_LEN}
              strokeDashoffset={SMILE_LEN}
            />
          </svg>

          <span ref={labelRef} className={styles.moodTag}>
            your mood after one sip
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadScreen;
