import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

import { FaShoppingCart } from "react-icons/fa";
import { toast } from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Cart = () => {
  const { items, total, removeFromCart, updateQuantity,clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async() => {
    
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      toast.error('Please login to checkout', {
        icon: '🔒',
      });
      navigate('/login');
      return;
    }
    
    let email = localStorage.getItem("email")
    console.log("credentials : ",email)

    const response = await fetch("http://localhost:3000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data : items,
        email : email,
        order_date : new Date()
      }),
    });



    toast.success('Proceeding...', {
      icon: '🛍️',
    });
    console.log(response)
    if(response.status==200){
      clearCart()
      setTimeout(() => {
        toast.success('Order Placed...', {
            icon: '✅',
        });
    }, 2000);
    
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4"
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotateY: [0, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <FaShoppingCart className="w-32 h-32 text-green-500/20 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. 
              Explore our delicious menu and add your favorites!
            </p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full
                       font-medium hover:bg-green-600 transform hover:-translate-y-1 hover:shadow-lg
                       transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3"
          >
            <ShoppingBag className="w-8 h-8 text-green-500" />
            Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </motion.h1>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {items.map((item, index) => (
              <motion.div 
                variants={itemVariants}
                key={`${item.id}-${item.size}`}
                className="group flex flex-col md:flex-row items-center justify-between p-6 bg-white 
                          rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border
                          border-gray-100"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center space-x-6">
                  <div className="relative overflow-hidden rounded-lg w-24 h-24">
                    <motion.img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                    {item.size && (
                      <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                    )}
                    <p className="text-green-600 font-medium mt-2 flex items-center">
                      <FaRupeeSign className="mr-1" />
                      {item.price}
                    </p>
                  </div>
                </div>
              
                <div className="flex items-center space-x-8 mt-4 md:mt-0">
                  <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
                    <motion.button
                      whileHover={{ backgroundColor: '#f0fdf4' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1));
                        toast.success('Quantity updated');
                      }}
                      className="p-2 cursor-pointer rounded-full hover:bg-green-50 text-gray-600 transition-colors
                               disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </motion.button>
                    <span className="w-12 text-center font-medium text-gray-700">{item.quantity}</span>
                    <motion.button
                      whileHover={{ backgroundColor: '#f0fdf4' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        updateQuantity(item.id, item.size, Math.min(5, item.quantity + 1));
                        toast.success('Quantity updated');
                      }}
                      className="p-2 cursor-pointer rounded-full hover:bg-green-50 text-gray-600 transition-colors
                               disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item.quantity >= 5}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.button>
                  </div>
                
                  <div className="flex items-center font-semibold text-lg text-gray-800">
                    <FaRupeeSign className="text-sm" />
                    {(item.price * item.quantity).toFixed(2)}
                  </div>
                
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: '#fef2f2' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      removeFromCart(item.id, item.size);
                      toast.success('Item removed from cart');
                    }}
                    className="p-2 cursor-pointer rounded-full text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-end gap-6 mt-8"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full md:w-auto"
              >
                <div className="flex items-center justify-between gap-16 text-xl">
                  <span className="text-gray-600">Total Amount:</span>
                  <div className="flex items-center text-green-600 font-bold">
                    <FaRupeeSign className="mr-1" />
                    {total.toFixed(2)}
                  </div>
                </div>
              </motion.div>
            
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="bg-green-500 text-white px-12 py-4 rounded-full font-medium
                          hover:bg-green-600 transform hover:shadow-lg 
                          transition-all duration-300 flex items-center cursor-pointer gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Cart;