import Link from "next/link";

import Logo from "./Logo";
import { footerNav } from "@/data/navigation";
import site from "@/data/site";
import { whatsappGeneralLink } from "@/lib/whatsapp";

import "./Footer.css";

const IconPhone = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        {/* -------- Colonne marque -------- */}
        <div className="footer__col footer__col--brand">
          <Logo variant="light" />

          <p className="footer__tagline">
            {site.tagline}. Fait main, en jute et wax.
          </p>

          <ul className="footer__contact">
            <li>
              <a href={`tel:${site.phoneRaw}`} className="footer__contact-link">
                <IconPhone />
                <span>{site.phoneIntl}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="footer__contact-link"
              >
                <IconMail />
                <span>{site.email}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__contact-link footer__contact-link--wa"
              >
                <IconWhatsApp />
                <span>WhatsApp</span>
              </a>
            </li>
          </ul>
        </div>

        {/* -------- Boutique -------- */}
        <div className="footer__col">
          <h3 className="footer__title">Boutique</h3>
          <ul className="footer__list">
            {footerNav.boutique.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* -------- Informations -------- */}
        <div className="footer__col">
          <h3 className="footer__title">Informations</h3>
          <ul className="footer__list">
            {footerNav.informations.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* -------- Compte -------- */}
        <div className="footer__col">
          <h3 className="footer__title">Mon compte</h3>
          <ul className="footer__list">
            {footerNav.compte.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* -------- Bas de footer -------- */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner container">
          <p className="footer__copy">
            © {year} {site.name}. Tous droits réservés.
          </p>

          <ul className="footer__legal">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer__legal-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}