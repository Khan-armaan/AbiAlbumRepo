
import { Outlet } from 'react-router-dom';
import earthBackground from '../../assets/earth2.png?url';
import navbarLogo from '../../assets/navbarlogo.png';

export const Layout = () => {
  console.log('Earth background path:', earthBackground); // Debug log
  
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url("${earthBackground}")`,
        backgroundColor: '#1a1a2e' // Fallback color
      }}
    >
      Optional overlay for better content readability
      <div className="absolute inset-0  bg-opacity-20"></div>
      
      {/* Main content area */}
      <div className="relative z-10">
        <Navbar isAuthenticated={false} />
        <Outlet />
      </div>
    </div>
  );
};

interface NavbarProps {
  isAuthenticated?: boolean;
}

export const Navbar = ({ isAuthenticated = false }: NavbarProps) => {
  return (
    <nav className="w-full bg-black bg-opacity-80 backdrop-blur-sm px-1 ">
      <div className="flex items-center justify-between max-w-screen mx-auto">
        {/* Left Side - Logo and Home */}
        <div className="flex items-center space-x-4">
          {/* Company Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
           <img src={navbarLogo} alt="Logo" className="h-16 w-40 ml-6" />
            
          </div>
          
         
        </div>

        {/* Center - Welcome Message */}
        <div className="text-center flex-1 mx-8">
          <h1 className="text-white text-2xl font-bold mb-1">WELCOME TO ABI ALBUM</h1>
          <p className="text-blue-300 text-sm">ABI SOCIAL ALBUM: JOIN FREE</p>
        </div>

        {/* Right Side - Search and Login */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search here....."
              className="w-72 px-4 py-2 pr-10 bg-white rounded-full text-gray-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Login/Signup Button - Only show if not authenticated */}
          {!isAuthenticated && (
            <button className="bg-white hover:bg-blue-950 hover:text-white cursor-pointer text-black text-xs px-4 py-2 rounded-full font-medium transition-colors">
              LOGIN/SIGNUP
            </button>
          )}

          {/* US Flag */}
          <div className="w-8 h-6 rounded-sm mr-4  flex items-center justify-center overflow-hidden">
            <span className="text-xs">🇺🇸</span>
          </div>
        </div>
      </div>
    </nav>
  );
};