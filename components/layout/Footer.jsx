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

const IconFacebook = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
  </svg>
);

const IconTikTok = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
  </svg>
);

const IconPin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
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
            {site.slogan}. Fait main, en jute et wax.
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
            <li>
              <a
                href={site.social.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__contact-link"
              >
                <IconPin />
                <span>
                  {site.address.street}, {site.address.city}
                </span>
              </a>
            </li>
          </ul>

          {/* -------- Réseaux sociaux avec texte -------- */}
          <div className="footer__social-block">
            <p className="footer__social-label">
              Suivez-nous pour ne rien manquer de nos nouveautés, coulisses et
              créations en exclusivité.
            </p>

            <div className="footer__social">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link footer__social-link--fb"
                aria-label="Suivre WYZ Accessoires sur Facebook"
              >
                <IconFacebook />
                <span>Facebook</span>
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link footer__social-link--tt"
                aria-label="Suivre WYZ Accessoires sur TikTok"
              >
                <IconTikTok />
                <span>TikTok</span>
              </a>
            </div>
          </div>
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

        {/* -------- Paiement + Compte -------- */}
        <div className="footer__col">
          <h3 className="footer__title">Paiement</h3>
          <ul className="footer__list">
            {site.payments.map((p) => (
              <li key={p.name} className="footer__payment">
                <span className="footer__payment-name">{p.name}</span>
                <span className="footer__payment-number">{p.number}</span>
              </li>
            ))}
          </ul>

          <h3 className="footer__title footer__title--spaced">Mon compte</h3>
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

      {/* -------- Carte Google Maps -------- */}
      <div className="footer__map">
        <div className="footer__map-inner container">
          <div className="footer__map-header">
            <h3 className="footer__map-title">Nous trouver</h3>
            <p className="footer__map-address">
              {site.address.full}
            </p>
            <a
              href={site.social.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__map-link"
            >
              Ouvrir dans Google Maps
              <span aria-hidden="true"> →</span>
            </a>
          </div>

          <div className="footer__map-frame">
            <iframe
              title="Localisation WYZ Accessoires sur Google Maps"
              src="https://www.google.com/maps?q=Zogona,+Ouagadougou,+Burkina+Faso&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
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