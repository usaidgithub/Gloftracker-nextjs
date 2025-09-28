"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import {
  Mountain,
  Menu,
  X,
  ChevronDown,
  Home,
  MapPin,
  Users,
  Heart,
  FileText,
  Shield,
  BarChart3,
  Phone,
  Mail,
  Info,
} from "lucide-react";

// --- START: MANUAL Button Component Integration ---

/**
 * 💡 MANUAL INTEGRATION: Simplified Button Component
 * Replaces the missing import from "@/components/ui/button".
 * Assumes 'hero', 'ghost', 'default', 'icon', 'sm' are styled via Tailwind classes 
 * or similar utility styles defined elsewhere.
 */
const Button = ({ children, className = "", variant = "default", size = "default", ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  // Size styles
  const sizeStyles = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8 text-lg",
    icon: "h-10 w-10",
  };

  // Variant styles - Simplified to support the variants used in the NavBar
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    hero: "bg-blue-600 text-white shadow-lg shadow-blue-500/50 hover:bg-blue-700",
  };

  // Combine styles
  const combinedClasses = `${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (size === 'icon') {
    return (
      <button
        className={`${baseStyle} ${sizeStyles.icon} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
};

// --- END: MANUAL Button Component Integration ---


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  const serviceItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Live Dashboard", href: "/dashboard", icon: MapPin },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Organizations", href: "/organizations", icon: Users },
    { name: "Donations", href: "/donations", icon: Heart },
    { name: "Gov Resources", href: "/government", icon: FileText },
    { name: "Safety Guide", href: "/safety", icon: Shield },
    { name: "Emergency", href: "/safety", icon: Phone },
  ];

  const isActive = (path) => pathname === path;

  // Function to close both menus when a main link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }

  // Function to close service dropdown when clicking outside (on the overlay)
  const handleOverlayClick = () => {
    setIsServicesOpen(false);
  }
  const router = useRouter();
  const handleLogout = async () => {

    try {
      const res = await fetch("/api/logout", { method: "POST" });

      if (res.ok) {
        // Redirect to login page after successful logout
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-card/95 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" onClick={handleLinkClick} className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Mountain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">GLOF</span>
              <span className="text-sm text-muted-foreground block -mt-1">
                Tracker
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Services Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : 'rotate-0'}`} />
              </Button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-lg shadow-xl z-50">
                  <div className="py-2">
                    {serviceItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div
                            className={`flex items-center space-x-3 px-4 py-2 hover:bg-accent text-sm ${isActive(item.href)
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground"
                              }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Us */}
            <Link href="/dashboard" onClick={handleLinkClick}>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Contact Us</span>
              </Button>
            </Link>

            {/* About Us */}
            <Link href="/dashboard" onClick={handleLinkClick}>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Info className="h-4 w-4" />
                <span>About Us</span>
              </Button>
            </Link>
            <Button variant="hero" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-card border-t border-border">
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                Services
              </div>
              {serviceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick} // Use combined handler
                  >
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className="w-full justify-start space-x-2"
                      size="sm"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Contact & About */}
            <div className="border-t border-border pt-2 space-y-1">
              <Link href="/contact" onClick={handleLinkClick}>
                <Button variant="ghost" className="w-full justify-start space-x-2" size="sm">
                  <Mail className="h-4 w-4" />
                  <span>Contact Us</span>
                </Button>
              </Link>
              <Link href="/about" onClick={handleLinkClick}>
                <Button variant="ghost" className="w-full justify-start space-x-2" size="sm">
                  <Info className="h-4 w-4" />
                  <span>About Us</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Logout*/}
            <div className="border-t border-border pt-2">
                <Button variant="hero" className="w-full" onClick={handleLogout}>
                  Logout
                </Button>
            
            </div>
          </div>
        )}
      </div>

      {/* Overlay to close Services menu when clicking outside */}
      {isServicesOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleOverlayClick}
        />
      )}
    </nav>
  );
};

export default NavBar;