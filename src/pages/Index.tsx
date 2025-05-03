
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getFeaturedProducts, getAllCategories } from "../data/products";

const Index: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getAllCategories().filter(cat => cat !== "All");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Elevate Your Lifestyle with Premium Products
              </h1>
              <p className="mt-6 text-lg md:text-xl opacity-90 leading-relaxed">
                Discover our curated collection of high-quality products designed to enhance your everyday experiences.
              </p>
              <Link to="/products">
                <Button className="mt-8 bg-white text-brand-navy hover:bg-gray-100 font-medium px-8 py-6 rounded-md">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-10">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="0,0 100,0 100,100" />
            </svg>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Explore our most popular items selected for their quality and design excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/products">
                <Button variant="outline" className="font-medium">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900">Shop by Category</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Find exactly what you need in our organized product categories.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link 
                  key={category} 
                  to={`/products?category=${category}`}
                  className="group block h-48 relative overflow-hidden rounded-lg shadow-md"
                >
                  <div className="absolute inset-0 bg-brand-navy/60 group-hover:bg-brand-navy/70 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">{category}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900">Why Choose Us</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                We're committed to providing the best shopping experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-brand-teal/10 rounded-full">
                  <svg className="w-8 h-8 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Products</h3>
                <p className="text-gray-600">
                  We carefully select every item in our inventory to ensure the highest quality.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-brand-teal/10 rounded-full">
                  <svg className="w-8 h-8 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Competitive Prices</h3>
                <p className="text-gray-600">
                  Get the best value for your money with our fair and competitive pricing.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-brand-teal/10 rounded-full">
                  <svg className="w-8 h-8 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Support</h3>
                <p className="text-gray-600">
                  Our dedicated support team is always ready to assist you with any queries.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
