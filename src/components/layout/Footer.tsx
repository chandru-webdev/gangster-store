import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { storeLocations } from "@/data/products";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold">Gangster</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We offer a wide range of streetwear and street fashion designed with comfort, quality, and style in mind. Our collection includes oversized shirts, oversized T-shirts, hoodies, baggy and momfit styles, polofít, drop shoulder, and backprint designs that are perfect for everyday wear and special occasions.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Inspired by Italian and Korean trends, our imported clothing features printed, checked, stone shirts, acid wash, and party wear styles made for a modern and relaxed look.
            </p>
          </div>

          {/* Our Stores */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Our Stores</h3>
            <ul className="space-y-2">
              {storeLocations.map((location) => (
                <li key={location}>
                  <Link
                    to={`/stores/${location.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {location}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/return-refund-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Help & Support</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  No 378, Near to Petit Canal Street, Mahatma Gandhi Road, Pondicherry MG Road-605001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a href="tel:+919940737575" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  (+91) 99407 37575
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a href="tel:+919003635574" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  (+91) 90036 35574
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a href="tel:+917708016139" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  (+91) 7708 016 139
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <a href="mailto:lovegangster@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  lovegangster@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Gangster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
