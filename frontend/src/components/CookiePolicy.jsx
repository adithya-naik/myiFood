import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCookieBite, FaCheck, FaTimes, FaQuestionCircle, FaShieldAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { MdSecurity, MdHelp } from 'react-icons/md';
import { SiGooglechrome, SiFirefox, SiSafari } from 'react-icons/si';
import {GitBranch} from "lucide-react";
import Navbar from './Navbar';
import Footer from './Footer';

const CookiePolicy = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Necessary cookies can't be disabled
    setCookiePreferences({
      ...cookiePreferences,
      [key]: !cookiePreferences[key]
    });
  };

  const savePreferences = () => {
    // Animation for saved state (would connect to actual cookie settings in production)
    document.getElementById('saveSuccess').classList.remove('opacity-0');
    setTimeout(() => {
      document.getElementById('saveSuccess').classList.add('opacity-0');
    }, 3000);
  };

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Necessary Cookies',
      description: 'These cookies are essential for the website to function properly and cannot be disabled.',
      examples: ['Session management', 'Authentication', 'Security features']
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences.',
      examples: ['Language preferences', 'Location settings', 'Previously viewed items']
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'These cookies help us analyze how visitors use our website, allowing us to improve its performance and user experience.',
      examples: ['Page visit statistics', 'Traffic sources', 'User journey tracking']
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites to display relevant advertisements.',
      examples: ['Retargeting ads', 'Social media sharing', 'Interest-based advertising']
    }
  ];

  const browserInstructions = [
    {
      id: 'chrome',
      name: 'Google Chrome',
      icon: <SiGooglechrome className="text-xl" />,
      steps: [
        'Click the three dots menu in the top right',
        'Select "Settings"',
        'Scroll down and click on "Privacy and security"',
        'Click on "Cookies and other site data"',
        'Adjust cookie settings as desired'
      ]
    },
    {
      id: 'firefox',
      name: 'Mozilla Firefox',
      icon: <SiFirefox className="text-xl" />,
      steps: [
        'Click the menu button in the top right',
        'Select "Settings"',
        'Select "Privacy & Security" from the left menu',
        'Scroll to "Cookies and Site Data"',
        'Adjust cookie settings as desired'
      ]
    },
    {
      id: 'safari',
      name: 'Safari',
      icon: <SiSafari className="text-xl" />,
      steps: [
        'Go to Safari Preferences',
        'Click on "Privacy" tab',
        'Under "Cookies and website data", select your preferred option',
        'For more detailed settings, click on "Manage Website Data"'
      ]
    },
    {
      id: 'edge',
      name: 'Microsoft Edge',
      icon: <GitBranch className="text-xl" />,
      steps: [
        'Click the three dots menu in the top right',
        'Select "Settings"',
        'Click on "Cookies and site permissions"',
        'Click on "Manage and delete cookies and site data"',
        'Adjust cookie settings as desired'
      ]
    }
  ];

  const [activeBrowser, setActiveBrowser] = useState('chrome');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
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
          <FaCookieBite className="text-amber-500 text-5xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">Cookie Policy</h1>
        <p className="mt-4 text-lg text-gray-600">Learn how MyiFood uses cookies to enhance your experience</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content - left side */}
        <div className="lg:col-span-2">
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 bg-amber-50 border-b border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800">What Are Cookies?</h2>
              <p className="mt-4 text-gray-700">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us recognize your device and remember certain information about your visit, 
                such as your preferences and actions on our site.
              </p>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">How We Use Cookies</h3>
              <p className="text-gray-700 mb-6">
                At MyiFood, we use cookies for various purposes to enhance your experience, 
                improve our services, and keep our website secure. We categorize our cookies as follows:
              </p>

              <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                animate="visible"
                className="space-y-6"
              >
                {cookieTypes.map((cookieType) => (
                  <motion.div 
                    key={cookieType.id}
                    variants={fadeInUp}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-amber-500 mr-3">
                          <FaCookieBite />
                        </span>
                        <h4 className="font-medium text-gray-800">{cookieType.name}</h4>
                      </div>
                      
                      {cookieType.id === 'necessary' ? (
                        <div className="flex items-center text-green-600">
                          <FaCheck className="mr-2" />
                          <span className="text-sm">Required</span>
                        </div>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => togglePreference(cookieType.id)}
                          className={`text-2xl ${cookiePreferences[cookieType.id] ? 'text-green-500' : 'text-gray-400'}`}
                        >
                          {cookiePreferences[cookieType.id] ? <FaToggleOn /> : <FaToggleOff />}
                        </motion.button>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 mb-3">{cookieType.description}</p>
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-600 mb-2">Examples:</p>
                        <ul className="text-sm text-gray-700 pl-5 list-disc">
                          {cookieType.examples.map((example, index) => (
                            <li key={index} className="mb-1">{example}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={savePreferences}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center"
                >
                  <IoMdSettings className="mr-2" />
                  Save Preferences
                </motion.button>
                
                <span id="saveSuccess" className="text-green-600 opacity-0 transition-opacity duration-300 flex items-center">
                  <FaCheck className="mr-2" />
                  Preferences saved!
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6 bg-blue-50 border-b border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <MdHelp className="mr-3 text-blue-600" />
                How to Manage Cookies in Your Browser
              </h2>
              <p className="mt-4 text-gray-700">
                You can also control cookies through your browser settings. Here's how to manage cookies in popular browsers:
              </p>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap mb-6 gap-2">
                {browserInstructions.map((browser) => (
                  <button
                    key={browser.id}
                    onClick={() => setActiveBrowser(browser.id)}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      activeBrowser === browser.id 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{browser.icon}</span>
                    <span>{browser.name}</span>
                  </button>
                ))}
              </div>

              {browserInstructions.map((browser) => (
                <div 
                  key={browser.id} 
                  className={`${activeBrowser === browser.id ? 'block' : 'hidden'}`}
                >
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                    <span className="mr-2">{browser.icon}</span>
                    {browser.name}
                  </h4>
                  <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                    {browser.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar - right side */}
        <div className="lg:col-span-1">
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-4 bg-green-50 border-b border-green-100">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <FaQuestionCircle className="mr-2 text-green-600" />
                Frequently Asked Questions
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800">Do cookies collect my personal information?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    By themselves, cookies don't collect personal information unless you specifically provide it. They mainly store preferences and session data.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Can I delete cookies?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Yes, you can delete cookies through your browser settings at any time.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What happens if I disable all cookies?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Some features of MyiFood may not function properly, such as login sessions and personalized recommendations.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Do you use third-party cookies?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Yes, we use some third-party cookies for analytics and marketing purposes. You can disable these in your preferences.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="p-4 bg-purple-50 border-b border-purple-100">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <MdSecurity className="mr-2 text-purple-600" />
                Cookie Security
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-4">
                We take data security seriously at MyiFood. Our cookies are:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <FaShieldAlt className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Encrypted to protect your information</span>
                </li>
                <li className="flex items-start">
                  <FaShieldAlt className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Never used to store sensitive personal data</span>
                </li>
                <li className="flex items-start">
                  <FaShieldAlt className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Regularly audited for compliance with data regulations</span>
                </li>
                <li className="flex items-start">
                  <FaShieldAlt className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Transparent in their purpose and duration</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  For more information about our data practices, please refer to our 
                  <a href="/privacy-policy" className="text-purple-600 hover:text-purple-700 ml-1">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden mt-8"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="p-4 bg-amber-50 border-b border-amber-100">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <FaCookieBite className="mr-2 text-amber-500" />
                Cookie Usage Stats
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Necessary</span>
                    <span className="text-gray-500">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Functional</span>
                    <span className="text-gray-500">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Analytics</span>
                    <span className="text-gray-500">62%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Marketing</span>
                    <span className="text-gray-500">43%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '43%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                *Based on user preferences from our website visitors
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="mt-12 text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <p>Last updated: March 1, 2025</p>
        {/* <p className="mt-2">
          MyiFood &copy; 2025. All rights reserved. 
          <a href="/terms" className="text-amber-600 hover:text-amber-700 mx-1">Terms of Service</a>|
          <a href="/privacy" className="text-amber-600 hover:text-amber-700 mx-1">Privacy Policy</a>
        </p> */}
      </motion.div>
    </div>
    <Footer/>
    </>
  );
};

export default CookiePolicy;