import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { products, priceFilters } from "@/data/products";

const BestOffersPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedHighlight, setSelectedHighlight] = useState("all");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(16);

  // Sort by discount and filter
  const filteredProducts = useMemo(() => {
    let result = [...products].sort((a, b) => b.discount - a.discount);

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedHighlight === "best-seller") {
      result = result.filter((p) => p.isBestSeller);
    } else if (selectedHighlight === "new-arrivals") {
      result = result.filter((p) => p.isNew);
    } else if (selectedHighlight === "sale") {
      result = result.filter((p) => p.isSale);
    }

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
            { label: "Best Offers" },
          ]}
        />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold mb-4">🔥 Best Offers</h1>
          <p className="text-muted-foreground">
            Amazing discounts on your favorite streetwear - up to 40% off!
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

export default BestOffersPage;
