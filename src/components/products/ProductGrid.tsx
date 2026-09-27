import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductGridProps {
  products: Product[];
  totalCount: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const ProductGrid = ({
  products,
  totalCount,
  onLoadMore,
  hasMore = true,
}: ProductGridProps) => {
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return a.isNew ? -1 : 1;
      case "discount":
        return b.discount - a.discount;
      default:
        return a.isBestSeller ? -1 : 1;
    }
  });

  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <p className="text-sm text-muted-foreground">
          Showing 1 - {products.length} of {totalCount} results
        </p>

        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="hidden md:flex items-center gap-1 border border-border rounded-md p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <List size={18} />
            </button>
          </div>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by popularity" />
            </SelectTrigger>
            <SelectContent className="bg-background border">
              <SelectItem value="popularity">Sort by popularity</SelectItem>
              <SelectItem value="newest">Sort by newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="discount">Highest Discount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {sortedProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && onLoadMore && (
        <div className="mt-12 text-center">
          <Button
            onClick={onLoadMore}
            variant="outline"
            className="px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            LOAD MORE
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
