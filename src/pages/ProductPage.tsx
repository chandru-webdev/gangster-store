import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, Shuffle, Share2, Truck, CreditCard, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedProducts from "@/components/products/RelatedProducts";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-semibold">Product not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            Return to home
          </Link>
        </div>
      </Layout>
    );
  }

  const productImages = product.images || [product.image];
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    addToCart(product, quantity, selectedSize);
    toast({
      title: "Added to cart!",
      description: `${product.name} (Size: ${selectedSize}) x ${quantity}`,
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard",
      });
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: product.category.charAt(0).toUpperCase() + product.category.slice(1), href: `/category/${product.category}` },
            { label: product.name },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
              {product.discount > 0 && (
                <span className="discount-badge z-10">
                  -{product.discount}%
                </span>
              )}
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-20 h-24 rounded-md overflow-hidden border-2 transition-all",
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/50"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="flex gap-4 justify-center py-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="text-primary" size={18} />
                <span>100% Original</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="text-primary" size={18} />
                <span>Lowest Price</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="text-primary" size={18} />
                <span>Partial COD</span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="price-original text-lg">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="price-sale text-2xl">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.discount > 0 && (
                  <span className="bg-primary/10 text-primary text-sm px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="font-semibold">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-12 h-12 border rounded-md font-medium transition-all",
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input hover:border-primary"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-input rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 py-6"
              >
                ADD TO CART
              </Button>
            </div>

            {/* Compare & Share */}
            <div className="flex gap-4 text-sm">
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <Shuffle size={16} />
                COMPARE
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Share2 size={16} />
                SHARE
              </button>
            </div>

            {/* Delivery Info */}
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="text-muted-foreground" size={16} />
                <span>ETA Prepaid: 1–2 business days</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="text-muted-foreground" size={16} />
                <span>ETA Partial COD: 4–5 business days</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="text-muted-foreground" size={16} />
                <span>Partial COD: Service fees applies</span>
              </div>
            </div>

            {/* Secure Checkout */}
            <div className="p-4 border border-border rounded-lg text-center">
              <p className="font-medium mb-2">Guaranteed Safe And Secure Checkout</p>
              <div className="flex justify-center gap-2">
                <span className="px-2 py-1 bg-muted rounded text-xs">Visa</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">GPay</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">Mastercard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="additional"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Additional Information
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {product.description}
              </p>
            </TabsContent>
            <TabsContent value="additional" className="pt-6">
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {product.additionalInfo}
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </Layout>
  );
};

export default ProductPage;
