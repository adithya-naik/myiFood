import React, { useState, useEffect } from "react";
import { FaPizzaSlice, FaSortNumericUp, FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const FoodCard = ({ foodItem }) => {
  console.log(foodItem);  
  const quantities = [1, 2, 3, 4, 5];
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(() => {
    if (foodItem.options?.[0]?.half) return 'half';
    if (foodItem.options?.[0]?.regular) return 'regular';
    return '';
  });
  const [isHovered, setIsHovered] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const hasHalfFullOptions = foodItem.options?.[0]?.half || foodItem.options?.[0]?.full;
  const hasPizzaSizes = foodItem.options?.[0]?.regular || foodItem.options?.[0]?.medium || foodItem.options?.[0]?.large;

  const calculatePrice = () => {
    if (!foodItem.options?.[0]) {
      return (foodItem.price || 0) * quantity;
    }
    const basePrice = foodItem.options[0][size] || 0;
    return Number(basePrice) * quantity;
  };

  return (
    <div 
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay="100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white mx-auto text-gray-800 rounded-xl shadow-lg p-4 m-3 w-full max-w-sm border border-gray-200 
                 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
    >
      <div className="relative h-48 rounded-lg overflow-hidden group">
        <img 
          className={`object-cover w-full h-full transition-all duration-700 ease-in-out ${
            isHovered ? 'scale-110 filter brightness-90' : ''
          }`}
          src={foodItem.img} 
          alt={foodItem.name} 
        />
        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <span className="text-white text-lg font-semibold px-4 py-2 rounded-full bg-black bg-opacity-50 transform transition-all duration-300">
            {foodItem.CategoryName}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="space-y-2">
          <h2 className="text-gray-900 text-xl font-semibold transform transition-all duration-300 hover:text-green-600">
            {foodItem.name}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-2 hover:line-clamp-none transition-all duration-300">
            {foodItem.description}
          </p>
        </div>

        {(hasHalfFullOptions || hasPizzaSizes) && (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100 hover:border-green-200 transition-colors duration-300">
            <label className="text-gray-700 text-sm font-medium flex items-center">
              <FaPizzaSlice className={`mr-2 transition-colors duration-300 ${isHovered ? 'text-green-500' : 'text-gray-400'}`} /> 
              Size:
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="bg-white text-gray-800 p-2 rounded-md border border-gray-200 shadow-sm cursor-pointer text-sm
                         focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            >
              {hasHalfFullOptions && (
                <>
                  {foodItem.options[0].half && (
                    <option value="half">Half (₹{foodItem.options[0].half})</option>
                  )}
                  {foodItem.options[0].full && (
                    <option value="full">Full (₹{foodItem.options[0].full})</option>
                  )}
                </>
              )}
              {hasPizzaSizes && (
                <>
                  {foodItem.options[0].regular && (
                    <option value="regular">Regular (₹{foodItem.options[0].regular})</option>
                  )}
                  {foodItem.options[0].medium && (
                    <option value="medium">Medium (₹{foodItem.options[0].medium})</option>
                  )}
                  {foodItem.options[0].large && (
                    <option value="large">Large (₹{foodItem.options[0].large})</option>
                  )}
                </>
              )}
            </select>
          </div>
        )}

        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100 hover:border-green-200 transition-colors duration-300">
          <label className="text-gray-700 text-sm font-medium flex items-center">
            <FaSortNumericUp className={`mr-2 transition-colors duration-300 ${isHovered ? 'text-green-500' : 'text-gray-400'}`} /> 
            Quantity:
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="bg-white text-gray-800 p-2 rounded-md border border-gray-200 shadow-sm cursor-pointer text-sm
                       focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
          >
            {quantities.map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-bold text-green-600 flex items-center transform transition-all duration-300 hover:scale-105">
            <FaRupeeSign className="mr-1" /> {calculatePrice()}
          </div>
          <button 
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium
                     hover:bg-green-600 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 
                     transition-all duration-300"
          >
            <FaShoppingCart className={`text-lg transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;