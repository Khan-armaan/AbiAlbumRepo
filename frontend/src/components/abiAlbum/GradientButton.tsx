

import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define the types for the component's props
type ButtonSize = 'small' | 'medium' | 'large' | 'full';

interface GradientButtonProps {
  text: string;
  linkTo: string;
  size?: ButtonSize;
  hasBorder?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  linkTo,
  size = 'medium', // Default size is medium
  hasBorder = true, // Default to having a border
}) => {
  const navigate = useNavigate();

  // Navigate to the specified link on click
  const handleClick = (): void => {
    navigate(linkTo);
  };

  // Define size classes based on the size prop
  const sizeClasses = {
    small: 'py-2 px-6 text-sm',
    medium: 'py-3 px-10 text-base',
    large: 'py-4 px-14 text-lg',
    full: 'py-3 w-full text-base',
  };

  // Base classes for the button styling
  const baseClasses = `
    flex items-center justify-center font-bold text-white uppercase 
    rounded-full cursor-pointer select-none tracking-wider
    bg-gradient-to-r from-pink-500 to-purple-600
    transition-all duration-300 ease-in-out
    hover:scale-105 hover:brightness-110 hover:shadow-lg hover:shadow-purple-500/30
    active:scale-95 active:brightness-90
  `;
  
  // Conditionally add border classes
  const borderClasses = hasBorder ? 'border-2 border-white' : '';

  return (
    <div
      onClick={handleClick}
      className={`${baseClasses} ${sizeClasses[size]} ${borderClasses}`}
    >
      {text}
    </div>
  );
};

export default GradientButton;