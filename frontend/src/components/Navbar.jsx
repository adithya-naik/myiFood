// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { toast } from 'react-hot-toast';
// import { useCart } from '../context/CartContext';
// import {
//   LogIn,
//   UserPlus,
//   Bell,
//   Menu as MenuIcon,
//   X,
//   User,
//   Settings,
//   ShoppingBag,
//   LogOut,
//   Home
// } from "lucide-react";
// import { FaShoppingCart } from "react-icons/fa";
// // Navigation items for non-authenticated users
// const publicNavigation = [

//   { name: "Home", href: "/", icon: Home },
//   { name: "Login", href: "/login", icon: LogIn },
//   { name: "Signup", href: "/createuser", icon: UserPlus },
// ];

// // Navigation items for authenticated users
// const privateNavigation = [
//   { name: "Cart", href: "/cart", icon: FaShoppingCart },
//   { name: "My Orders", href: "/orders", icon: ShoppingBag },
// ];

// // User dropdown menu items
// const userNavigation = [
//   { name: "Your Profile", href: "/profile", icon: User },
//   { name: "Settings", href: "/settings", icon: Settings },
// ];

// const classNames = (...classes) => classes.filter(Boolean).join(" ");

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const { clearCart, items } = useCart(); // Get the items array from the cart context
//   const auth = localStorage.getItem('authToken');
//   const userName = localStorage.getItem('userName');
//   // Check authentication status and device type on component mount
//   useEffect(() => {
//     // Check if user is authenticated
//     const checkAuth = () => {
//       const authToken = localStorage.getItem("authToken");
//       setIsAuthenticated(!!authToken);
//     };

//     // Check if device is mobile
//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkAuth();
//     checkIsMobile();

//     // Add resize listener
//     window.addEventListener("resize", checkIsMobile);
//     return () => window.removeEventListener("resize", checkIsMobile);
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("credentials");

//     // Clear cart
//     clearCart();

//     toast.success("Logged out successfully!", {
//       duration: 2000,
//       icon: '👋',
//       style: {
//         background: '#22c55e',
//         color: '#fff',
//       },
//     });

//     // Force page reload to update navbar and cart
//     window.location.href = "/";
//   };

//   // Get current navigation items based on auth status
//   const currentNavigation = isAuthenticated ? privateNavigation : publicNavigation;

//   return (
//     <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               {/* Mobile menu button */}
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 <Disclosure.Button className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200">
//                   {open ? (
//                     <X className="h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <MenuIcon className="h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>

//               {/* Logo with Home icon */}
//               <div className="flex flex-1 items-center justify-start pl-16 sm:pl-0">
//                 <Link
//                   to="/"
//                   className="flex items-center gap-2 hover:opacity-80 transition-opacity"
//                 >
//                   <Home className="h-6 w-6 text-white" />
//                   <span className="text-slate-50 text-2xl font-bold italic">
//                     myiFood
//                   </span>
//                 </Link>
//               </div>

//               {/* Right side navigation */}
//               <div className="flex items-center gap-4">
//                 {/* Desktop Navigation Links */}
//                 <div className="hidden sm:flex sm:items-center sm:gap-4">
//                   {currentNavigation.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
//                     >
//                       <item.icon className="h-4 w-4" />
//                       {item.name}
//                       {item.name === "Cart" && items.length > 0 && (
//                         <span className="ml-1 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
//                           {items.length}
//                         </span>
//                       )}
//                     </Link>
//                   ))}
//                 </div>

