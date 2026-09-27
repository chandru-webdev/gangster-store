import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/products/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";

const WishlistPage = () => {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">
            Save items you love to your wishlist and shop them anytime.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/">Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <Breadcrumbs items={[{ label: "My Wishlist" }]} />

        <h1 className="text-3xl font-display font-bold mb-8">
          My Wishlist ({items.length} items)
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
