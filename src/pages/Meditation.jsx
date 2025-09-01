import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Meditation = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isPlaying, setIsPlaying] = useState(null) // Track which session is playing
  
  const categories = [
    { name: 'All', emoji: '🔮' },
    { name: 'Breathing', emoji: '🫁' },
    { name: 'Balanced', emoji: '⚖️' },
    { name: 'Focus', emoji: '🎯' },
    { name: 'Foundation', emoji: '❤️' }
  ]
  
  const sessions = [
    {
      id: 1,
      title: 'Inner Stillness',
      description: 'Learn inner calm of mind, emotional stillness, and find balance in uncertainty.',
      duration: '10 mins',
      emoji: '🧘‍♀️',
      bgColor: 'bg-green-200',
      accentColor: 'bg-green-300'
    },
    {
      id: 2,
      title: 'Steady Flow',
      description: 'Move through a sequence of mindfulness, and fall into an enhanced meditative rhythm.',
      duration: '3 mins',
      emoji: '🌊',
      bgColor: 'bg-blue-200',
      accentColor: 'bg-blue-300'
    }
  ]
  
  const handlePlay = (sessionId) => {
    if (isPlaying === sessionId) {
      setIsPlaying(null) // Pause if already playing
    } else {
      setIsPlaying(sessionId) // Play this session
      // Here you could start actual audio playback
      console.log(`Playing session ${sessionId}`)
    }
  }
  
  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Meditation</h1>
          <p className="text-gray-600">Find your inner peace and balance</p>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
          <div className="flex overflow-x-auto space-x-4 pb-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all transform hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md'
                }`}
              >
                <span className="text-lg">{category.emoji}</span>
                <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Meditation Sessions */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Sessions</h2>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">{session.emoji}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{session.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-indigo-600">{session.duration}</span>
                    <button 
                      onClick={() => handlePlay(session.id)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                      {isPlaying === session.id ? (
                        <>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium">Pause</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium">Play</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Meditations */}
      <div className="px-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recommended for You</h2>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <span className="text-xl">🌟</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">Daily Mindfulness</h3>
              <p className="text-sm text-gray-600">Start your day with clarity</p>
            </div>
            <span className="text-sm font-medium text-indigo-600">5 mins</span>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <span className="text-xl">🌙</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">Sleep Stories</h3>
              <p className="text-sm text-gray-600">Peaceful bedtime meditation</p>
            </div>
            <span className="text-sm font-medium text-indigo-600">15 mins</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <span className="text-xl">🌸</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">Anxiety Relief</h3>
              <p className="text-sm text-gray-600">Calm your worried mind</p>
            </div>
            <span className="text-sm font-medium text-indigo-600">8 mins</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Meditation