//                 {/* Show notifications and profile only for authenticated users */}
//                 {isAuthenticated && (
//                   <>
//                     {/* Notifications */}
//                     <button className="rounded-full p-1 text-gray-400 hover:text-white transition-colors duration-200">
//                       <Bell className="h-6 w-6" />
//                     </button>...{/* Profile dropdown */}
//                     {isMobile ? (
//                       <Menu as="div" className="relative">
//                         <Menu.Button
//                           onClick={() => setIsMenuOpen(!isMenuOpen)}
//                           className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                         >
//                           <img
//                             className="h-8 w-8 rounded-full"
//                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                             alt="User"
//                           />
//                         </Menu.Button>
//                         <Transition
//                           show={isMenuOpen}
//                           enter="transition ease-out duration-100"
//                           enterFrom="transform opacity-0 scale-95"
//                           enterTo="transform opacity-100 scale-100"
//                           leave="transition ease-in duration-75"
//                           leaveFrom="transform opacity-100 scale-100"
//                           leaveTo="transform opacity-0 scale-95"
//                         >
//                           <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                             {[...userNavigation, { name: "Sign out", href: "#", icon: LogOut, onClick: handleLogout }].map((item) => (
//                               <Menu.Item key={item.name}>
//                                 {({ active }) => (
//                                   item.onClick ? (
//                                     <button
//                                       onClick={item.onClick}
//                                       className={classNames(
//                                         active ? "bg-gray-100" : "",
//                                         "flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700"
//                                       )}
//                                     >
//                                       <item.icon className="h-4 w-4" />
//                                       {item.name}
//                                     </button>
//                                   ) : (
//                                     <Link
//                                       to={item.href}
//                                       className={classNames(
//                                         active ? "bg-gray-100" : "",
//                                         "flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
//                                       )}
//                                     >
//                                       <item.icon className="h-4 w-4" />
//                                       {item.name}
//                                     </Link>
//                                   )
//                                 )}
//                               </Menu.Item>
//                             ))}
//                           </Menu.Items>
//                         </Transition>
//                       </Menu>
//                     ) : (
//                       // Desktop hover menu
//                       <div className="relative group">
//                         <div className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                           <img
//                             className="h-8 w-8 rounded-full"
//                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                             alt="User"
//                           />
//                         </div>
//                         <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
//                           {userNavigation.map((item) => (
//                             <Link
//                               key={item.name}
//                               to={item.href}
//                               className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                             >
//                               <item.icon className="h-4 w-4" />
//                               {item.name}
//                             </Link>
//                           ))}
//                           <button
//                             onClick={handleLogout}
//                             className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                           >
//                             <LogOut className="h-4 w-4" />
//                             Sign out
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Mobile menu */}
//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 px-2 pb-3 pt-2">
//               <div className="flex flex-col justify-between px-3 py-2">
//                 {currentNavigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium transition-colors duration-200"
//                   >
//                     <item.icon className="h-5 w-5" />
//                     {item.name}
//                     {item.name === "Cart" && items.length > 0 && (
//                       <span className="ml-1 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
//                         {items.length}
//                       </span>
//                     )}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// };

// export default Navbar;


















// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { toast } from 'react-hot-toast';
// import { useCart } from '../context/CartContext';
// import {
//   LogIn,
//   UserPlus,
//   Bell,
//   Menu as MenuIcon,
//   X,
//   ShoppingBag,
//   LogOut,
//   Home
// } from "lucide-react";
// import { FaShoppingCart } from "react-icons/fa";
// // Navigation items for non-authenticated users
// const publicNavigation = [
//   { name: "Home", href: "/", icon: Home },
//   { name: "Login", href: "/login", icon: LogIn },
//   { name: "Signup", href: "/createuser", icon: UserPlus },
// ];

// // Navigation items for authenticated users
// const privateNavigation = [
//   { name: "Cart", href: "/cart", icon: FaShoppingCart },
//   { name: "My Orders", href: "/orders", icon: ShoppingBag },
// ];

// const classNames = (...classes) => classes.filter(Boolean).join(" ");

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const { clearCart, items } = useCart(); // Get the items array from the cart context
//   const auth = localStorage.getItem('authToken');
//   const userName = localStorage.getItem('userName');
//   // Check authentication status and device type on component mount
//   useEffect(() => {
//     // Check if user is authenticated
//     const checkAuth = () => {
//       const authToken = localStorage.getItem("authToken");
//       setIsAuthenticated(!!authToken);
//     };

//     // Check if device is mobile
//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkAuth();
//     checkIsMobile();

//     // Add resize listener
//     window.addEventListener("resize", checkIsMobile);
//     return () => window.removeEventListener("resize", checkIsMobile);
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("credentials");

//     // Clear cart
//     clearCart();

//     toast.success("Logged out successfully!", {
//       duration: 2000,
//       icon: '👋',
//       style: {
//         background: '#22c55e',
//         color: '#fff',
//       },
//     });

//     // Force page reload to update navbar and cart
//     window.location.href = "/";
//   };

//   // Get current navigation items based on auth status
//   const currentNavigation = isAuthenticated ? privateNavigation : publicNavigation;

//   return (
//     <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               {/* Mobile menu button */}
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 <Disclosure.Button className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200">
//                   {open ? (
//                     <X className="h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <MenuIcon className="h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>

//               {/* Logo with Home icon */}
//               <div className="flex flex-1 items-center cursor-pointer justify-start pl-16 sm:pl-0">
//                 <Link
//                   to="/"
//                   className="flex items-center gap-2 hover:opacity-80 transition-opacity"
//                 >
//                   <Home className="h-6 w-6 text-white" />
//                   <span className="text-slate-50 text-2xl font-bold italic">
//                     myiFood
//                   </span>
//                 </Link>
//               </div>

//               {/* Right side navigation */}
//               <div className="flex items-center gap-4">
//                 {/* Desktop Navigation Links */}
//                 <div className="hidden sm:flex sm:items-center sm:gap-4">
//                   {currentNavigation.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
//                     >
//                       <item.icon className="h-4 w-4" />
//                       {item.name}
//                       {item.name === "Cart" && items.length > 0 && (
//                         <span className="ml-1 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
//                           {items.length}
//                         </span>
//                       )}
//                     </Link>
//                   ))}
//                 </div>

