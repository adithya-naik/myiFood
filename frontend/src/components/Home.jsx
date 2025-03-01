


















import React, { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Footer from "./Footer";
import FoodCard from "./FoodCard";
import Loading from "./Loading";
import GreetingComponent from "./GreetingComponent";

// Move cache to a separate module to ensure it persists across navigation
// In a new file named 'dataCache.js':
// export const dataCache = {
//   categories: null,
//   items: null,
//   lastFetch: {
//     categories: 0,
//     items: 0
//   }
// };
// export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Import the cache from the separate module
import { dataCache, CACHE_DURATION } from "./dataCache";

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Function to check if cache is valid
  const isCacheValid = (cacheType) => {
    const now = Date.now();
    return dataCache[cacheType] && (now - dataCache.lastFetch[cacheType] < CACHE_DURATION);
  };

  // Combined initialization effect that runs only once
  useEffect(() => {
    const initializeData = async () => {
      if (isInitialized) return;
      
      let categoriesLoaded = false;
      
      // First check if categories are in cache
      if (isCacheValid('categories')) {
        setFoodCategories(dataCache.categories);
        categoriesLoaded = true;
      } else {
        try {
          const categoriesResponse = await fetch('https://myifoodb.onrender.com/api/foodcategory');
          const categoriesData = await categoriesResponse.json();

          if (categoriesData.success) {
            const categories = categoriesData.foodCategory;
            setFoodCategories(categories);
            
            // Update cache
            dataCache.categories = categories;
            dataCache.lastFetch.categories = Date.now();
            categoriesLoaded = true;
          } else {
            setError('Failed to fetch categories');
          }
        } catch (error) {
          setError('Error fetching categories');
          console.error('Fetch error:', error);
        }
      }
      
      // Then check if items are in cache
      if (isCacheValid('items')) {
        setFoodItems(dataCache.items);
        setLoading(false);
      } else if (categoriesLoaded) {
        try {
          const itemsResponse = await fetch('https://myifoodb.onrender.com/api/fooditems');
          const itemsData = await itemsResponse.json();

          if (itemsData.success) {
            const items = itemsData.foodItems;
            setFoodItems(items);
            
            // Update cache
            dataCache.items = items;
            dataCache.lastFetch.items = Date.now();
          } else {
            setError('Failed to fetch food items');
          }
        } catch (error) {
          setError('Error fetching food items');
          console.error('Fetch error:', error);
        } finally {
          setLoading(false);
        }
      }
      
      setIsInitialized(true);
    };

    initializeData();
  }, [isInitialized]);

  // Use useMemo to filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return foodItems;

    const lowercasedSearch = searchTerm.toLowerCase();
    return foodItems.filter(
      ({ name, description, CategoryName }) =>
        name?.toLowerCase().includes(lowercasedSearch) ||
        description?.toLowerCase().includes(lowercasedSearch) ||
        CategoryName?.toLowerCase().includes(lowercasedSearch)
    );
  }, [foodItems, searchTerm]);

  // Use useCallback for search handler to avoid re-renders
  const handleSearch = useCallback((searchValue) => {
    setSearchTerm(searchValue);
  }, []);

  // Use useMemo to organize items by category
  const categorizedItems = useMemo(() => {
    return foodCategories.reduce((acc, category) => {
      const categoryItems = filteredItems.filter(
        (item) => item.CategoryName === category.CategoryName
      );

      if (categoryItems.length) {
        acc[category._id] = { category, items: categoryItems };
      }

      return acc;
    }, {});
  }, [filteredItems, foodCategories]);

  if (loading) return <div className="text-center py-8"><Loading /></div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Carousel onSearch={handleSearch} />
      <GreetingComponent />
      <div className="container mx-auto px-4 py-8">
        {searchTerm ? (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            {filteredItems.length === 0 ? (
              <p className="text-center text-gray-500">
                No items found matching "{searchTerm}"
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <FoodCard key={item._id} foodItem={item} />
                ))}
              </div>
            )}
          </div>
        ) : (
          Object.values(categorizedItems).map(({ category, items }) => (
            <div key={category._id} className="mb-8">
              <h2 className="text-3xl text-center font-bold mb-4 text-gray-800">
                {category.CategoryName}
              </h2>
              <hr className="border-2 border-gray-200 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <FoodCard key={item._id} foodItem={item} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;