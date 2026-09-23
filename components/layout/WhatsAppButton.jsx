"use client";

import { useEffect, useState } from "react";
import useScroll from "@/hooks/useScroll";
import { whatsappGeneralLink } from "@/lib/whatsapp";

import "./WhatsAppButton.css";

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" {...props}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zM12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23z" />
  </svg>
);

export default function WhatsAppButton() {
  const { y } = useScroll(10);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const visible = mounted && y > 80;

  return (
    <a
      href={whatsappGeneralLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`wa-float${visible ? " is-visible" : ""}`}
      aria-label="Nous contacter sur WhatsApp"
    >
      <span className="wa-float__icon" aria-hidden="true">
        <IconWhatsApp />
      </span>
      <span className="wa-float__tooltip">Discuter sur WhatsApp</span>
    </a>
  );
}