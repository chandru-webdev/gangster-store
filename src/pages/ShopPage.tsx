import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { products } from "@/data/products";

const ShopPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedHighlight, setSelectedHighlight] = useState("");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("");
  const [displayCount, setDisplayCount] = useState(12);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop" },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.some(
          (cat) => p.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }

    if (selectedHighlight) {
      if (selectedHighlight === "new-arrivals") {
        result = result.filter((p) => p.isNew);
      } else if (selectedHighlight === "best-sellers") {
        result = result.filter((p) => p.isBestSeller);
      } else if (selectedHighlight === "sale") {
        result = result.filter((p) => p.discount > 0);
      }
    }

    if (selectedPriceFilter) {
      result = result.filter((p) => {
        if (selectedPriceFilter === "under-500") return p.price < 500;
        if (selectedPriceFilter === "500-1000") return p.price >= 500 && p.price <= 1000;
        if (selectedPriceFilter === "1000-2000") return p.price >= 1000 && p.price <= 2000;
        if (selectedPriceFilter === "above-2000") return p.price > 2000;
        return true;
      });
    }

    return result;
  }, [selectedCategories, selectedHighlight, selectedPriceFilter]);

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 12);
  };

  return (
    <Layout>
      <div className="container py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold">Shop All Products</h1>
          <p className="text-muted-foreground mt-1">
            Explore our complete collection
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              selectedHighlight={selectedHighlight}
              onHighlightChange={setSelectedHighlight}
              selectedPriceFilter={selectedPriceFilter}
              onPriceFilterChange={setSelectedPriceFilter}
            />
          </aside>

          <main className="lg:col-span-3">
            <ProductGrid
              products={displayedProducts}
              totalCount={filteredProducts.length}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
