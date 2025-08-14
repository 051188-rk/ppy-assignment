"use client";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const pref = localStorage.getItem("theme") || "system";
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = pref === "dark" || (pref === "system" && sysDark);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return (
    <div className={styles.toggleWrapper}>
      <div className={styles.toggleContainer}>
        <div className={styles.toggleButton}>
          <div className={styles.toggleButtonCirclesContainer}>
            {[...Array(12)].map((_, i) => (
              <div key={i} className={styles.toggleButtonCircle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.toggleWrapper}>
      <input 
        type="checkbox" 
        className={styles.toggleCheckbox}
        checked={dark}
        onChange={toggle}
        aria-label="Toggle dark mode"
      />
      <div className={styles.toggleContainer}>
        <div className={styles.toggleButton}>
          <div className={styles.toggleButtonCirclesContainer}>
            {[...Array(12)].map((_, i) => (
              <div key={i} className={styles.toggleButtonCircle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
