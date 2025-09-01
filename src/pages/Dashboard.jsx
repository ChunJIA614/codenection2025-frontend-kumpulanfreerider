import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedMood, setSelectedMood] = useState(null)
  const [userName] = useState('User')
  const [weather, setWeather] = useState({
    temperature: 32,
    condition: 'sunny',
    description: 'Perfect weather!',
    humidity: 65,
    windSpeed: 8,
    location: 'Your Campus'
  })
  
  // Weather conditions with animations
  const weatherConditions = {
    sunny: {
      icon: '☀️',
      gradient: 'from-yellow-300 via-orange-300 to-orange-400',
      animation: 'animate-float',
      particles: '🌟',
      particleAnimation: 'animate-pulse',
      description: 'Perfect weather!'
    },
    cloudy: {
      icon: '☁️',
      gradient: 'from-gray-300 via-gray-400 to-gray-500',
      animation: 'animate-float',
      particles: '☁️',
      particleAnimation: 'animate-float',
      description: 'Nice and cool'
    },
    rainy: {
      icon: '🌧️',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      animation: 'animate-bounce',
      particles: '💧',
      particleAnimation: 'animate-rain',
      description: 'Stay cozy inside'
    },
    snowy: {
      icon: '❄️',
      gradient: 'from-blue-100 via-blue-200 to-blue-300',
      animation: 'animate-spin',
      particles: '❄️',
      particleAnimation: 'animate-snow',
      description: 'Winter wonderland'
    },
    windy: {
      icon: '💨',
      gradient: 'from-teal-300 via-cyan-400 to-cyan-500',
      animation: 'animate-pulse',
      particles: '🍃',
      particleAnimation: 'animate-wind',
      description: 'Breezy day'
    },
    thunderstorm: {
      icon: '⛈️',
      gradient: 'from-purple-400 via-indigo-500 to-gray-600',
      animation: 'animate-pulse',
      particles: '⚡',
      particleAnimation: 'animate-pulse',
      description: 'Stay indoors!'
    },
    foggy: {
      icon: '🌫️',
      gradient: 'from-gray-200 via-gray-300 to-gray-400',
      animation: 'animate-float',
      particles: '🌫️',
      particleAnimation: 'animate-float',
      description: 'Misty morning'
    },
    partlyCloudy: {
      icon: '⛅',
      gradient: 'from-yellow-200 via-blue-200 to-blue-300',
      animation: 'animate-float',
      particles: '☁️',
      particleAnimation: 'animate-float',
      description: 'Mixed conditions'
    },
    hot: {
      icon: '🔥',
      gradient: 'from-red-400 via-orange-400 to-yellow-400',
      animation: 'animate-pulse',
      particles: '🔥',
      particleAnimation: 'animate-pulse',
      description: 'Very hot day!'
    }
  }
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000) // Update every minute
    
    // Simulate weather updates (in real app, this would fetch from weather API)
    const weatherTimer = setInterval(() => {
      const conditions = ['sunny', 'cloudy', 'rainy', 'windy', 'thunderstorm', 'foggy', 'partlyCloudy', 'hot', 'snowy']
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
      const randomTemp = Math.floor(Math.random() * 20) + 20 // 20-40°C
      
      setWeather(prev => ({
        ...prev,
        condition: randomCondition,
        temperature: randomTemp,
        description: weatherConditions[randomCondition]?.description || 'Great weather!'
      }))
    }, 30000) // Update every 30 seconds for demo
    
    return () => {
      clearInterval(timer)
      clearInterval(weatherTimer)
    }
  }, [])
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }
  
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    // Navigate to mood tracking page
    navigate('/mood')
  }
  
  const handleActivityClick = (activity) => {
    switch(activity) {
      case 'community':
        navigate('/community')
        break
      case 'breathing':
        navigate('/meditation')
        break
      case 'counseling':
        navigate('/counseling')
        break
    }
  }

  const handleWeatherToggle = () => {
    const conditions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy', 'thunderstorm', 'foggy', 'partlyCloudy', 'hot']
    const currentIndex = conditions.indexOf(weather.condition)
    const nextIndex = (currentIndex + 1) % conditions.length
    const nextCondition = conditions[nextIndex]
    
    setWeather(prev => ({
      ...prev,
      condition: nextCondition,
      temperature: Math.floor(Math.random() * 20) + 20, // Random temp 20-40°C
      description: weatherConditions[nextCondition]?.description || 'Great weather!',
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 15) + 5 // 5-20 km/h
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Custom CSS for weather animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes rain {
          0% { transform: translateY(-20px) translateX(0px); opacity: 1; }
          100% { transform: translateY(100px) translateX(-10px); opacity: 0; }
        }
        @keyframes snow {
          0% { transform: translateY(-20px) translateX(0px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100px) translateX(-20px) rotate(360deg); opacity: 0; }
        }
        @keyframes wind {
          0% { transform: translateX(-20px); opacity: 1; }
          100% { transform: translateX(100px); opacity: 0; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-rain { animation: rain 2s linear infinite; }
        .animate-snow { animation: snow 4s linear infinite; }
        .animate-wind { animation: wind 3s linear infinite; }
      `}</style>
      
      {/* Extended Weather Background Container with gradient transition */}
      <div className="relative overflow-hidden">
        {/* Weather background with gradient overlay */}
        <div className={`bg-gradient-to-br ${weatherConditions[weather.condition]?.gradient} relative`}>
          {/* Very aggressive gradient transition overlay to white */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-10% via-white/60 via-60% to-white opacity-100 pointer-events-none"></div>
          
          {/* Animated Background Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute text-lg opacity-30 ${weatherConditions[weather.condition]?.particleAnimation}`}
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${10 + (i % 4) * 25}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: weather.condition === 'rainy' ? '2s' : 
                                   weather.condition === 'snowy' ? '4s' : 
                                   weather.condition === 'windy' ? '3s' : '3s'
                }}
              >
                {weatherConditions[weather.condition]?.particles}
              </div>
            ))}
          </div>

          {/* Header with Weather */}
          <div className="px-4 py-6 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1 text-gray-800 drop-shadow-lg">Welcome back, {userName}!</h1>
                <div className="flex items-center space-x-4">
                  <div className={`text-4xl ${weatherConditions[weather.condition]?.animation}`}>
                    {weatherConditions[weather.condition]?.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-800 drop-shadow-lg">{weather.temperature}°C</div>
                    <div className="text-sm text-gray-600 font-medium drop-shadow">{weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)}</div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => navigate('/diary')}
                  className="p-3 bg-white/30 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-all shadow-lg border border-white/40"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button 
                  onClick={() => navigate('/profile')}
                  className="p-3 bg-white/30 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-all shadow-lg border border-white/40"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <button
                  onClick={handleWeatherToggle}
                  className="p-3 bg-white/30 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-all shadow-lg border border-white/40"
                  title="Change weather"
                >
                  <span className="text-sm text-gray-700">🔄</span>
                </button>
              </div>
            </div>
          </div>

          {/* This Week's Mood - Half covered by weather background */}
          <div className="px-4 pb-4 relative z-10">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30 overflow-hidden">
              {/* Top half with weather background */}
              <div className="p-4 pb-2">
                <h2 className="text-lg font-bold text-gray-800 mb-3">This Week's Mood</h2>
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-blue-600 mb-3">
                    Week of {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(currentDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </h3>
                  <div className="grid grid-cols-7 gap-1 text-sm text-center mb-3">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, i) => (
                      <div key={i} className="font-semibold text-gray-500 p-1">{day}</div>
                    ))}
                    {[
                      { date: '26', mood: '😊' },
                      { date: '27', mood: '😊' },
                      { date: '28', mood: '😐' },
                      { date: '29', mood: '😤' },
                      { date: '30', mood: '😊' },
                      { date: '31', mood: '😔' },
                      { date: '01', mood: '😊', isToday: true }
                    ].map((day, i) => (
                      <div key={i} className="p-1">
                        <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer relative ${
                          day.isToday ? 'bg-blue-100 ring-2 ring-blue-300' : ''
                        }`}>
                          <span className="text-xs font-medium text-gray-700 mb-0.5">{day.date}</span>
                          <span className="text-sm">{day.mood}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Bottom half with normal white background */}
              <div className="bg-white px-4 pb-4">
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">4</div>
                    <div className="text-xs text-gray-600">Current Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">30</div>
                    <div className="text-xs text-gray-600">Longest Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How do you feel today */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">How do you feel today?</h2>
        <div className="grid grid-cols-4 gap-3">
          {[
            { emoji: '😔', label: 'Sad' },
            { emoji: '😠', label: 'Angry' },
            { emoji: '😐', label: 'Neutral' },
            { emoji: '😊', label: 'Happy' }
          ].map((mood, i) => (
            <button 
              key={i} 
              onClick={() => handleMoodSelect(mood)}
              className={`bg-white/95 backdrop-blur-xl rounded-2xl p-4 text-center hover:bg-white transition-all transform hover:scale-105 shadow-lg border border-gray-100 ${
                selectedMood?.label === mood.label ? 'ring-4 ring-blue-300 bg-white shadow-xl' : ''
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="text-xs font-semibold text-gray-700">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => handleActivityClick('community')}
            className="bg-green-500 rounded-2xl p-4 text-center text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-sm font-bold">Community</div>
          </button>
          <button 
            onClick={() => handleActivityClick('breathing')}
            className="bg-blue-500 rounded-2xl p-4 text-center text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="text-sm font-bold">Breathing</div>
          </button>
          <button 
            onClick={() => handleActivityClick('counseling')}
            className="bg-purple-500 rounded-2xl p-4 text-center text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="text-sm font-bold">Counseling</div>
          </button>
        </div>
      </div>

      {/* Quote of the Day */}
      <div className="px-4 pb-24">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-lg text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quote of the Day</h2>
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <div className="text-3xl">💭</div>
          </div>
          <p className="text-base font-semibold text-gray-800 leading-relaxed mb-2">"90% of Gamblers Quit Before They Win Big"</p>
          <p className="text-sm text-gray-500">- Anonymous</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
