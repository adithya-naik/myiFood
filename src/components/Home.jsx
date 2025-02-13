import React from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Footer from "./Footer";
import FoodCard from "./FoodCard";
const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel/>
      <div>
        <FoodCard/>
        <FoodCard/>
        <FoodCard/>
      </div>

      <Footer />
    </>
  );
};

export default Home;
