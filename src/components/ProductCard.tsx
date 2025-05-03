
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="bg-white px-3 py-1 text-sm font-medium">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-gray-900 hover:text-brand-navy transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-1 flex items-center justify-between">
          <p className="font-semibold">${product.price.toFixed(2)}</p>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product, 1);
          }}
          variant="outline"
          className="mt-3 w-full bg-brand-navy text-white hover:bg-brand-navy/90"
          disabled={!product.inStock}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
