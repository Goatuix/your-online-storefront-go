
import { Product } from "../types/Product";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Headphones",
    description: "High-quality wireless headphones with noise cancellation features. Experience crystal clear audio and comfort for hours of listening pleasure.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3"
    ],
    category: "Electronics",
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness goals, receive notifications, and more with this sleek smartwatch. Water resistant and long battery life.",
    price: 249.99,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3"
    ],
    category: "Electronics",
    featured: true,
    inStock: true,
    rating: 4.6
  },
  {
    id: "3",
    name: "Minimalist Desk Lamp",
    description: "A stylish addition to your workspace with adjustable brightness and color temperature. Energy efficient with modern design.",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3"
    ],
    category: "Home",
    featured: true,
    inStock: true,
    rating: 4.5
  },
  {
    id: "4",
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection. Multiple card slots and a sleek design that fits comfortably in your pocket.",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3"
    ],
    category: "Accessories",
    featured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: "5",
    name: "Premium Coffee Maker",
    description: "Brew the perfect cup of coffee with this premium coffee maker. Adjustable settings for strength and temperature.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1520970519539-3df4e461e6a4?ixlib=rb-4.0.3"
    ],
    category: "Kitchen",
    featured: false,
    inStock: true,
    rating: 4.4
  },
  {
    id: "6",
    name: "Wireless Earbuds",
    description: "Compact wireless earbuds with exceptional sound quality. Includes charging case for extended battery life.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3"
    ],
    category: "Electronics",
    featured: true,
    inStock: true,
    rating: 4.9
  },
  {
    id: "7",
    name: "Minimalist Backpack",
    description: "Stylish and functional backpack with laptop compartment and multiple pockets. Water-resistant material.",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3"
    ],
    category: "Accessories",
    featured: false,
    inStock: true,
    rating: 4.5
  },
  {
    id: "8",
    name: "Smart Speaker",
    description: "Voice-controlled smart speaker with premium sound and integrated virtual assistant.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1558089687-f282ffcbc096?ixlib=rb-4.0.3"
    ],
    category: "Electronics",
    featured: true,
    inStock: true,
    rating: 4.7
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
