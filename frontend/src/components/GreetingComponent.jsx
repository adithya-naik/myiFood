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
    // Get user data from localStorage
    try {
      const credentials = localStorage.getItem("credentials");
      if (credentials) {
        const userData = JSON.parse(credentials);
        if (userData && userData.name) {
          setUsername(userData.name.split(' ')[0]); // Use first name only
        }
      }
    } catch (error) {
      console.error("Error retrieving username:", error);
    }
    
    // Get current hour to determine greeting
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning');
      setIcon(<Sun className="w-6 h-6 text-amber-500" />);
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
      setIcon(<Sun className="w-6 h-6 text-orange-500" />);
    } else if (hour >= 18 && hour < 22) {
      setGreeting('Good evening');
      setIcon(<Moon className="w-6 h-6 text-indigo-400" />);
    } else {
      setGreeting('Good night');
      setIcon(<Moon className="w-6 h-6 text-blue-500" />);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 mt-4">
      <SpotlightCard 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
        spotlightColor="rgba(22, 163, 74, 0.15)" // Green spotlight to match theme
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
            className="mr-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-full"
            initial={{ rotate: -30 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {icon || <Coffee className="w-6 h-6 text-gray-500" />}
          </motion.div>
          
          <div className="flex-1">
            <motion.h2 
              className="text-xl font-medium text-gray-800 dark:text-gray-100"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {greeting}, <span className="font-bold text-green-600 dark:text-green-400">{username}</span>!
            </motion.h2>
            
            <motion.p 
              className="text-base text-gray-500 dark:text-gray-400 mt-1"
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
            <UserCircle className="w-10 h-10 text-green-500" />
          </motion.div>
        </motion.div>
      </SpotlightCard>
    </div>
  );
};

// CSS for the SpotlightCard (you would normally put this in a separate CSS file)
const styles = `
.card-spotlight {
  position: relative;
  overflow: hidden;
  --mouse-x: 50%;
  --mouse-y: 50%;
  --spotlight-color: rgba(255, 255, 255, 0.05);
}

.card-spotlight::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.card-spotlight:hover::before,
.card-spotlight:focus-within::before {
  opacity: 0.6;
}
`;

// Add the styles to the document
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export default GreetingComponent;