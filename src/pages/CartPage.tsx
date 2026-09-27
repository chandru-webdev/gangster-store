import { Link } from "react-router-dom";
import { Minus, Plus, X, Truck } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const { toast } = useToast();

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleUpdateCart = () => {
    toast({
      title: "Cart updated!",
      description: "Your cart has been updated successfully.",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "This feature will be available soon!",
    });
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: "My Cart" },
          ]}
        />

        <h1 className="text-3xl font-display font-bold mb-8">My Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notice */}
            <div className="flex items-start justify-between p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground flex-1 pr-4">
                Cash on Delivery and Return services include additional service fees. For Cash on Delivery, a minimal advance helps us verify orders and ensure smooth delivery.
              </p>
              <Button 
                onClick={handleCheckout}
                className="bg-foreground text-background hover:bg-foreground/90 whitespace-nowrap"
              >
                CHECKOUT
              </Button>
            </div>

            {/* Cart Table */}
            <div className="border border-border rounded-lg overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium border-b border-border">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Items */}
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="grid grid-cols-12 gap-4 p-4 items-center border-b border-border last:border-b-0"
                >
                  {/* Product */}
                  <div className="col-span-6 flex items-center gap-4">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X size={16} />
                    </button>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="w-16 h-20 bg-muted rounded overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-medium hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center">
                    ₹{item.product.price.toLocaleString()}
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border border-input rounded">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-2 text-right font-medium">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Update Cart Button */}
            <div className="flex justify-end">
              <Button variant="outline" onClick={handleUpdateCart}>
                UPDATE CART
              </Button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6 sticky top-32 space-y-4">
              <h2 className="text-xl font-semibold">Cart totals</h2>

              <div className="flex justify-between py-3 border-b border-border">
                <span>Subtotal</span>
                <span className="text-primary font-medium">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="py-3 border-b border-border">
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span>₹{shipping}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter your address to view shipping options.
                </p>
                <button className="text-sm text-primary hover:underline mt-1">
                  Calculate shipping
                </button>
              </div>

              <div className="flex justify-between py-3 text-lg font-semibold">
                <span>Total</span>
                <span className="text-primary">₹{total.toLocaleString()}</span>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
              >
                PROCEED TO CHECKOUT
              </Button>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm font-medium mb-2">
                  Guaranteed Safe And Secure Checkout
                </p>
                <div className="flex justify-center gap-2">
                  <span className="px-2 py-1 bg-muted rounded text-xs">Visa</span>
                  <span className="px-2 py-1 bg-muted rounded text-xs">GPay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