//                 {/* Show notifications and profile only for authenticated users */}
//                 {isAuthenticated && (
//                   <>
//                     {/* Notifications */}
//                     <button className="rounded-full p-1 text-gray-400 hover:text-white transition-colors duration-200">
//                       <Bell className="h-6 w-6" />
//                     </button>
                    
//                     {/* Simple logout button */}
//                     {isMobile ? (
//                       <Menu as="div" className="relative">
//                         <Menu.Button
//                           onClick={() => setIsMenuOpen(!isMenuOpen)}
//                           className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                         >
//                           <img
//                             className="h-8 w-8 rounded-full"
//                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                             alt="User"
//                           />
//                         </Menu.Button>
//                         <Transition
//                           show={isMenuOpen}
//                           enter="transition ease-out duration-100"
//                           enterFrom="transform opacity-0 scale-95"
//                           enterTo="transform opacity-100 scale-100"
//                           leave="transition ease-in duration-75"
//                           leaveFrom="transform opacity-100 scale-100"
//                           leaveTo="transform opacity-0 scale-95"
//                         >
//                           <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                             <Menu.Item>
//                               {({ active }) => (
//                                 <button
//                                   onClick={handleLogout}
//                                   className={classNames(
//                                     active ? "bg-gray-100" : "",
//                                     "flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700"
//                                   )}
//                                 >
//                                   <LogOut className="h-4 w-4" />
//                                   Sign out
//                                 </button>
//                               )}
//                             </Menu.Item>
//                           </Menu.Items>
//                         </Transition>
//                       </Menu>
//                     ) : (
//                       // Desktop hover menu - simplified to just logout
//                       <div className="relative group">
//                         <div className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                           <img
//                             className="h-8 w-8 rounded-full"
//                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                             alt="User"
//                           />
//                         </div>
//                         <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
//                           <button
//                             onClick={handleLogout}
//                             className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                           >
//                             <LogOut className="h-4 w-4" />
//                             Sign out
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Mobile menu */}
//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 px-2 pb-3 pt-2">
//               <div className="flex flex-col justify-between px-3 py-2">
//                 {currentNavigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium transition-colors duration-200"
//                   >
//                     <item.icon className="h-5 w-5" />
//                     {item.name}
//                     {item.name === "Cart" && items.length > 0 && (
//                       <span className="ml-1 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
//                         {items.length}
//                       </span>
//                     )}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// };

// export default Navbar;
















// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { toast } from 'react-hot-toast';
// import { useCart } from '../context/CartContext';
// import {
//   LogIn,
//   UserPlus,
//   Bell,
//   Menu as MenuIcon,
//   X,
//   ShoppingBag,
//   LogOut,
//   Home
// } from "lucide-react";
// import { FaShoppingCart } from "react-icons/fa";
// // Navigation items for non-authenticated users
// const publicNavigation = [
//   { name: "Home", href: "/", icon: Home },
//   { name: "Login", href: "/login", icon: LogIn },
//   { name: "Signup", href: "/createuser", icon: UserPlus },
// ];

// // Navigation items for authenticated users
// const privateNavigation = [
//   { name: "Cart", href: "/cart", icon: FaShoppingCart },
//   { name: "My Orders", href: "/orders", icon: ShoppingBag },
// ];

// const classNames = (...classes) => classes.filter(Boolean).join(" ");

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const { clearCart, items } = useCart(); // Get the items array from the cart context
//   const auth = localStorage.getItem('authToken');
//   const userName = localStorage.getItem('userName');
//   // Check authentication status and device type on component mount
//   useEffect(() => {
//     // Check if user is authenticated
//     const checkAuth = () => {
//       const authToken = localStorage.getItem("authToken");
//       setIsAuthenticated(!!authToken);
//     };

//     // Check if device is mobile
//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkAuth();
//     checkIsMobile();

//     // Add resize listener
//     window.addEventListener("resize", checkIsMobile);
//     return () => window.removeEventListener("resize", checkIsMobile);
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("credentials");

//     // Clear cart
//     clearCart();

//     toast.success("Logged out successfully!", {
//       duration: 2000,
//       icon: '👋',
//       style: {
//         background: '#22c55e',
//         color: '#fff',
//       },
//     });

//     // Using navigate instead of direct window location change
//     navigate('/');
//   };

//   // Navigate to notifications page
//   const handleNotificationsClick = () => {
//     navigate('/notifications');
//   };

//   // Get current navigation items based on auth status
//   const currentNavigation = isAuthenticated ? privateNavigation : publicNavigation;

//   return (
//     <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               {/* Mobile menu button */}
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 <Disclosure.Button className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200">
//                   {open ? (
//                     <X className="h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <MenuIcon className="h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>

