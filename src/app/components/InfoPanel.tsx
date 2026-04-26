'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './InfoPanel.module.scss';

interface Props {
  open: boolean;
}

const InfoPanel = ({ open }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (open) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.to(overlayRef.current, { opacity: 1, duration: 0.4 })
          .to(`.${styles.logo}`, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
          .to(
            `.${styles.info} p`,
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
            '-=0.3'
          );
      } else {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      }
    },
    { scope: overlayRef, dependencies: [open] }
  );

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay}${open ? ` ${styles.visible}` : ''}`}
    >
      <Image
        alt="Mood Coffee logo"
        src="/images/logo.svg"
        width={80}
        height={80}
        className={styles.logo}
      />
      <div className={styles.info}>
        <p>248 940 5521</p>
        <p>5385 Crooks Rd Troy, Michigan 48098</p>
        <p className={styles.copyright}>
          Mood Coffee LLC © {new Date().getFullYear()} Mood Coffee LLC
        </p>
      </div>
    </div>
  );
};

export default InfoPanel;
