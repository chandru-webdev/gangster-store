import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

// Demo orders data
const demoOrders = [
  {
    id: "ORD12345678",
    date: "2024-01-15",
    status: "delivered",
    total: 2499,
    items: [
      { name: "Classic Black Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", quantity: 1, price: 1499 },
      { name: "Urban White Tee", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", quantity: 1, price: 1000 },
    ],
  },
  {
    id: "ORD87654321",
    date: "2024-01-10",
    status: "shipped",
    total: 1899,
    items: [
      { name: "Slim Fit Jeans", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400", quantity: 1, price: 1899 },
    ],
  },
  {
    id: "ORD11223344",
    date: "2024-01-08",
    status: "processing",
    total: 3299,
    items: [
      { name: "Premium Casual Shirt", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400", quantity: 2, price: 1649 },
    ],
  },
];

const statusConfig = {
  processing: { label: "Processing", icon: Clock, color: "text-yellow-600 bg-yellow-100" },
  shipped: { label: "Shipped", icon: Truck, color: "text-blue-600 bg-blue-100" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "text-green-600 bg-green-100" },
};

const OrdersPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "My Orders" },
  ];

  return (
    <Layout>
      <div className="container py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <h1 className="text-2xl md:text-3xl font-display font-bold mt-6 mb-8">My Orders</h1>

        {demoOrders.length > 0 ? (
          <div className="space-y-6">
            {demoOrders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              
              return (
                <div key={order.id} className="bg-card border border-border rounded-lg overflow-hidden">
                  {/* Order Header */}
                  <div className="p-4 border-b border-border bg-muted/30 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.date).toLocaleDateString('en-IN', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${status.color}`}>
                      <StatusIcon size={16} />
                      {status.label}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="font-semibold mt-1">₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="p-4 border-t border-border bg-muted/30 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-muted-foreground">Total: </span>
                      <span className="text-lg font-semibold">₹{order.total.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">Track Order</Button>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
            <Button asChild>
              <Link to="/">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