//               {/* Logo with Home icon */}
//               <div className="flex flex-1 items-center justify-start pl-16 sm:pl-0">
//                 <div
//                   onClick={() => navigate('/')}
//                   className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
//                 >
//                   <Home className="h-6 w-6 text-white" />
//                   <span className="text-slate-50 text-2xl font-bold italic">
//                     myiFood
//                   </span>
//                 </div>
//               </div>

//               {/* Right side navigation */}
//               <div className="flex items-center gap-4">
//                 {/* Desktop Navigation Links */}
//                 <div className="hidden sm:flex sm:items-center sm:gap-4">
//                   {currentNavigation.map((item) => (
//                     <div
//                       key={item.name}
//                       onClick={() => navigate(item.href)}
//                       className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer"
//                     >
//                       <item.icon className="h-4 w-4" />
//                       {item.name}
//                       {item.name === "Cart" && items.length > 0 && (
//                         <span className="ml-1 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
//                           {items.length}
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Show notifications and profile only for authenticated users */}
//                 {isAuthenticated && (
//                   <>
//                     {/* Notifications */}
//                     <div
//                       onClick={handleNotificationsClick} 
//                       className="rounded-full p-1 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
//                     >
//                       <Bell className="h-6 w-6" />
//                     </div>
                    
//                     {/* Simple logout button */}
//                     {isMobile ? (
//                       <Menu as="div" className="relative">
//                         <Menu.Button
//                           onClick={() => setIsMenuOpen(!isMenuOpen)}
//                           className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer"
//                         >
//                           <img
//                             className="h-8 w-8 rounded-full"
//                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                             alt="User"
//                           />
//                         </Menu.Button>
//                         <Transition
//                           show={isMenuOpen}
//                           enter="transition ease-out duration-100"
//                           enterFrom="transform opacity-0 scale-95"
//                           enterTo="transform opacity-100 scale-100"
//                           leave="transition ease-in duration-75"
//                           leaveFrom="transform opacity-100 scale-100"
//                           leaveTo="transform opacity-0 scale-95"
//                         >
//                           <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                             <Menu.Item>
//                               {({ active }) => (
//                                 <button
//                                   onClick={handleLogout}
//                                   className={classNames(
//                                     active ? "bg-gray-100" : "",
//                                     "flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer"
//                                   )}
//                                 >
//                                   <LogOut className="h-4 w-4" />
//                                   Sign out
//                                 </button>
//                               )}
//                             </Menu.Item>
//                           </Menu.Items>
//                         </Transition>
//                       </Menu>
//                     ) : (
//                       // Desktop hover menu - simplified to just logout
//                       <div className="relative group">
//                         <div className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer">
//                           <img
//                             className="h-8 w-8 rounded-full"
//                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                             alt="User"
//                           />
//                         </div>
//                         <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
//                           <button
//                             onClick={handleLogout}
//                             className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
//                           >
//                             <LogOut className="h-4 w-4" />
//                             Sign out
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Mobile menu */}
//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 px-2 pb-3 pt-2">
//               <div className="flex flex-col justify-between px-3 py-2">
//                 {currentNavigation.map((item) => (
//                   <div
//                     key={item.name}
//                     onClick={() => navigate(item.href)}
//                     className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 cursor-pointer"
//                   >
//                     <item.icon className="h-5 w-5" />
//                     {item.name}
//                     {item.name === "Cart" && items.length > 0 && (
//                       <span className="ml-1 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
//                         {items.length}
//                       </span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// };

// export default Navbar;





// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { toast } from 'react-hot-toast';
// import { useCart } from '../context/CartContext';
// import {
//   LogIn,
//   UserPlus,
//   Bell,
//   Menu as MenuIcon,
//   X,
//   ShoppingBag,
//   LogOut,
//   Home,
//   ChevronDown,
//   User
// } from "lucide-react";
// import { FaShoppingCart } from "react-icons/fa";

// // Navigation items for non-authenticated users
// const publicNavigation = [
//   { name: "Home", href: "/", icon: Home },
//   { name: "Login", href: "/login", icon: LogIn },
//   { name: "Signup", href: "/createuser", icon: UserPlus },
// ];

// // Navigation items for authenticated users
// const privateNavigation = [
//   { name: "Cart", href: "/cart", icon: FaShoppingCart },
//   { name: "My Orders", href: "/orders", icon: ShoppingBag },
// ];

// const classNames = (...classes) => classes.filter(Boolean).join(" ");

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const { clearCart, items } = useCart();
//   const userName = localStorage.getItem('userName');

//   // Check authentication status and device type on component mount
//   useEffect(() => {
//     const checkAuth = () => {
//       const authToken = localStorage.getItem("authToken");
//       setIsAuthenticated(!!authToken);
//     };

//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkAuth();
//     checkIsMobile();

//     window.addEventListener("resize", checkIsMobile);
//     return () => window.removeEventListener("resize", checkIsMobile);
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("credentials");

//     // Clear cart
//     clearCart();

