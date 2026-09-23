// lib/utils.js
// Fonctions utilitaires réellement partagées.
// Principe : ne pas transformer ce fichier en "fourre-tout".

/**
 * Concatène des classes CSS conditionnelles.
 * Usage : cx("btn", isActive && "btn--active", size && `btn--${size}`)
 * @param  {...any} args
 */
export function cx(...args) {
  return args
    .flat()
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Vérifie si on est côté navigateur.
 */
export const isBrowser = typeof window !== "undefined";

/**
 * Retourne l'URL absolue d'un chemin (utile pour WhatsApp, SEO).
 * @param {string} path
 */
export function absoluteUrl(path = "") {
  if (isBrowser) {
    return `${window.location.origin}${path}`;
  }
  return path;
}

/**
 * Empêche les doubles appels pendant un court délai (throttle simple).
 * @param {Function} fn
 * @param {number} wait
 */
export function throttle(fn, wait = 100) {
  let last = 0;
  let timer = null;
  return function throttled(...args) {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      last = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

/**
 * Regroupe un tableau par clé.
 * @param {Array} list
 * @param {string} key
 */
export function groupBy(list, key) {
  return list.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

/**
 * Vérifie qu'une valeur est un objet simple.
 * @param {*} value
 */
export function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

export default {
  cx,
  isBrowser,
  absoluteUrl,
  throttle,
  groupBy,
  isPlainObject,
};