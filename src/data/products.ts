
import { Product } from "../types/Product";

export const products: Product[] = [
  {
    id: "1",
    name: "Goat Hub Premium Access Key",
    description: "Unlock the full potential of Goat Hub with our premium access key. Get exclusive features, priority support, and unlimited access to all premium content and tools.",
    price: 4.99,
    images: [
      "https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-4.0.3&q=85&fm=jpg",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&q=85&fm=jpg"
    ],
    category: "Digital Key",
    featured: true,
    inStock: 50,
    rating: 4.9
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return ["All", ...Array.from(categories)];
};
