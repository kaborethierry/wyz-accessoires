"use client";

import { useEffect } from "react";

/**
 * useLockBodyScroll
 * Empêche le scroll de la page derrière un overlay (MobileMenu, Modal, CartDrawer).
 * Gère la compensation de la scrollbar pour éviter le "saut" de mise en page.
 *
 * @param {boolean} locked  true pour bloquer, false pour libérer
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;
    if (typeof document === "undefined") return;

    const body = document.body;
    const scrollBarComp = window.innerWidth - document.documentElement.clientWidth;

    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollBarComp > 0) {
      body.style.paddingRight = `${scrollBarComp}px`;
    }

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [locked]);
}

export default useLockBodyScroll;