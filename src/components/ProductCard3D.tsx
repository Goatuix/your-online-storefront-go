
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface ProductCard3DProps {
  product: Product;
  isHovered: boolean;
}

const ProductCard3D: React.FC<ProductCard3DProps> = ({ product, isHovered }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate the mouse position relative to the center of the card
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate rotation values (limited to +/- 10 degrees)
    const rotateY = (x / rect.width) * 10;
    const rotateX = (y / rect.height) * -10;
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Set transform style based on hover state and rotation
  const cardStyle = {
    transform: isHovered 
      ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)` 
      : `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  };

  return (
    <div 
      className="relative h-full"
      style={cardStyle} 
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <div className="h-full rounded-xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-square relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10" />
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 ease-out"
              style={{
                transform: isHovered ? 'scale(1.1)' : 'scale(1.0)'
              }}
            />
            
            {product.inStock === 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white font-medium border border-white/20">
                  Out of Stock
                </span>
              </div>
            )}
            
            {isHovered && product.inStock > 0 && (
              <Button
                onClick={handleAddToCart}
                className="absolute bottom-4 right-4 z-20 rounded-full w-10 h-10 p-0 bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] text-black hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Add to cart</span>
              </Button>
            )}
          </div>
        </Link>
        
        <div className="p-6">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-medium text-white text-lg hover:text-cyan-400 transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <div className="mt-2 flex items-center justify-between">
            <p className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6]">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          
          {/* Category tag and stock count */}
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300 border border-white/5">
              {product.category}
            </span>
            <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
              {product.inStock} in stock
            </span>
          </div>
        </div>
      </div>
      
      {/* 3D effect elements */}
      <div 
        className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.15 : 0 }}
      />
    </div>
  );
};

export default ProductCard3D;
