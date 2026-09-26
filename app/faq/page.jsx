"use client";

import { useState } from "react";
import "./page.css";

/**
 * FAQ WYZ Accessoires.
 *
 * Contenu réel :
 *  - Modes de paiement (Orange Money, Moov Money, Wave)
 *  - Livraison (Burkina Faso + étranger sur demande)
 *  - Matières (pagne, cuir local, batik, koko dunda, wax)
 *  - Prestations entreprises + formations
 *  - Contact (téléphone, email, WhatsApp, adresse)
 *
 * ⚠️ Les délais de fabrication ne sont pas encore définis → « À compléter ».
 *
 * Comportement : accordéon (une seule question ouverte à la fois).
 * Accessibilité : boutons clavier, aria-expanded, aria-controls.
 */

const faqItems = [
  {
    id: "matieres",
    question: "Quelles matières utilisez-vous ?",
    answer:
      "Nous travaillons uniquement des matières locales, choisies pour leur qualité et leur authenticité : pagne, cuir local, batik, koko dunda batik et wax.",
  },
  {
    id: "paiement",
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Nous acceptons les paiements via mobile money : Orange Money (65 45 01 52), Moov Money (70 17 21 47) et Wave (70 17 21 47). Nous travaillons actuellement à l'ajout de PayPal pour les commandes internationales.",
  },
  {
    id: "livraison",
    question: "Comment se passe la livraison ?",
    answer:
      "Nous livrons au Burkina Faso. Pour les livraisons à l'étranger, chaque demande est étudiée au cas par cas : contactez-nous par WhatsApp ou téléphone pour obtenir une proposition adaptée à votre pays.",
  },
  {
    id: "personnalisation",
    question: "Peut-on personnaliser une commande ?",
    answer:
      "Oui. Nous réalisons des créations personnalisées, notamment des gadgets personnalisés pour les entreprises. Contactez-nous pour discuter de votre projet.",
  },
  {
    id: "entreprises",
    question: "Proposez-vous des prestations pour les entreprises ?",
    answer:
      "Oui. WYZ Accessoires accompagne les entreprises dans la création de gadgets personnalisés : objets utiles et esthétiques à votre image. Contactez-nous pour un devis.",
  },
  {
    id: "formations",
    question: "Proposez-vous des formations ?",
    answer:
      "Oui. Nous proposons des formations pour apprendre les techniques de création artisanale. Elles sont disponibles sur demande — contactez-nous pour plus d'informations.",
  },
  {
    id: "delais",
    question: "Quels sont les délais de fabrication ?",
    answer: "À compléter.",
  },
  {
    id: "contact",
    question: "Comment vous contacter ?",
    answer:
      "Par téléphone au +226 64 45 01 52, par email à zinatouyaguibou@gmail.com, ou par WhatsApp. Vous pouvez aussi nous rendre visite : Rue Gang-La-Pelga, Zogona, Ouagadougou.",
  },
];

export default function FaqPage() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <div className="faq">
      {/* En-tête */}
      <header className="faq__header container">
        <p className="faq__eyebrow">Aide</p>
        <h1 className="faq__title">Questions fréquentes</h1>
        <p className="faq__subtitle">
          Vous trouverez ici les réponses aux questions les plus courantes sur
          nos créations, nos commandes et nos services.
        </p>
      </header>

      {/* Liste accordéon */}
      <div className="faq__list container">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `faq-panel-${item.id}`;
          const btnId = `faq-btn-${item.id}`;

          return (
            <div
              key={item.id}
              className={`faq__item${isOpen ? " is-open" : ""}`}
            >
              <h2 className="faq__question-wrap">
                <button
                  id={btnId}
                  type="button"
                  className="faq__question"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                >
                  <span className="faq__question-text">{item.question}</span>
                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h2>

              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className="faq__answer"
                hidden={!isOpen}
              >
                <p className="faq__answer-text">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bloc contact final */}
      <div className="faq__cta container">
        <p className="faq__cta-text">
          Vous ne trouvez pas la réponse à votre question ?
        </p>
        <a href="/contact" className="faq__cta-btn">
          Nous contacter
          <span aria-hidden="true"> →</span>
        </a>
      </div>
    </div>
  );
}