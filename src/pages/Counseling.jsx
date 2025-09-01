import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Counseling = () => {
  const navigate = useNavigate()
  
  // Counselors data
  const [counselors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      gender: 'Female',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Depression', 'Academic Stress', 'Social Anxiety'],
      experience: '8 years',
      rating: 4.9,
      avatar: '👩‍⚕️',
      languages: ['English', 'Mandarin'],
      availability: 'Mon-Fri: 9AM-5PM',
      nextAvailable: '2025-09-02 10:00 AM',
      isOnline: true
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      gender: 'Male',
      title: 'Mental Health Counselor',
      specialties: ['ADHD', 'Academic Performance', 'Relationship Issues', 'Self-Esteem'],
      experience: '6 years',
      rating: 4.8,
      avatar: '👨‍⚕️',
      languages: ['English', 'Spanish'],
      availability: 'Mon-Thu: 10AM-6PM',
      nextAvailable: '2025-09-02 2:00 PM',
      isOnline: false
    },
    {
      id: 3,
      name: 'Dr. Emma Thompson',
      gender: 'Female',
      title: 'Student Wellness Specialist',
      specialties: ['Eating Disorders', 'Body Image', 'Trauma', 'PTSD'],
      experience: '10 years',
      rating: 4.9,
      avatar: '👩‍💼',
      languages: ['English', 'French'],
      availability: 'Tue-Sat: 8AM-4PM',
      nextAvailable: '2025-09-03 9:00 AM',
      isOnline: true
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      gender: 'Male',
      title: 'Crisis Intervention Specialist',
      specialties: ['Crisis Support', 'Grief Counseling', 'Family Issues', 'Substance Abuse'],
      experience: '12 years',
      rating: 4.7,
      avatar: '👨‍💼',
      languages: ['English'],
      availability: '24/7 Emergency Support',
      nextAvailable: 'Available Now',
      isOnline: true
    }
  ])

  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const [appointmentType, setAppointmentType] = useState('chat') // 'chat' or 'physical'
  const [filterGender, setFilterGender] = useState('all')
  const [filterSpecialty, setFilterSpecialty] = useState('all')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [activeTab, setActiveTab] = useState('counselors') // 'counselors', 'appointments', 'resources'
  const [myAppointments, setMyAppointments] = useState([
    {
      id: 1,
      counselor: 'Dr. Sarah Chen',
      date: '2025-09-03',
      time: '10:00 AM',
      type: 'Physical',
      status: 'Confirmed'
    },
    {
      id: 2,
      counselor: 'Dr. Emma Thompson',
      date: '2025-09-05',
      time: '2:00 PM',
      type: 'Online',
      status: 'Pending'
    }
  ])
  
  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    reason: '',
    urgency: 'medium',
    isFirstTime: false
  })

  const specialties = ['All', 'Anxiety', 'Depression', 'Academic Stress', 'ADHD', 'Relationship Issues', 'Eating Disorders', 'Trauma', 'Crisis Support']

  const filteredCounselors = counselors.filter(counselor => {
    const genderMatch = filterGender === 'all' || counselor.gender.toLowerCase() === filterGender
    const specialtyMatch = filterSpecialty === 'all' || counselor.specialties.some(s => s.toLowerCase().includes(filterSpecialty.toLowerCase()))
    return genderMatch && specialtyMatch
  })

  const handleBookAppointment = (counselor) => {
    setSelectedCounselor(counselor)
    setAppointmentType('physical')
    setShowBookingModal(true)
  }

  const handleStartChat = (counselor) => {
    setSelectedCounselor(counselor)
    setShowChatModal(true)
    // Initialize with a welcome message
    setChatMessages([
      {
        id: 1,
        sender: 'counselor',
        message: `Hello! I'm ${counselor.name}. How can I help you today?`,
        timestamp: new Date().toLocaleTimeString()
      }
    ])
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'student',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString()
      }
      setChatMessages([...chatMessages, message])
      setNewMessage('')
      
      // Simulate counselor response after 2 seconds
      setTimeout(() => {
        const response = {
          id: chatMessages.length + 2,
          sender: 'counselor',
          message: "I understand. That sounds challenging. Can you tell me more about what you're experiencing?",
          timestamp: new Date().toLocaleTimeString()
        }
        setChatMessages(prev => [...prev, response])
      }, 2000)
    }
  }

  const handleSubmitBooking = () => {
    // Here you would typically send the booking data to your backend
    alert(`Appointment booked with ${selectedCounselor.name} for ${bookingForm.date} at ${bookingForm.time}`)
    setShowBookingModal(false)
    setBookingForm({ date: '', time: '', reason: '', urgency: 'medium', isFirstTime: false })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center mb-4 sm:mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 sm:mr-4 p-2 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all shadow-lg"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2 truncate">University Counseling</h1>
            <p className="text-sm sm:text-base text-gray-600">Connect with professional counselors for support</p>
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl sm:rounded-full flex items-center justify-center shadow-lg ml-3 sm:ml-0">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
            </svg>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-lg border border-white/20 mb-4 sm:mb-6">
          <div className="flex space-x-1 sm:space-x-2">
            {[
              { id: 'counselors', label: 'Find Counselors', icon: '👩‍⚕️' },
              { id: 'appointments', label: 'My Appointments', icon: '📅' },
              { id: 'resources', label: 'Resources', icon: '📚' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-1 sm:mr-2 text-sm sm:text-base">{tab.icon}</span>
                <span className="font-medium text-xs sm:text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-xl mb-4 sm:mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-2 sm:ml-3">
              <p className="text-xs sm:text-sm text-red-700">
                <strong>Crisis Support:</strong> If you're in immediate danger, call 911 or campus security at (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {activeTab === 'counselors' && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button 
              onClick={() => {
                // Find the first available counselor for crisis support
                const crisisCounselor = counselors.find(c => c.specialties.includes('Crisis Support'))
                if (crisisCounselor) {
                  handleStartChat(crisisCounselor)
                }
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="flex items-center justify-center mb-1 sm:mb-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm sm:text-base">Crisis Support</span>
              </div>
              <div className="text-xs sm:text-sm opacity-90">24/7 Emergency Help</div>
            </button>
            <button 
              onClick={() => {
                // Find the first available online counselor
                const onlineCounselor = counselors.find(c => c.isOnline)
                if (onlineCounselor) {
                  handleStartChat(onlineCounselor)
                }
              }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="flex items-center justify-center mb-1 sm:mb-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm sm:text-base">Quick Chat</span>
              </div>
              <div className="text-xs sm:text-sm opacity-90">Anonymous Support</div>
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      {activeTab === 'counselors' && (
        <div className="px-4 sm:px-6 mb-4 sm:mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-white/20">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Find the Right Counselor
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender Preference</label>
                <div className="flex space-x-2">
                  {['all', 'female', 'male'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setFilterGender(gender)}
                      className={`px-3 sm:px-4 py-2 rounded-xl transition-all text-sm ${
                        filterGender === gender
                          ? 'bg-indigo-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <select
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty.toLowerCase()}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="px-4 sm:px-6">
        {activeTab === 'counselors' && (
          <div className="space-y-3 sm:space-y-4">
            {filteredCounselors.map((counselor) => (
              <div key={counselor.id} className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="relative flex-shrink-0">
                    <div className="text-3xl sm:text-4xl bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl sm:rounded-2xl p-2 sm:p-3">
                      {counselor.avatar}
                    </div>
                    {counselor.isOnline && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center truncate">
                          <span className="truncate">{counselor.name}</span>
                          {counselor.gender === 'Female' && (
                            <span className="ml-2 px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded-full flex-shrink-0">Female</span>
                          )}
                          {counselor.gender === 'Male' && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full flex-shrink-0">Male</span>
                          )}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">{counselor.title}</p>
                        <p className="text-xs text-gray-500">{counselor.experience} experience</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1 ml-2">
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                          <span className="text-yellow-500 text-xs">⭐</span>
                          <span className="text-xs font-medium ml-1 text-yellow-700">{counselor.rating}</span>
                        </div>
                        {counselor.isOnline && (
                          <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                            <span className="text-xs font-medium text-green-700">Online</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">Specialties:</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {counselor.specialties.map((specialty, index) => (
                          <span key={index} className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs rounded-full border border-blue-200 font-medium">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3 sm:mb-4 bg-gray-50 rounded-xl p-2 sm:p-3">
                      <div className="grid grid-cols-1 gap-1 sm:gap-2 text-xs sm:text-sm">
                        <div className="flex items-center text-gray-600">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                          </svg>
                          <span className="truncate">Languages: {counselor.languages.join(', ')}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="truncate">{counselor.availability}</span>
                        </div>
                        <div className="flex items-center text-green-600 font-medium">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="truncate">Next available: {counselor.nextAvailable}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 sm:space-x-3">
                      <button
                        onClick={() => handleBookAppointment(counselor)}
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center text-xs sm:text-sm"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book Appointment
                      </button>
                      
                      {counselor.isOnline ? (
                        <button
                          onClick={() => handleStartChat(counselor)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center text-xs sm:text-sm"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Chat Now
                        </button>
                      ) : (
                        <button
                          disabled
                          className="flex-1 bg-gray-300 text-gray-500 py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center cursor-not-allowed text-xs sm:text-sm"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636" />
                          </svg>
                          Offline
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                My Appointments
              </h3>
              
              {myAppointments.length > 0 ? (
                <div className="space-y-3">
                  {myAppointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">{appointment.counselor}</h4>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {appointment.date} at {appointment.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {appointment.type}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {appointment.status}
                          </span>
                          <div className="mt-2 space-x-2">
                            <button className="text-sm text-indigo-600 hover:text-indigo-800">Reschedule</button>
                            <button className="text-sm text-red-600 hover:text-red-800">Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>No appointments scheduled</p>
                  <button 
                    onClick={() => setActiveTab('counselors')}
                    className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Book your first appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-white/20">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Mental Health Resources
              </h3>
              
              <div className="grid gap-3 sm:gap-4">
                {[
                  {
                    title: "Crisis Hotlines",
                    items: [
                      "National Suicide Prevention Lifeline: 988",
                      "Crisis Text Line: Text HOME to 741741",
                      "Campus Security: (555) 123-4567"
                    ],
                    icon: "🚨"
                  },
                  {
                    title: "Self-Help Resources",
                    items: [
                      "Mindfulness and Meditation Apps",
                      "Stress Management Techniques",
                      "Academic Success Strategies"
                    ],
                    icon: "🧘"
                  },
                  {
                    title: "Support Groups",
                    items: [
                      "Anxiety Support Group - Tuesdays 3PM",
                      "Depression Support Group - Thursdays 2PM",
                      "Academic Stress Workshop - Fridays 1PM"
                    ],
                    icon: "👥"
                  },
                  {
                    title: "Campus Resources",
                    items: [
                      "Student Health Center",
                      "Disability Services",
                      "Academic Advising"
                    ],
                    icon: "🏫"
                  }
                ].map((resource, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start">
                      <div className="text-lg sm:text-2xl mr-2 sm:mr-3 flex-shrink-0">{resource.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">{resource.title}</h4>
                        <ul className="space-y-1">
                          {resource.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-xs sm:text-sm text-gray-600 flex items-start">
                              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 mt-1 mr-1.5 sm:mr-2 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="break-words">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 w-full sm:max-w-md shadow-2xl max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Book Appointment</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-xl"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Counselor</label>
                <p className="text-gray-800 font-semibold text-sm sm:text-base">{selectedCounselor?.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                <select
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                <textarea
                  value={bookingForm.reason}
                  onChange={(e) => setBookingForm({...bookingForm, reason: e.target.value})}
                  placeholder="Brief description of what you'd like to discuss..."
                  rows="3"
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
                <select
                  value={bookingForm.urgency}
                  onChange={(e) => setBookingForm({...bookingForm, urgency: e.target.value})}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                >
                  <option value="low">Low - Routine check-in</option>
                  <option value="medium">Medium - General support needed</option>
                  <option value="high">High - Urgent support needed</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="firstTime"
                  checked={bookingForm.isFirstTime}
                  onChange={(e) => setBookingForm({...bookingForm, isFirstTime: e.target.checked})}
                  className="mr-2 w-4 h-4 sm:w-5 sm:h-5"
                />
                <label htmlFor="firstTime" className="text-sm text-gray-700">
                  This is my first time visiting counseling services
                </label>
              </div>

              <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitBooking}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md h-[90vh] sm:h-96 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="text-lg sm:text-2xl">{selectedCounselor?.avatar}</div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">{selectedCounselor?.name}</h3>
                  <p className="text-xs sm:text-sm text-green-600">Online</p>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-xl"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-xs px-3 sm:px-4 py-2 rounded-2xl ${
                      message.sender === 'student'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 sm:p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-indigo-500 text-white p-2 sm:p-3 rounded-xl hover:bg-indigo-600 transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Counseling
