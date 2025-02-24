import { useState, useEffect } from "react";
import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const images = [
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
  "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
  "https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg",
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
  "https://images.pexels.com/photos/1893563/pexels-photo-1893563.jpeg",
  "https://images.pexels.com/photos/1346132/pexels-photo-1346132.jpeg",
  "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
  "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
];

export default function Carousel({ onSearch }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      alert("Please enter a food item to search!");
      return;
    }
    onSearch(search.trim());
  };

  return (
    <div className="relative w-full">
      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex items-center rounded-full shadow-md"
      >
        <input
          type="text"
          placeholder="🔍 Search tasty food... 🍕🍔🥗🥤"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value); // Real-time search
          }}
          className="p-3 w-56 md:w-80 outline-none bg-gray-800 text-gray-200 placeholder-gray-400 border-none rounded-l-full transition"
        />
        <button
          type="submit"
          className="p-3 bg-gray-700 text-gray-300 rounded-r-full hover:bg-gray-600 transition-all"
        >
          <Search className="w-6 h-6" />
        </button>
      </form>

      {/* Rest of your carousel code... */}
      {/* Carousel wrapper */}
      <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute object-cover block w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Slider controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}