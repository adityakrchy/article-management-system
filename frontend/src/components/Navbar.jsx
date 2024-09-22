/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const Navbar = () => {
  const [user, setUser] = useState(null); // User state, initially null
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if user is logged in
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by fetching user data from sessionStorage
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setIsLoggedIn(true); // User is logged in
      
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user'); // Clear the sessionStorage
    setUser(null); // Clear the user state
    setIsLoggedIn(false); // Update the logged-in state
    navigate('/login'); // Redirect to login page
    console.log('User logged out');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side Links */}
          <div className="flex">
            <Link
              to="/articles"
              className="text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md font-semibold text-lg"
            >
              Articles
            </Link>
            <Link
              to="/add-article"
              className="text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md font-semibold text-lg"
            >
              Add Article
            </Link>
          </div>

          {/* Right Side - Conditionally Render based on login status */}
          <div className="relative">
            {isLoggedIn ? (
              // If logged in, show user info and logout button
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-100 hover:text-gray-300 focus:outline-none"
                >
                  <span className="mr-2 text-sm font-medium">{user.name}</span>
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user.profilePicture || 'https://via.placeholder.com/150'}
                    alt="User profile"
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // If not logged in, show Login and Register buttons
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md font-semibold text-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-100 hover:text-gray-300 px-3 py-2 rounded-md font-semibold text-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
