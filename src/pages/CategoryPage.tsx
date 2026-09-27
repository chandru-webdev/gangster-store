import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { products, priceFilters } from "@/data/products";

const categoryTitles: Record<string, string> = {
  hoodies: "Hoodies",
  tshirts: "T-Shirts",
  bottoms: "Bottoms",
  shirts: "Shirts",
};

const categoryDescriptions: Record<string, string> = {
  hoodies:
    "Men's hoodies are designed to deliver everyday comfort with streetwear styling. Made from soft, breathable fabric, these hoodies offer a relaxed fit that's perfect for casual wear, featuring eye-catching block prints, acid prints, and graphic designs, they add a strong urban edge to your look.",
  tshirts:
    "Discover our collection of oversized and classic t-shirts. From graphic prints to minimal designs, find your perfect everyday essential.",
  bottoms:
    "Explore our range of pants, jeans, and trousers. From Italian style formal pants to relaxed fit denim, we have something for every occasion.",
  shirts:
    "Browse our collection of casual and formal shirts. Quarter zips, embroidered designs, and classic fits available.",
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedHighlight, setSelectedHighlight] = useState("all");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.category === category);

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
  }, [category, selectedHighlight, selectedPriceFilter]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const title = categoryTitles[category || ""] || "Products";
  const description = categoryDescriptions[category || ""] || "";

  return (
    <Layout>
      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: title },
          ]}
        />

        {/* Category Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold mb-4">{title}</h1>
          {description && (
            <p className="text-muted-foreground max-w-3xl mx-auto text-sm leading-relaxed">
              {description}
            </p>
          )}
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

export default CategoryPage;
