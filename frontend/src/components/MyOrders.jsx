import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Package2,
  Clock,
  Calendar,
  TrendingUp
  ,PackageCheck
} from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";
import { IoLeaf } from "react-icons/io5";
import { GiMeat } from "react-icons/gi";
import { motion } from "framer-motion";
import OrderStatsChart from "./OrderStatsChart";
import AOS from "aos";
import "aos/dist/aos.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSpent: 0,
    totalItems: 0,
    vegItems: 0,
    nonVegItems: 0,
  });

  // Function to detect if a food item is vegetarian (from FoodCard)
  const isVegetarian = (foodName) => {
    const vegetarianKeywords = [
      "veg",
      "paneer",
      "jeera",
      "aloo",
      "mushroom",
      "gobi",
      "dal",
      "palak",
    ];
    return vegetarianKeywords.some((keyword) =>
      foodName.toLowerCase().includes(keyword)
    );
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
    });

    const email = localStorage.getItem("email"); // Fetch email from local storage

    if (!email) {
      toast.error("No email found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch("https://myifoodb.onrender.com/api/fetchOrders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
          body: JSON.stringify({ email }), // Pass email in request body
        });

        const data = await response.json();

        console.log("Fetched Orders Data:", data);

        if (response.ok && data.success) {
          // Process the data to match our component structure
          const processedOrders = data.data.map((orderGroup) => {
            // First item contains the order date
            const orderDate = orderGroup[0].order_date;
            // Rest of the items are the products
            const items = orderGroup.slice(1);

            // Calculate total amount
            const totalAmount = items.reduce((sum, item) => {
              return sum + item.price * item.quantity;
            }, 0);

            return {
              orderDate,
              items,
              totalAmount,
            };
          });

          setOrders(processedOrders);

          // Calculate statistics
          const stats = processedOrders.reduce(
            (acc, order) => {
              acc.totalSpent += order.totalAmount;

              order.items.forEach((item) => {
                acc.totalItems += item.quantity;

                if (isVegetarian(item.name)) {
                  acc.vegItems += item.quantity;
                } else {
                  acc.nonVegItems += item.quantity;
                }
              });

              return acc;
            },
            { totalSpent: 0, totalItems: 0, vegItems: 0, nonVegItems: 0 }
          );

          setStats(stats);
        } else {
          toast.error(data.message || "Failed to fetch orders");
        }
      } catch (error) {
        toast.error("Error loading orders");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <Package2 className="w-12 h-12 text-green-500 animate-spin" />
        </div>
      </>
    );
  }

  if (!orders.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag className="w-32 h-32 text-green-500/20 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No orders yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't placed any orders yet. Start exploring our
              delicious menu!
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
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-8">
          <motion.h1
            className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Package2 className="w-8 h-8 text-green-500" />
            My Orders
          </motion.h1>

          {/* Order Statistics */}
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Order Statistics
            </h2>

            <div className="grid grid-cols-1 cursor-pointer md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-xl font-bold text-green-600 flex items-center">
                  <FaRupeeSign className="mr-1" />
                  {stats.totalSpent.toFixed(2)}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-xl font-bold text-blue-600">
                  {stats.totalItems}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <IoLeaf className="w-4 h-4 text-green-600" />
                  <p className="text-sm text-gray-500">Veg Items</p>
                </div>
                <p className="text-xl font-bold text-green-600">
                  {stats.vegItems}
                  <span className="text-sm font-normal ml-1">
                    (
                    {Math.round((stats.vegItems / stats.totalItems) * 100) || 0}
                    %)
                  </span>
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <GiMeat className="w-4 h-4 text-red-600" />
                  <p className="text-sm text-gray-500">Non-Veg Items</p>
                </div>
                <p className="text-xl font-bold text-red-600">
                  {stats.nonVegItems}
                  <span className="text-sm font-normal ml-1">
                    (
                    {Math.round((stats.nonVegItems / stats.totalItems) * 100) ||
                      0}
                    %)
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <OrderStatsChart orders={orders} />
          </motion.div>
          
          {/* <h1> Hello</h1> */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-green-500" />
              Orders List
            </h2>
          <div className="space-y-6 cursor-pointer">
            {[...orders].reverse().map((order, index) => {
              const orderDate = new Date(order.orderDate);
              const isValidDate = !isNaN(orderDate.getTime());

              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        Order #{index + 1}
                      </h3>
                      {isValidDate && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                          <div className="flex items-center text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              {orderDate.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              {orderDate.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center text-green-600 font-semibold">
                      <FaRupeeSign className="mr-1" />
                      {order.totalAmount.toFixed(2)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item, itemIndex) => {
                      const isVeg = isVegetarian(item.name);

                      return (
                        <motion.div
                          key={itemIndex}
                          className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 * itemIndex }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img
                                src={item.img}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div
                                className={`absolute -top-2 -left-2 p-1 rounded-full shadow-md
                                          ${
                                            isVeg
                                              ? "bg-green-600"
                                              : "bg-red-600"
                                          }`}
                              >
                                {isVeg ? (
                                  <IoLeaf className="h-3 w-3 text-white" />
                                ) : (
                                  <GiMeat className="h-3 w-3 text-white" />
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-gray-800">
                                  {item.name}
                                </p>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                    isVeg
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {isVeg ? "Veg" : "Non-Veg"}
                                </span>
                              </div>
                              {item.size && (
                                <p className="text-sm text-gray-500">
                                  Size: {item.size}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-800 font-medium">
                              ×{item.quantity}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center justify-end">
                              <FaRupeeSign className="mr-1" />
                              {item.price}
                            </p>
                            <p className="text-xs text-gray-400">
                              Subtotal:{" "}
                              <FaRupeeSign className="inline w-2 h-2" />
                              {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
<Footer/>
    </>
  );
};

export default MyOrders;
