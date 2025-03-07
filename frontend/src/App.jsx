import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import MyOrders from "./components/MyOrders";
import Cart from "./components/Cart";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import ScrollToTop from "./components/ScrollToTop";
import CookiePolicy from "./components/CookiePolicy";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import NotFound from "./components/NotFound";

import AOS from "aos";
import "aos/dist/aos.css";

import { CartProvider } from "./context/CartContext";

import { Toaster } from "react-hot-toast";

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
              background: "#363636",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 16px",
            },
          }}
        />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
