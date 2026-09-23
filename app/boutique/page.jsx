"use client";

import { useMemo, useState } from "react";
import "./page.css";

import ProductGrid from "@/components/catalog/ProductGrid";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import CatalogEmpty from "@/components/catalog/CatalogEmpty";
import SearchBar from "@/components/catalog/SearchBar";
import SortSelect from "@/components/catalog/SortSelect";
import FilterPanel from "@/components/catalog/FilterPanel";
import ProductSwipe from "@/components/product/ProductSwipe";

import {
  getAllProducts,
  sortProducts,
  searchProducts,
  withImages,
} from "@/lib/products";

export default function BoutiquePage() {
  // ✅ Enrichit la liste brute (images .jpeg)
  const all = useMemo(() => withImages(getAllProducts()), []);

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    availability: "",
  });
  const [sort, setSort] = useState("default");
  const [view, setView] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Pipeline : recherche → filtres → tri → images
  const products = useMemo(() => {
    let list = query.trim() ? searchProducts(query) : all;

    if (filters.category) {
      list = list.filter((p) => p.category === filters.category);
    }

    if (filters.availability === "available") {
      list = list.filter((p) => p.price != null);
    } else if (filters.availability === "ask") {
      list = list.filter((p) => p.price == null);
    }

    list = sortProducts(list, sort);

    // ✅ Garantit que chaque produit a son image (.jpeg)
    return withImages(list);
  }, [all, query, filters, sort]);

  const handleReset = () => {
    setQuery("");
    setFilters({ category: "", availability: "" });
    setSort("default");
  };

  return (
    <div className="boutique">
      <header className="boutique__header container">
        <p className="boutique__eyebrow">Catalogue</p>
        <h1 className="boutique__title">Boutique</h1>
        <p className="boutique__subtitle">
          Découvrez tous nos articles faits main en jute et wax.
        </p>
      </header>

      <div className="boutique__search container">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Rechercher un produit…"
        />
      </div>

      <div className="boutique__layout container">
        <aside className="boutique__sidebar" aria-label="Filtres">
          <FilterPanel
            variant="inline"
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
          />
        </aside>

        <div className="boutique__main">
          <CatalogToolbar
            count={products.length}
            sort={sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
            onOpenFilters={() => setFiltersOpen(true)}
            sortComponent={
              <SortSelect value={sort} onChange={setSort} />
            }
          />

          {products.length === 0 ? (
            <CatalogEmpty onReset={handleReset} query={query.trim()} />
          ) : view === "grid" ? (
            <ProductGrid products={products} />
          ) : (
            <div className="boutique__swipe">
              <ProductSwipe products={products} />
            </div>
          )}
        </div>
      </div>

      <FilterPanel
        variant="drawer"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
      />
    </div>
  );
}