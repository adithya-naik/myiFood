import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Footer from "./Footer";
import FoodCard from "./FoodCard";
import Loading from "./Loading";
const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, categoriesResponse] = await Promise.all([
          fetch('http://localhost:3000/api/fooditems'),
          fetch('http://localhost:3000/api/foodcategory')
        ]);

        const itemsData = await itemsResponse.json();
        const categoriesData = await categoriesResponse.json();

        if (itemsData.success && categoriesData.success) {
          setFoodItems(itemsData.foodItems);
          setFilteredItems(itemsData.foodItems);
          setFoodCategories(categoriesData.foodCategory);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('Error fetching data');
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search functionality
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    if (!searchValue.trim()) {
      setFilteredItems(foodItems);
      return;
    }

    const searchResults = foodItems.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.CategoryName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredItems(searchResults);
  };

  if (loading) return <div className="text-center py-8"><Loading/></div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Carousel onSearch={handleSearch} />
      
      <div className="container mx-auto px-4 py-8">
        {searchTerm ? (
          // Search results view
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            {filteredItems.length === 0 ? (
              <p className="text-center text-gray-500">No items found matching "{searchTerm}"</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <FoodCard key={item._id} foodItem={item} />
                ))}
              </div>
            )}
          </div>
        ) : (
          // Category-wise view
          foodCategories.map((category) => {
            const categoryItems = filteredItems.filter(
              item => item.CategoryName === category.CategoryName
            );

            if (categoryItems.length === 0) return null;

            return (
              <div key={category._id} className="mb-8">
                <h2 className="text-3xl text-center font-bold mb-4 text-gray-800">
                  {category.CategoryName}
                </h2>
                <hr className="border-2 border-gray-200 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryItems.map((item) => (
                    <FoodCard key={item._id} foodItem={item} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;