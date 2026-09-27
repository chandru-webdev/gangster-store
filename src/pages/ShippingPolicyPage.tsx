import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Truck, Clock, MapPin } from "lucide-react";

const ShippingPolicyPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shipping Policy" },
  ];

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />
        
        <h1 className="text-3xl md:text-4xl font-display font-bold mt-6 mb-8">Shipping Policy</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Truck className="mx-auto h-10 w-10 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Free Shipping</h3>
            <p className="text-sm text-muted-foreground">On orders above ₹999</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Clock className="mx-auto h-10 w-10 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">5-7 business days</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <MapPin className="mx-auto h-10 w-10 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Pan India</h3>
            <p className="text-sm text-muted-foreground">We deliver everywhere</p>
          </div>
        </div>

        <div className="prose prose-sm md:prose-base max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Shipping Charges</h2>
            <p className="text-muted-foreground">
              Free shipping on all orders above ₹999. For orders below ₹999, a flat shipping charge of ₹99 applies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Delivery Time</h2>
            <p className="text-muted-foreground">
              Standard delivery takes 5-7 business days. Metro cities may receive orders within 3-5 business days. Remote areas may take up to 10 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Order Tracking</h2>
            <p className="text-muted-foreground">
              Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order status in the "My Orders" section.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Cash on Delivery</h2>
            <p className="text-muted-foreground">
              Cash on Delivery (COD) is available for orders up to ₹5000. A nominal COD charge may apply.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicyPage;