//     toast.success("Logged out successfully!", {
//       duration: 2000,
//       icon: '👋',
//       style: {
//         background: '#22c55e',
//         color: '#fff',
//       },
//     });

//     navigate('/');
//   };

//   // Get current navigation items based on auth status
//   const currentNavigation = isAuthenticated ? privateNavigation : publicNavigation;

//   return (
//     <nav className="bg-gradient-to-r from-gray-900 to-gray-800 sticky top-0 z-50 shadow-md">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           {/* Logo Section */}
//           <div 
//             onClick={() => navigate('/')}
//             className="flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer"
//           >
//             <div className="bg-yellow-500 p-1.5 rounded-full">
//               <Home className="h-5 w-5 text-gray-900" />
//             </div>
//             <span className="text-yellow-400 text-2xl font-bold">
//               myiFood
//             </span>
//           </div>

//           {/* Desktop Navigation Links */}
//           <div className="hidden md:flex md:items-center md:space-x-4">
//             {currentNavigation.map((item) => (
//               <div
//                 key={item.name}
//                 onClick={() => navigate(item.href)}
//                 className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
//               >
//                 <item.icon className="h-4 w-4" />
//                 <span>{item.name}</span>
//                 {item.name === "Cart" && items.length > 0 && (
//                   <span className="flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-xs font-medium text-white">
//                     {items.length}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Right side elements */}
//           <div className="flex items-center space-x-4">
//             {/* Notifications bell for authenticated users */}
//             {isAuthenticated && (
//               <div
//                 onClick={() => navigate('/notifications')}
//                 className="relative rounded-full p-1.5 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 transition-all duration-200 cursor-pointer"
//               >
//                 <Bell className="h-5 w-5" />
//                 <span className="absolute top-0 right-0 flex h-3 w-3">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//                 </span>
//               </div>
//             )}

//             {/* User Profile for authenticated users */}
//             {isAuthenticated && (
//               <Menu as="div" className="relative ml-3">
//                 <Menu.Button className="flex items-center bg-gray-700 hover:bg-gray-600 text-white rounded-full px-3 py-1.5 transition-all duration-200 cursor-pointer focus:outline-none">
//                   <img
//                     className="h-8 w-8 rounded-full mr-2 border-2 border-yellow-400"
//                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                     alt="User"
//                   />
//                   <span className="hidden md:inline-block mr-1 text-sm font-medium truncate max-w-[100px]">
//                     {userName || 'User'}
//                   </span>
//                   <ChevronDown className="h-4 w-4 text-gray-300" />
//                 </Menu.Button>
//                 <Transition
//                   enter="transition ease-out duration-100"
//                   enterFrom="transform opacity-0 scale-95"
//                   enterTo="transform opacity-100 scale-100"
//                   leave="transition ease-in duration-75"
//                   leaveFrom="transform opacity-100 scale-100"
//                   leaveTo="transform opacity-0 scale-95"
//                 >
//                   <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <Menu.Item>
//                       {({ active }) => (
//                         <div
//                           onClick={() => navigate('/profile')}
//                           className={classNames(
//                             active ? "bg-gray-100" : "",
//                             "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer"
//                           )}
//                         >
//                           <User className="h-4 w-4 text-gray-500" />
//                           Profile
//                         </div>
//                       )}
//                     </Menu.Item>
//                     <Menu.Item>
//                       {({ active }) => (
//                         <div
//                           onClick={handleLogout}
//                           className={classNames(
//                             active ? "bg-gray-100" : "",
//                             "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer"
//                           )}
//                         >
//                           <LogOut className="h-4 w-4 text-gray-500" />
//                           Sign out
//                         </div>
//                       )}
//                     </Menu.Item>
//                   </Menu.Items>
//                 </Transition>
//               </Menu>
//             )}

//             {/* Mobile menu button */}
//             <Disclosure>
//               {({ open }) => (
//                 <>
//                   <Disclosure.Button className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none">
//                     {open ? (
//                       <X className="block h-6 w-6" aria-hidden="true" />
//                     ) : (
//                       <MenuIcon className="block h-6 w-6" aria-hidden="true" />
//                     )}
//                   </Disclosure.Button>

//                   {/* Mobile menu panel */}
//                   <Transition
//                     enter="transition duration-100 ease-out"
//                     enterFrom="transform scale-95 opacity-0"
//                     enterTo="transform scale-100 opacity-100"
//                     leave="transition duration-75 ease-out"
//                     leaveFrom="transform scale-100 opacity-100"
//                     leaveTo="transform scale-95 opacity-0"
//                   >
//                     <Disclosure.Panel className="md:hidden absolute top-16 right-0 left-0 bg-gray-800 shadow-lg">
//                       <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
//                         {currentNavigation.map((item) => (
//                           <div
//                             key={item.name}
//                             onClick={() => navigate(item.href)}
//                             className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center justify-between rounded-md px-4 py-3 text-base font-medium cursor-pointer"
//                           >
//                             <div className="flex items-center">
//                               <item.icon className="h-5 w-5 mr-3" />
//                               {item.name}
//                             </div>
//                             {item.name === "Cart" && items.length > 0 && (
//                               <span className="flex items-center justify-center h-6 w-6 rounded-full bg-red-600 text-xs font-medium text-white">
//                                 {items.length}
//                               </span>
//                             )}
//                           </div>
//                         ))}
                        
