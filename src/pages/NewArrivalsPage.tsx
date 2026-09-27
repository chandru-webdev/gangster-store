import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { products, priceFilters, categories } from "@/data/products";

const NewArrivalsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedHighlight, setSelectedHighlight] = useState("all");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(16);

  const filteredProducts = useMemo(() => {
    let result = products;

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
            { label: "New Arrivals" },
          ]}
        />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold mb-4">New Arrivals</h1>
          <p className="text-sm text-muted-foreground">
            Showing 1 - {displayedProducts.length} of {filteredProducts.length} results
          </p>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
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

          {/* Products */}
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

export default NewArrivalsPage;
