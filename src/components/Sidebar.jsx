// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  UserIcon, 
  ClipboardDocumentListIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
  CloudIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: HomeIcon,
      gradient: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-500/10',
      hoverBg: 'hover:bg-blue-500/20'
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: UserIcon,
      gradient: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-500/10',
      hoverBg: 'hover:bg-emerald-500/20'
    },
    {
      name: 'Tasks',
      href: '/tasks',
      icon: ClipboardDocumentListIcon,
      gradient: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-500/10',
      hoverBg: 'hover:bg-orange-500/20'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'w-20' : 'w-80'}
        h-screen
        bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950
        backdrop-blur-xl
        border-r border-white/10
        transition-all duration-500 ease-out
        z-40
        group
        overflow-hidden
        shadow-2xl
      `}>
        {/* Animated Background Pattern */}
<div className="absolute inset-0">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.05%27%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
</div>


        {/* Header Section */}
        <div className="relative p-6 border-b border-white/10">
          {/* Close button for mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
          >
            <XMarkIcon className="h-5 w-5 text-white" />
          </button>

          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="relative group/logo">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover/logo:shadow-blue-500/25 transition-all duration-300 group-hover/logo:scale-110">
                <CloudIcon className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg">
                <div className="absolute inset-1 bg-white rounded-full animate-ping" />
              </div>
              <SparklesIcon className="absolute -top-2 -left-2 h-4 w-4 text-yellow-400 animate-bounce opacity-75" />
            </div>
            
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent animate-fade-in">
                  Cloud Task
                </h2>
                <p className="text-sm text-white/60 font-medium animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  Manager Pro ✨
                </p>
              </div>
            )}
          </div>

          {/* Collapse Toggle (Desktop) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex absolute -right-4 top-10 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-xl border border-white/20 rounded-full items-center justify-center hover:scale-110 transition-all duration-300 group shadow-lg hover:shadow-purple-500/25"
          >
            <ChevronRightIcon 
              className={`h-4 w-4 text-white transition-transform duration-500 ${
                isCollapsed ? 'rotate-0' : 'rotate-180'
              }`} 
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-3">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  group/item relative flex items-center space-x-4 p-4 rounded-2xl
                  transition-all duration-300 ease-out
                  hover:bg-white/10 hover:backdrop-blur-xl
                  hover:border hover:border-white/20
                  hover:shadow-xl hover:shadow-black/20
                  hover:translate-x-2 hover:scale-[1.02]
                  ${active ? 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/20' : ''}
                  ${isCollapsed ? 'justify-center' : ''}
                  overflow-hidden
                `}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Active indicator line */}
                {active && (
                  <div className={`
                    absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 
                    bg-gradient-to-b ${item.gradient} rounded-r-full
                    animate-scale-in shadow-lg
                  `} />
                )}

                {/* Hover glow effect */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover/item:opacity-100
                  bg-gradient-to-r ${item.gradient} blur-xl transition-opacity duration-500
                  -z-10 scale-75 group-hover/item:scale-100
                `} />

                {/* Icon Container */}
                <div className={`
                  relative p-3 rounded-xl transition-all duration-300
                  ${active ? `bg-gradient-to-br ${item.gradient} shadow-lg` : 'bg-white/5 group-hover/item:bg-white/10'}
                  group-hover/item:scale-110 group-hover/item:rotate-3 group-hover/item:shadow-2xl
                  flex-shrink-0
                `}>
                  <Icon className={`
                    h-6 w-6 transition-all duration-300
                    ${active ? 'text-white drop-shadow-lg' : 'text-white/70 group-hover/item:text-white'}
                  `} />
                  
                  {/* Icon glow */}
                  {active && (
                    <div className={`
                      absolute inset-0 bg-gradient-to-br ${item.gradient} 
                      rounded-xl blur-md opacity-60 -z-10 animate-pulse
                    `} />
                  )}
                </div>

                {/* Label and Arrow */}
                {!isCollapsed && (
                  <div className="flex items-center justify-between w-full min-w-0">
                    <span className={`
                      font-semibold text-lg transition-all duration-300
                      ${active ? 'text-white drop-shadow-sm' : 'text-white/70 group-hover/item:text-white'}
                    `}>
                      {item.name}
                    </span>

                    {/* Animated Arrow */}
                    <ChevronRightIcon className={`
                      h-5 w-5 transition-all duration-300 flex-shrink-0
                      ${active ? 'text-white opacity-100 translate-x-1' : 'text-white/40 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1'}
                    `} />
                  </div>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="
                    absolute left-full ml-4 px-4 py-3 bg-gray-900/95 backdrop-blur-xl
                    text-white text-sm font-medium rounded-xl border border-white/20
                    opacity-0 group-hover/item:opacity-100 transition-all duration-300
                    pointer-events-none whitespace-nowrap z-50
                    shadow-2xl transform -translate-y-1/2
                  ">
                    {item.name}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0 border-r-8 border-r-gray-900/95 border-y-4 border-y-transparent" />
                  </div>
                )}

                {/* Subtle animation particles */}
                {active && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping opacity-60" />
                    <div className="absolute bottom-2 left-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-gradient-to-t from-black/20 to-transparent">
          {!isCollapsed ? (
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group/profile hover:scale-105">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover/profile:shadow-purple-500/25 transition-all duration-300">
                    <span className="text-white text-sm font-bold">JD</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">John Doe</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-white/60">Premium User</p>
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
                  </div>
                </div>
                <ChevronRightIcon className="h-4 w-4 text-white/40 group-hover/profile:text-white/70 transition-colors duration-300" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative group/avatar">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                  <span className="text-white text-sm font-bold">JD</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse" />
              </div>
            </div>
          )}
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-32 right-6 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-purple-600/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-32 left-6 w-24 h-24 bg-gradient-to-br from-emerald-400/5 to-teal-600/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      </aside>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { transform: scaleY(0); opacity: 0; }
          to { transform: scaleY(1); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Sidebar;



// src/components/Sidebar.jsx
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   HomeIcon,
//   UserIcon,
//   ClipboardDocumentListIcon,
//   Bars3Icon,
//   ArrowLeftOnRectangleIcon,
// } from "@heroicons/react/24/outline";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();

//   const menuItems = [
//     { name: "Dashboard", path: "/", icon: HomeIcon },
//     { name: "Profile", path: "/profile", icon: UserIcon },
//     { name: "Tasks", path: "/tasks", icon: ClipboardDocumentListIcon },
//   ];

//   return (
//     <aside
//       className={`${
//         isOpen ? "w-64" : "w-20"
//       } bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-4 transition-all duration-300 flex flex-col justify-between`}
//     >
//       {/* Top Logo & Toggle */}
//       <div>
//         <div className="flex items-center justify-between mb-8">
//           <h2
//             className={`text-2xl font-bold text-blue-400 transition-all duration-300 ${
//               !isOpen && "hidden"
//             }`}
//           >
//             CTM
//           </h2>
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 rounded-md hover:bg-gray-700"
//           >
//             <Bars3Icon className="h-6 w-6" />
//           </button>
//         </div>

//         {/* Menu */}
//         <nav className="space-y-2">
//           {menuItems.map(({ name, path, icon: Icon }) => (
//             <Link
//               key={name}
//               to={path}
//               className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
//                 location.pathname === path
//                   ? "bg-blue-600 text-white"
//                   : "hover:bg-gray-700"
//               }`}
//             >
//               <Icon className="h-6 w-6" />
//               {isOpen && <span>{name}</span>}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Profile Bottom */}
//       <div className="mt-6 border-t border-gray-700 pt-4">
//         <div className="flex items-center space-x-3">
//           <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
//             JD
//           </div>
//           {isOpen && (
//             <div>
//               <p className="font-semibold">John Doe</p>
//               <button className="flex items-center text-sm text-gray-300 hover:text-red-400">
//                 <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-1" />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;





// src/components/Sidebar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { HomeIcon, UserIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

// const Sidebar = () => {
//   return (
//     <aside className="bg-gray-800 text-white w-64 min-h-screen p-4 hidden md:block">
//       <h2 className="text-2xl font-bold mb-8">Menu</h2>
//       <nav className="space-y-4">
//         <Link to="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
//           <HomeIcon className="h-6 w-6" />
//           <span>Dashboard</span>
//         </Link>
//         <Link to="/profile" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
//           <UserIcon className="h-6 w-6" />
//           <span>Profile</span>
//         </Link>
//         <Link to="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
//           <ClipboardDocumentListIcon className="h-6 w-6" />
//           <span>Tasks</span>
//         </Link>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
