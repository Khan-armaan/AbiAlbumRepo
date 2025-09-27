import MyActivity from "../../components/abiAlbum/MyActivity";
import FriendsGrid from "../../components/abiAlbum/FreindsGrid";

export const Dashboard = () => {
  // Using the attached blonde woman image - you can replace this with the actual image path
  const backgroundImage = "/src/assets/activity.png"; // Placeholder - replace with your blonde woman image
  
  return (
    <div className="min-h-screen p-6 flex">
      {/* Left Column - Activity Items */}
      <div className="flex flex-col space-y-4 mr-8">
        <MyActivity
          backgroundImage={backgroundImage}
          activityId="photos"
          title="MY PHOTOS"
        />
        <MyActivity
          backgroundImage={backgroundImage}
          activityId="videos"
          title="MY VIDEOS"
        />
        <MyActivity
          backgroundImage={backgroundImage}
          activityId="activities"
          title="MY ACTIVITIES"
        />
      </div>
      
      {/* Right Content Area - Friends Grid */}
      <div className="flex-1">
        <FriendsGrid />
      </div>
    </div>
  );
};

export default Dashboard;
