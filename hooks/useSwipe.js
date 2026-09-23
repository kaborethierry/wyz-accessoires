"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * useSwipe
 * Moteur de gestes tactiles / pointer.
 * Gère : pointer down, déplacement, vitesse, direction, seuil, retour, swipe validé.
 *
 * Options :
 *  - threshold : distance mini (px) pour valider un swipe (défaut 50)
 *  - velocity  : vitesse mini (px/ms) pour valider (défaut 0.3)
 *  - onSwipeLeft / onSwipeRight / onSwipeUp / onSwipeDown : callbacks
 *  - onSwipe(direction, { dx, dy, vx, vy }) : callback générique
 */
export function useSwipe(options = {}) {
  const {
    threshold = 50,
    velocity = 0.3,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onSwipe,
    onSwipeStart,
    onSwipeEnd,
  } = options;

  const ref = useRef(null);

  const state = useRef({
    startX: 0,
    startY: 0,
    startT: 0,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    active: false,
  });

  const reset = useCallback(() => {
    state.current.active = false;
    state.current.startX = 0;
    state.current.startY = 0;
    state.current.startT = 0;
    state.current.lastX = 0;
    state.current.lastY = 0;
    state.current.lastT = 0;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPointerDown = (e) => {
      // Ignore si clic sur un élément interactif
      const target = e.target;
      if (
        target.closest(
          "a, button, input, textarea, select, [data-no-swipe]"
        )
      ) {
        return;
      }

      const t = performance.now();
      state.current.active = true;
      state.current.startX = e.clientX;
      state.current.startY = e.clientY;
      state.current.startT = t;
      state.current.lastX = e.clientX;
      state.current.lastY = e.clientY;
      state.current.lastT = t;

      if (onSwipeStart) onSwipeStart(e);
    };

    const onPointerMove = (e) => {
      if (!state.current.active) return;
      state.current.lastX = e.clientX;
      state.current.lastY = e.clientY;
      state.current.lastT = performance.now();
    };

    const onPointerUp = (e) => {
      if (!state.current.active) return;

      const t = performance.now();
      const dx = e.clientX - state.current.startX;
      const dy = e.clientY - state.current.startY;
      const dt = Math.max(1, t - state.current.startT);
      const vx = dx / dt;
      const vy = dy / dt;

      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      let direction = null;

      if (absX > absY) {
        if (absX >= threshold || Math.abs(vx) >= velocity) {
          direction = dx < 0 ? "left" : "right";
        }
      } else {
        if (absY >= threshold || Math.abs(vy) >= velocity) {
          direction = dy < 0 ? "up" : "down";
        }
      }

      if (direction) {
        if (direction === "left" && onSwipeLeft) onSwipeLeft({ dx, dy, vx, vy });
        if (direction === "right" && onSwipeRight) onSwipeRight({ dx, dy, vx, vy });
        if (direction === "up" && onSwipeUp) onSwipeUp({ dx, dy, vx, vy });
        if (direction === "down" && onSwipeDown) onSwipeDown({ dx, dy, vx, vy });
        if (onSwipe) onSwipe(direction, { dx, dy, vx, vy });
      }

      if (onSwipeEnd) onSwipeEnd(direction, { dx, dy, vx, vy });

      reset();
    };

    const onPointerCancel = () => {
      reset();
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerCancel);
    el.addEventListener("pointerleave", onPointerCancel);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerCancel);
      el.removeEventListener("pointerleave", onPointerCancel);
    };
  }, [
    threshold,
    velocity,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onSwipe,
    onSwipeStart,
    onSwipeEnd,
    reset,
  ]);

  return ref;
}

export default useSwipe;