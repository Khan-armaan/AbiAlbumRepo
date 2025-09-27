import React, { useRef } from 'react';
import FriendCard from './FriendsCard'; // Adjust the import path as needed
  const backgroundImage = "/src/assets/activity.png"
// Sample data for your friends
const friendsData = [
  { id: '101', name: 'Alexandra', location: 'New York, USA', image: backgroundImage },
  { id: '102', name: 'Maria', location: 'Los Angeles, USA', image: backgroundImage },
  { id: '103', name: 'David', location: 'London, UK', image: backgroundImage },
  { id: '104', name: 'Sophia', location: 'Tokyo, Japan', image: backgroundImage },
  { id: '105', name: 'Kenji', location: 'Osaka, Japan', image: backgroundImage },
  { id: '106', name: 'Isabella', location: 'Rome, Italy', image: backgroundImage },
  { id: '107', name: 'Liam', location: 'Dublin, Ireland', image: backgroundImage },
  { id: '108', name: 'Chloe', location: 'Paris, France', image: backgroundImage },
    { id: '109', name: 'Kenji', location: 'Osaka, Japan', image: backgroundImage },
  { id: '120', name: 'Isabella', location: 'Rome, Italy', image: backgroundImage },
  { id: '111', name: 'Liam', location: 'Dublin, Ireland', image: backgroundImage },
  { id: '112', name: 'Chloe', location: 'Paris, France', image: backgroundImage },
      { id: '113', name: 'Kenji', location: 'Osaka, Japan', image: backgroundImage },
  { id: '114', name: 'Isabella', location: 'Rome, Italy', image: backgroundImage },
  { id: '115', name: 'Liam', location: 'Dublin, Ireland', image: backgroundImage },
  { id: '116', name: 'Chloe', location: 'Paris, France', image: backgroundImage },
];

const FriendsGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="p-1 bg-transparent flex flex-col">
        <div className="flex justify-end">
       <h4 className="text-3xl font-bold  text-white mb-4 max-w-md">
        FRIENDS & FAMILY AROUND THE WORLD
      </h4>

        </div>
   
      <div className="flex justify-end pr-1 relative">
        {/* Scroll Up Button */}
        {/* {showScrollButtons && canScrollUp && (
          <button
            onClick={scrollUp}
            className="absolute -top-4 right-1/2 transform translate-x-1/2 z-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )} */}

        <div 
          ref={gridRef}
          className="grid grid-cols-4 w-fit max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}
        >
          {friendsData.map((friend) => (
            <FriendCard
              key={friend.id}
              profileId={friend.id}
              name={friend.name}
              location={friend.location}
              imageUrl={friend.image}
            />
          ))}
        </div>

        {/* Scroll Down Button
        {showScrollButtons && canScrollDown && (
          <button
            onClick={scrollDown}
            className="absolute -bottom-4 right-1/2 transform translate-x-1/2 z-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )} */}
      </div>
    </div>
  );
};

export default FriendsGrid;