"use client";

import { useState } from "react";
import "./page.css";

/**
 * FAQ.
 *
 * ⚠️ Les réponses non fournies sont marquées « À compléter ».
 *    Aucune information inventée.
 *
 * Comportement : accordéon (une seule question ouverte à la fois).
 * Accessibilité : boutons clavier, aria-expanded, aria-controls.
 */

const faqItems = [
  {
    id: "delais",
    question: "Quels sont les délais de fabrication ?",
    answer: "À compléter.",
  },
  {
    id: "livraison",
    question: "Comment se passe la livraison ?",
    answer: "À compléter.",
  },
  {
    id: "paiement",
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "À compléter.",
  },
  {
    id: "personnalisation",
    question: "Peut-on personnaliser une commande ?",
    answer: "À compléter.",
  },
  {
    id: "matieres",
    question: "Quelles matières utilisez-vous ?",
    answer:
      "Nous utilisons notamment du pagne, du cuir local, du Faso Danfani, du Woodin et du bogolan.",
  },
  {
    id: "contact",
    question: "Comment vous contacter ?",
    answer:
      "Par téléphone au +226 64 45 01 52, par email à zinatouyaguibou@gmail.com, ou par WhatsApp.",
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
          Vous trouverez ici les réponses aux questions les plus courantes.
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
    </div>
  );
}