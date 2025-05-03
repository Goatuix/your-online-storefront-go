
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard3D from "../components/ProductCard3D";
import { getProductsByCategory, getAllCategories } from "../data/products";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("default");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const categories = getAllCategories();
  const products = getProductsByCategory(selectedCategory === "All" ? "All" : selectedCategory);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1c1d25] to-[#2a2c3d] text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section with 3D-like effects */}
        <div className="relative overflow-hidden bg-[#1c1d25] py-16 mb-8">
          <div className="absolute inset-0 z-0 opacity-20">
            {/* Background "grid" effect */}
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] font-serif mb-4">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Discover our premium selection of high-quality products designed for exceptional performance and style.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Categories sidebar - now with glass effect */}
            <div className="w-full lg:w-64 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 p-6 h-fit">
              <h2 className="text-xl font-medium text-white mb-6">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      selectedCategory === category 
                        ? "bg-gradient-to-r from-[#6ee7b7] to-[#3b82f6] text-black font-medium" 
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                    {selectedCategory === category && (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </Button>
                ))}
              </div>
              
              {/* Sorting options - now with glass effect */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-lg font-medium text-white mb-4">Sort By</h3>
                <div className="relative w-full rounded-md bg-white/5 border border-white/10 overflow-hidden">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none block w-full bg-transparent text-white py-3 pl-4 pr-10 focus:outline-none"
                  >
                    <option value="default" className="bg-[#1c1d25]">Featured</option>
                    <option value="price-low-high" className="bg-[#1c1d25]">Price: Low to High</option>
                    <option value="price-high-low" className="bg-[#1c1d25]">Price: High to Low</option>
                    <option value="rating" className="bg-[#1c1d25]">Highest Rated</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-300">
                    <ChevronRight className="transform rotate-90 h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products grid with 3D cards */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className="transition-all duration-300 transform"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <ProductCard3D 
                      product={product} 
                      isHovered={hoveredIndex === index}
                    />
                  </div>
                ))}
              </div>
              
              {sortedProducts.length === 0 && (
                <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <h3 className="text-2xl font-medium text-white mb-2">No products found</h3>
                  <p className="text-gray-400">Try selecting a different category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
