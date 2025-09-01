import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HomeIcon, ChartIcon, BookIcon, HeartIcon, UsersIcon } from './Icons'

const Layout = ({ children }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/mood', icon: ChartIcon, label: 'Mood' },
    { path: '/diary', icon: BookIcon, label: 'Diary' },
    { path: '/meditation', icon: HeartIcon, label: 'Meditation' },
    { path: '/community', icon: UsersIcon, label: 'Community' },
  ]

  return (
    <div className="flex flex-col h-screen">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-2 bg-white text-black text-sm font-medium">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-neutral-300 rounded-full"></div>
          </div>
          <svg className="w-4 h-4 ml-1" fill="black" viewBox="0 0 24 24">
            <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48L6.3 12c-.04-.33-.04-.67 0-1l-1.45-.95L4 8.57l.85-1.48L6.3 8c.18-.3.4-.57.65-.81L6.5 5.5l1.73-1 .45.77c.33-.07.67-.07 1 0l.45-.77 1.73 1-.45.77c.25.24.47.51.65.81l1.45.95L14 8.57l-.85 1.48L11.7 11c.04.33.04.67 0 1l1.45.95L14 14.43l-.85 1.48L11.7 15c-.18.3-.4.57-.65.81l.45.77-1.73 1-.45-.77c-.33.07-.67.07-1 0l-.45.77-1.73-1 .45-.77c-.25-.24-.47-.51-.65-.81l-1.45-.95z"/>
          </svg>
          <svg className="w-4 h-4" fill="black" viewBox="0 0 24 24">
            <path d="M2 16h6v2H2v-2zm0-5h9v2H2v-2zm0-5h12v2H2V6zm18 5.5v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zm-1 0h-2v-1c0-.55.45-1 1-1s1 .45 1 1v1z"/>
          </svg>
          <div className="ml-1">
            <svg className="w-6 h-3" fill="black" viewBox="0 0 24 12">
              <rect x="0" y="3" width="18" height="6" rx="3"/>
              <rect x="20" y="5" width="2" height="2"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 px-6 py-3 shadow-2xl">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const IconComponent = item.icon
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-300 transform ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 hover:scale-105'
                }`}
              >
                <IconComponent 
                  className="w-6 h-6 mb-1"
                  filled={isActive}
                />
                <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 bg-white rounded-full mt-1"></div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Layout
