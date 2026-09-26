"use client";

import "./FounderVideo.css";

const IconTikTok = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="22"
    height="22"
    aria-hidden="true"
    {...props}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
  </svg>
);

const IconPlay = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="18"
    height="18"
    aria-hidden="true"
    {...props}
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

/**
 * FounderVideo
 * Bloc CTA "Voir la vidéo" → ouvre TikTok dans un nouvel onglet.
 *
 * Props :
 *  - videoUrl : URL TikTok complète de la vidéo
 *  - caption  : texte affiché
 */
export default function FounderVideo({
  videoUrl,
  caption = "Découvrez le parcours de la promotrice WYZ Accessoires.",
}) {
  if (!videoUrl) {
    return (
      <div className="founder-video founder-video--placeholder">
        <p className="founder-video__text">
          🎬 Découvrez son parcours — vidéo à venir
        </p>
      </div>
    );
  }

  return (
    <div className="founder-video">
      {/* Fond décoratif */}
      <div className="founder-video__bg" aria-hidden="true" />

      <div className="founder-video__content">
        <div className="founder-video__icon" aria-hidden="true">
          <IconTikTok />
        </div>

        <p className="founder-video__eyebrow">Vidéo documentaire</p>

        <h3 className="founder-video__title">Découvrez son parcours</h3>

        <p className="founder-video__caption">{caption}</p>

        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="founder-video__btn"
        >
          <IconPlay />
          <span>Voir sur TikTok</span>
        </a>
      </div>
    </div>
  );
}