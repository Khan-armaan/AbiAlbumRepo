// src/components/MyActivity.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define the type for the component's props
interface MyActivityProps {
  backgroundImage: string;
  activityId: string;
  title?: string;
}

const MyActivity: React.FC<MyActivityProps> = ({
  backgroundImage,
  activityId,
  title = "MY ACTIVITY", // Default value for the optional prop
}) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    // Navigate to a dynamic route like /activity/1
    navigate(`/activity/${activityId}`);
  };

  return (
    // Main container for the component
    <div
      onClick={handleClick}
      className="
        relative w-64 h-64 m-2 rounded-2xl overflow-hidden cursor-pointer 
        flex flex-col justify-center items-center group shadow-xl 
        transition-transform duration-300 hover:scale-105 border-4 border-purple-600
        hover:border-purple-500"
    >
      {/* Background Image */}
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
      >
        {/* Light overlay on hover for better text visibility */}
        <div className="absolute inset-0 group-hover:bg-gradient-to-t group-hover:from-purple-700/40 group-hover:via-purple-600/20 group-hover:to-transparent transition-all duration-300"></div>
      </div>

      {/* Play Button */}
      <div 
        className="
          z-10 w-10 h-10 bg-white/90 rounded-full flex justify-center items-center
          shadow-lg mb-2 transition-transform duration-300 group-hover:bg-white"
      >
        <svg
          className="w-10 h-10 text-purple-600"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 5V19L19 12L8 5Z" />
        </svg>
      </div>

      {/* Title Text */}
      <span className="z-10 text-white font-bold text-lg tracking-wider drop-shadow-lg bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
        {title}
      </span>
    </div>
  );
};

export default MyActivity;