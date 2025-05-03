
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";

const CartPage: React.FC = () => {
  const { items, itemCount, subtotal, clearCart } = useCart();

  const shipping = subtotal >= 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/products">
                <Button className="bg-brand-navy hover:bg-brand-navy/90 font-medium">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-lg font-medium text-gray-900">
                      Item{itemCount === 1 ? '' : 's'} ({itemCount})
                    </h2>
                    <Button 
                      variant="ghost" 
                      onClick={clearCart}
                      className="text-gray-500 hover:text-red-500"
                    >
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div>
                    {items.map((item) => (
                      <CartItem key={item.product.id} item={item} />
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/products">
                    <Button variant="link" className="text-brand-navy p-0 font-medium">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-medium text-gray-900 pb-4 border-b">Order Summary</h2>
                  
                  <div className="space-y-4 py-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-medium text-gray-900">Total</span>
                      <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      {subtotal < 50 && (
                        <>
                          Add <span className="font-medium">${(50 - subtotal).toFixed(2)}</span> more to qualify for free shipping!
                        </>
                      )}
                    </p>
                  </div>
                  
                  <Link to="/checkout">
                    <Button className="w-full py-6 mt-4 bg-brand-navy hover:bg-brand-navy/90 text-white font-medium">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                      We accept
                    </p>
                    <div className="flex justify-center space-x-2 mt-2">
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
