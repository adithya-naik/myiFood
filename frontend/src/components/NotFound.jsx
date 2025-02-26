import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15); // 15 seconds countdown

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate('/');
    }

    return () => clearInterval(interval);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <UtensilsCrossed 
          className="mx-auto h-24 w-24 text-gray-400 animate-pulse" 
          strokeWidth={1.5}
        />
        <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-5xl">
          404
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Oops! Looks like this page is not on the menu.
        </p>
        <p className="mt-1 text-md text-gray-500">
          Redirecting to the homepage in{' '}
          <span className="font-semibold text-green-600 animate-pulse">
            {countdown}s
          </span>
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-800 px-6 py-3 rounded-lg font-medium
                      transform hover:-translate-y-0.5 hover:shadow-lg 
                     transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
