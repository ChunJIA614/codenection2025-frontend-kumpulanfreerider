import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MoodTracking = () => {
  const navigate = useNavigate()
  const [selectedMood, setSelectedMood] = useState('😊')
  const [shareText, setShareText] = useState('')
  const [showSadModal, setShowSadModal] = useState(false)

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
    if (mood.id === 'drooping') {
      setShowSadModal(true)
    }
  }

  const handleDone = () => {
    // Save mood data
    const moodData = {
      mood: selectedMood,
      text: shareText,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    }
    
    // You could save to localStorage or send to API
    localStorage.setItem('todayMood', JSON.stringify(moodData))
    
    // Navigate back to dashboard
    navigate('/')
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={handleBack} className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white transition-all shadow-lg transform hover:scale-105">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Today's Mood</h1>
              <p className="text-gray-600">How are you feeling right now?</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white transition-all shadow-lg transform hover:scale-105">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white transition-all shadow-lg transform hover:scale-105">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Large mood display with carousel */}
      <div className="px-6 mb-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/20">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-6">
              <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center text-4xl shadow-md">😊</div>
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-3xl flex items-center justify-center text-5xl border-4 border-white shadow-xl transform scale-110">{selectedMood}</div>
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center text-4xl shadow-md">😊</div>
              </div>
              <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">What's happening?</h2>
            <p className="text-gray-600">Share your current mood with us</p>
          </div>
        </div>
      </div>

      {/* Mood Grid */}
      <div className="px-6 mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Choose your mood</h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {moodOptions.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood)}
              className={`bg-white/90 backdrop-blur-xl rounded-3xl p-6 flex flex-col items-center hover:bg-white transition-all shadow-lg border border-white/20 transform hover:scale-110 ${
                selectedMood === mood.emoji ? 'ring-4 ring-indigo-400 bg-white shadow-xl scale-105' : 'hover:shadow-xl'
              }`}
            >
              <div className="text-4xl mb-3">{mood.emoji}</div>
              <div className="text-xs font-bold text-gray-700">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Share Section */}
      <div className="px-6 mb-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Share with us!</h3>
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
            <input 
              type="text" 
              placeholder="Type something..." 
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              className="w-full bg-transparent text-gray-600 placeholder-gray-400 outline-none text-base"
            />
          </div>
          
          {/* Add Photos Section */}
          <div className="mb-6">
            <h4 className="text-base font-bold text-gray-700 mb-4">Add some photos?</h4>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <button key={i} className="aspect-square bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-indigo-300 hover:from-indigo-100 hover:to-purple-100 transition-all transform hover:scale-105">
                  <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleDone}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-2xl font-bold hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Done!
          </button>
        </div>
      </div>

      {/* Sad mood popup overlay */}
      {showSadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-6 z-50">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-white/20">
            <div className="flex justify-between items-start mb-6">
              <div className="text-5xl">😔</div>
              <button 
                onClick={() => setShowSadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sad....</h3>
            <p className="text-base text-gray-700 mb-6">I hope you feel better</p>
            
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-base font-bold text-gray-700">Your Diary</span>
                <button className="ml-auto">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">Lorem ipsum dolor amet, consectetur adipiscing elit. Nam quis tempor felis nulla mauris vitae commodo mauris massa, eget cursus varius dolor, pulvinar posuere lorem ipsum....</p>
            </div>

            <div>
              <h4 className="text-base font-bold text-gray-700 mb-4">Photos</h4>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MoodTracking
