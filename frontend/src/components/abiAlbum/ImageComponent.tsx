import React, { useState, useEffect } from 'react';

// Define the type for the component's props
interface AnimatedImageCardProps {
  imageUrls: string[];
  width?: string;
  height?: string;
  animationDuration?: number; // Duration in milliseconds for each image
}

const AnimatedImageCard: React.FC<AnimatedImageCardProps> = ({
  imageUrls,
  width = 'w-96', // Default width
  height = 'h-64', // Default height
  animationDuration = 3000, // Default 3 seconds per image
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect hook to handle the image cycling animation
  useEffect(() => {
    // Ensure there's more than one image to cycle through
    if (imageUrls.length <= 1) return;

    // Set up an interval to change the image index
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, animationDuration);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [imageUrls, animationDuration]);

  // Return null or a static image if no URLs are provided
  if (!imageUrls || imageUrls.length === 0) {
    return (
        <div className={`relative ${width} ${height} rounded-2xl bg-gray-800 flex items-center justify-center`}>
            <p className="text-white">No images provided.</p>
        </div>
    );
  }

  return (
    // Main container with gradient border and shadow
    <div
      className={`
        relative p-1 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 
        shadow-lg shadow-purple-500/20 overflow-hidden ${width} ${height}
      `}
    >
      {/* Inner container to clip the image corners */}
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Animated slide ${index + 1}`}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-1000 ease-in-out
              ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedImageCard;