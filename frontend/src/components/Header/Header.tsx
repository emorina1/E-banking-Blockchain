"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoIcon}>
            <span />
            <span />
          </span>

          <span className={styles.logoText}>
            e<span>Banking</span>
          </span>
        </Link>

        <div
          className={`${styles.navigation} ${
            menuOpen ? styles.navigationOpen : ""
          }`}
        >
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>

          <Link href="/about" onClick={closeMenu}>
            About
          </Link>

          <Link href="/services" onClick={closeMenu}>
            Services
          </Link>

          <Link href="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </div>

        <div className={styles.actions}>
          <Link href="/login" className={styles.login}>
            Log in
          </Link>

          <Link href="/register" className={styles.register}>
            Open Account
          </Link>

          <button
            type="button"
            className={`${styles.menuButton} ${
              menuOpen ? styles.menuButtonOpen : ""
            }`}
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;