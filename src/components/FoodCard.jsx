
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

export default FoodCard

