import React, { useState } from "react";
import { FaPizzaSlice, FaSortNumericUp, FaRupeeSign } from "react-icons/fa";

const FoodCard = () => {
  const foodItem = {
    image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
    name: "Delicious Pizza 🍕",
    description: "Cheesy and mouth-watering pizza with fresh toppings.",
    prices: { half: 150, full: 250 },
  };

  const quantities = [1, 2, 3, 4, 5];
  const sizes = [
    { value: "half", label: `Half - ₹${foodItem.prices.half}` },
    { value: "full", label: `Full - ₹${foodItem.prices.full}` },
  ];

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("half");

  const totalPrice = foodItem.prices[size] * quantity;

  return (
    <div className="bg-white text-gray-800 rounded-xl shadow-lg p-4 m-3 w-full max-w-sm border border-gray-200 hover:shadow-xl transition duration-300">
      <div className="relative h-44 rounded-lg overflow-hidden">
        <img className="object-cover w-full h-full" src={foodItem.image} alt={foodItem.name} />
      </div>

      <div className="mt-3">
        <h3 className="text-gray-500 text-sm tracking-widest">CATEGORY</h3>
        <h2 className="text-gray-900 text-base font-semibold">{foodItem.name}</h2>
        <p className="mt-1 text-gray-600 text-sm">{foodItem.description}</p>

        <div className="mt-3 flex items-center justify-between bg-gray-100 p-2 rounded-md">
          <label className="text-gray-700 text-sm font-medium flex items-center">
            <FaSortNumericUp className="mr-2 text-gray-500" /> Quantity:
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="bg-white text-gray-800 p-1 rounded-md border border-gray-300 shadow-sm cursor-pointer text-sm"
          >
            {quantities.map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex items-center justify-between bg-gray-100 p-2 rounded-md">
          <label className="text-gray-700 text-sm font-medium flex items-center">
            <FaPizzaSlice className="mr-2 text-gray-500" /> Size:
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="bg-white text-gray-800 p-1 rounded-md border border-gray-300 shadow-sm cursor-pointer text-sm"
          >
            {sizes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 text-base font-semibold text-green-600 flex items-center">
          <FaRupeeSign className="mr-2" /> Total: ₹{totalPrice}
        </div>

        <button className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition text-sm">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
