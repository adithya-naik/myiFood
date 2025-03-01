
import React,{ useState, useEffect } from "react"
import { FaRupeeSign } from "react-icons/fa"
import { Plus, Minus, ShoppingCart, CheckCircle2, AlertCircle } from "lucide-react"
import { IoLeaf } from "react-icons/io5"
import { GiMeat } from "react-icons/gi"
import { toast } from "react-hot-toast"
import AOS from "aos"
import "aos/dist/aos.css"
import { useCart } from "../context/CartContext"
import { motion, AnimatePresence } from "framer-motion"

const FoodCard = ({ foodItem }) => {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [size, setSize] = useState(() => {
    try {
      const options = foodItem.options?.[0] || {}
      const availableSizes = Object.keys(options)
      return availableSizes.length > 0 ? availableSizes[0] : ""
    } catch (error) {
      console.error("Size initialization error:", error)
      return ""
    }
  })

  useEffect(() => {
    setQuantity(1)
  }, [foodItem])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    })
  }, [])

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const incrementQuantity = () => {
    if (quantity < 5) setQuantity(quantity + 1)
  }

  const handleAddToCart = async () => {
    if (!localStorage.getItem("authToken")) {
      toast.error("Please login to add items to cart", {
        icon: "🔒",
        duration: 2000,
      })
      return
    }

    setIsAdding(true)
    try {
      const price = calculatePrice()
      if (!price || isNaN(price)) {
        toast.error("Invalid price. Please try again.")
        return
      }

      const cartItem = {
        id: foodItem._id,
        name: foodItem.name,
        price: price,
        quantity: quantity,
        size: size,
        img: foodItem.img,
      }

      await addToCart(cartItem)
      toast.success(`Added ${quantity} ${foodItem.name} ${size ? `(${size})` : ""} to cart`, {
        duration: 2000,
        icon: "🛒",
        style: {
          background: "#22c55e",
          color: "#fff",
        },
      })

      setTimeout(() => {
        setQuantity(1)
        setIsAdding(false)
      }, 1000)
    } catch (error) {
      toast.error("Failed to add item to cart")
      console.error("Add to cart error:", error)
      setIsAdding(false)
    }
  }

  const getSizeOptions = () => {
    try {
      const options = foodItem.options?.[0] || {}
      return Object.entries(options)
        .filter(([_, value]) => value && !isNaN(Number(value)))
        .map(([key, value]) => ({
          value: key,
          label: `${key.charAt(0).toUpperCase() + key.slice(1)} (₹${value})`,
          price: Number(value),
        }))
    } catch (error) {
      console.error("Get size options error:", error)
      return []
    }
  }

  const calculatePrice = () => {
    try {
      if (!foodItem.options?.[0]) {
        return 0
      }
      const price = foodItem.options[0][size]
      if (!price || isNaN(Number(price))) {
        return 0
      }
      return Math.round(Number(price) * quantity * 100) / 100
    } catch (error) {
      console.error("Price calculation error:", error)
      return 0
    }
  }
  const isVegetarian = () => {
    const vegetarianKeywords = ["veg", "paneer", "jeera", "aloo", "mushroom", "gobi", "dal", "palak"];
    return vegetarianKeywords.some(keyword => foodItem.name.toLowerCase().includes(keyword));
};


  const price = calculatePrice()
  const isValidPrice = price > 0 && !isNaN(price)
  const sizeOptions = getSizeOptions()
  const hasSizeOptions = sizeOptions.length > 0

  const badgeVariants = {
    initial: {
      x: 100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-4 m-3 w-full max-w-sm border border-gray-200 
                 hover:shadow-xl transition-all duration-300 cursor-pointer relative"
      data-aos="fade-up"
    >
      <motion.div
        variants={badgeVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className={`absolute top-3 left-0 px-4 py-1 rounded-r-full 
                   shadow-md flex items-center gap-2 cursor-pointer z-10
                   ${isVegetarian() ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
      >
        {isVegetarian() ? <IoLeaf className="h-4 w-4" /> : <GiMeat className="h-4 w-4" />}
        <span className="text-sm font-semibold">{isVegetarian() ? "Veg" : "Non-Veg"}</span>
      </motion.div>

      <motion.div
        className="relative h-48 rounded-lg overflow-hidden mt-8"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <img
          className="object-cover w-full h-full"
          src={foodItem.img || "/placeholder.svg"}
          alt={foodItem.name}
          loading="lazy"
        />
      </motion.div>

      <div className="mt-4 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="text-xl font-semibold text-gray-900">{foodItem.name}</h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{foodItem.description}</p>
        </motion.div>

        {foodItem.options && foodItem.options.length > 0 && hasSizeOptions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
          >
            <span className="text-sm font-medium text-gray-700">Size:</span>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="bg-white text-gray-800 p-2 rounded-md border border-gray-200 text-sm
                       focus:ring-2 focus:ring-green-500 focus:border-transparent
                       transition-all duration-200 cursor-pointer"
            >
              {sizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
        >
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className={`p-1 rounded-full transition-colors duration-200 cursor-pointer
                ${quantity <= 1 ? "bg-gray-100 text-gray-400" : "bg-green-100 text-green-600 hover:bg-green-200"}`}
            >
              <Minus className="h-5 w-5" />
            </motion.button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={incrementQuantity}
              disabled={quantity >= 5}
              className={`p-1 rounded-full transition-colors duration-200 cursor-pointer
                ${quantity >= 5 ? "bg-gray-100 text-gray-400" : "bg-green-100 text-green-600 hover:bg-green-200"}`}
            >
              <Plus className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>

        <div className="flex items-center justify-between pt-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg font-bold text-green-600 flex items-center"
          >
            <FaRupeeSign />
            <span>{isValidPrice ? price : "N/A"}</span>
          </motion.div>

          <motion.button
            onClick={handleAddToCart}
            disabled={isAdding || !isValidPrice}
            whileHover={isValidPrice && !isAdding ? { scale: 1.02 } : {}}
            whileTap={isValidPrice && !isAdding ? { scale: 0.98 } : {}}
            className={`
              relative flex items-center justify-center gap-2 px-4 py-2 rounded-lg 
              font-medium overflow-hidden transition-all duration-200 cursor-pointer
              ${
                !isValidPrice
                  ? "bg-gray-400 cursor-not-allowed opacity-75"
                  : isAdding
                    ? "bg-green-600 shadow-lg"
                    : "bg-green-500 hover:bg-green-600 hover:shadow-lg"
              }
            `}
          >
            <AnimatePresence mode="wait">
              {isAdding ? (
                <motion.div
                  key="adding"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </motion.div>
                  <span className="text-white">Added!</span>
                </motion.div>
              ) : !isValidPrice ? (
                <motion.div
                  key="invalid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <AlertCircle className="h-5 w-5 text-white" />
                  <span className="text-white">Select Options</span>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5 text-white" />
                  <span className="text-white">Add to Cart</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="absolute inset-0 bg-white pointer-events-none"
              initial={{ scale: 0, opacity: 0.35 }}
              animate={
                isAdding
                  ? {
                      scale: 2,
                      opacity: 0,
                    }
                  : {
                      scale: 0,
                      opacity: 0.35,
                    }
              }
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default FoodCard;











// adithyaj219@GiMailShirt.com



// import React, { useState, useEffect } from "react";
// import { FaRupeeSign } from "react-icons/fa";
// import { Plus, Minus, ShoppingCart, CheckCircle2, AlertCircle, Clock } from "lucide-react";
// import { IoLeaf } from "react-icons/io5";
// import { GiMeat } from "react-icons/gi";
// import { toast } from "react-hot-toast";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useCart } from "../context/CartContext";
// import { motion, AnimatePresence } from "framer-motion";

// const FoodCard = ({ foodItem }) => {
//   const { addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const [size, setSize] = useState(() => {
//     try {
//       const options = foodItem.options?.[0] || {};
//       const availableSizes = Object.keys(options);
//       return availableSizes.length > 0 ? availableSizes[0] : "";
//     } catch (error) {
//       console.error("Size initialization error:", error);
//       return "";
//     }
//   });

//   useEffect(() => {
//     setQuantity(1);
//   }, [foodItem]);

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: true,
//       easing: "ease-out-cubic",
//     });
//   }, []);

//   const decrementQuantity = () => {
//     if (quantity > 1) setQuantity(quantity - 1);
//   };

//   const incrementQuantity = () => {
//     if (quantity < 5) setQuantity(quantity + 1);
//   };

//   const handleAddToCart = async () => {
//     if (!localStorage.getItem("authToken")) {
//       toast.error("Please login to add items to cart", {
//         icon: "🔒",
//         duration: 2000,
//       });
//       return;
//     }

//     setIsAdding(true);
//     try {
//       const price = calculatePrice();
//       if (!price || isNaN(price)) {
//         toast.error("Invalid price. Please try again.");
//         return;
//       }

//       const cartItem = {
//         id: foodItem._id,
//         name: foodItem.name,
//         price: price,
//         quantity: quantity,
//         size: size,
//         img: foodItem.img,
//       };

//       await addToCart(cartItem);
//       toast.success(`Added ${quantity} ${foodItem.name} ${size ? `(${size})` : ""} to cart`, {
//         duration: 2000,
//         icon: "🛒",
//         style: {
//           background: "#22c55e",
//           color: "#fff",
//         },
//       });

//       setTimeout(() => {
//         setQuantity(1);
//         setIsAdding(false);
//       }, 1000);
//     } catch (error) {
//       toast.error("Failed to add item to cart");
//       console.error("Add to cart error:", error);
//       setIsAdding(false);
//     }
//   };

//   const getSizeOptions = () => {
//     try {
//       const options = foodItem.options?.[0] || {};
//       return Object.entries(options)
//         .filter(([_, value]) => value && !isNaN(Number(value)))
//         .map(([key, value]) => ({
//           value: key,
//           label: `${key.charAt(0).toUpperCase() + key.slice(1)} (₹${value})`,
//           price: Number(value),
//         }));
//     } catch (error) {
//       console.error("Get size options error:", error);
//       return [];
//     }
//   };

//   const calculatePrice = () => {
//     try {
//       if (!foodItem.options?.[0]) {
//         return 0;
//       }
//       const price = foodItem.options[0][size];
//       if (!price || isNaN(Number(price))) {
//         return 0;
//       }
//       return Math.round(Number(price) * quantity * 100) / 100;
//     } catch (error) {
//       console.error("Price calculation error:", error);
//       return 0;
//     }
//   };
  
//   const isVegetarian = () => {
//     const vegetarianKeywords = ["veg", "paneer", "jeera", "aloo", "mushroom", "gobi", "dal", "palak"];
//     return vegetarianKeywords.some(keyword => foodItem.name.toLowerCase().includes(keyword));
//   };

//   const price = calculatePrice();
//   const isValidPrice = price > 0 && !isNaN(price);
//   const sizeOptions = getSizeOptions();
//   const hasSizeOptions = sizeOptions.length > 0;

//   // Assuming an average prep time of 15-30 min based on the food type
//   const getEstimatedPrepTime = () => {
//     // Just a sample logic - in real app, this would come from backend
//     const isVeg = isVegetarian();
//     return isVeg ? "15-20" : "20-30";
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden
//                  border border-gray-100 hover:shadow-xl transition-all duration-300 relative
//                  w-full max-w-sm"
//       data-aos="fade-up"
//     >
//       {/* Food type badge */}
//       <motion.div
//         initial={{ x: 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
//         className={`absolute top-4 left-0 px-4 py-1.5 rounded-r-full shadow-lg 
//                    flex items-center gap-2 z-10
//                    ${isVegetarian() 
//                      ? "bg-gradient-to-r from-green-600 to-green-500 text-white" 
//                      : "bg-gradient-to-r from-red-600 to-red-500 text-white"}`}
//       >
//         {isVegetarian() ? <IoLeaf className="h-4 w-4" /> : <GiMeat className="h-4 w-4" />}
//         <span className="text-xs font-semibold tracking-wide">{isVegetarian() ? "Vegetarian" : "Non-Vegetarian"}</span>
//       </motion.div>
      
//       {/* Prep time badge */}
//       <motion.div
//         initial={{ x: 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
//         className="absolute top-14 left-0 px-4 py-1.5 rounded-r-full shadow-lg
//                   bg-gradient-to-r from-blue-600 to-blue-500 text-white
//                   flex items-center gap-2 z-10"
//       >
//         <Clock className="h-4 w-4" />
//         <span className="text-xs font-semibold tracking-wide">{getEstimatedPrepTime()} min</span>
//       </motion.div>

//       {/* Image container with gradient overlay */}
//       <div className="relative h-56 w-full overflow-hidden">
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="w-full h-full"
//         >
//           <img
//             className="object-cover w-full h-full"
//             src={foodItem.img || "/placeholder.svg"}
//             alt={foodItem.name}
//             loading="lazy"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//         </motion.div>
        
//         {/* Price label on image */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full
//                      shadow-lg flex items-center"
//         >
//           <FaRupeeSign className="text-green-600 mr-1" />
//           <span className="font-bold text-green-600">{isValidPrice ? price : "N/A"}</span>
//         </motion.div>
//       </div>

//       {/* Content */}
//       <div className="p-5 space-y-4">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{foodItem.name}</h2>
//           <p className="text-sm text-gray-600 mt-1 line-clamp-2">{foodItem.description}</p>
//         </div>

//         {/* Expandable selection area */}
//         <AnimatePresence>
//           {(showDetails || isAdding) && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-4 overflow-hidden"
//             >
//               {/* Size selector */}
//               {foodItem.options && foodItem.options.length > 0 && hasSizeOptions && (
//                 <div className="rounded-xl bg-gray-50/80 p-3 border border-gray-100">
//                   <label className="text-sm font-medium text-gray-700 block mb-2">Size:</label>
//                   <div className="flex flex-wrap gap-2">
//                     {sizeOptions.map((option) => (
//                       <button
//                         key={option.value}
//                         onClick={() => setSize(option.value)}
//                         className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
//                                 ${size === option.value 
//                                   ? "bg-green-100 text-green-700 border-2 border-green-500" 
//                                   : "bg-white text-gray-700 border border-gray-200 hover:border-green-300"}`}
//                       >
//                         {option.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Quantity selector */}
//               <div className="rounded-xl bg-gray-50/80 p-3 border border-gray-100">
//                 <label className="text-sm font-medium text-gray-700 block mb-2">Quantity:</label>
//                 <div className="flex items-center justify-between">
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={decrementQuantity}
//                     disabled={quantity <= 1}
//                     className={`p-2 rounded-full transition-colors duration-200
//                             ${quantity <= 1 
//                               ? "bg-gray-100 text-gray-400" 
//                               : "bg-green-100 text-green-600 hover:bg-green-200 shadow-sm"}`}
//                   >
//                     <Minus className="h-5 w-5" />
//                   </motion.button>
                  
//                   <div className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-inner
//                               flex items-center justify-center">
//                     <span className="font-bold text-lg">{quantity}</span>
//                   </div>
                  
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={incrementQuantity}
//                     disabled={quantity >= 5}
//                     className={`p-2 rounded-full transition-colors duration-200
//                             ${quantity >= 5 
//                               ? "bg-gray-100 text-gray-400" 
//                               : "bg-green-100 text-green-600 hover:bg-green-200 shadow-sm"}`}
//                   >
//                     <Plus className="h-5 w-5" />
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Toggle and Add buttons */}
//         <div className="flex items-center gap-3 pt-2">
//           {/* Toggle Details Button */}
//           <motion.button
//             onClick={() => setShowDetails(!showDetails)}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200
//                      ${showDetails 
//                        ? "bg-gray-100 text-gray-700" 
//                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
//           >
//             {showDetails ? "Hide Options" : "Customize"}
//           </motion.button>

//           {/* Add to Cart Button */}
//           <motion.button
//             onClick={handleAddToCart}
//             disabled={isAdding || !isValidPrice}
//             whileHover={isValidPrice && !isAdding ? { scale: 1.02 } : {}}
//             whileTap={isValidPrice && !isAdding ? { scale: 0.98 } : {}}
//             className={`flex-1 relative py-3 px-4 rounded-xl font-medium text-sm
//                       overflow-hidden transition-all duration-200
//                       ${!isValidPrice
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : isAdding
//                           ? "bg-green-600 shadow-lg"
//                           : "bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg"}`}
//           >
//             <AnimatePresence mode="wait">
//               {isAdding ? (
//                 <motion.div
//                   key="adding"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                   >
//                     <CheckCircle2 className="h-5 w-5 text-white" />
//                   </motion.div>
//                   <span className="text-white">Added!</span>
//                 </motion.div>
//               ) : !isValidPrice ? (
//                 <motion.div
//                   key="invalid"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <AlertCircle className="h-5 w-5 text-white" />
//                   <span className="text-white">Select Options</span>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="default"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1}}
//                     exit={{ opacity: 0 }}
//                     className="flex items-center justify-center gap-2"
//                   >
//                     <ShoppingCart className="h-5 w-5 text-white" />
//                     <span className="text-white">Add to Cart</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
  
//               <motion.div
//                 className="absolute inset-0 bg-white pointer-events-none"
//                 initial={{ scale: 0, opacity: 0.35 }}
//                 animate={
//                   isAdding
//                     ? {
//                         scale: 2,
//                         opacity: 0,
//                       }
//                     : {
//                         scale: 0,
//                         opacity: 0.35,
//                       }
//                 }
//                 transition={{ duration: 0.5 }}
//               />
//             </motion.button>
//           </div>
//         </div>
  
//         {/* Popular badge - conditionally rendered */}
//         {foodItem.popular && (
//           <motion.div
//             initial={{ opacity: 0, rotate: -5 }}
//             animate={{ opacity: 1, rotate: 0 }}
//             transition={{ delay: 0.5, type: "spring" }}
//             className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white
//                        py-1 px-3 rounded-lg shadow-lg transform rotate-3 text-xs font-bold tracking-wide
//                        flex items-center gap-1 z-10"
//           >
//             ⭐ Popular Choice
//           </motion.div>
//         )}
//       </motion.div>
//     );
//   };
  
//   export default FoodCard;










// adithyaj219@gmail.com


// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { FaRupeeSign } from "react-icons/fa";
// import { Plus, Minus, ShoppingCart, CheckCircle2, AlertCircle, Clock, Star, Info } from "lucide-react";
// import { IoLeaf } from "react-icons/io5";
// import { GiMeat } from "react-icons/gi";
// import { toast } from "react-hot-toast";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useCart } from "../context/CartContext";
// import { motion, AnimatePresence } from "framer-motion";

// const FoodCard = ({ foodItem }) => {
//   const { addToCart, isItemInCart } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const [size, setSize] = useState(null);
  
//   // Calculate nutrition info based on foodItem data (would be dynamic in real app)
//   const nutritionInfo = useMemo(() => ({
//     calories: Math.floor(Math.random() * 400) + 200,
//     protein: Math.floor(Math.random() * 20) + 5,
//     carbs: Math.floor(Math.random() * 40) + 20,
//     fat: Math.floor(Math.random() * 15) + 5
//   }), [foodItem._id]);

//   // Get initial size on component mount
//   useEffect(() => {
//     try {
//       const options = foodItem.options?.[0] || {};
//       const availableSizes = Object.keys(options);
//       if (availableSizes.length > 0) {
//         setSize(availableSizes[0]);
//       }
//     } catch (error) {
//       console.error("Size initialization error:", error);
//     }
//   }, [foodItem]);

//   // Reset quantity when food item changes
//   useEffect(() => {
//     setQuantity(1);
//   }, [foodItem._id]);

//   // Initialize AOS animation library
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: true,
//       easing: "ease-out-cubic",
//     });
//   }, []);

//   // Check if this item is already in cart
//   const itemInCart = useMemo(() => {
//     return isItemInCart ? isItemInCart(foodItem._id, size) : false;
//   }, [isItemInCart, foodItem._id, size]);

//   // Memoize calculated values to prevent unnecessary re-renders
//   const sizeOptions = useMemo(() => getSizeOptions(), [foodItem.options]);
//   const hasSizeOptions = sizeOptions.length > 0;
//   const price = useMemo(() => calculatePrice(), [size, quantity, foodItem.options]);
//   const isValidPrice = price > 0 && !isNaN(price);
//   const isVeg = useMemo(() => isVegetarian(), [foodItem.name]);
//   const prepTime = useMemo(() => getEstimatedPrepTime(), [isVeg]);
  
//   const decrementQuantity = useCallback(() => {
//     setQuantity(prev => Math.max(prev - 1, 1));
//   }, []);

//   const incrementQuantity = useCallback(() => {
//     setQuantity(prev => Math.min(prev + 1, 10)); // Increased max quantity to 10
//   }, []);

//   const toggleDetails = useCallback(() => {
//     setShowDetails(prev => !prev);
//   }, []);

//   const handleAddToCart = async () => {
//     if (!localStorage.getItem("authToken")) {
//       toast.error("Please login to add items to cart", {
//         icon: "🔒",
//         duration: 2000,
//       });
//       return;
//     }

//     if (!isValidPrice) {
//       toast.error("Please select a size option first", {
//         icon: "⚠️",
//         duration: 2000,
//       });
//       return;
//     }

//     setIsAdding(true);
//     try {
//       const cartItem = {
//         id: foodItem._id,
//         name: foodItem.name,
//         price: price,
//         quantity: quantity,
//         size: size,
//         img: foodItem.img,
//         isVeg: isVeg
//       };

//       await addToCart(cartItem);
//       toast.success(`Added ${quantity} ${foodItem.name} ${size ? `(${size})` : ""} to cart`, {
//         duration: 2000,
//         icon: "🛒",
//         style: {
//           background: "#22c55e",
//           color: "#fff",
//         },
//       });

//       // Show success state briefly, then reset
//       setTimeout(() => {
//         setIsAdding(false);
//       }, 1000);
//     } catch (error) {
//       toast.error("Failed to add item to cart");
//       console.error("Add to cart error:", error);
//       setIsAdding(false);
//     }
//   };

//   function getSizeOptions() {
//     try {
//       const options = foodItem.options?.[0] || {};
//       return Object.entries(options)
//         .filter(([_, value]) => value && !isNaN(Number(value)))
//         .map(([key, value]) => ({
//           value: key,
//           label: `${key.charAt(0).toUpperCase() + key.slice(1)} (₹${value})`,
//           price: Number(value),
//         }));
//     } catch (error) {
//       console.error("Get size options error:", error);
//       return [];
//     }
//   }

//   function calculatePrice() {
//     try {
//       if (!foodItem.options?.[0] || !size) {
//         return 0;
//       }
//       const price = foodItem.options[0][size];
//       if (!price || isNaN(Number(price))) {
//         return 0;
//       }
//       return Math.round(Number(price) * quantity * 100) / 100;
//     } catch (error) {
//       console.error("Price calculation error:", error);
//       return 0;
//     }
//   }
  
//   function isVegetarian() {
//     const vegetarianKeywords = ["veg", "paneer", "jeera", "aloo", "mushroom", "gobi", "dal", "palak"];
//     return vegetarianKeywords.some(keyword => foodItem.name.toLowerCase().includes(keyword));
//   }

//   function getEstimatedPrepTime() {
//     return isVegetarian() ? "15-20" : "20-30";
//   }

//   // Calculate popularity score (1-5)
//   const getPopularityScore = () => {
//     return foodItem.popular ? (Math.floor(Math.random() * 2) + 4) : (Math.floor(Math.random() * 3) + 1);
//   };

//   const spicyLevel = useMemo(() => {
//     // Example logic - in a real app this would come from the API
//     const spicyKeywords = ["spicy", "masala", "chilli", "hot", "pepper"];
//     let level = 1; // Default low spicy level
    
//     spicyKeywords.forEach(keyword => {
//       if (foodItem.name.toLowerCase().includes(keyword) || 
//           (foodItem.description && foodItem.description.toLowerCase().includes(keyword))) {
//         level += 1;
//       }
//     });
    
//     return Math.min(level, 3); // Cap at 3 (mild, medium, hot)
//   }, [foodItem.name, foodItem.description]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden
//                  border border-gray-100 hover:shadow-xl transition-all duration-300 relative
//                  w-full max-w-sm"
//       data-aos="fade-up"
//       data-testid={`food-card-${foodItem._id}`}
//     >
//       {/* Food type badge */}
//       <motion.div
//         initial={{ x: 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
//         className={`absolute top-4 left-0 px-4 py-1.5 rounded-r-full shadow-lg 
//                    flex items-center gap-2 z-10
//                    ${isVeg 
//                      ? "bg-gradient-to-r from-green-600 to-green-500 text-white" 
//                      : "bg-gradient-to-r from-red-600 to-red-500 text-white"}`}
//         aria-label={`${isVeg ? "Vegetarian" : "Non-Vegetarian"} dish`}
//       >
//         {isVeg ? <IoLeaf className="h-4 w-4" /> : <GiMeat className="h-4 w-4" />}
//         <span className="text-xs font-semibold tracking-wide">{isVeg ? "Vegetarian" : "Non-Vegetarian"}</span>
//       </motion.div>
      
//       {/* Prep time badge */}
//       <motion.div
//         initial={{ x: 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
//         className="absolute top-14 left-0 px-4 py-1.5 rounded-r-full shadow-lg
//                   bg-gradient-to-r from-blue-600 to-blue-500 text-white
//                   flex items-center gap-2 z-10"
//         aria-label={`Preparation time: ${prepTime} minutes`}
//       >
//         <Clock className="h-4 w-4" />
//         <span className="text-xs font-semibold tracking-wide">{prepTime} min</span>
//       </motion.div>

//       {/* Spicy level indicator */}
//       {spicyLevel > 1 && (
//         <motion.div
//           initial={{ x: 50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
//           className="absolute top-24 left-0 px-4 py-1.5 rounded-r-full shadow-lg
//                     bg-gradient-to-r from-orange-600 to-orange-500 text-white
//                     flex items-center gap-2 z-10"
//           aria-label={`Spiciness level: ${spicyLevel === 2 ? "Medium" : "Hot"}`}
//         >
//           <span className="text-xs font-semibold tracking-wide flex items-center">
//             {"🌶️".repeat(spicyLevel)} 
//             <span className="ml-1">{spicyLevel === 2 ? "Medium" : "Hot"}</span>
//           </span>
//         </motion.div>
//       )}

//       {/* Image container with gradient overlay */}
//       <div className="relative h-56 w-full overflow-hidden">
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="w-full h-full"
//         >
//           <img
//             className="object-cover w-full h-full"
//             src={foodItem.img || "/placeholder.svg"}
//             alt={foodItem.name}
//             loading="lazy"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "/placeholder.svg";
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//         </motion.div>
        
//         {/* Price label on image */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full
//                      shadow-lg flex items-center"
//           aria-label={`Price: ${isValidPrice ? price : "Not available"} rupees`}
//         >
//           <FaRupeeSign className="text-green-600 mr-1" />
//           <span className="font-bold text-green-600">{isValidPrice ? price : "N/A"}</span>
//         </motion.div>

//         {/* Rating badge */}
//         {foodItem.popular && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.45 }}
//             className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full
//                        shadow-lg flex items-center"
//             aria-label={`Rating: ${getPopularityScore()} out of 5`}
//           >
//             <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
//             <span className="font-bold text-gray-700">{getPopularityScore()}/5</span>
//           </motion.div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-5 space-y-4">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{foodItem.name}</h2>
//           <p className="text-sm text-gray-600 mt-1 line-clamp-2">{foodItem.description || "A delicious dish prepared with the finest ingredients."}</p>
//         </div>

//         {/* Nutrition info preview */}
//         <div className="flex justify-between text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
//           <span>Cal: {nutritionInfo.calories}</span>
//           <span>Protein: {nutritionInfo.protein}g</span>
//           <span>Carbs: {nutritionInfo.carbs}g</span>
//           <span>Fat: {nutritionInfo.fat}g</span>
//         </div>

//         {/* Expandable selection area */}
//         <AnimatePresence>
//           {(showDetails || isAdding) && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-4 overflow-hidden"
//             >
//               {/* Size selector */}
//               {foodItem.options && foodItem.options.length > 0 && hasSizeOptions && (
//                 <div className="rounded-xl bg-gray-50/80 p-3 border border-gray-100">
//                   <label className="text-sm font-medium text-gray-700 block mb-2">Size:</label>
//                   <div className="flex flex-wrap gap-2">
//                     {sizeOptions.map((option) => (
//                       <button
//                         key={option.value}
//                         onClick={() => setSize(option.value)}
//                         className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
//                                 ${size === option.value 
//                                   ? "bg-green-100 text-green-700 border-2 border-green-500" 
//                                   : "bg-white text-gray-700 border border-gray-200 hover:border-green-300"}`}
//                         aria-pressed={size === option.value}
//                         aria-label={`Size option: ${option.label}`}
//                       >
//                         {option.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Quantity selector */}
//               <div className="rounded-xl bg-gray-50/80 p-3 border border-gray-100">
//                 <label className="text-sm font-medium text-gray-700 block mb-2">Quantity:</label>
//                 <div className="flex items-center justify-between">
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={decrementQuantity}
//                     disabled={quantity <= 1}
//                     className={`p-2 rounded-full transition-colors duration-200
//                             ${quantity <= 1 
//                               ? "bg-gray-100 text-gray-400" 
//                               : "bg-green-100 text-green-600 hover:bg-green-200 shadow-sm"}`}
//                     aria-label="Decrease quantity"
//                   >
//                     <Minus className="h-5 w-5" />
//                   </motion.button>
                  
//                   <div className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-inner
//                               flex items-center justify-center">
//                     <span className="font-bold text-lg" aria-live="polite" aria-label={`Quantity: ${quantity}`}>{quantity}</span>
//                   </div>
                  
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={incrementQuantity}
//                     disabled={quantity >= 10}
//                     className={`p-2 rounded-full transition-colors duration-200
//                             ${quantity >= 10 
//                               ? "bg-gray-100 text-gray-400" 
//                               : "bg-green-100 text-green-600 hover:bg-green-200 shadow-sm"}`}
//                     aria-label="Increase quantity"
//                   >
//                     <Plus className="h-5 w-5" />
//                   </motion.button>
//                 </div>
//               </div>

//               {/* Nutritional info and ingredients expanded */}
//               <div className="rounded-xl bg-gray-50/80 p-3 border border-gray-100">
//                 <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
//                   <Info className="h-4 w-4" />
//                   <span>Nutritional Info & Ingredients</span>
//                 </div>
//                 <div className="text-xs text-gray-600 space-y-2">
//                   <div className="grid grid-cols-2 gap-y-1">
//                     <span>Calories:</span><span className="font-medium">{nutritionInfo.calories} kcal</span>
//                     <span>Protein:</span><span className="font-medium">{nutritionInfo.protein}g</span>
//                     <span>Carbohydrates:</span><span className="font-medium">{nutritionInfo.carbs}g</span>
//                     <span>Fat:</span><span className="font-medium">{nutritionInfo.fat}g</span>
//                   </div>
//                   <p className="pt-1 border-t border-gray-200 mt-2">
//                     <strong>Ingredients:</strong> {foodItem.ingredients || "Natural ingredients sourced from local farms when possible."}
//                   </p>
//                   <p className="text-xs text-gray-500 italic mt-1">
//                     * Nutritional values are approximate and may vary.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Toggle and Add buttons */}
//         <div className="flex items-center gap-3 pt-2">
//           {/* Toggle Details Button */}
//           <motion.button
//             onClick={toggleDetails}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200
//                      ${showDetails 
//                        ? "bg-gray-100 text-gray-700" 
//                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
//             aria-expanded={showDetails}
//             aria-controls={`details-${foodItem._id}`}
//           >
//             {showDetails ? "Hide Options" : "Customize"}
//           </motion.button>

//           {/* Add to Cart Button */}
//           <motion.button
//             onClick={handleAddToCart}
//             disabled={isAdding || !isValidPrice}
//             whileHover={isValidPrice && !isAdding ? { scale: 1.02 } : {}}
//             whileTap={isValidPrice && !isAdding ? { scale: 0.98 } : {}}
//             className={`flex-1 relative py-3 px-4 rounded-xl font-medium text-sm
//                       overflow-hidden transition-all duration-200
//                       ${!isValidPrice
//                         ? "bg-gray-400 cursor-not-allowed text-white"
//                         : isAdding
//                           ? "bg-green-600 shadow-lg text-white"
//                           : itemInCart
//                             ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg text-white"
//                             : "bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg text-white"}`}
//             aria-label={!isValidPrice 
//               ? "Select options first" 
//               : isAdding 
//                 ? "Adding to cart" 
//                 : itemInCart 
//                   ? "Add more to cart" 
//                   : "Add to cart"}
//           >
//             <AnimatePresence mode="wait">
//               {isAdding ? (
//                 <motion.div
//                   key="adding"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                   >
//                     <CheckCircle2 className="h-5 w-5 text-white" />
//                   </motion.div>
//                   <span className="text-white">Added!</span>
//                 </motion.div>
//               ) : !isValidPrice ? (
//                 <motion.div
//                   key="invalid"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <AlertCircle className="h-5 w-5 text-white" />
//                   <span className="text-white">Select Options</span>
//                 </motion.div>
//               ) : itemInCart ? (
//                 <motion.div
//                   key="in-cart"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <ShoppingCart className="h-5 w-5 text-white" />
//                   <span className="text-white">Add More</span>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="default"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <ShoppingCart className="h-5 w-5 text-white" />
//                   <span className="text-white">Add to Cart</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//             <motion.div
//               className="absolute inset-0 bg-white pointer-events-none"
//               initial={{ scale: 0, opacity: 0.35 }}
//               animate={
//                 isAdding
//                   ? {
//                       scale: 2,
//                       opacity: 0,
//                     }
//                   : {
//                       scale: 0,
//                       opacity: 0.35,
//                     }
//               }
//               transition={{ duration: 0.5 }}
//             />
//           </motion.button>
//         </div>
//       </div>
//       {/* Popular badge - conditionally rendered */}
//       {foodItem.popular && (
//         <motion.div
//           initial={{ opacity: 0, rotate: -5 }}
//           animate={{ opacity: 1, rotate: 0 }}
//           transition={{ delay: 0.5, type: "spring" }}
//           className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white
//                      py-1 px-3 rounded-lg shadow-lg transform rotate-3 text-xs font-bold tracking-wide
//                      flex items-center gap-1 z-10"
//           aria-label="Popular choice"
//         >
//           ⭐ Popular Choice
//         </motion.div>
//       )}

//       {/* Recently added badge - randomly show for some items */}
//       {!foodItem.popular && Math.random() > 0.7 && (
//         <motion.div
//           initial={{ opacity: 0, rotate: 5 }}
//           animate={{ opacity: 1, rotate: 0 }}
//           transition={{ delay: 0.5, type: "spring" }}
//           className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white
//                      py-1 px-3 rounded-lg shadow-lg transform -rotate-3 text-xs font-bold tracking-wide
//                      flex items-center gap-1 z-10"
//           aria-label="New item"
//         >
//           🆕 New Item
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default React.memo(FoodCard);












































// adithyaj219@GiMailShirt.com



// import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
// import { FaRupeeSign } from "react-icons/fa";
// import { Plus, Minus, ShoppingCart, CheckCircle2, AlertCircle, Clock, Star, Info, X } from "lucide-react";
// import { IoLeaf } from "react-icons/io5";
// import { GiMeat } from "react-icons/gi";
// import { toast } from "react-hot-toast";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useCart } from "../context/CartContext";
// import { motion, AnimatePresence } from "framer-motion";

// // Create a context to manage which card is currently expanded
// const FoodCardContext = React.createContext();

// // This provider should be wrapped around the list of food cards
// export const FoodCardProvider = ({ children }) => {
//   const [expandedCardId, setExpandedCardId] = useState(null);
  
//   const toggleCardExpansion = (id) => {
//     setExpandedCardId(prev => prev === id ? null : id);
//   };
  
//   return (
//     <FoodCardContext.Provider value={{ expandedCardId, toggleCardExpansion }}>
//       {children}
//     </FoodCardContext.Provider>
//   );
// };

// const FoodCard = ({ foodItem }) => {
//   const { addToCart, isItemInCart } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
//   const [size, setSize] = useState(null);
//   const { expandedCardId, toggleCardExpansion } = useContext(FoodCardContext);
  
//   // Check if this card is the one currently expanded
//   const isExpanded = expandedCardId === foodItem._id;
  
//   // Calculate nutrition info
//   const nutritionInfo = useMemo(() => ({
//     calories: Math.floor(Math.random() * 400) + 200,
//     protein: Math.floor(Math.random() * 20) + 5,
//     carbs: Math.floor(Math.random() * 40) + 20,
//     fat: Math.floor(Math.random() * 15) + 5
//   }), [foodItem._id]);

//   // Get initial size on component mount
//   useEffect(() => {
//     try {
//       const options = foodItem.options?.[0] || {};
//       const availableSizes = Object.keys(options);
//       if (availableSizes.length > 0) {
//         setSize(availableSizes[0]);
//       }
//     } catch (error) {
//       console.error("Size initialization error:", error);
//     }
//   }, [foodItem]);

//   // Reset quantity when food item changes
//   useEffect(() => {
//     setQuantity(1);
//   }, [foodItem._id]);

//   // Initialize AOS animation library
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: true,
//       easing: "ease-out-cubic",
//     });
//   }, []);

//   // Check if this item is already in cart
//   const itemInCart = useMemo(() => {
//     return isItemInCart ? isItemInCart(foodItem._id, size) : false;
//   }, [isItemInCart, foodItem._id, size]);

//   // Memoize calculated values
//   const sizeOptions = useMemo(() => getSizeOptions(), [foodItem.options]);
//   const hasSizeOptions = sizeOptions.length > 0;
//   const price = useMemo(() => calculatePrice(), [size, quantity, foodItem.options]);
//   const isValidPrice = price > 0 && !isNaN(price);
//   const isVeg = useMemo(() => isVegetarian(), [foodItem.name]);
//   const prepTime = useMemo(() => getEstimatedPrepTime(), [isVeg]);
  
//   const decrementQuantity = useCallback(() => {
//     setQuantity(prev => Math.max(prev - 1, 1));
//   }, []);

//   const incrementQuantity = useCallback(() => {
//     setQuantity(prev => Math.min(prev + 1, 10));
//   }, []);

//   const toggleDetails = useCallback(() => {
//     toggleCardExpansion(foodItem._id);
//   }, [toggleCardExpansion, foodItem._id]);

//   const handleAddToCart = async () => {
//     if (!localStorage.getItem("authToken")) {
//       toast.error("Please login to add items to cart", {
//         icon: "🔒",
//         duration: 2000,
//       });
//       return;
//     }

//     if (!isValidPrice) {
//       toast.error("Please select a size option first", {
//         icon: "⚠️",
//         duration: 2000,
//       });
//       return;
//     }

//     setIsAdding(true);
//     try {
//       const cartItem = {
//         id: foodItem._id,
//         name: foodItem.name,
//         price: price,
//         quantity: quantity,
//         size: size,
//         img: foodItem.img,
//         isVeg: isVeg
//       };

//       await addToCart(cartItem);
//       toast.success(`Added ${quantity} ${foodItem.name} ${size ? `(${size})` : ""} to cart`, {
//         duration: 2000,
//         icon: "🛒",
//         style: {
//           background: "#22c55e",
//           color: "#fff",
//         },
//       });

//       setTimeout(() => {
//         setIsAdding(false);
//       }, 1000);
//     } catch (error) {
//       toast.error("Failed to add item to cart");
//       console.error("Add to cart error:", error);
//       setIsAdding(false);
//     }
//   };

//   function getSizeOptions() {
//     try {
//       const options = foodItem.options?.[0] || {};
//       return Object.entries(options)
//         .filter(([_, value]) => value && !isNaN(Number(value)))
//         .map(([key, value]) => ({
//           value: key,
//           label: `${key.charAt(0).toUpperCase() + key.slice(1)} (₹${value})`,
//           price: Number(value),
//         }));
//     } catch (error) {
//       console.error("Get size options error:", error);
//       return [];
//     }
//   }

//   function calculatePrice() {
//     try {
//       if (!foodItem.options?.[0] || !size) {
//         return 0;
//       }
//       const price = foodItem.options[0][size];
//       if (!price || isNaN(Number(price))) {
//         return 0;
//       }
//       return Math.round(Number(price) * quantity * 100) / 100;
//     } catch (error) {
//       console.error("Price calculation error:", error);
//       return 0;
//     }
//   }
  
//   function isVegetarian() {
//     const vegetarianKeywords = ["veg", "paneer", "jeera", "aloo", "mushroom", "gobi", "dal", "palak"];
//     return vegetarianKeywords.some(keyword => foodItem.name.toLowerCase().includes(keyword));
//   }

//   function getEstimatedPrepTime() {
//     return isVegetarian() ? "15-20" : "20-30";
//   }

//   // Calculate popularity score (1-5)
//   const getPopularityScore = () => {
//     return foodItem.popular ? (Math.floor(Math.random() * 2) + 4) : (Math.floor(Math.random() * 3) + 1);
//   };

//   const spicyLevel = useMemo(() => {
//     const spicyKeywords = ["spicy", "masala", "chilli", "hot", "pepper"];
//     let level = 1;
    
//     spicyKeywords.forEach(keyword => {
//       if (foodItem.name.toLowerCase().includes(keyword) || 
//           (foodItem.description && foodItem.description.toLowerCase().includes(keyword))) {
//         level += 1;
//       }
//     });
    
//     return Math.min(level, 3);
//   }, [foodItem.name, foodItem.description]);

//   // Custom Details Panel that appears to the right
//   const CustomizePanel = () => (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5 w-full max-w-xs space-y-4"
//     >
//       <div className="flex justify-between items-center">
//         <h3 className="font-bold text-lg text-gray-800">Customize Order</h3>
//         <button 
//           onClick={toggleDetails}
//           className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//           aria-label="Close customization panel"
//         >
//           <X className="h-5 w-5 text-gray-600" />
//         </button>
//       </div>
      
//       {/* Size selector */}
//       {foodItem.options && foodItem.options.length > 0 && hasSizeOptions && (
//         <div className="rounded-xl bg-gray-50/80 p-3 border border-gray-100">
//           <label className="text-sm font-medium text-gray-700 block mb-2">Size:</label>
//           <div className="flex flex-wrap gap-2">
//             {sizeOptions.map((option) => (
//               <button
//                 key={option.value}
//                 onClick={() => setSize(option.value)}
//                 className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
//                         ${size === option.value 
//                           ? "bg-green-100 text-green-700 border-2 border-green-500" 
//                           : "bg-white text-gray-700 border border-gray-200 hover:border-green-300"}`}
//                 aria-pressed={size === option.value}
//                 aria-label={`Size option: ${option.label}`}
//               >
//                 {option.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Quantity selector */}
//       <div className="rounded-xl bg-gray-50/80 p-3 border border-gray-100">
//         <label className="text-sm font-medium text-gray-700 block mb-2">Quantity:</label>
//         <div className="flex items-center justify-between">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={decrementQuantity}
//             disabled={quantity <= 1}
//             className={`p-2 rounded-full transition-colors duration-200
//                     ${quantity <= 1 
//                       ? "bg-gray-100 text-gray-400" 
//                       : "bg-green-100 text-green-600 hover:bg-green-200 shadow-sm"}`}
//             aria-label="Decrease quantity"
//           >
//             <Minus className="h-5 w-5" />
//           </motion.button>
          
//           <div className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-inner
//                       flex items-center justify-center">
//             <span className="font-bold text-lg" aria-live="polite" aria-label={`Quantity: ${quantity}`}>{quantity}</span>
//           </div>
          
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={incrementQuantity}
//             disabled={quantity >= 10}
//             className={`p-2 rounded-full transition-colors duration-200
//                     ${quantity >= 10 
//                       ? "bg-gray-100 text-gray-400" 
//                       : "bg-green-100 text-green-600 hover:bg-green-200 shadow-sm"}`}
//             aria-label="Increase quantity"
//           >
//             <Plus className="h-5 w-5" />
//           </motion.button>
//         </div>
//       </div>

//       {/* Nutritional info and ingredients expanded */}
//       <div className="rounded-xl bg-gray-50/80 p-3 border border-gray-100">
//         <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
//           <Info className="h-4 w-4" />
//           <span>Nutritional Info & Ingredients</span>
//         </div>
//         <div className="text-xs text-gray-600 space-y-2">
//           <div className="grid grid-cols-2 gap-y-1">
//             <span>Calories:</span><span className="font-medium">{nutritionInfo.calories} kcal</span>
//             <span>Protein:</span><span className="font-medium">{nutritionInfo.protein}g</span>
//             <span>Carbohydrates:</span><span className="font-medium">{nutritionInfo.carbs}g</span>
//             <span>Fat:</span><span className="font-medium">{nutritionInfo.fat}g</span>
//           </div>
//           <p className="pt-1 border-t border-gray-200 mt-2">
//             <strong>Ingredients:</strong> {foodItem.ingredients || "Natural ingredients sourced from local farms when possible."}
//           </p>
//           <p className="text-xs text-gray-500 italic mt-1">
//             * Nutritional values are approximate and may vary.
//           </p>
//         </div>
//       </div>
      
//       {/* Add to Cart Button on panel */}
//       <motion.button
//         onClick={handleAddToCart}
//         disabled={isAdding || !isValidPrice}
//         whileHover={isValidPrice && !isAdding ? { scale: 1.02 } : {}}
//         whileTap={isValidPrice && !isAdding ? { scale: 0.98 } : {}}
//         className={`w-full relative py-3 px-4 rounded-xl font-medium text-sm
//                   overflow-hidden transition-all duration-200
//                   ${!isValidPrice
//                     ? "bg-gray-400 cursor-not-allowed text-white"
//                     : isAdding
//                       ? "bg-green-600 shadow-lg text-white"
//                       : itemInCart
//                         ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg text-white"
//                         : "bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg text-white"}`}
//         aria-label={!isValidPrice 
//           ? "Select options first" 
//           : isAdding 
//             ? "Adding to cart" 
//             : itemInCart 
//               ? "Add more to cart" 
//               : "Add to cart"}
//       >
//         <AnimatePresence mode="wait">
//           {isAdding ? (
//             <motion.div
//               key="adding"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex items-center justify-center gap-2"
//             >
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//               >
//                 <CheckCircle2 className="h-5 w-5 text-white" />
//               </motion.div>
//               <span className="text-white">Added!</span>
//             </motion.div>
//           ) : !isValidPrice ? (
//             <motion.div
//               key="invalid"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex items-center justify-center gap-2"
//             >
//               <AlertCircle className="h-5 w-5 text-white" />
//               <span className="text-white">Select Options</span>
//             </motion.div>
//           ) : itemInCart ? (
//             <motion.div
//               key="in-cart"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex items-center justify-center gap-2"
//             >
//               <ShoppingCart className="h-5 w-5 text-white" />
//               <span className="text-white">Add More</span>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="default"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex items-center justify-center gap-2"
//             >
//               <ShoppingCart className="h-5 w-5 text-white" />
//               <span className="text-white">Add to Cart</span>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <motion.div
//           className="absolute inset-0 bg-white pointer-events-none"
//           initial={{ scale: 0, opacity: 0.35 }}
//           animate={
//             isAdding
//               ? {
//                   scale: 2,
//                   opacity: 0,
//                 }
//               : {
//                   scale: 0,
//                   opacity: 0.35,
//                 }
//           }
//           transition={{ duration: 0.5 }}
//         />
//       </motion.button>
      
//       {/* Current price display */}
//       <div className="flex justify-center items-center gap-2 font-bold text-lg text-green-600">
//         <span>Total:</span>
//         <FaRupeeSign className="text-green-600" />
//         <span>{isValidPrice ? price : "N/A"}</span>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="relative">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden
//                  border border-gray-100 hover:shadow-xl transition-all duration-300 relative
//                  w-full max-w-sm ${isExpanded ? 'ring-2 ring-green-500' : ''}`}
//         data-aos="fade-up"
//         data-testid={`food-card-${foodItem._id}`}
//       >
//         {/* Food type badge */}
//         <motion.div
//           initial={{ x: 50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
//           className={`absolute top-4 left-0 px-4 py-1.5 rounded-r-full shadow-lg 
//                      flex items-center gap-2 z-10
//                      ${isVeg 
//                        ? "bg-gradient-to-r from-green-600 to-green-500 text-white" 
//                        : "bg-gradient-to-r from-red-600 to-red-500 text-white"}`}
//           aria-label={`${isVeg ? "Vegetarian" : "Non-Vegetarian"} dish`}
//         >
//           {isVeg ? <IoLeaf className="h-4 w-4" /> : <GiMeat className="h-4 w-4" />}
//           <span className="text-xs font-semibold tracking-wide">{isVeg ? "Vegetarian" : "Non-Vegetarian"}</span>
//         </motion.div>
        
//         {/* Prep time badge */}
//         <motion.div
//           initial={{ x: 50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
//           className="absolute top-14 left-0 px-4 py-1.5 rounded-r-full shadow-lg
//                     bg-gradient-to-r from-blue-600 to-blue-500 text-white
//                     flex items-center gap-2 z-10"
//           aria-label={`Preparation time: ${prepTime} minutes`}
//         >
//           <Clock className="h-4 w-4" />
//           <span className="text-xs font-semibold tracking-wide">{prepTime} min</span>
//         </motion.div>

//         {/* Spicy level indicator */}
//         {spicyLevel > 1 && (
//           <motion.div
//             initial={{ x: 50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
//             className="absolute top-24 left-0 px-4 py-1.5 rounded-r-full shadow-lg
//                       bg-gradient-to-r from-orange-600 to-orange-500 text-white
//                       flex items-center gap-2 z-10"
//             aria-label={`Spiciness level: ${spicyLevel === 2 ? "Medium" : "Hot"}`}
//           >
//             <span className="text-xs font-semibold tracking-wide flex items-center">
//               {"🌶️".repeat(spicyLevel)} 
//               <span className="ml-1">{spicyLevel === 2 ? "Medium" : "Hot"}</span>
//             </span>
//           </motion.div>
//         )}

//         {/* Image container with gradient overlay */}
//         <div className="relative h-56 w-full overflow-hidden">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className="w-full h-full"
//           >
//             <img
//               className="object-cover w-full h-full"
//               src={foodItem.img || "/placeholder.svg"}
//               alt={foodItem.name}
//               loading="lazy"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "/placeholder.svg";
//               }}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//           </motion.div>
          
//           {/* Price label on image */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full
//                        shadow-lg flex items-center"
//             aria-label={`Price: ${isValidPrice ? price : "Not available"} rupees`}
//           >
//             <FaRupeeSign className="text-green-600 mr-1" />
//             <span className="font-bold text-green-600">{isValidPrice ? price : "N/A"}</span>
//           </motion.div>

//           {/* Rating badge */}
//           {foodItem.popular && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.45 }}
//               className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full
//                          shadow-lg flex items-center"
//               aria-label={`Rating: ${getPopularityScore()} out of 5`}
//             >
//               <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
//               <span className="font-bold text-gray-700">{getPopularityScore()}/5</span>
//             </motion.div>
//           )}
//         </div>

//         {/* Content */}
//         <div className="p-5 space-y-4">
//           <div>
//             <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{foodItem.name}</h2>
//             <p className="text-sm text-gray-600 mt-1 line-clamp-2">{foodItem.description || "A delicious dish prepared with the finest ingredients."}</p>
//           </div>

//           {/* Nutrition info preview */}
//           <div className="flex justify-between text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
//             <span>Cal: {nutritionInfo.calories}</span>
//             <span>Protein: {nutritionInfo.protein}g</span>
//             <span>Carbs: {nutritionInfo.carbs}g</span>
//             <span>Fat: {nutritionInfo.fat}g</span>
//           </div>

//           {/* Toggle and Add buttons */}
//           <div className="flex items-center gap-3 pt-2">
//             {/* Toggle Details Button */}
//             <motion.button
//               onClick={toggleDetails}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200
//                        ${isExpanded 
//                          ? "bg-green-100 text-green-700 border border-green-500" 
//                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
//               aria-expanded={isExpanded}
//               aria-controls={`details-${foodItem._id}`}
//             >
//               {isExpanded ? "Customizing..." : "Customize"}
//             </motion.button>

//             {/* Add to Cart Button (only visible when not customizing) */}
//             {!isExpanded && (
//               <motion.button
//                 onClick={handleAddToCart}
//                 disabled={isAdding || !isValidPrice}
//                 whileHover={isValidPrice && !isAdding ? { scale: 1.02 } : {}}
//                 whileTap={isValidPrice && !isAdding ? { scale: 0.98 } : {}}
//                 className={`flex-1 relative py-3 px-4 rounded-xl font-medium text-sm
//                           overflow-hidden transition-all duration-200
//                           ${!isValidPrice
//                             ? "bg-gray-400 cursor-not-allowed text-white"
//                             : isAdding
//                               ? "bg-green-600 shadow-lg text-white"
//                               : itemInCart
//                                 ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg text-white"
//                                 : "bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg text-white"}`}
//                 aria-label={!isValidPrice 
//                   ? "Select options first" 
//                   : isAdding 
//                     ? "Adding to cart" 
//                     : itemInCart 
//                       ? "Add more to cart" 
//                       : "Add to cart"}
//               >
//                 <AnimatePresence mode="wait">
//                   {isAdding ? (
//                     <motion.div
//                       key="adding"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       className="flex items-center justify-center gap-2"
//                     >
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                       >
//                         <CheckCircle2 className="h-5 w-5 text-white" />
//                       </motion.div>
//                       <span className="text-white">Added!</span>
//                     </motion.div>
//                   ) : !isValidPrice ? (
//                     <motion.div
//                       key="invalid"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       className="flex items-center justify-center gap-2"
//                     >
//                       <AlertCircle className="h-5 w-5 text-white" />
//                       <span className="text-white">Select Options</span>
//                     </motion.div>
//                   ) : itemInCart ? (
//                     <motion.div
//                       key="in-cart"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       className="flex items-center justify-center gap-2"
//                     >
//                       <ShoppingCart className="h-5 w-5 text-white" />
//                       <span className="text-white">Add More</span>
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       key="default"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       className="flex items-center justify-center gap-2"
//                     >
//                       <ShoppingCart className="h-5 w-5 text-white" />
//                       <span className="text-white">Add to Cart</span>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//                 <motion.div
//                   className="absolute inset-0 bg-white pointer-events-none"
//                   initial={{ scale: 0, opacity: 0.35 }}
//                   animate={
//                     isAdding
//                       ? {
//                           scale: 2,
//                           opacity: 0,
//                         }
//                       : {
//                           scale: 0,
//                           opacity: 0.35,
//                         }
//                   }
//                   transition={{ duration: 0.5 }}
//                 />
//               </motion.button>
//             )}
//           </div>
//         </div>
//         {/* Popular badge - conditionally rendered */}
//         {foodItem.popular && (
//           <motion.div
//             initial={{ opacity: 0, rotate: -5 }}
//             animate={{ opacity: 1, rotate: 0 }}
//             transition={{ delay: 0.5, type: "spring" }}
//             className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white
//                        py-1 px-3 rounded-lg shadow-lg transform rotate-3 text-xs font-bold tracking-wide
//                        flex items-center gap-1 z-10"
//             aria-label="Popular choice"
//           >
//             ⭐ Popular Choice
//           </motion.div>
//         )}

//         {/* Recently added badge - randomly show for some items */}
//         {!foodItem.popular && Math.random() > 0.7 && (
//           <motion.div
//             initial={{ opacity: 0, rotate: 5 }}
//             animate={{ opacity: 1, rotate: 0 }}
//             transition={{ delay: 0.5, type: "spring" }}
//             className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white
//                        py-1 px-3 rounded-lg shadow-lg transform -rotate-3 text-xs font-bold tracking-wide
//                        flex items-center gap-1 z-10"
//             aria-label="New item"
//           >
//             🆕 New Item
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Side panel for customization */}
//       <AnimatePresence>
//         {isExpanded && (
//           <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center" onClick={(