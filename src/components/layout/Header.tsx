import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, Heart, ShoppingCart, Menu, ChevronDown, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "NEW ARRIVALS", href: "/new-arrivals" },
  { label: "TRENDING NOW", href: "/trending" },
  {
    label: "BOTTOMS",
    href: "/category/bottoms",
    dropdown: true,
    items: [
      { label: "Pants", href: "/category/bottoms/pants" },
      { label: "Jeans", href: "/category/bottoms/jeans" },
      { label: "Shorts", href: "/category/bottoms/shorts" },
    ],
  },
  { label: "HOODIES", href: "/category/hoodies" },
  { label: "T-SHIRTS", href: "/category/tshirts" },
  {
    label: "SHIRTS",
    href: "/category/shirts",
    dropdown: true,
    items: [
      { label: "Casual", href: "/category/shirts/casual" },
      { label: "Formal", href: "/category/shirts/formal" },
    ],
  },
];

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const { openLoginModal, isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top Header */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </form>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Gangster
            </h1>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User size={22} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background border">
                  <DropdownMenuItem className="font-medium">
                    Hi, {user?.name}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={openLoginModal}
                className="hidden md:flex items-center gap-1 text-sm font-medium"
              >
                <User size={18} />
                <span>LOGIN</span>
              </Button>
            )}

            <Link to="/wishlist" className="relative p-2 nav-link">
              <Heart size={22} />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 nav-link flex items-center gap-1">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="hidden md:inline text-sm">My Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden lg:block border-t border-border bg-background">
        <div className="container">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-8">
              {/* Shop by Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 font-medium nav-link">
                    <Menu size={18} />
                    SHOP BY CATEGORIES
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-background border">
                  <DropdownMenuItem asChild>
                    <Link to="/category/hoodies">Hoodies</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/category/tshirts">T-Shirts</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/category/bottoms">Bottoms</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/category/shirts">Shirts</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Main Nav Items */}
              {navItems.map((item) =>
                item.dropdown ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1 text-sm font-medium nav-link">
                        {item.label}
                        <ChevronDown size={14} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background border">
                      <DropdownMenuItem asChild>
                        <Link to={item.href}>All {item.label}</Link>
                      </DropdownMenuItem>
                      {item.items?.map((subItem) => (
                        <DropdownMenuItem key={subItem.label} asChild>
                          <Link to={subItem.href}>{subItem.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-sm font-medium nav-link"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <Link
              to="/best-offers"
              className="flex items-center gap-2 text-primary font-semibold"
            >
              <span className="text-lg">🔥</span>
              BEST OFFERS
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg animate-slide-up">
          <div className="container py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md"
                />
              </div>
            </form>

            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block py-2 px-4 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/best-offers"
                className="block py-2 px-4 rounded-md text-primary font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                🔥 BEST OFFERS
              </Link>
            </div>

            {!isAuthenticated && (
              <Button
                onClick={() => {
                  openLoginModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                LOGIN
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
