import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserShield, FaLock, FaCookieBite, FaRegQuestionCircle, FaEnvelope } from 'react-icons/fa';
import { MdSecurity, MdPrivacyTip } from 'react-icons/md';

import Navbar from './Navbar';
import Footer from './Footer';
const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('collection');

  const sections = [
    { id: 'collection', title: 'Information Collection', icon: <FaUserShield /> },
    { id: 'usage', title: 'How We Use Data', icon: <MdPrivacyTip /> },
    { id: 'sharing', title: 'Information Sharing', icon: <FaLock /> },
    { id: 'cookies', title: 'Cookies & Tracking', icon: <FaCookieBite /> },
    { id: 'security', title: 'Data Security', icon: <MdSecurity /> },
    { id: 'contact', title: 'Contact Us', icon: <FaEnvelope /> },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
    
    <Navbar></Navbar>

    <div className="max-w-6xl mx-auto px-4 py-12 bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-4">
          <FaShieldAlt className="text-indigo-600 text-5xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">Privacy Policy</h1>
        <p className="mt-4 text-lg text-gray-600">Learn how MyiFood collects, uses, and protects your information</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 hover:cursor-pointer">
        {/* Sidebar Navigation */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="md:w-1/4"
        >
          <div className="bg-white rounded-xl shadow-md  p-4 sticky top-24">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Contents</h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <motion.li variants={item} key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center w-full p-3 rounded-lg hover:cursor-pointer transition-colors ${
                      activeSection === section.id 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="mr-3">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="md:w-3/4 bg-white rounded-xl shadow-md p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeSection === 'collection' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaUserShield className="mr-3 text-indigo-600" />
                Information Collection
              </h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>At MyiFood, we collect various types of information to provide you with our food ordering services:</p>
                <h3 className="text-xl font-semibold text-gray-700 mt-6">Personal Information</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Name, email address, phone number and delivery address</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                  <li>Account login credentials</li>
                  <li>Profile preferences and dietary restrictions</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-700 mt-6">Usage Information</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Order history and preferences</li>
                  <li>Device information and IP address</li>
                  <li>Browsing behavior and interaction with our platform</li>
                  <li>Location data (with your permission) to facilitate delivery</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeSection === 'usage' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <MdPrivacyTip className="mr-3 text-indigo-600" />
                How We Use Data
              </h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>We use your information for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Processing and fulfilling your food orders</li>
                  <li>Creating and maintaining your account</li>
                  <li>Personalizing your experience and recommendations</li>
                  <li>Communicating with you about orders, promotions, and updates</li>
                  <li>Improving our services and developing new features</li>
                  <li>Detecting and preventing fraudulent activities</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeSection === 'sharing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaLock className="mr-3 text-indigo-600" />
                Information Sharing
              </h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>We share your information with:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Restaurant Partners:</strong> To fulfill your orders</li>
                  <li><strong>Delivery Partners:</strong> To facilitate delivery of your food</li>
                  <li><strong>Payment Processors:</strong> To process transactions</li>
                  <li><strong>Service Providers:</strong> Who help us operate our platform</li>
                </ul>
                <p className="mt-4">We do not sell your personal information to third parties. Any sharing is done with appropriate safeguards and contractual protections.</p>
              </div>
            </motion.div>
          )}

          {activeSection === 'cookies' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaCookieBite className="mr-3 text-indigo-600" />
                Cookies & Tracking
              </h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>MyiFood uses cookies and similar technologies to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Remember your login status and preferences</li>
                  <li>Understand how you interact with our platform</li>
                  <li>Personalize your experience and recommendations</li>
                  <li>Measure the effectiveness of our marketing campaigns</li>
                </ul>
                <p className="mt-4">You can manage cookie preferences through your browser settings. See our Cookie Policy for more details.</p>
              </div>
            </motion.div>
          )}

          {activeSection === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <MdSecurity className="mr-3 text-indigo-600" />
                Data Security
              </h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>We implement robust security measures to protect your information:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and audits</li>
                  <li>Access controls and authentication measures</li>
                  <li>Continuous monitoring for suspicious activities</li>
                </ul>
                <p className="mt-4">While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.</p>
              </div>
            </motion.div>
          )}

          {activeSection === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaEnvelope className="mr-3 text-indigo-600" />
                Contact Us
              </h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>If you have questions or concerns about our Privacy Policy or data practices:</p>
                <div className="bg-gray-50 p-6 rounded-lg mt-4">
                  <p className="font-semibold">Email: privacy@myifood.com</p>
                  <p className="mt-2">Address: Yamnampet, Ghatkesar, Hyderabad, Telangana</p>
                  <p className="mt-2">Phone: +91 912117050</p>
                </div>
                <p className="mt-4">We will respond to your inquiries within 30 days.</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 text-center text-gray-500 text-sm"
      >
        <p>Last Updated: March 1, 2025</p>
      </motion.div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default PrivacyPolicy;