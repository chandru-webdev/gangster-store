import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { categories, priceFilters, highlights } from "@/data/products";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  selectedHighlight: string;
  onHighlightChange: (highlight: string) => void;
  selectedPriceFilter: string;
  onPriceFilterChange: (filter: string) => void;
}

const ProductFilters = ({
  selectedCategories,
  onCategoryChange,
  selectedHighlight,
  onHighlightChange,
  selectedPriceFilter,
  onPriceFilterChange,
}: ProductFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    highlight: true,
    price: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      onCategoryChange([...selectedCategories, categoryId]);
    } else {
      onCategoryChange(selectedCategories.filter((c) => c !== categoryId));
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 space-y-6 sticky top-32">
      {/* Search within categories */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Shop By Categories */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full font-semibold mb-3"
        >
          Shop By Categories
          {expandedSections.categories ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {expandedSections.categories && (
          <div className="space-y-2">
            {filteredCategories.map((category) => (
              <label key={category.id} className="filter-checkbox">
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <span className="text-sm">
                  {category.name} ({category.count})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Highlight */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => toggleSection("highlight")}
          className="flex items-center justify-between w-full font-semibold mb-3"
        >
          Highlight
          {expandedSections.highlight ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {expandedSections.highlight && (
          <div className="space-y-2">
            {highlights.map((highlight) => (
              <button
                key={highlight.id}
                onClick={() => onHighlightChange(highlight.id)}
                className={cn(
                  "block w-full text-left text-sm py-1 px-2 rounded transition-colors",
                  selectedHighlight === highlight.id
                    ? "text-primary font-medium bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {highlight.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="pb-4">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full font-semibold mb-3"
        >
          Price Filter
          {expandedSections.price ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {expandedSections.price && (
          <div className="space-y-2">
            {priceFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onPriceFilterChange(filter.id)}
                className={cn(
                  "block w-full text-left text-sm py-1 px-2 rounded transition-colors",
                  selectedPriceFilter === filter.id
                    ? "text-primary font-medium bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
