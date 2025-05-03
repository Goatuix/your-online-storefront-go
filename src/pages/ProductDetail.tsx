
import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import { ArrowLeft, Check, ShoppingCart, Star } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / 25;
      
      cardRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1c1d25] to-[#2a2c3d]">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <div className="glass-card p-12 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6 text-gray-300">The product you are looking for does not exist.</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] text-black font-medium">
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.inStock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1c1d25] to-[#2a2c3d]">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to home
          </Link>
          
          <div className="product-detail-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 glass-card p-8">
              {/* Product Images */}
              <div 
                ref={cardRef} 
                className="space-y-6 transition-transform duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="aspect-square overflow-hidden rounded-lg glass-card">
                  <img
                    src={product.images[activeImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        className={`aspect-square overflow-hidden rounded-md ${
                          index === activeImageIndex 
                            ? "ring-2 ring-[#6ee7b7]" 
                            : "border border-white/10 hover:border-white/30 transition-colors"
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img
                          src={image}
                          alt={`${product.name} - View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                  {product.name}
                </h1>
                
                <div className="mt-4 flex items-center">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-300">{product.rating} out of 5 stars</span>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center">
                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6]">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="ml-4 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                      {product.inStock} keys in stock
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-3">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <button 
                      type="button"
                      className="w-10 h-10 flex items-center justify-center glass-card hover:bg-white/10 transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <span className="text-xl">-</span>
                    </button>
                    
                    <input
                      type="number"
                      min="1"
                      max={product.inStock}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 text-center bg-white/5 border border-white/10 rounded-md p-2 text-white"
                    />
                    
                    <button 
                      type="button"
                      className="w-10 h-10 flex items-center justify-center glass-card hover:bg-white/10 transition-colors"
                      onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                </div>
                
                <div className="mt-10 space-y-4">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full py-6 button-3d bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] hover:from-[#5ed6a6] hover:to-[#2a71e5] text-black font-medium text-lg"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-[#6ee7b7] mr-2" />
                      <p className="text-gray-300">Instant digital delivery</p>
                    </div>
                    
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-[#6ee7b7] mr-2" />
                      <p className="text-gray-300">24/7 premium support</p>
                    </div>
                    
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-[#6ee7b7] mr-2" />
                      <p className="text-gray-300">Secure payment processing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
