
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Map, ShoppingBag, Users, Plane, Shield } from 'lucide-react';
import { cn } from "@/lib/utils";

const NavLink = ({ 
  to, 
  icon: Icon, 
  children, 
  isActive = false,
  onClick 
}: { 
  to: string; 
  icon: React.ElementType; 
  children: React.ReactNode; 
  isActive?: boolean;
  onClick?: () => void;
}) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
      isActive 
        ? "bg-secondary text-primary font-medium" 
        : "hover:bg-secondary/30"
    )}
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    <span>{children}</span>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = window.location.pathname;

  const navItems = [
    { to: "/map", icon: Map, label: "Map" },
    { to: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
    { to: "/freelance", icon: Users, label: "Freelance" },
    { to: "/reservations", icon: Plane, label: "Reservations" },
    { to: "/verification", icon: Shield, label: "Verification" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 flex justify-center items-center">
                <img 
                  src="/lovable-uploads/fa2ca62f-a8b9-4103-a00b-25b4cb4ea24b.png" 
                  alt="InfiWorld Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="text-xl font-bold gold-gradient-text">InfiWorld</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                icon={item.icon} 
                isActive={path === item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass-card border-t border-white/10">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                icon={item.icon} 
                isActive={path === item.to}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
