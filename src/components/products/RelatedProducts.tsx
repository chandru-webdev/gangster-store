import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

const RelatedProducts = ({ products, title = "Related Products" }: RelatedProductsProps) => {
  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-display font-semibold text-center mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.slice(0, 5).map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
