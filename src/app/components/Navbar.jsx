"use client";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

const menuItems = [
  { id: 1, name: "HOME" },
  { id: 2, name: "CRM" },
  { id: 3, name: "UTILITIES" },
  { 
    id: 4, 
    name: "INSURANCE",
    hasDropdown: true,
    items: ["Life Insurance", "Health Insurance", "Auto Insurance", "Home Insurance"]
  },
  { 
    id: 5, 
    name: "ASSETS",
    hasDropdown: true,
    items: ["Real Estate", "Stocks", "Bonds", "Commodities"]
  },
  { id: 6, name: "MUTUAL" },
  { id: 7, name: "RESEARCH" },
  { id: 8, name: "TRANSACT ONLINE" },
  { id: 9, name: "GOAL GPS" },
  { id: 10, name: "FINANCIAL PLANNING" },
  { id: 11, name: "WEALTH REPORT" },
  { 
    id: 12, 
    name: "OTHER",
    hasDropdown: true,
    items: ["Settings", "Help & Support", "About Us", "Contact"]
  }
];

// SVG Icons data - Using actual SVGs from the icons folder
const navIcons = [
  { 
    id: 1, 
    path: '/icons/IcBaselineVideoSettings.svg', 
    alt: 'Video Settings',
    title: 'Video Settings'
  },
  { 
    id: 2, 
    path: '/icons/LineMdStar.svg', 
    alt: 'Starred',
    title: 'Starred Items'
  },
  { 
    id: 3, 
    path: '/icons/MajesticonsLightBulbLine.svg', 
    alt: 'Ideas',
    title: 'Ideas & Insights'
  },
  { 
    id: 4, 
    path: '/icons/MaterialSymbolsDeployedCodeAccountOutline.svg', 
    alt: 'Account',
    title: 'Account Settings'
  },
  { 
    id: 5, 
    path: '/icons/MaterialSymbolsLightSettingsOutline.svg', 
    alt: 'Settings',
    title: 'Settings'
  },
  { 
    id: 6, 
    path: '/icons/MaterialSymbolsLockOutline.svg', 
    alt: 'Security',
    title: 'Security Settings'
  },
  { 
    id: 7, 
    path: '/icons/MaterialSymbolsStylusPenRounded.svg', 
    alt: 'Edit',
    title: 'Edit Profile'
  },
  { 
    id: 8, 
    path: '/icons/StreamlineDecentWorkAndEconomicGrowth.svg', 
    alt: 'Growth',
    title: 'Growth & Performance'
  },
  { 
    id: 9, 
    path: '/icons/TablerTool.svg', 
    alt: 'Tools',
    title: 'Tools'
  },
  { 
    id: 10, 
    path: '/icons/TdesignEducation.svg', 
    alt: 'Education',
    title: 'Education Center'
  },
  { 
    id: 11, 
    path: '/icons/icon1.svg', 
    alt: 'Notifications',
    title: 'Notifications'
  }
];

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState(null);
  return (
    <header className="sticky top-0 z-40 shadow-soft">
      {/* Top bar with logo, search, and controls */}
      <div className="bg-white dark:bg-[var(--card)] border-b border-slate-200/40 dark:border-white/10 relative z-40">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
          {/* Logo - Made even bigger */}
          <div className="flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="Wealth Elite" 
              width={200} 
              height={50}
              className="h-12 w-auto"
              priority
            />
          </div>
          
          {/* Search bar - moved to left */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg 
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
          
          {/* Icons with theme-aware SVGs and bottom tooltips */}
          <div className="hidden md:flex items-center gap-1 ml-4">
            {navIcons.map((icon) => (
              <div key={icon.id} className="relative group">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={icon.alt}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Image 
                      src={icon.path} 
                      alt={icon.alt}
                      width={20}
                      height={20}
                      className="w-full h-full object-contain dark:invert opacity-80 hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </div>
                </button>
                {/* Tooltip - Always at bottom */}
                <div className="absolute z-50 left-1/2 transform -translate-x-1/2 mt-2 w-max">
                  <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                    {icon.title}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Theme Toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>
            
            {/* Logout Button */}
            <button 
              className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Logout"
            >
              <svg 
                className="w-5 h-5 text-gray-700 dark:text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Red strip menu - Made more compact */}
      <nav className="bg-red-600 text-white text-xs">
        <div className="mx-auto max-w-7xl px-4 flex gap-1 py-1.5 overflow-visible relative z-40">
          {menuItems.map((item) => (
            <div 
              className={`relative ${item.hasDropdown ? 'pr-4' : ''}`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button 
                className={`px-3 py-1.5 rounded hover:bg-red-700 transition-colors flex items-center whitespace-nowrap ${item.hasDropdown ? 'pr-2' : ''}`}
              >
                {item.name}
                {item.hasDropdown && (
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
              
              {item.hasDropdown && hoveredItem === item.id && (
                <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-gray-800 rounded-b-md shadow-xl py-1 z-[60] border border-gray-200 dark:border-gray-700">
                  {item.items.map((subItem, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}
