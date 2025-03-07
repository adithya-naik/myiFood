import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Create context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // State variables
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Helper Functions
  const getUserEmail = () => {
    const email = localStorage.getItem('email');
    if (email) return email;
    try {
      const credentials = JSON.parse(localStorage.getItem('credentials'));
      return credentials?.email || null;
    } catch (error) {
      console.error('Error parsing credentials:', error);
      return null;
    }
  };

  const getCartKey = () => {
    const email = getUserEmail();
    return email ? `foodCart_${email}` : null;
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken') || !!getUserEmail();
  };

  // Load cart data from localStorage
  const loadCart = () => {
    if (isAuthenticated()) {
      const cartKey = getCartKey();
      if (cartKey) {
        const savedCart = localStorage.getItem(cartKey);
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          setItems(cartData.items || []);
          setTotal(cartData.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0);
        }
      }
    }
  };

  // Save cart to localStorage
  const saveCart = () => {
    if (isAuthenticated()) {
      const cartKey = getCartKey();
      if (cartKey) {
        localStorage.setItem(cartKey, JSON.stringify({ items, total }));
      }
    }
  };

  // Load cart when the component mounts
  useEffect(() => {
    loadCart();
  }, []);

  // Save cart whenever items change
  useEffect(() => {
    saveCart();
    setTotal(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, [items]);

  // Cart Actions
  const addToCart = (item) => {
    if (!isAuthenticated()) {
      toast.error('Please login to add items to cart', { duration: 2000, icon: '🔒' });
      return;
    }

    const existingItem = items.find(i => i.id === item.id && i.size === item.size);
    if (existingItem) {
      const updatedItems = items.map(i => {
        if (i.id === item.id && i.size === item.size) {
          return { ...i, quantity: Math.min(5, i.quantity + item.quantity) };
        }
        return i;
      });
      setItems(updatedItems);
    } else {
      setItems([...items, item]);
    }
  };

  const removeFromCart = (id, size) => {
    setItems(items.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, quantity) => {
    setItems(items.map(item => {
      if (item.id === id && item.size === size) {
        return { ...item, quantity: Math.min(5, Math.max(1, quantity)) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
    setTotal(0);
    try {
      localStorage.removeItem(getCartKey());
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Provide Context
  return (
    <CartContext.Provider value={{ items, total, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
