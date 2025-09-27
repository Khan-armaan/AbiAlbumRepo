import React from 'react';

// Define the TypeScript interface for the component's props
interface ContentCardProps {
  title: string;
  children: React.ReactNode; // Allows any valid React content to be passed
  animateContent?: boolean; // Optional prop for animation
  width?: string;
  height?: string;
  className?: string; // Optional prop for additional custom styling
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  children,
  animateContent = false, // Default value for optional prop
  width = 'w-[calc(100%-2rem)]',
  height = 'h-auto',
  className = '',
}) => {
  return (
    // Main container with gradient border and shadow
    <div
      className={`
        relative p-1 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 
        shadow-lg shadow-purple-500/20 overflow-hidden 
        ${width} ${height} ${className}
      `}
    >
      {/* Inner card content area */}
      <div
        className={`
          w-full h-full rounded-xl bg-black p-6 text-white 
          flex flex-col
          ${animateContent ? 'animate-fade-in' : ''}
        `}
      >
        {/* Title of the card */}
        <h2 className="text-3xl font-bold mb-4">
          {title}
        </h2>
        
        {/* Children content is rendered here */}
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;