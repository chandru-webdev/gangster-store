import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";

const OrderConfirmationPage = () => {
  const orderNumber = `ORD${Date.now().toString().slice(-8)}`;

  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Order Placed Successfully!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-2">
            Thank you for shopping with us
          </p>
          
          <p className="text-muted-foreground mb-8">
            Your order number is: <span className="font-semibold text-foreground">{orderNumber}</span>
          </p>

          {/* Order Timeline */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-6">What happens next?</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Order Confirmation</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive an email with order details
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Processing</h3>
                <p className="text-sm text-muted-foreground">
                  We'll prepare your items for shipping
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Expected delivery in 5-7 business days
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/orders">Track Order</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
