import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
const Login = () => {
  const [credentials, setCredentials] = useState({
    name:"",
    email: "",
    password: "",
  });

  // console.log(credentials);
  localStorage.setItem("credentials", JSON.stringify(credentials));
  localStorage.setItem("email", credentials.email);
  localStorage.setItem("name", credentials.name);

  
const navigate = useNavigate();
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
  
      const json = await response.json();
      if (!json.success) {
        toast.error("Invalid credentials", {
          icon: '❌',
        });
      } 
      if(json.success){
        localStorage.setItem("authToken", json.authToken);
        toast.success("Login successful!", {
          icon: '✅',
        });
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        icon: '❌',
      });
    }
  };

  return (
    
    <div>
      <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            myiFood
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={onchange}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={onchange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                
                
                <button
                  type="submit"
                  className="w-2/3 mx-auto flex items-center justify-center gap-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-200 cursor-pointer"
                >
                  <CiLogin className="text-lg" />
                  Login
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/createuser"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Create New Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      </motion.div>
    </div>
  );
};
export default Login;
