"use client";

import { useEffect, useState } from "react";
import styles from "./Loader.module.css";

/**
 * Loader
 * Loader initial premium WYZ.
 *
 * Props :
 *  - fullscreen : couvre tout l'écran (défaut true)
 *  - minDuration : durée mini d'affichage (ms, défaut 400)
 *  - maxDuration : timeout de sécurité (ms, défaut 6000)
 *  - onFinish : callback à la fin
 */
export default function Loader({
  fullscreen = true,
  minDuration = 400,
  maxDuration = 6000,
  onFinish,
}) {
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          setHidden(true);
          if (onFinish) onFinish();
        }, 320);
      }, wait);
    };

    // Sécurité : évite un loader bloqué indéfiniment
    const safety = setTimeout(finish, maxDuration);

    // Fin "normale" : dès que la page est prête
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        clearTimeout(safety);
        finish();
      } else {
        const onLoad = () => {
          clearTimeout(safety);
          finish();
        };
        window.addEventListener("load", onLoad, { once: true });
        return () => {
          window.removeEventListener("load", onLoad);
          clearTimeout(safety);
        };
      }
    }

    return () => clearTimeout(safety);
  }, [minDuration, maxDuration, onFinish]);

  if (hidden) return null;

  return (
    <div
      className={[
        styles.loader,
        fullscreen ? styles.fullscreen : "",
        exiting ? styles.exiting : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.inner}>
        <div className={styles.logo} aria-hidden="true">
          <span className={styles.logoText}>WYZ</span>
          <span className={styles.logoSub}>Accessoires</span>
        </div>

        <div className={styles.bar} aria-hidden="true">
          <span className={styles.barFill} />
        </div>

        <p className={styles.label}>Chargement…</p>
      </div>

      <span className="sr-only">Chargement en cours</span>
    </div>
  );
}