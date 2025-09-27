

import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define the props for the FriendCard component
interface FriendCardProps {
  imageUrl: string;
  name: string;
  location: string;
  profileId: string | number; // An ID to navigate to a specific profile page
}

const FriendCard: React.FC<FriendCardProps> = ({
  imageUrl,
  name,
  location,
  profileId,
}) => {
  const navigate = useNavigate();

  // Function to handle navigation when the card is clicked
  const handleClick = (): void => {
    navigate(`/profile/${profileId}`);
  };

  return (
    // Main container for the card
    <div
      onClick={handleClick}
      className="
        relative group w-25 h-25  rounded-xl overflow-hidden cursor-pointer
        shadow-lg transition-all duration-300 hover:scale-105
        border border-white/20 hover:border-pink-400 m-2
      "
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={`${name} from ${location}`}
        className="
          w-full h-full object-cover transition-transform
          duration-300 group-hover:scale-110
        "
      />
      
      {/* Absolute overlay to darken the image slightly for text contrast, more visible on hover */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>

      {/* Text container positioned at the bottom */}
      <div
        className="
          absolute bottom-3 left-2 right-2 p-2 text-center rounded-lg
          bg-gradient-to-r from-pink-500/90 to-purple-600/90 backdrop-blur-sm
        "
      >
        {/* Name Text */}
        <p className="text-white text-xs  uppercase truncate">
          {name}
        </p>
        
        {/* Location Text
        <p className="text-white/80 text-xs uppercase truncate">
          {location}
        </p> */}
      </div>
    </div>
  );
};

export default FriendCard;