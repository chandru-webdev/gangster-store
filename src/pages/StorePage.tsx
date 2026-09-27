import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { MapPin, Phone, Clock } from "lucide-react";
import { storeLocations } from "@/data/products";

const storeDetails: Record<string, { address: string; phone: string; hours: string }> = {
  pondicherry: {
    address: "No 378, Near to Petit Canal Street, Mahatma Gandhi Road, Pondicherry MG Road-605001",
    phone: "(+91) 99407 37575",
    hours: "10:00 AM - 9:00 PM",
  },
  chennai: {
    address: "123, Anna Salai, Chennai - 600002",
    phone: "(+91) 90036 35574",
    hours: "10:00 AM - 9:00 PM",
  },
  bangalore: {
    address: "456, MG Road, Bangalore - 560001",
    phone: "(+91) 7708 016 139",
    hours: "10:00 AM - 9:00 PM",
  },
  hyderabad: {
    address: "789, Hitech City, Hyderabad - 500081",
    phone: "(+91) 99407 37575",
    hours: "10:00 AM - 9:00 PM",
  },
  coimbatore: {
    address: "321, RS Puram, Coimbatore - 641002",
    phone: "(+91) 90036 35574",
    hours: "10:00 AM - 9:00 PM",
  },
};

const StorePage = () => {
  const { location } = useParams();
  const locationKey = location?.toLowerCase().replace(/-/g, "") || "";
  
  const storeName = storeLocations.find(
    (loc) => loc.toLowerCase().replace(/\s+/g, "") === locationKey
  ) || location?.replace(/-/g, " ");

  const store = storeDetails[locationKey] || storeDetails.pondicherry;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Stores", href: "/" },
    { label: storeName || "Store" },
  ];

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />
        
        <h1 className="text-3xl md:text-4xl font-display font-bold mt-6 mb-8">
          Gangster - {storeName}
        </h1>
        
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Address</h3>
                <p className="text-muted-foreground">{store.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Phone</h3>
                <p className="text-muted-foreground">{store.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Business Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Saturday: {store.hours}<br />
                  Sunday: 11:00 AM - 7:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StorePage;