//                         {isAuthenticated && (
//                           <div
//                             onClick={handleLogout}
//                             className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center rounded-md px-4 py-3 text-base font-medium cursor-pointer"
//                           >
//                             <LogOut className="h-5 w-5 mr-3" />
//                             Sign out
//                           </div>
//                         )}
//                       </div>
//                     </Disclosure.Panel>
//                   </Transition>
//                 </>
//               )}
//             </Disclosure>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { toast } from 'react-hot-toast';
// import { useCart } from '../context/CartContext';
// import {
//   LogIn,
//   UserPlus,
//   Bell,
//   Menu as MenuIcon,
//   X,
//   ShoppingBag,
//   LogOut,
//   Home,
//   ChevronDown,
//   User
// } from "lucide-react";
// import { FaShoppingCart } from "react-icons/fa";

// // Navigation items for non-authenticated users
// const publicNavigation = [
//   { name: "Home", href: "/", icon: Home },
//   { name: "Login", href: "/login", icon: LogIn },
//   { name: "Signup", href: "/createuser", icon: UserPlus },
// ];

// // Navigation items for authenticated users
// const privateNavigation = [
//   { name: "Cart", href: "/cart", icon: FaShoppingCart },
//   { name: "My Orders", href: "/orders", icon: ShoppingBag },
// ];

// const classNames = (...classes) => classes.filter(Boolean).join(" ");

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const { clearCart, items } = useCart();
//   const userName = localStorage.getItem('userName');

//   // Check authentication status and device type on component mount
//   useEffect(() => {
//     const checkAuth = () => {
//       const authToken = localStorage.getItem("authToken");
//       setIsAuthenticated(!!authToken);
//     };

//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkAuth();
//     checkIsMobile();

//     window.addEventListener("resize", checkIsMobile);
//     return () => window.removeEventListener("resize", checkIsMobile);
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     navigate('/');
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("credentials");

//     // Clear cart
//     clearCart();

//     toast.success("Logged out successfully!", {
//       duration: 2000,
//       icon: '👋',
//       style: {
//         background: '#22c55e',
//         color: '#fff',
//       },
//     });
//   };

//   return (
//     <nav className="bg-gradient-to-r from-gray-900 to-gray-800 sticky top-0 z-50 shadow-md">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           {/* Logo Section */}
//           <div 
//             onClick={() => navigate('/')}
//             className="flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer"
//           >
//             <div className="bg-yellow-500 p-1.5 rounded-full">
//               <Home className="h-5 w-5 text-gray-900" />
//             </div>
//             <span className="text-yellow-400 text-2xl font-bold">
//               myiFood
//             </span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex md:items-center md:space-x-4">
//             {!isAuthenticated && (
//               // Public navigation for desktop
//               publicNavigation.map((item) => (
//                 <div
//                   key={item.name}
//                   onClick={() => navigate(item.href)}
//                   className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
//                 >
//                   <item.icon className="h-4 w-4" />
//                   <span>{item.name}</span>
//                 </div>
//               ))
//             )}
            
//             {isAuthenticated && (
//               // Private navigation for desktop - Cart and Notifications
//               <div className="flex items-center space-x-2">
//                 {/* Cart */}
//                 <div
//                   onClick={() => navigate('/cart')}
//                   className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
//                 >
//                   <FaShoppingCart className="h-4 w-4" />
//                   <span>Cart</span>
//                   {items.length > 0 && (
//                     <span className="flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-xs font-medium text-white">
//                       {items.length}
//                     </span>
//                   )}
//                 </div>
                
//                 {/* Notifications */}
//                 <div
//                   onClick={() => navigate('/notifications')}
//                   className="relative rounded-full p-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 transition-all duration-200 cursor-pointer"
//                 >
//                   <Bell className="h-5 w-5" />
//                   <span className="absolute top-0 right-0 flex h-3 w-3">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//                   </span>
//                 </div>
                
