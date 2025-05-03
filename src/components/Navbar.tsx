
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl font-bold text-brand-navy">
          Your Store
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="font-medium text-gray-600 hover:text-brand-navy transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="font-medium text-gray-600 hover:text-brand-navy transition-colors"
          >
            Products
          </Link>
          <Link 
            to="/cart" 
            className="relative"
          >
            <Button 
              variant="ghost" 
              className="hover:bg-gray-100"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-teal text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Link 
            to="/cart" 
            className="relative mr-4"
          >
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:bg-gray-100"
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-teal text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleMenu}
            className="hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden py-4 bg-white border-t">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link 
              to="/"
              onClick={() => setIsMenuOpen(false)} 
              className="font-medium text-gray-600 hover:text-brand-navy transition-colors py-2"
            >
              Home
            </Link>
            <Link 
              to="/products"
              onClick={() => setIsMenuOpen(false)} 
              className="font-medium text-gray-600 hover:text-brand-navy transition-colors py-2"
            >
              Products
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
