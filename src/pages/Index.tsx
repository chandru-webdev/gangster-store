import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹999",
  },
  {
    icon: Shield,
    title: "100% Original",
    description: "Guaranteed authentic products",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7 days return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer service",
  },
];

const categories = [
  {
    name: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    href: "/category/hoodies",
  },
  {
    name: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    href: "/category/tshirts",
  },
  {
    name: "Bottoms",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
    href: "/category/bottoms",
  },
  {
    name: "Shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    href: "/category/shirts",
  },
];

const Index = () => {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-muted to-background py-16 md:py-24 overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-slide-up">
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                New Collection 2024
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                Street Style
                <br />
                <span className="text-gradient">Redefined</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Discover our latest collection of streetwear essentials. 
                Bold designs, premium quality, unmatched comfort.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/new-arrivals">
                    Shop New Arrivals
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/category/hoodies">Browse Hoodies</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=700&fit=crop"
                alt="Fashion Model"
                className="relative z-10 rounded-2xl shadow-2xl animate-fade-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Find your perfect style</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.href}
                className="group relative overflow-hidden rounded-xl aspect-[3/4] animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-background">{category.name}</h3>
                  <span className="text-sm text-background/80 group-hover:text-background transition-colors flex items-center gap-1">
                    Shop Now <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold">New Arrivals</h2>
              <p className="text-muted-foreground">Fresh drops just for you</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/new-arrivals">
                View All <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Banner */}
      <section className="py-16">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl bg-foreground text-background p-8 md:p-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-primary font-semibold">Best Sellers</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Our Most Popular Picks
                </h2>
                <p className="text-background/70">
                  Shop our customer favorites. These trending pieces are flying off the shelves!
                </p>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/best-offers">Shop Best Sellers</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {bestSellers.slice(0, 2).map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group relative overflow-hidden rounded-lg aspect-square"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-background/90 backdrop-blur-sm rounded p-2">
                      <p className="text-foreground text-xs font-medium truncate">{product.name}</p>
                      <p className="text-primary font-semibold">₹{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold mb-2">Trending Now</h2>
            <p className="text-muted-foreground">What everyone's wearing</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/trending">
                View All Trending <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
