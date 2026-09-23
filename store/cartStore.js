"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * cartStore
 * État global du panier WYZ Accessoires.
 *
 * Fonctions :
 *  - addItem(product, quantity)
 *  - removeItem(id)
 *  - updateQuantity(id, quantity)
 *  - clear()
 *  - count()          → nombre total d'articles
 *  - total()          → somme totale (ignore les produits "Prix sur demande")
 *
 * Persistance : localStorage (clé "wyz-cart")
 * Hydratation : gérée via onRehydrateStorage + flag _hydrated
 */

const STORAGE_KEY = "wyz-cart";

const initialState = {
  items: [], // [{ id, slug, name, price, priceDisplay, category, quantity, image }]
  _hydrated: false,
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      /* ---------------------------------------------------
       * AJOUTER un produit
       * Si déjà présent, on incrémente la quantité.
       * --------------------------------------------------- */
      addItem: (product, quantity = 1) => {
        if (!product || !product.id) return;

        const items = get().items;
        const existing = items.find((it) => it.id === product.id);

        let nextItems;
        if (existing) {
          nextItems = items.map((it) =>
            it.id === product.id
              ? { ...it, quantity: it.quantity + quantity }
              : it
          );
        } else {
          nextItems = [
            ...items,
            {
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price ?? null,
              priceDisplay: product.priceDisplay ?? "Prix sur demande",
              category: product.category ?? null,
              image: product.image ?? null,
              quantity,
            },
          ];
        }

        set({ items: nextItems });
      },

      /* ---------------------------------------------------
       * SUPPRIMER un produit
       * --------------------------------------------------- */
      removeItem: (id) => {
        set({ items: get().items.filter((it) => it.id !== id) });
      },

      /* ---------------------------------------------------
       * MODIFIER la quantité
       * quantity <= 0 → suppression
       * --------------------------------------------------- */
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((it) =>
            it.id === id ? { ...it, quantity } : it
          ),
        });
      },

      /* ---------------------------------------------------
       * VIDER le panier
       * --------------------------------------------------- */
      clear: () => {
        set({ items: [] });
      },

      /* ---------------------------------------------------
       * COMPTER les articles (somme des quantités)
       * --------------------------------------------------- */
      count: () => {
        return get().items.reduce((sum, it) => sum + it.quantity, 0);
      },

      /* ---------------------------------------------------
       * CALCULER le total (ignore "Prix sur demande")
       * --------------------------------------------------- */
      total: () => {
        return get().items.reduce((sum, it) => {
          if (it.price == null) return sum;
          return sum + it.price * it.quantity;
        }, 0);
      },

      /* ---------------------------------------------------
       * GETTER utilitaire : savoir si un produit est dans le panier
       * --------------------------------------------------- */
      hasItem: (id) => {
        return get().items.some((it) => it.id === id);
      },

      /* ---------------------------------------------------
       * HYDRA TATION
       * --------------------------------------------------- */
      _setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) state._setHydrated();
      },
      skipHydration: false,
    }
  )
);

export default useCartStore;