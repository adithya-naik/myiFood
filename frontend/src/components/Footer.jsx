import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-2xl font-bold text-yellow-400">myiFood</Link>
            <p className="text-gray-300 max-w-md">
              Experience the Quality Food with a blend of traditional and modern tastes.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link to="/social/facebook" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link to="/social/twitter" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link to="/social/instagram" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link to="/social/linkedin" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold mb-2 text-yellow-400">Quick Links</h2>
            <ul className="space-y-2">
              {["Home", "Cart", "Orders", "Login"].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer flex items-center"
                  >
                    <span className="mr-2">→</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold mb-2 text-yellow-400">Contact Us</h2>
            <div className="space-y-3">
              <Link to="/contact/location" className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-5 h-5 mr-3 text-yellow-400" />
                <p>Yamnampet, Ghatkesar, Hyderabad, India</p>
              </Link>
              <Link to="/contact/phone" className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-5 h-5 mr-3 text-yellow-400" />
                <p>+91 98765 3210</p>
              </Link>
              <Link to="/contact/email" className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-5 h-5 mr-3 text-yellow-400" />
                <p>support@myifood.com</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 myiFood — All Rights Reserved
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors cursor-pointer">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors cursor-pointer">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;