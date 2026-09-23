"use client";

import { useState } from "react";
import "./page.css";

import Input from "@/components/ui/Input";
import site from "@/data/site";
import { whatsappGeneralLink } from "@/lib/whatsapp";

const IconPhone = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const IconPin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02z" />
  </svg>
);

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [feedback, setFeedback] = useState("");

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Veuillez indiquer votre nom.";
    if (!form.email.trim()) {
      errs.email = "Veuillez indiquer votre email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Adresse email invalide.";
    }
    if (!form.message.trim()) errs.message = "Veuillez écrire un message.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      setStatus("error");
      setFeedback("Veuillez corriger les erreurs du formulaire.");
      return;
    }

    // Aucun backend n'est configuré : le formulaire n'envoie rien.
    setStatus("success");
    setFeedback(
      "Merci ! Le formulaire de contact n'est pas encore relié à un service d'envoi. Contactez-nous directement par téléphone, email ou WhatsApp."
    );
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact">
      {/* En-tête */}
      <header className="contact__header container">
        <p className="contact__eyebrow">Nous joindre</p>
        <h1 className="contact__title">Contact</h1>
        <p className="contact__subtitle">
          Pour toute question ou commande, contactez-nous.
        </p>
      </header>

      <div className="contact__layout container">
        {/* Coordonnées */}
        <aside className="contact__info" aria-label="Coordonnées">
          <h2 className="contact__info-title">Coordonnées</h2>

          <ul className="contact__list">
            <li className="contact__item">
              <span className="contact__item-icon"><IconPin /></span>
              <div>
                <p className="contact__item-label">Adresse</p>
                <p className="contact__item-value">
                  Rue Gang-La-Pelga, Zogona, Ouagadougou
                </p>
              </div>
            </li>

            <li className="contact__item">
              <span className="contact__item-icon"><IconPhone /></span>
              <div>
                <p className="contact__item-label">Téléphone</p>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="contact__item-link"
                >
                  {site.phoneIntl}
                </a>
              </div>
            </li>

            <li className="contact__item">
              <span className="contact__item-icon"><IconMail /></span>
              <div>
                <p className="contact__item-label">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="contact__item-link"
                >
                  {site.email}
                </a>
              </div>
            </li>
          </ul>

          <div className="contact__actions">
            <a
              href={whatsappGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__btn contact__btn--whatsapp"
            >
              <IconWhatsApp />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${site.phoneRaw}`}
              className="contact__btn contact__btn--phone"
            >
              <IconPhone />
              <span>Appeler</span>
            </a>
          </div>
        </aside>

        {/* Formulaire */}
        <form
          className="contact__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="contact__form-title">Formulaire</h2>

          <div className="contact__fields">
            <Input
              label="Nom complet"
              name="name"
              value={form.name}
              onChange={update("name")}
              placeholder="Votre nom"
              required
              error={errors.name}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="votre@email.com"
              required
              error={errors.email}
            />

            <div className="contact__textarea-wrap">
              <label htmlFor="contact-message" className="contact__label">
                Message <span className="contact__required">*</span>
              </label>
              <textarea
                id="contact-message"
                className={`contact__textarea${
                  errors.message ? " is-error" : ""
                }`}
                rows={5}
                value={form.message}
                onChange={update("message")}
                placeholder="Votre message…"
              />
              {errors.message && (
                <p className="contact__error" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          {feedback && (
            <p
              className={`contact__feedback is-${status}`}
              role={status === "error" ? "alert" : "status"}
            >
              {feedback}
            </p>
          )}

          <button
            type="submit"
            className="contact__btn contact__btn--primary"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}