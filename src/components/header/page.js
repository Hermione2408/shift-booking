"use client"
import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css'; 
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const path = usePathname();
  const isActive = (pathname) => path === pathname;

  return (
    <header className={styles.header}>      
      <nav className={styles.navigation}>
        <Link className={`${styles.link} ${isActive("/my-shifts") ? styles.activeLink : ''} `} href="/my-shifts">
            My shifts
        </Link>
        <Link className={`${styles.link} ${isActive("/available-shifts") ? styles.activeLink : ''} `} href="/available-shifts">
          Available shifts
        </Link>
      </nav>
    </header>
  );
};

export default Header;
