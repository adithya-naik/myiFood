import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 body-font">
      <div className="container px-6 py-12 mx-auto flex flex-wrap md:justify-between lg:justify-start">
        <div className="w-full md:w-1/3 lg:w-1/4 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-white text-2xl font-bold">MyiStay Restaurant</h2>
          <p className="mt-3 text-sm text-gray-500">
            Experience the finest dining with a blend of traditional and modern cuisine.
          </p>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
          <h2 className="title-font font-medium text-white tracking-widest text-lg mb-4">Quick Links</h2>
          <nav className="list-none">
            <li><a className="text-gray-400 hover:text-white block mb-2">Home</a></li>
            <li><a className="text-gray-400 hover:text-white block mb-2">Menu</a></li>
            <li><a className="text-gray-400 hover:text-white block mb-2">Reservations</a></li>
            <li><a className="text-gray-400 hover:text-white block">Contact</a></li>
          </nav>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4">
          <h2 className="title-font font-medium text-white tracking-widest text-lg mb-4">Contact Us</h2>
          <p className="text-gray-500 text-sm flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2 text-lg" /> 123, Gourmet Street, New Delhi, India
          </p>
          <p className="text-gray-500 text-sm flex items-center mb-2">
            <FaPhone className="mr-2 text-lg" /> +91 98765 43210
          </p>
          <p className="text-gray-500 text-sm flex items-center">
            <FaEnvelope className="mr-2 text-lg" /> support@myistay.com
          </p>
        </div>
      </div>
      <div className="bg-gray-800 mt-6">
        <div className="container mx-auto py-4 px-6 flex flex-wrap flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2025 MyiStay Restaurant — All Rights Reserved
          </p>
          <span className="inline-flex mt-2 sm:mt-0">
            <a className="ml-3 text-gray-400 hover:text-white"><Facebook className="w-6 h-6" /></a>
            <a className="ml-3 text-gray-400 hover:text-white"><Twitter className="w-6 h-6" /></a>
            <a className="ml-3 text-gray-400 hover:text-white"><Instagram className="w-6 h-6" /></a>
            <a className="ml-3 text-gray-400 hover:text-white"><Linkedin className="w-6 h-6" /></a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