//                 {/* User Profile Dropdown */}
//                 <Menu as="div" className="relative">
//                   <Menu.Button className="flex items-center bg-gray-700 hover:bg-gray-600 text-white rounded-full px-3 py-1.5 transition-all duration-200 cursor-pointer focus:outline-none">
//                     <img
//                       className="h-8 w-8 rounded-full mr-2 border-2 border-yellow-400"
//                       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                       alt="User"
//                     />
//                     <span className="inline-block mr-1 text-sm font-medium truncate max-w-[100px]">
//                       {userName || 'User'}
//                     </span>
//                     <ChevronDown className="h-4 w-4 text-gray-300" />
//                   </Menu.Button>
//                   <Transition
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                       <Menu.Item>
//                         {({ active }) => (
//                           <div
//                             onClick={() => navigate('/profile')}
//                             className={classNames(
//                               active ? "bg-gray-100" : "",
//                               "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer"
//                             )}
//                           >
//                             <User className="h-4 w-4 text-gray-500" />
//                             Profile
//                           </div>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <div
//                             onClick={() => navigate('/orders')}
//                             className={classNames(
//                               active ? "bg-gray-100" : "",
//                               "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer"
//                             )}
//                           >
//                             <ShoppingBag className="h-4 w-4 text-gray-500" />
//                             My Orders
//                           </div>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <div
//                             onClick={handleLogout}
//                             className={classNames(
//                               active ? "bg-gray-100" : "",
//                               "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer"
//                             )}
//                           >
//                             <LogOut className="h-4 w-4 text-gray-500" />
//                             Sign out
//                           </div>
//                         )}
//                       </Menu.Item>
//                     </Menu.Items>
//                   </Transition>
//                 </Menu>
//               </div>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <Disclosure>
//             {({ open }) => (
//               <>
//                 <Disclosure.Button className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none">
//                   {open ? (
//                     <X className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <MenuIcon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>

//                 {/* Mobile menu panel */}
//                 <Transition
//                   enter="transition duration-100 ease-out"
//                   enterFrom="transform scale-95 opacity-0"
//                   enterTo="transform scale-100 opacity-100"
//                   leave="transition duration-75 ease-out"
//                   leaveFrom="transform scale-100 opacity-100"
//                   leaveTo="transform scale-95 opacity-0"
//                 >
//                   <Disclosure.Panel className="md:hidden absolute top-16 right-0 left-0 bg-gray-800 shadow-lg">
//                     <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
//                       {!isAuthenticated && (
//                         // Public navigation for mobile
//                         publicNavigation.map((item) => (
//                           <div
//                             key={item.name}
//                             onClick={() => navigate(item.href)}
//                             className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center rounded-md px-4 py-3 text-base font-medium cursor-pointer"
//                           >
//                             <item.icon className="h-5 w-5 mr-3" />
//                             {item.name}
//                           </div>
//                         ))
//                       )}
                      
//                       {isAuthenticated && (
//                         // Private navigation for mobile
//                         <>
//                           <div
//                             onClick={() => navigate('/cart')}
//                             className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center justify-between rounded-md px-4 py-3 text-base font-medium cursor-pointer"
//                           >
//                             <div className="flex items-center">
//                               <FaShoppingCart className="h-5 w-5 mr-3" />
//                               Cart
//                             </div>
//                             {items.length > 0 && (
//                               <span className="flex items-center justify-center h-6 w-6 rounded-full bg-red-600 text-xs font-medium text-white">
//                                 {items.length}
//                               </span>
//                             )}
//                           </div>
                          
//                           <div
//                             onClick={() => navigate('/notifications')}
//                             className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center justify-between rounded-md px-4 py-3 text-base font-medium cursor-pointer"
//                           >
//                             <div className="flex items-center">
//                               <Bell className="h-5 w-5 mr-3" />
//                               Notifications
//                             </div>
//                             <span className="flex h-3 w-3">
//                               <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//                             </span>
//                           </div>
                          
//                           <div
//                             onClick={() => navigate('/orders')}
//                             className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center rounded-md px-4 py-3 text-base font-medium cursor-pointer"
//                           >
//                             <ShoppingBag className="h-5 w-5 mr-3" />
//                             My Orders
//                           </div>
                          
//                           <div
//                             onClick={() => navigate('/profile')}
//                             className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center rounded-md px-4 py-3 text-base font-medium cursor-pointer"
//                           >
//                             <User className="h-5 w-5 mr-3" />
//                             Profile
//                           </div>
                          
//                           <div
//                             onClick={handleLogout}
//                             className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center rounded-md px-4 py-3 text-base font-medium cursor-pointer border-t border-gray-700 mt-2 pt-2"
//                           >
//                             <LogOut className="h-5 w-5 mr-3" />
//                             Sign out
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </Disclosure.Panel>
//                 </Transition>
//               </>
//             )}
//           </Disclosure>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;












import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import {
  LogIn,
  UserPlus,
  Bell,
  Menu as MenuIcon,
  X,
  ShoppingBag,
  LogOut,
  Home,
  ChevronDown,
  User
} from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";

// Navigation items for non-authenticated users
const publicNavigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Login", href: "/login", icon: LogIn },
  { name: "Signup", href: "/createuser", icon: UserPlus },
];

