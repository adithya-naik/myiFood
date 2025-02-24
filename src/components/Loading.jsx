import React from 'react';
import { Pizza, Coffee, Apple, IceCream2, Beef, Fish } from 'lucide-react';

const Loading = () => {
  const icons = [Pizza, Coffee, Apple, IceCream2, Beef, Fish];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex space-x-4">
        {icons.map((Icon, index) => (
          <Icon
            key={index}
            className="text-gray-600 animate-bounce"
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: '1s'
            }}
            size={32}
          />
        ))}
      </div>
      <p className="mt-4 text-lg text-gray-600 animate-pulse">
        Loading delicious food...
      </p>
    </div>
  );
};

export default Loading;