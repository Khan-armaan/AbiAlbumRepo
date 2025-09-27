import React from 'react';
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
];

const FriendsGrid: React.FC = () => {
  return (
    <div className="p-1 bg-transparent min-h-screen flex flex-col">
        <div className="flex justify-end">
       <h4 className="text-3xl font-bold  text-white mb-8  max-w-md">
        FRIENDS & FAMILY AROUND THE WORLD
      </h4>

        </div>
   
      <div className="flex justify-end pr-8">
        <div className="grid grid-cols-4 gap-1 w-fit">
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
      </div>
    </div>
  );
};

export default FriendsGrid;