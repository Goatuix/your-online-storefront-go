
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
  inStock: number;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
