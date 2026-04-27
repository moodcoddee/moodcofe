'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './InfoPanel.module.scss';

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

interface Props {
  open: boolean;
  onClose: () => void;
}

const InfoPanel = ({ open, onClose }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const storeOpen = isStoreOpen();

  useGSAP(
    () => {
      if (open) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.to(overlayRef.current, { opacity: 1, duration: 0.3 })
          .fromTo(
            `.${styles.logoContainer}`,
            { y: '-100%' },
            { y: '0%', duration: 0.6 },
            '-=0.1'
          )
          .fromTo(
            `.${styles.info}`,
            { y: '100%' },
            { y: '0%', duration: 0.6 },
            '<'
          )
          .fromTo(
            [`.${styles.logo}`, `.${styles.copyright}`, `.${styles.status}`],
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
            '-=0.2'
          )
          .fromTo(
            [
              `.${styles.address}`,
              `.${styles.soMe}`,
              `.${styles.phone}`,
              `.${styles.close}`,
            ],
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
            '-=0.3'
          );
      } else {
        const tl = gsap.timeline({ defaults: { ease: 'power3.in' } });
        tl.to(
          [
            `.${styles.address}`,
            `.${styles.soMe}`,
            `.${styles.phone}`,
            `.${styles.close}`,
            `.${styles.logo}`,
            `.${styles.copyright}`,
            `.${styles.status}`,
          ],
          { opacity: 0, y: 10, duration: 0.2 }
        )
          .to(
            `.${styles.logoContainer}`,
            { y: '-100%', duration: 0.4 },
            '-=0.1'
          )
          .to(`.${styles.info}`, { y: '100%', duration: 0.4 }, '<')
          .to(overlayRef.current, { opacity: 0, duration: 0.2 });
      }
    },
    { scope: overlayRef, dependencies: [open] }
  );

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay}${open ? ` ${styles.visible}` : ''}`}
    >
      <div className={styles.logoContainer}>
        <p className={styles.status}>
          <span
            className={`${styles.dot} ${storeOpen ? styles.dotOpen : styles.dotClosed}`}
          />
        </p>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Mood Coffee. All rights reserved
        </p>
        <Image
          alt="Mood Coffee logo"
          src="/images/logo.svg"
          width={0}
          height={0}
          className={styles.logo}
        />
        <div className={styles.madeBy}>
          <a
            href="https://www.kodee.no"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by: <strong>Allan Brim</strong>
          </a>
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.address}>5385 Crooks Rd Troy, Michigan 48098</p>
        <div className={styles.soMe}>
          <a
            href="https://www.facebook.com/profile.php?id=61577057832400&rdid=gRJjpDSmdrVBXoq0&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18sNmkDehn%2F#"
            target="_blank"
            rel="noopener noreferrer"
          >
            FACEBOOK
          </a>
          <span>&#9679;</span>
          <a
            href="https://www.instagram.com/moodcoffeetroy?igsh=azRvZnU2dW12azRm"
            target="_blank"
            rel="noopener noreferrer"
          >
            INSTAGRAM
          </a>
          <span>&#9679;</span>
          <a
            href="https://www.tiktok.com/@moodcoffeetroy?_r=1&_t=ZP-95s6fIz07wd"
            target="_blank"
            rel="noopener noreferrer"
          >
            TIKTOK
          </a>
        </div>
        <p
          className={styles.phone}
          onClick={() => {
            window.location.href = 'tel:2489405521';
          }}
        >
          248 940 5521
        </p>
        <button className={styles.close} onClick={onClose}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default InfoPanel;