// Navigation items for authenticated users
const privateNavigation = [
  { name: "Cart", href: "/cart", icon: FaShoppingCart },
  { name: "My Orders", href: "/orders", icon: ShoppingBag },
];

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { clearCart, items } = useCart();
  const userName = localStorage.getItem('userName');

  // Check authentication status and device type on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem("authToken");
      setIsAuthenticated(!!authToken);
    };

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkAuth();
    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);
    // Add event listener to check auth on storage changes
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("resize", checkIsMobile);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Update authentication state immediately
    setIsAuthenticated(false);
    
    // Clear auth data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("credentials");

    // Clear cart
    clearCart();
    
    // Navigate to home page
    navigate('/');

    // Show success toast
    toast.success("Logged out successfully!", {
      duration: 2000,
      icon: '👋',
      style: {
        background: '#22c55e',
        color: '#fff',
      },
    });
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 sticky top-0 z-50 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer"
          >
            <div className="bg-yellow-500 p-1.5 rounded-full">
              <Home className="h-5 w-5 text-gray-900" />
            </div>
            <span className="text-yellow-400 text-2xl font-bold">
              myiFood
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {!isAuthenticated && (
              // Public navigation for desktop
              publicNavigation.map((item) => (
                <div
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
              ))
            )}
            
            {isAuthenticated && (
              // Private navigation for desktop - Cart and Notifications
              <div className="flex items-center space-x-2">
                {/* Cart */}
                <div
                  onClick={() => navigate('/cart')}
                  className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                >
                  <FaShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  {items.length > 0 && (
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-xs font-medium text-white">
                      {items.length}
                    </span>
                  )}
                </div>
                
                {/* Notifications */}
                <div
                  onClick={() => navigate('/notifications')}
                  className="relative rounded-full p-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 transition-all duration-200 cursor-pointer"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                </div>
                
                {/* User Profile Dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center bg-gray-700 hover:bg-gray-600 text-white rounded-full px-3 py-1.5 transition-all duration-200 cursor-pointer focus:outline-none">
                    <img
                      className="h-8 w-8 rounded-full mr-2 border-2 border-yellow-400"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User"
                    />
                    <span className="inline-block mr-1 text-sm font-medium truncate max-w-[100px]">
                      {userName || 'User'}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-300" />
                  </Menu.Button>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => navigate('/profile')}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            <User className="h-4 w-4 text-gray-500" />
                            Profile
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => navigate('/orders')}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            <ShoppingBag className="h-4 w-4 text-gray-500" />
                            My Orders
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={handleLogout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            <LogOut className="h-4 w-4 text-gray-500" />
                            Sign out
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none">
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>

                {/* Mobile menu panel */}
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="md:hidden absolute top-16 right-0 left-0 bg-gray-800 shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
                      {!isAuthenticated && (
                        // Public navigation for mobile
                        publicNavigation.map((item) => (
                          <div
                            key={item.name}
                            onClick={() => navigate(item.href)}
                            className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center rounded-md px-4 py-3 text-base font-medium cursor-pointer"
                          >
                            <item.icon className="h-5 w-5 mr-3" />
                            {item.name}
                          </div>
                        ))
                      )}
                      
                      {isAuthenticated && (
                        // Private navigation for mobile
                        <>
                          <div
                            onClick={() => navigate('/cart')}
                            className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center justify-between rounded-md px-4 py-3 text-base font-medium cursor-pointer"
                          >
                            <div className="flex items-center">
                              <FaShoppingCart className="h-5 w-5 mr-3" />
                              Cart
                            </div>
                            {items.length > 0 && (
                              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-red-600 text-xs font-medium text-white">
                                {items.length}
                              </span>
                            )}
                          </div>
                          
                          <div
                            onClick={() => navigate('/notifications')}
                            className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center justify-between rounded-md px-4 py-3 text-base font-medium cursor-pointer"
                          >
                            <div className="flex items-center">
                              <Bell className="h-5 w-5 mr-3" />
                              Notifications
                            </div>
                            <span className="flex h-3 w-3">
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                          </div>
                          
                          <div
                            onClick={() => navigate('/orders')}
                            className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center rounded-md px-4 py-3 text-base font-medium cursor-pointer"
                          >
                            <ShoppingBag className="h-5 w-5 mr-3" />
                            My Orders
                          </div>
                          
                          <div
                            onClick={() => navigate('/profile')}
                            className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center rounded-md px-4 py-3 text-base font-medium cursor-pointer"
                          >
                            <User className="h-5 w-5 mr-3" />
                            Profile
                          </div>
                          
                          <div
                            onClick={handleLogout}
                            className="text-gray-200 hover:bg-gray-700 hover:text-yellow-400 flex items-center rounded-md px-4 py-3 text-base font-medium cursor-pointer border-t border-gray-700 mt-2 pt-2"
                          >
                            <LogOut className="h-5 w-5 mr-3" />
                            Sign out
                          </div>
                        </>
                      )}
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;