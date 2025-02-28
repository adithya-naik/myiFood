import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MyOrders from "./components/MyOrders";
import NotFound from "./components/NotFound";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import Notifications from "./components/Notifications";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
    });
  }, []);
  return (
    <CartProvider>
      <Router>
      <ScrollToTop />
        <Toaster
         position="top-center"
         reverseOrder={false}
         gutter={8}
         toastOptions={{
           duration: 2000,
           style: {
             background: '#363636',
             color: '#fff',
             borderRadius: '10px',
             padding: '12px 16px',
           },
         }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<SignUp />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
