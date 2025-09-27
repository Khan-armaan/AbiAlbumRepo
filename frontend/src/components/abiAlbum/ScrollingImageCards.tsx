import React, { useRef, useEffect, useState } from 'react';
import AnimatedImageCard from './ImageComponent';

// Sample image arrays for each card - you can customize these
const imageArrays = [
  ["/src/assets/activity.png", "/src/assets/blonde-woman-bg.jpg", "/src/assets/earth2.png"],
  ["/src/assets/blonde-woman-bg.jpg", "/src/assets/activity.png", "/src/assets/earth2.png"],
  ["/src/assets/earth2.png", "/src/assets/activity.png", "/src/assets/blonde-woman-bg.jpg"],
  ["/src/assets/activity.png", "/src/assets/earth2.png", "/src/assets/blonde-woman-bg.jpg"],
  ["/src/assets/blonde-woman-bg.jpg", "/src/assets/earth2.png", "/src/assets/activity.png"],
  ["/src/assets/earth2.png", "/src/assets/blonde-woman-bg.jpg", "/src/assets/activity.png"],
  ["/src/assets/activity.png", "/src/assets/blonde-woman-bg.jpg", "/src/assets/earth2.png"],
  ["/src/assets/blonde-woman-bg.jpg", "/src/assets/activity.png", "/src/assets/earth2.png"],
  ["/src/assets/earth2.png", "/src/assets/activity.png", "/src/assets/blonde-woman-bg.jpg"],
  ["/src/assets/activity.png", "/src/assets/earth2.png", "/src/assets/blonde-woman-bg.jpg"],
];

const ScrollingImageCards: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || isHovered) return;

    const scroll = () => {
      const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
      
      if (scrollPosition >= maxScroll) {
        // Reset to top when reaching bottom
        scrollElement.scrollTo({ top: 0, behavior: 'smooth' });
        setScrollPosition(0);
      } else {
        // Scroll down by 1 pixel
        const newPosition = scrollPosition + 1;
        scrollElement.scrollTo({ top: newPosition, behavior: 'auto' });
        setScrollPosition(newPosition);
      }
    };

    const intervalId = setInterval(scroll, 50); // Scroll every 50ms for smooth motion

    return () => clearInterval(intervalId);
  }, [scrollPosition, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex justify-end pr-1 mt-6">
      <div className="w-fit">
        <div
          ref={scrollRef}
          className="flex flex-col space-y-3 h-96 overflow-hidden [&::-webkit-scrollbar]:hidden"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {imageArrays.map((imageArray, index) => (
            <div key={index} className="flex-shrink-0">
              <AnimatedImageCard
                imageUrls={imageArray}
                width="w-116"
                height="h-82"
                animationDuration={2000 + (index * 200)} // Stagger animation timing
              />
            </div>
          ))}
          {/* Duplicate cards for seamless loop */}
          {imageArrays.map((imageArray, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0">
              <AnimatedImageCard
                imageUrls={imageArray}
                width="w-96"
                height="h-96"
                animationDuration={2000 + (index * 200)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingImageCards;