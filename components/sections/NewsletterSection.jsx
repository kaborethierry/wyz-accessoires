"use client";

import { useState } from "react";
import "./NewsletterSection.css";

/**
 * NewsletterSection
 * Collecte d'email.
 *
 * ⚠️ IMPORTANT :
 *    Aucun service newsletter n'est configuré.
 *    Le frontend NE PRÉTEND PAS enregistrer réellement l'inscription.
 *    Le formulaire valide simplement côté client et affiche un message
 *    informatif ("Inscription non active pour le moment").
 *
 * États : normal | validation | succès | erreur
 */
export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [message, setMessage] = useState("");

  const isValidEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Veuillez saisir une adresse email valide.");
      return;
    }

    // Aucun service newsletter n'est connecté.
    setStatus("success");
    setMessage(
      "Merci ! L'inscription à la newsletter n'est pas encore active."
    );
    setEmail("");
  };

  return (
    <section className="newsletter" aria-label="Newsletter">
      <div className="container newsletter__inner">
        <div className="newsletter__content">
          <h2 className="newsletter__title">Newsletter</h2>
          <p className="newsletter__text">
            Laissez votre email pour être informé(e) de nos nouveautés.
          </p>
        </div>

        <form
          className={`newsletter__form is-${status}`}
          onSubmit={handleSubmit}
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Adresse email
          </label>

          <input
            id="newsletter-email"
            type="email"
            className="newsletter__input"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") {
                setStatus("idle");
                setMessage("");
              }
            }}
            autoComplete="email"
            required
          />

          <button type="submit" className="newsletter__btn">
            S&apos;inscrire
          </button>

          {message && (
            <p
              className={`newsletter__msg is-${status}`}
              role={status === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}