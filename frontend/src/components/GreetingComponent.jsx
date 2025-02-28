import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Coffee, UserCircle } from 'lucide-react';

// SpotlightCard component integrated directly
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) => {
  const divRef = useRef(null);
  
  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };
  
  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};

const GreetingComponent = () => {
  const [greeting, setGreeting] = useState('');
  const [icon, setIcon] = useState(null);
  const [username, setUsername] = useState('there');
  
  useEffect(() => {
    try {
      const credentials = localStorage.getItem("credentials");
      if (credentials) {
        const userData = JSON.parse(credentials);
        if (userData && userData.name) {
          setUsername(userData.name.split(' ')[0]);
        }
      }
    } catch (error) {
      console.error("Error retrieving username:", error);
    }
    
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning');
      setIcon(<Sun className="w-6 h-6 text-yellow-500" />);
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
      setIcon(<Sun className="w-6 h-6 text-orange-400" />);
    } else if (hour >= 18 && hour < 22) {
      setGreeting('Good evening');
      setIcon(<Moon className="w-6 h-6 text-blue-400" />);
    } else {
      setGreeting('Good night');
      setIcon(<Moon className="w-6 h-6 text-blue-500" />);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 mt-4">
      <SpotlightCard 
        className="bg-white rounded-lg shadow-md border border-gray-100"
        spotlightColor="rgba(255, 223, 186, 0.2)" 
      >
        <motion.div 
          className="flex items-center p-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <motion.div 
            className="mr-4 p-3 bg-yellow-50 rounded-full"
            initial={{ rotate: -30 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {icon || <Coffee className="w-6 h-6 text-gray-500" />}
          </motion.div>
          
          <div className="flex-1">
            <motion.h2 
              className="text-xl font-medium text-gray-800"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {greeting}, <span className="font-bold text-yellow-600">{username}</span>!
            </motion.h2>
            
            <motion.p 
              className="text-base text-gray-500 mt-1"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              Explore our delicious menu
            </motion.p>
          </div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <UserCircle className="w-10 h-10 text-yellow-500" />
          </motion.div>
        </motion.div>
      </SpotlightCard>
    </div>
  );
};

export default GreetingComponent;
