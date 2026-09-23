import { whatsappGeneralLink } from "@/lib/whatsapp";
import "./WhatsAppCTA.css";

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" {...props}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02z" />
  </svg>
);

/**
 * WhatsAppCTA
 * Convertit l'utilisateur vers WhatsApp.
 * Message prérempli : général.
 */
export default function WhatsAppCTA() {
  return (
    <section className="wa-cta" aria-label="Commander sur WhatsApp">
      <div className="container wa-cta__inner">
        <div className="wa-cta__content">
          <p className="wa-cta__eyebrow">Commandez facilement</p>

          <h2 className="wa-cta__title">
            Une question ? Une commande ?
          </h2>

          <p className="wa-cta__text">
            Contactez-nous directement sur WhatsApp pour toute demande
            d&apos;information, de prix ou de commande.
          </p>
        </div>

        <div className="wa-cta__action">
          <a
            href={whatsappGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-cta__btn"
          >
            <IconWhatsApp />
            <span>Discuter sur WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}