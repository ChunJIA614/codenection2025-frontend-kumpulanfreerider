import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MoodTracking = () => {
  const navigate = useNavigate()
  const [selectedMood, setSelectedMood] = useState('😊')
  const [shareText, setShareText] = useState('')
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [currentMoodIndex, setCurrentMoodIndex] = useState(0)

  const moodOptions = [
    { id: 'excited', emoji: '😊', label: 'Excited' },
    { id: 'drooping', emoji: '😔', label: 'Drooping' },
    { id: 'jealous', emoji: '😤', label: 'Jealous' },
    { id: 'speechless', emoji: '😶', label: 'Speechless' },
    { id: 'curious', emoji: '🤔', label: 'Curious' },
    { id: 'nervous', emoji: '😰', label: 'Nervous' },
    { id: 'frustrated', emoji: '😣', label: 'Frustrated' },
    { id: 'cool', emoji: '😎', label: 'Cool' },
  ]

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.emoji)
    // Update the carousel index to match the selected mood
    const moodIndex = moodOptions.findIndex(m => m.emoji === mood.emoji)
    setCurrentMoodIndex(moodIndex)
  }

  const handlePrevMood = () => {
    const newIndex = currentMoodIndex > 0 ? currentMoodIndex - 1 : moodOptions.length - 1
    setCurrentMoodIndex(newIndex)
    setSelectedMood(moodOptions[newIndex].emoji)
  }

  const handleNextMood = () => {
    const newIndex = currentMoodIndex < moodOptions.length - 1 ? currentMoodIndex + 1 : 0
    setCurrentMoodIndex(newIndex)
    setSelectedMood(moodOptions[newIndex].emoji)
  }

  const getCurrentMoodData = () => {
    return moodOptions[currentMoodIndex]
  }

  const getPrevMoodData = () => {
    const prevIndex = currentMoodIndex > 0 ? currentMoodIndex - 1 : moodOptions.length - 1
    return moodOptions[prevIndex]
  }

  const getNextMoodData = () => {
    const nextIndex = currentMoodIndex < moodOptions.length - 1 ? currentMoodIndex + 1 : 0
    return moodOptions[nextIndex]
  }

  const handleDone = () => {
    // Save mood data
    const moodData = {
      mood: selectedMood,
      text: shareText,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    }
    
    // Save to localStorage as diary entry
    const today = new Date().getDate()
    localStorage.setItem(`diary-${today}`, JSON.stringify({
      mood: selectedMood,
      note: shareText,
      date: today,
      timestamp: Date.now()
    }))
    
    // Show share dialog
    setShowShareDialog(true)
  }

  const handleShareToCommunity = () => {
    // Get existing community posts from localStorage or create empty array
    const existingPosts = JSON.parse(localStorage.getItem('communityPosts') || '[]')
    
    // Create new post from mood entry
    const newPost = {
      id: Date.now(),
      user: {
        name: 'You',
        avatar: '👤',
        verified: false
      },
      content: shareText,
      time: 'now',
      likes: 0,
      comments: 0,
      category: 'diary',
      isLiked: false,
      mood: selectedMood,
      hasImage: false,
      image: null
    }
    
    // Add new post to the beginning of the array
    const updatedPosts = [newPost, ...existingPosts]
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts))
    
    setShowShareDialog(false)
    
    // Navigate to community page to see the shared post
    navigate('/community')
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button onClick={handleBack} className="p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:bg-white transition-all shadow-lg transform hover:scale-105">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Today's Mood</h1>
              <p className="text-sm sm:text-base text-gray-600">How are you feeling right now?</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button className="p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:bg-white transition-all shadow-lg transform hover:scale-105">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button className="p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:bg-white transition-all shadow-lg transform hover:scale-105">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Large mood display with carousel */}
      <div className="px-4 sm:px-6 mb-8 sm:mb-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-white/20">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button 
                onClick={handlePrevMood}
                className="p-2 hover:bg-indigo-50 rounded-full transition-colors transform hover:scale-110 active:scale-95"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex space-x-2 sm:space-x-4 items-center">
                {/* Previous Mood */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl sm:rounded-3xl flex items-center justify-center text-2xl sm:text-4xl shadow-md opacity-60 transform scale-75 transition-all">
                  {getPrevMoodData().emoji}
                </div>
                
                {/* Current Mood */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl sm:rounded-3xl flex items-center justify-center text-4xl sm:text-5xl border-4 border-white shadow-xl transform scale-110 transition-all duration-300">
                  {getCurrentMoodData().emoji}
                </div>
                
                {/* Next Mood */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl sm:rounded-3xl flex items-center justify-center text-2xl sm:text-4xl shadow-md opacity-60 transform scale-75 transition-all">
                  {getNextMoodData().emoji}
                </div>
              </div>
              
              <button 
                onClick={handleNextMood}
                className="p-2 hover:bg-indigo-50 rounded-full transition-colors transform hover:scale-110 active:scale-95"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{getCurrentMoodData().label}</h2>
            <p className="text-sm sm:text-base text-gray-600">Share your current mood with us</p>
          </div>

          {/* Mood Indicator Dots */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
            {moodOptions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentMoodIndex(index)
                  setSelectedMood(moodOptions[index].emoji)
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentMoodIndex 
                    ? 'bg-indigo-500 scale-125' 
                    : 'bg-gray-300 hover:bg-indigo-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mood Grid */}
      <div className="px-4 sm:px-6 mb-8 sm:mb-10">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Choose your mood</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {moodOptions.map((mood, index) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood)}
              className={`bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col items-center hover:bg-white transition-all shadow-lg border border-white/20 transform hover:scale-105 ${
                index === currentMoodIndex ? 'ring-4 ring-indigo-400 bg-white shadow-xl scale-105' : 'hover:shadow-xl'
              }`}
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{mood.emoji}</div>
              <div className="text-xs sm:text-sm font-bold text-gray-700">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Share Section */}
      <div className="px-4 sm:px-6 mb-8 sm:mb-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-white/20">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Share with us!</h3>
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-100">
            <input 
              type="text" 
              placeholder="Type something..." 
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              className="w-full bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm sm:text-base"
            />
          </div>
          
          {/* Add Photos Section */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-sm sm:text-base font-bold text-gray-700 mb-3 sm:mb-4">Add some photos?</h4>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[1, 2, 3].map((i) => (
                <button key={i} className="aspect-square bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-dashed border-indigo-300 hover:from-indigo-100 hover:to-purple-100 transition-all transform hover:scale-105">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleDone}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            Done!
          </button>
        </div>
      </div>

      {/* Share to Community Dialog */}
      {showShareDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">{selectedMood}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Share your mood to community?</h3>
              <p className="text-sm text-gray-600">Your mood entry will be shared anonymously to help others who might be going through similar experiences.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-700 line-clamp-3">{shareText || 'No description provided'}</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowShareDialog(false)
                  navigate('/')
                }}
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
              >
                Keep Private
              </button>
              <button
                onClick={handleShareToCommunity}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all shadow-lg"
              >
                Share to Community
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MoodTracking
