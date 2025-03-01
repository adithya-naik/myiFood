import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  ArrowLeft,
  Pizza,
  Coffee,
  Clock,
  Tag,
  Leaf,
  Beef,
  Bell,
  Trash2,
  Info,
  Filter,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      details: "Authentic Italian pizza with fresh mozzarella and basil",
      isVeg: true,
      offerRate: "20% OFF",
      regularPrice: 14.99,
      discountedPrice: 11.99,
      timestamp: "10 minutes ago",
      icon: Pizza,
      category: "food",
      isNew: true,
    },
    {
      id: 2,
      name: "Double Cheeseburger",
      details: "Premium beef patty with double cheese and special sauce",
      isVeg: false,
      offerRate: "15% OFF",
      regularPrice: 12.99,
      discountedPrice: 11.04,
      timestamp: "25 minutes ago",
      icon: Beef,
      category: "food",
      isNew: true,
    },
    {
      id: 3,
      name: "Caramel Macchiato",
      details: "Espresso with steamed milk and caramel drizzle",
      isVeg: true,
      offerRate: "Buy 1 Get 1 Free",
      regularPrice: 5.99,
      discountedPrice: 5.99,
      timestamp: "1 hour ago",
      icon: Coffee,
      category: "beverage",
      isNew: false,
    },
    {
      id: 4,
      name: "Garden Fresh Salad",
      details: "Mixed greens with seasonal vegetables and balsamic dressing",
      isVeg: true,
      offerRate: "25% OFF",
      regularPrice: 9.99,
      discountedPrice: 7.49,
      timestamp: "3 hours ago",
      icon: Leaf,
      category: "food",
      isNew: false,
    },
  ]);

  const handleDismiss = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const handleFilter = (type) => {
    setFilterType(type);
    setFilterOpen(false);
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filterType === "all") return true;
    if (filterType === "veg") return notification.isVeg;
    if (filterType === "nonveg") return !notification.isVeg;
    if (filterType === "new") return notification.isNew;
    return notification.category === filterType;
  });

  return (
    <>
    <Navbar></Navbar>
      <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
        {/* Header */}
        {/* <div className="flex items-center mb-6 bg-white p-4 rounded-lg shadow-sm sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="ml-auto flex items-center">
          {notifications.length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">
              {notifications.length}
            </span>
          )}
          <Bell className="h-6 w-6 text-gray-600" />
        </div>
      </div> */}

        {/* Filter Section */}
        <div className="mb-4 flex flex-wrap justify-between items-center bg-white p-3 rounded-lg shadow-sm">
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center cursor-pointer space-x-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md border border-gray-200 bg-white"
            >
              <Filter className="h-4 w-4" />
              <span>
                Filter:{" "}
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {filterOpen && (
              <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                <div className="py-1">
                  <button
                    onClick={() => handleFilter("all")}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      filterType === "all"
                        ? "bg-red-50 text-red-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Notifications
                  </button>
                  <button
                    onClick={() => handleFilter("new")}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      filterType === "new"
                        ? "bg-red-50 text-red-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    New Only
                  </button>
                  <button
                    onClick={() => handleFilter("veg")}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      filterType === "veg"
                        ? "bg-red-50 text-red-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Vegetarian
                  </button>
                  <button
                    onClick={() => handleFilter("nonveg")}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      filterType === "nonveg"
                        ? "bg-red-50 text-red-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Non-Vegetarian
                  </button>
                  <button
                    onClick={() => handleFilter("food")}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      filterType === "food"
                        ? "bg-red-50 text-red-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Food Only
                  </button>
                  <button
                    onClick={() => handleFilter("beverage")}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      filterType === "beverage"
                        ? "bg-red-50 text-red-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Beverages Only
                  </button>
                </div>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center cursor-pointer text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </button>
          )}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md border-l-4 ${
                  notification.isNew ? "border-red-500" : "border-gray-300"
                }`}
              >
                <div className="flex items-start">
                  <div
                    className={`flex-shrink-0 p-2 rounded-lg mr-4 ${
                      notification.isNew ? "bg-red-50" : "bg-gray-100"
                    }`}
                  >
                    <notification.icon
                      className={`h-8 w-8 ${
                        notification.isNew ? "text-red-500" : "text-gray-600"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold text-lg">
                            {notification.name}
                          </h3>
                          {notification.isNew && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {notification.details}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {notification.isVeg ? (
                          <div
                            className="h-5 w-5 rounded-full border border-green-500 flex items-center justify-center"
                            title="Vegetarian"
                          >
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          </div>
                        ) : (
                          <div
                            className="h-5 w-5 rounded-full border border-red-500 flex items-center justify-center"
                            title="Non-vegetarian"
                          >
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 flex justify-between items-end">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <Tag className="h-3 w-3 mr-1" />
                          {notification.offerRate}
                        </span>
                        <div className="mt-1">
                          <span className="text-gray-500 line-through mr-2">
                            ${notification.regularPrice.toFixed(2)}
                          </span>
                          <span className="font-bold text-red-600">
                            ${notification.discountedPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t  border-gray-200 flex justify-between">
                  <button className="text-sm bg-red-50 cursor-pointer text-red-600 px-3 py-1 rounded-md hover:bg-red-100 transition-colors duration-200 flex items-center">
                    <Info className="h-4 w-4 mr-1 " />
                    View Details
                  </button>
                  <button
                    onClick={() => handleDismiss(notification.id)}
                    className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1 " />
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">
              No notifications
            </h3>
            <p className="text-gray-500 mt-2">
              {notifications.length > 0
                ? "No items match your current filter. Try changing your filter options."
                : "Check back later for deals and offers"}
            </p>
            {notifications.length > 0 && (
              <button
                onClick={() => setFilterType("all")}
                className="mt-4 text-red-600 hover:text-red-700 font-medium"
              >
                Reset filters
              </button>
            )}
          </div>
        )}

        {/* Footer CTA */}
        {notifications.length > 0 && (
          <div className="mt-6  bottom-4">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-colors duration-200 flex items-center justify-center">
              <Bell className="h-5 w-5 mr-2" />
              Turn On Notification Alerts
            </button>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default NotificationsPage;
