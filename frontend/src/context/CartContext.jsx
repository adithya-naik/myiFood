import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Create context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // State for cart items and total
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get user email - extracted as a function to ensure consistent usage
  const getUserEmail = () => {
    // First try to get email directly from localStorage
    const email = localStorage.getItem('email');
    
    // If no direct email, try to get from credentials object
    if (!email) {
      try {
        const credentials = localStorage.getItem('credentials');
        if (credentials) {
          const parsedCredentials = JSON.parse(credentials);
          return parsedCredentials.email;
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
    
    return email;
  };
  
  // Get cart key based on user email
  const getCartKey = () => {
    const email = getUserEmail();
    return email ? `foodCart_${email}` : null;
  };
  
  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken') || !!getUserEmail();
  };
  
  // Load cart data from localStorage on initial render
  useEffect(() => {
    const loadCart = () => {
      try {
        if (isAuthenticated()) {
          const cartKey = getCartKey();
          
          if (cartKey) {
            const savedCart = localStorage.getItem(cartKey);
            
            if (savedCart) {
              const parsedCart = JSON.parse(savedCart);
              setItems(parsedCart.items || []);
              
              // Recalculate total in case there's any inconsistency
              const calculatedTotal = (parsedCart.items || []).reduce(
                (sum, item) => sum + (item.price * item.quantity),
                0
              );
              
              setTotal(calculatedTotal);
              console.log('Cart loaded successfully:', parsedCart);
            } else {
              console.log('No saved cart found for key:', cartKey);
              setItems([]);
              setTotal(0);
            }
          } else {
            console.log('No cart key could be generated');
            setItems([]);
            setTotal(0);
          }
        } else {
          console.log('User not authenticated, empty cart');
          setItems([]);
          setTotal(0);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setItems([]);
        setTotal(0);
      }
      
      setIsInitialized(true);
    };
    
    // Load cart immediately when component mounts
    loadCart();
    
    // Add event listener for storage changes
    const handleStorageChange = (e) => {
      const cartKey = getCartKey();
      if (cartKey && e.key === cartKey) {
        loadCart();
      }
      
      // Also reload if auth status changes
      if (e.key === 'authToken' || e.key === 'email' || e.key === 'credentials') {
        loadCart();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // Save cart to localStorage whenever items change
  useEffect(() => {
    // Only save after initial loading is complete to prevent overwriting
    if (!isInitialized) return;
    
    const saveCart = () => {
      try {
        if (isAuthenticated()) {
          const cartKey = getCartKey();
          
          if (cartKey) {
            const cartData = {
              items,
              total
            };
            
            localStorage.setItem(cartKey, JSON.stringify(cartData));
            console.log('Cart saved successfully to', cartKey, cartData);
          } else {
            console.error('Cannot save cart: No valid cart key');
          }
        } else {
          console.log('User not authenticated, cart not saved');
        }
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    };
    
    saveCart();
  }, [items, total, isInitialized]);
  
  // Recalculate total whenever items change
  useEffect(() => {
    const newTotal = items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
    setTotal(newTotal);
  }, [items]);
  
  // Add item to cart
  const addToCart = async (item) => {
    if (!isAuthenticated()) {
      toast.error('Please login to add items to cart', {
        duration: 2000,
        icon: '🔒',
      });
      return;
    }
    
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        i => i.id === item.id && i.size === item.size
      );
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        return prevItems.map((i, index) => {
          if (index === existingItemIndex) {
            return {
              ...i,
              quantity: Math.min(5, i.quantity + item.quantity)
            };
          }
          return i;
        });
      } else {
        // Add new item
        return [...prevItems, item];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (id, size) => {
    setItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.size === size))
    );
  };
  
  // Update item quantity
  const updateQuantity = (id, size, quantity) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id && item.size === size) {
          return {
            ...item,
            quantity: Math.min(5, Math.max(1, quantity))
          };
        }
        return item;
      })
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setItems([]);
    setTotal(0);
    
    try {
      const cartKey = getCartKey();
      if (cartKey) {
        localStorage.removeItem(cartKey);
        console.log('Cart cleared from localStorage:', cartKey);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };
  
  // Context value
  const value = {
    items,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};