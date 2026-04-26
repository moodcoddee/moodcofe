'use client';

import Image from 'next/image';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Image
        alt="Mood Coffee logo"
        src="/images/logo.svg"
        width={60}
        height={60}
        className={styles.logo}
      />
      <div className={styles.info}>
        <p>248 940 5521</p>
        <p>5385 Crooks Rd Troy, Michigan 48098</p>
        <p className={styles.copyright}>
          Mood Coffee LLC © {new Date().getFullYear()} Mood Coffee LLC
        </p>
      </div>
    </footer>
  );
};

export default Footer;
