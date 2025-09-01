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
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2 shadow-2xl">
        <div className="flex max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const IconComponent = item.icon
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-1 flex flex-col items-center py-2 px-1 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <IconComponent 
                  className="w-5 h-5 mb-1"
                  filled={isActive}
                />
                <span className={`text-xs font-medium leading-tight ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 bg-white rounded-full mt-0.5"></div>
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
