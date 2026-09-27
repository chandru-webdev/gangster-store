import { useSearchParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { Search, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }, [query]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: `Search: "${query}"` },
  ];

  const handleProductClick = (product: typeof products[0]) => {
    // Add to cart with default size and quantity
    addToCart(product, 1, product.sizes[0] || "M");
    toast.success(`${product.name} added to cart!`);
    navigate("/cart");
  };

  const handleWishlistClick = (e: React.MouseEvent, product: typeof products[0]) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products found
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => {
              const inWishlist = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="group product-card block cursor-pointer"
                >
                  <div className="relative overflow-hidden bg-muted aspect-[3/4]">
                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <span className="discount-badge z-10">
                        -{product.discount}%
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => handleWishlistClick(e, product)}
                      className={cn(
                        "absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm transition-all duration-300",
                        "hover:bg-background hover:scale-110",
                        inWishlist && "text-primary"
                      )}
                    >
                      <Heart
                        size={18}
                        className={cn(inWishlist && "fill-current")}
                      />
                    </button>

                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
                        Click to Add to Cart
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="price-original">₹{product.originalPrice.toLocaleString()}</span>
                      <span className="price-sale text-lg">₹{product.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 text-center py-16">
            <Search className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any products matching "{query}". Try searching with different keywords.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
