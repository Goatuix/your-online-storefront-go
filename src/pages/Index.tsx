
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";
import { useToast } from "../hooks/use-toast";

const Index: React.FC = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const product = getProductById("1");
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!titleRef.current) return;
      
      const { left, top, width, height } = titleRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / 25;
      
      titleRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      if (!titleRef.current) return;
      titleRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  if (!product) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1c1d25] to-[#2a2c3d]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with 3D Effect */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Background grid effect */}
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 
                  ref={titleRef}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 transition-transform duration-300 ease-out gradient-text"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  Unlock the <span className="block">GOAT Experience</span>
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Premium access to all features and content with our exclusive digital key. Limited stock available.
                </p>
                
                <div className="flex items-center mb-8">
                  <div className="flex mr-3">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-300">
                    {product.rating}/5 rating
                  </span>
                  <span className="ml-6 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                    {product.inStock} in stock
                  </span>
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    onClick={handleAddToCart} 
                    className="button-3d text-lg px-8 py-6 bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] hover:from-[#5ed6a6] hover:to-[#2a71e5] text-black font-medium"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Buy Now - ${product.price.toFixed(2)}
                  </Button>
                  
                  <Link to="/product/1">
                    <Button variant="outline" className="button-3d text-lg px-8 py-6 backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex justify-center hover-lift">
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden glass-card" style={{ transform: 'rotate(-5deg)' }}>
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-2xl overflow-hidden glass-card" style={{ transform: 'rotate(5deg)' }}>
                    <img 
                      src={product.images[1]} 
                      alt={product.name + " alternative view"}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Blob background effects */}
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-600/30 rounded-full filter blur-3xl opacity-20"></div>
        </section>

        {/* Product Features */}
        <section className="py-24 bg-[#1c1d25]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center gradient-text">
              Premium Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 hover-lift">
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#6ee7b7] to-[#3b82f6] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Secure Access</h3>
                <p className="text-gray-300">
                  Your key provides encrypted, secure access to all premium content and features.
                </p>
              </div>
              
              <div className="glass-card p-8 hover-lift">
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#6ee7b7] to-[#3b82f6] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Instant Activation</h3>
                <p className="text-gray-300">
                  Get immediate access after purchase with our automated delivery system.
                </p>
              </div>
              
              <div className="glass-card p-8 hover-lift">
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#6ee7b7] to-[#3b82f6] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Lifetime Value</h3>
                <p className="text-gray-300">
                  One-time purchase for permanent access - no subscriptions or hidden fees.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            {/* Background "grid" effect */}
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center glass-card p-12">
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Limited Time Offer
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get your Goat Hub premium key now while stock lasts. Only {product.inStock} keys remaining!
              </p>
              <Button 
                onClick={handleAddToCart}
                className="button-3d text-lg px-10 py-6 bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] hover:from-[#5ed6a6] hover:to-[#2a71e5] text-black font-medium"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Secure Your Key - ${product.price.toFixed(2)}
              </Button>
            </div>
          </div>
          
          {/* Blob background effects */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-600/20 rounded-full filter blur-3xl opacity-20"></div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
