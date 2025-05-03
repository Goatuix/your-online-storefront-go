
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import { ArrowLeft } from "lucide-react";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you are looking for does not exist.</p>
          <Link to="/products">
            <Button>View All Products</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Link 
            to="/products" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-brand-navy mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to products
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`aspect-square overflow-hidden rounded-md ${
                        index === activeImageIndex ? "ring-2 ring-brand-teal" : "border border-gray-200"
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
              <h1 className="text-3xl font-serif font-bold text-gray-900">{product.name}</h1>
              
              <div className="mt-3 flex items-center">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{product.rating} out of 5 stars</span>
              </div>
              
              <div className="mt-4">
                <p className="text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                <p className="mt-1 text-sm text-green-600">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Description</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {product.inStock && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Quantity</h3>
                  <div className="flex items-center space-x-3 mt-2">
                    <button 
                      type="button"
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <span className="text-xl">-</span>
                    </button>
                    
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 text-center border border-gray-300 rounded-md p-2"
                    />
                    
                    <button 
                      type="button"
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                </div>
              )}
              
              <div className="mt-8 space-y-4">
                <Button
                  onClick={handleAddToCart}
                  className="w-full py-6 bg-brand-navy hover:bg-brand-navy/90 text-white font-medium"
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full py-6 border-gray-300 text-gray-800 hover:bg-gray-50"
                >
                  Add to Wishlist
                </Button>
              </div>
              
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-gray-600">Free shipping on orders over $50</p>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-gray-600">30-day return policy</p>
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
