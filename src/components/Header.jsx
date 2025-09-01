// src/components/Header.jsx
import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  ChevronDownIcon,
  BellIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
  CloudIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3); // Mock notification count
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // You can implement actual theme switching logic here
  };

  return (
    <header className="relative bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.03%27%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
      <div className="relative px-6 py-4 flex justify-between items-center">
        {/* Left Section - Logo and Title */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:rotate-3">
                <CloudIcon className="h-7 w-7 text-white" />
              </div>
              <SparklesIcon className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-bounce opacity-80" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cloud Task Manager
              </h1>
              <p className="text-xs text-white/60 font-medium">
                Productivity Dashboard ✨
              </p>
            </div>
          </Link>
        </div>

        {/* Center Section - Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-white/40 group-focus-within:text-white/70 transition-colors duration-300" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, projects, or team members..."
              className="
                w-full pl-12 pr-4 py-3 
                bg-white/10 backdrop-blur-xl 
                border border-white/20 
                rounded-2xl text-white placeholder-white/50 
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                focus:border-blue-500/50 focus:bg-white/20
                transition-all duration-300
                hover:bg-white/15 hover:border-white/30
              "
            />
            {/* Search suggestions dropdown can be added here */}
          </div>
        </div>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="
              p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 
              text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30
              transition-all duration-300 hover:scale-110 group
            "
            title="Toggle Theme"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            ) : (
              <MoonIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Notifications */}
          <button className="
            relative p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 
            text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30
            transition-all duration-300 hover:scale-110 group
          ">
            <BellIcon className="h-5 w-5 group-hover:animate-swing" />
            {notifications > 0 && (
              <div className="absolute -top-1 -right-1 flex items-center justify-center">
                <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  <span className="text-xs font-bold text-white">{notifications}</span>
                </div>
                <div className="absolute inset-0 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-30" />
              </div>
            )}
          </button>

          {/* Search Button (Mobile) */}
          <button className="
            lg:hidden p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 
            text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30
            transition-all duration-300 hover:scale-110
          ">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>

          {/* Settings Link */}
          <Link
            to="/settings"
            className="
              p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 
              text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30
              transition-all duration-300 hover:scale-110 group
            "
            title="Settings"
          >
            <Cog6ToothIcon className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
          </Link>

          {/* Profile Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="
              flex items-center space-x-3 p-2 rounded-2xl 
              bg-white/10 backdrop-blur-xl border border-white/20 
              hover:bg-white/20 hover:border-white/30 
              transition-all duration-300 hover:scale-105 group
            ">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">JD</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse" />
              </div>
              
              <div className="hidden md:block text-left min-w-0">
                <p className="text-sm font-semibold text-white truncate">John Doe</p>
                <p className="text-xs text-white/60 truncate">Premium Account</p>
              </div>

              <ChevronDownIcon className="h-4 w-4 text-white/60 group-hover:text-white transition-all duration-300 group-hover:rotate-180" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="
                absolute right-0 mt-3 w-64 origin-top-right 
                bg-slate-900/95 backdrop-blur-xl border border-white/20 
                rounded-2xl shadow-2xl ring-1 ring-black/5 
                focus:outline-none overflow-hidden
                z-50
              ">
                {/* Profile Header */}
                <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">JD</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">John Doe</p>
                      <p className="text-xs text-white/60">john.doe@company.com</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-400">Online</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={classNames(
                          active ? 'bg-white/10 text-white scale-[1.02]' : 'text-white/80',
                          'group flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 mx-2 rounded-xl'
                        )}
                      >
                        <UserIcon className="h-5 w-5 text-blue-400" />
                        <div>
                          <p className="font-medium">Profile Settings</p>
                          <p className="text-xs text-white/50">Manage your account</p>
                        </div>
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={classNames(
                          active ? 'bg-white/10 text-white scale-[1.02]' : 'text-white/80',
                          'group flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 mx-2 rounded-xl'
                        )}
                      >
                        <Cog6ToothIcon className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="font-medium">Preferences</p>
                          <p className="text-xs text-white/50">Customize your experience</p>
                        </div>
                      </Link>
                    )}
                  </Menu.Item>

                  <div className="border-t border-white/10 my-2" />

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={classNames(
                          active ? 'bg-red-500/20 text-red-300 scale-[1.02]' : 'text-white/80 hover:text-red-300',
                          'group flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 mx-2 rounded-xl w-full text-left'
                        )}
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-400" />
                        <div>
                          <p className="font-medium">Sign Out</p>
                          <p className="text-xs text-white/50">End your session</p>
                        </div>
                      </button>
                    )}
                  </Menu.Item>
                </div>

                {/* Footer with upgrade prompt */}
                <div className="p-4 border-t border-white/10 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <SparklesIcon className="h-4 w-4 text-yellow-400" />
                      <span className="text-xs font-medium text-white/80">Premium Plan</span>
                    </div>
                    <div className="text-xs text-white/60">
                      30 days left
                    </div>
                  </div>
                  <button className="w-full mt-2 px-3 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-xs font-semibold text-white hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105">
                    Upgrade Now
                  </button>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* Mobile Search Bar - Slides down when search button is clicked */}
      <div className="lg:hidden px-6 pb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-white/40" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search everything..."
            className="
              w-full pl-12 pr-4 py-3 
              bg-white/10 backdrop-blur-xl 
              border border-white/20 
              rounded-2xl text-white placeholder-white/50 
              focus:outline-none focus:ring-2 focus:ring-blue-500/50 
              focus:border-blue-500/50 focus:bg-white/20
              transition-all duration-300
            "
          />
        </div>
      </div>

      {/* Floating Action Hints */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="flex space-x-2">
          <div className="px-3 py-1 bg-blue-500/20 backdrop-blur-xl rounded-full text-xs text-blue-300 border border-blue-500/30">
            ⌘ + K to search
          </div>
          <div className="px-3 py-1 bg-purple-500/20 backdrop-blur-xl rounded-full text-xs text-purple-300 border border-purple-500/30">
            ⌘ + N for new task
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes swing {
          0%, 20% { transform: rotate(0deg); }
          10% { transform: rotate(10deg); }
          30% { transform: rotate(-10deg); }
          40%, 100% { transform: rotate(0deg); }
        }
        
        .animate-swing {
          animation: swing 0.6s ease-in-out;
        }

        /* Smooth transitions for all interactive elements */
        .group:hover .group-hover\\:rotate-12 {
          transform: rotate(12deg);
        }
        
        .group:hover .group-hover\\:rotate-90 {
          transform: rotate(90deg);
        }
        
        .group:hover .group-hover\\:rotate-180 {
          transform: rotate(180deg);
        }
      `}</style>
    </header>
  );
};

export default Header;


// src/components/Header.jsx
// import React from 'react';
// import { Menu } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/24/solid';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { logout } from '../features/auth/authSlice';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <header className="bg-white shadow p-4 flex justify-between items-center">
//       <Link to="/" className="text-2xl font-bold text-blue-600">
//         Cloud Task Manager
//       </Link>
//       <div className="flex items-center space-x-4">
//         <Link to="/profile" className="text-gray-600 hover:text-gray-800">
//           Profile
//         </Link>
//         <Menu as="div" className="relative inline-block text-left">
//           <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//             John Doe
//             <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
//           </Menu.Button>
//           <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//             <div className="py-1">
//               <Menu.Item>
//                 {({ active }) => (
//                   <Link
//                     to="/profile"
//                     className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
//                   >
//                     Profile
//                   </Link>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={handleLogout}
//                     className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full text-left px-4 py-2 text-sm')}
//                   >
//                     Logout
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//           </Menu.Items>
//         </Menu>
//       </div>
//     </header>
//   );
// };

// export default Header;

