import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { products, priceFilters } from "@/data/products";

const TrendingPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedHighlight, setSelectedHighlight] = useState("all");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(16);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Apply highlight filter
    if (selectedHighlight === "best-seller") {
      result = result.filter((p) => p.isBestSeller);
    } else if (selectedHighlight === "new-arrivals") {
      result = result.filter((p) => p.isNew);
    } else if (selectedHighlight === "sale") {
      result = result.filter((p) => p.isSale);
    }

    // Apply price filter
    const priceFilter = priceFilters.find((f) => f.id === selectedPriceFilter);
    if (priceFilter && selectedPriceFilter !== "all") {
      result = result.filter(
        (p) => p.price >= priceFilter.min && p.price <= priceFilter.max
      );
    }

    return result;
  }, [selectedCategories, selectedHighlight, selectedPriceFilter]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 16);
  };

  return (
    <Layout>
      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: "Trending Now" },
          ]}
        />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold mb-4">Trending Now</h1>
          <p className="text-muted-foreground">
            Discover what's hot right now - our most popular styles
          </p>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block">
            <ProductFilters
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              selectedHighlight={selectedHighlight}
              onHighlightChange={setSelectedHighlight}
              selectedPriceFilter={selectedPriceFilter}
              onPriceFilterChange={setSelectedPriceFilter}
            />
          </aside>

          <ProductGrid
            products={displayedProducts}
            totalCount={filteredProducts.length}
            onLoadMore={loadMore}
            hasMore={hasMore}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TrendingPage;
