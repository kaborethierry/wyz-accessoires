"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./PageTransition.css";

/**
 * PageTransition
 * Enveloppe le contenu des pages pour un léger fondu à l'arrivée.
 * Usage : <PageTransition>{children}</PageTransition>
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className={`page-transition${visible ? " is-visible" : ""}`}>
      {children}
    </div>
  );
}