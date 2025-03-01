import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaUserCircle, FaCreditCard, FaExclamationTriangle, FaRegCopyright } from 'react-icons/fa';
import { MdGavel, MdSecurity, MdBlock, MdDescription } from 'react-icons/md';
import { RiFilePaperLine } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';
import {ChevronDown} from "lucide-react"
import Navbar from './Navbar';
import Footer from './Footer';
const TermsOfService = () => {
  const [expandedSection, setExpandedSection] = useState('');
  
  const toggleSection = (id) => {
    if (expandedSection === id) {
      setExpandedSection('');
    } else {
      setExpandedSection(id);
    }
  };

  const sections = [
    {
      id: 'account',
      title: 'Account Terms',
      icon: <FaUserCircle />,
      content: `
        <p>By creating an account on MyiFood, you agree to the following terms:</p>
        <ul>
          <li>You must be at least 18 years old to create an account</li>
          <li>You are responsible for maintaining the security of your account credentials</li>
          <li>You are responsible for all activities that occur under your account</li>
          <li>You must provide accurate and complete information when creating your account</li>
          <li>We reserve the right to suspend or terminate accounts that violate our terms</li>
        </ul>
      `
    },
    {
      id: 'ordering',
      title: 'Ordering & Delivery',
      icon: <TbTruckDelivery />,
      content: `
        <p>When placing orders through MyiFood:</p>
        <ul>
          <li>All orders are subject to acceptance by the restaurant partners</li>
          <li>Delivery times are estimates and may vary based on restaurant preparation time, delivery distance, traffic, and weather conditions</li>
          <li>You must provide accurate delivery information including address and contact details</li>
          <li>You agree to be present at the delivery location to receive your order</li>
          <li>Orders may be subject to minimum order values, delivery fees, and service charges as indicated during checkout</li>
        </ul>
      `
    },
    {
      id: 'payment',
      title: 'Payment Terms',
      icon: <FaCreditCard />,
      content: `
        <p>Regarding payments on MyiFood:</p>
        <ul>
          <li>All prices are inclusive of applicable taxes unless stated otherwise</li>
          <li>Payment must be made at the time of placing an order</li>
          <li>We accept various payment methods as indicated on the checkout page</li>
          <li>Your payment information is processed securely through our payment processors</li>
          <li>We reserve the right to change our prices at any time</li>
          <li>Refunds are processed according to our Refund Policy</li>
        </ul>
      `
    },
    {
      id: 'content',
      title: 'User Content',
      icon: <MdDescription />,
      content: `
        <p>Regarding content you submit to MyiFood (reviews, comments, etc.):</p>
        <ul>
          <li>You retain ownership of your content, but grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use it</li>
          <li>You are solely responsible for content you post</li>
          <li>You may not post content that is illegal, offensive, misleading, or infringes on others' rights</li>
          <li>We reserve the right to remove any content that violates our terms</li>
          <li>We are not responsible for monitoring user content</li>
        </ul>
      `
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property',
      icon: <FaRegCopyright />,
      content: `
        <p>Regarding intellectual property:</p>
        <ul>
          <li>All content and materials on MyiFood are owned by us or our licensors</li>
          <li>Our name, logos, and trademarks may not be used without our prior written consent</li>
          <li>You may not copy, modify, distribute, or reproduce our content without permission</li>
          <li>The structure and organization of the platform are protected by intellectual property laws</li>
          <li>We respect the intellectual property rights of others and expect users to do the same</li>
        </ul>
      `
    },
    {
      id: 'limitations',
      title: 'Limitations of Liability',
      icon: <MdBlock />,
      content: `
        <p>To the maximum extent permitted by law:</p>
        <ul>
          <li>MyiFood provides its services "as is" without warranties of any kind</li>
          <li>We are not liable for any indirect, special, incidental, or consequential damages</li>
          <li>Our liability is limited to the amount paid by you for the order in question</li>
          <li>We are not responsible for the quality of food prepared by restaurant partners</li>
          <li>We do not guarantee that our services will be error-free or uninterrupted</li>
          <li>We are not liable for delays or failures in performance beyond our reasonable control</li>
        </ul>
      `
    },
    {
      id: 'disputes',
      title: 'Disputes & Governing Law',
      icon: <MdGavel />,
      content: `
        <p>In case of disputes:</p>
        <ul>
          <li>These terms are governed by the laws of [Jurisdiction]</li>
          <li>Any disputes will be resolved through mandatory arbitration</li>
          <li>You waive your right to participate in class actions</li>
          <li>Arbitration will be conducted in [City, State/Country]</li>
          <li>The arbitrator's decision will be final and binding</li>
          <li>Claims must be filed within one year after the event giving rise to the claim</li>
        </ul>
      `
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: <RiFilePaperLine />,
      content: `
        <p>Regarding updates to our Terms:</p>
        <ul>
          <li>We may modify these terms at any time</li>
          <li>Changes will be effective upon posting on our platform</li>
          <li>We will provide notice of significant changes</li>
          <li>Your continued use of MyiFood after changes constitutes acceptance of the updated terms</li>
          <li>If you do not agree with the changes, you must stop using our services</li>
        </ul>
      `
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
          <FaGavel className="text-rose-600 text-5xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">Terms of Service</h1>
        <p className="mt-4 text-lg text-gray-600">Please read these terms carefully before using MyiFood</p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-rose-50 border-b border-rose-100">
          <p className="text-gray-700">
            Last Updated: March 1, 2025
          </p>
          <p className="mt-4 text-gray-700">
            These Terms of Service ("Terms") govern your use of the MyiFood platform and services. By accessing or using MyiFood, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access or use our services.
          </p>
        </div>

        <motion.div 
          className="p-6 "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section) => (
            <motion.div 
              key={section.id} 
              className="mb-6 border cursor-pointer border-gray-200 rounded-lg overflow-hidden"
              variants={itemVariants}
            >
              <button 
                onClick={() => toggleSection(section.id)}
                className={`w-full cursor-pointer p-4 text-left flex items-center justify-between ${
                  expandedSection === section.id ? 'bg-rose-50' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center ">
                  <span className={`mr-3 text-xl  ${expandedSection === section.id ? 'text-rose-600' : 'text-gray-500'}`}>
                    {section.icon}
                  </span>
                  <span className="font-semibold text-lg text-gray-800">{section.title}</span>
                </div>
                <motion.span 
                  animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-500"
                >
                  <ChevronDown/>
                </motion.span>
              </button>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: expandedSection === section.id ? 'auto' : 0,
                  opacity: expandedSection === section.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div 
                  className="p-6 bg-white text-gray-700"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="p-6 bg-gray-50 border-t border-gray-200"
        >
          <div className="flex items-center mb-4 text-amber-600">
            <FaExclamationTriangle className="mr-2" />
            <h3 className="font-semibold">Contact Information</h3>
          </div>
          <p className="text-gray-700">
            If you have any questions about these Terms, please contact us at <span className="text-rose-600 font-medium">legal@myifood.com</span> or through our customer support channels.
          </p>
        </motion.div>
      </div>
    </div>
        <Footer/>
        </>
  );
};

export default TermsOfService;