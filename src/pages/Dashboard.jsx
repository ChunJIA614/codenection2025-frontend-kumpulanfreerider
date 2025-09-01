import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedMood, setSelectedMood] = useState(null)
  const [userName] = useState('User')
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000) // Update every minute
    return () => clearInterval(timer)
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
        // Could navigate to a counseling page or show modal
        alert('Counseling feature coming soon!')
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back, {userName}!</h1>
            <p className="text-gray-600">How are you feeling today?</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-3xl font-bold text-indigo-600">32°C</span>
              <span className="text-sm text-gray-500">Perfect weather!</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => navigate('/diary')}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mood Calendar */}
      <div className="px-6 mb-8">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Mood Calendar</h2>
          <div className="mb-6">
            <h3 className="text-base font-semibold text-indigo-600 mb-4">August 2023</h3>
            <div className="grid grid-cols-7 gap-2 text-sm text-center mb-4">
              {['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'].map((day, i) => (
                <div key={i} className="font-semibold text-gray-500 p-2">{day}</div>
              ))}
              {['01', '02', '03', '04', '05', '06', '07'].map((date, i) => (
                <div key={i} className="p-2">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-2xl hover:bg-indigo-50 transition-colors cursor-pointer">
                    {i === 0 ? '😊' : i === 1 ? '😊' : i === 2 ? '😊' : i === 3 ? '😤' : '😐'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Streaks */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 text-center shadow-lg border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Current Streak</h3>
            <div className="text-3xl font-bold text-indigo-600 mb-1">4</div>
            <p className="text-xs text-gray-500">days</p>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 text-center shadow-lg border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Longest Streak</h3>
            <div className="text-3xl font-bold text-green-600 mb-1">30</div>
            <p className="text-xs text-gray-500">days</p>
          </div>
        </div>
      </div>

      {/* How do you feel today */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">How do you feel today?</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { emoji: '😔', label: 'Sad', color: 'from-blue-400 to-blue-500', ring: 'ring-blue-400' },
            { emoji: '😠', label: 'Angry', color: 'from-red-400 to-red-500', ring: 'ring-red-400' },
            { emoji: '😐', label: 'Neutral', color: 'from-gray-400 to-gray-500', ring: 'ring-gray-400' },
            { emoji: '😊', label: 'Happy', color: 'from-yellow-400 to-orange-500', ring: 'ring-yellow-400' }
          ].map((mood, i) => (
            <button 
              key={i} 
              onClick={() => handleMoodSelect(mood)}
              className={`bg-white/90 backdrop-blur-xl rounded-3xl p-6 text-center hover:bg-white transition-all transform hover:scale-110 shadow-lg border border-white/20 ${
                selectedMood?.label === mood.label ? `ring-4 ${mood.ring} bg-white shadow-xl` : 'hover:shadow-xl'
              }`}
            >
              <div className="text-4xl mb-3">{mood.emoji}</div>
              <div className="text-sm font-semibold text-gray-700">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Activity Cards */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={() => handleActivityClick('community')}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 text-center hover:bg-white transition-all transform hover:scale-105 shadow-lg border border-white/20 group"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-sm font-bold text-gray-800">Community</div>
            <div className="text-xs text-gray-500 mt-1">Connect & Share</div>
          </button>
          <button 
            onClick={() => handleActivityClick('breathing')}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 text-center hover:bg-white transition-all transform hover:scale-105 shadow-lg border border-white/20 group"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="text-sm font-bold text-gray-800">Breathing</div>
            <div className="text-xs text-gray-500 mt-1">Calm & Relax</div>
          </button>
          <button 
            onClick={() => handleActivityClick('counseling')}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 text-center hover:bg-white transition-all transform hover:scale-105 shadow-lg border border-white/20 group"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="text-sm font-bold text-gray-800">Counseling</div>
            <div className="text-xs text-gray-500 mt-1">Get Support</div>
          </button>
        </div>
      </div>

      {/* Quote of the Day */}
      <div className="px-6 pb-24">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quote of the Day</h2>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <div className="text-3xl">💭</div>
            </div>
            <p className="text-base font-semibold text-gray-800 leading-relaxed">"Every moment is a fresh beginning"</p>
            <p className="text-sm text-gray-500 mt-2">- T.S. Eliot</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
