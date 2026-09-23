"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * favoritesStore
 * Gestion des favoris WYZ Accessoires.
 *
 * Fonctions :
 *  - add(product)
 *  - remove(id)
 *  - toggle(product)
 *  - isFavorite(id)
 *  - getList()
 *  - clear()
 *
 * Persistance : localStorage (clé "wyz-favorites")
 * Hydratation : gérée via onRehydrateStorage + flag _hydrated
 */

const STORAGE_KEY = "wyz-favorites";

const initialState = {
  items: [], // [{ id, slug, name, price, priceDisplay, category, image }]
  _hydrated: false,
};

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      /* ---------------------------------------------------
       * AJOUTER un favori
       * --------------------------------------------------- */
      add: (product) => {
        if (!product || !product.id) return;
        const items = get().items;
        if (items.some((it) => it.id === product.id)) return;

        set({
          items: [
            ...items,
            {
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price ?? null,
              priceDisplay: product.priceDisplay ?? "Prix sur demande",
              category: product.category ?? null,
              image: product.image ?? null,
            },
          ],
        });
      },

      /* ---------------------------------------------------
       * RETIRER un favori
       * --------------------------------------------------- */
      remove: (id) => {
        set({ items: get().items.filter((it) => it.id !== id) });
      },

      /* ---------------------------------------------------
       * TOGGLE (ajoute ou retire)
       * --------------------------------------------------- */
      toggle: (product) => {
        if (!product || !product.id) return;
        if (get().isFavorite(product.id)) {
          get().remove(product.id);
        } else {
          get().add(product);
        }
      },

      /* ---------------------------------------------------
       * VÉRIFIER si un produit est en favori
       * --------------------------------------------------- */
      isFavorite: (id) => {
        return get().items.some((it) => it.id === id);
      },

      /* ---------------------------------------------------
       * RÉCUPÉRER la liste complète
       * --------------------------------------------------- */
      getList: () => get().items,

      /* ---------------------------------------------------
       * VIDER tous les favoris
       * --------------------------------------------------- */
      clear: () => {
        set({ items: [] });
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

export default useFavoritesStore;