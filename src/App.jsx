import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import MoodTracking from './pages/MoodTracking'
import Diary from './pages/Diary'
import Meditation from './pages/Meditation'
import Community from './pages/Community'
import Profile from './pages/Profile'
import Counseling from './pages/Counseling'

function App() {
  // Global state management
  const [user, setUser] = useState({
    name: 'Alex',
    avatar: null,
    joinDate: new Date('2024-01-15')
  })

  const [moods, setMoods] = useState([
    { id: 1, date: '2025-08-02', mood: 'happy', emoji: '😊', note: 'Great day at work!' },
    { id: 2, date: '2025-08-03', mood: 'sad', emoji: '😔', note: 'Feeling a bit down' },
    { id: 3, date: '2025-08-04', mood: 'happy', emoji: '😊', note: 'Had a wonderful time with friends' },
    { id: 4, date: '2025-08-05', mood: 'neutral', emoji: '😐', note: 'Regular day' },
  ])

  const [diaryEntries, setDiaryEntries] = useState([
    {
      id: 1,
      date: '2025-08-02',
      title: 'A Great Start',
      content: 'Today was amazing! I started my morning with meditation and felt so peaceful throughout the day.',
      mood: 'happy',
      tags: ['gratitude', 'productivity']
    },
    {
      id: 2,
      date: '2025-08-01',
      title: 'Reflection Time',
      content: 'Sometimes it\'s important to take a step back and reflect on where we are in life.',
      mood: 'thoughtful',
      tags: ['reflection', 'growth']
    }
  ])

  const [meditationSessions, setMeditationSessions] = useState([
    { id: 1, date: '2025-08-02', duration: 10, type: 'breathing' },
    { id: 2, date: '2025-08-01', duration: 15, type: 'mindfulness' },
    { id: 3, date: '2025-07-31', duration: 5, type: 'gratitude' }
  ])

  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 1,
      author: 'Sarah M.',
      avatar: '👩‍🦰',
      content: 'Just finished my first week of daily meditation. The change in my mindset is incredible!',
      likes: 12,
      comments: 3,
      timestamp: '2h ago',
      tags: ['meditation', 'milestone']
    },
    {
      id: 2,
      author: 'Mike T.',
      avatar: '👨‍💼',
      content: 'Remember: It\'s okay to have bad days. They help us appreciate the good ones even more. 💙',
      likes: 8,
      comments: 5,
      timestamp: '4h ago',
      tags: ['motivation', 'support']
    }
  ])

  // Functions to manage state
  const addMoodEntry = (moodData) => {
    const newMood = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...moodData
    }
    setMoods(prev => [newMood, ...prev])
  }

  const addDiaryEntry = (entryData) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...entryData
    }
    setDiaryEntries(prev => [newEntry, ...prev])
  }

  const addMeditationSession = (sessionData) => {
    const newSession = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...sessionData
    }
    setMeditationSessions(prev => [newSession, ...prev])
  }

  const addCommunityPost = (postData) => {
    const newPost = {
      id: Date.now(),
      author: user.name,
      avatar: user.avatar || '😊',
      likes: 0,
      comments: 0,
      timestamp: 'just now',
      ...postData
    }
    setCommunityPosts(prev => [newPost, ...prev])
  }

  const likeCommunityPost = (postId) => {
    setCommunityPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    )
  }

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('emotionalHealthApp')
    if (savedData) {
      try {
        const { user: savedUser, moods: savedMoods, diaryEntries: savedDiary, meditationSessions: savedMeditation } = JSON.parse(savedData)
        if (savedUser) setUser(savedUser)
        if (savedMoods) setMoods(savedMoods)
        if (savedDiary) setDiaryEntries(savedDiary)
        if (savedMeditation) setMeditationSessions(savedMeditation)
      } catch (error) {
        console.log('Error loading saved data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      user,
      moods,
      diaryEntries,
      meditationSessions
    }
    localStorage.setItem('emotionalHealthApp', JSON.stringify(dataToSave))
  }, [user, moods, diaryEntries, meditationSessions])

  // Calculate statistics
  const stats = {
    totalMoodEntries: moods.length,
    totalDiaryEntries: diaryEntries.length,
    totalMeditationMinutes: meditationSessions.reduce((total, session) => total + session.duration, 0),
    totalSessions: meditationSessions.length,
    totalMinutes: meditationSessions.reduce((total, session) => total + session.duration, 0),
    streak: calculateMeditationStreak(meditationSessions),
    currentStreak: calculateMoodStreak(moods),
    averageMoodThisWeek: calculateAverageMood(moods)
  }

  function calculateMoodStreak(moodEntries) {
    if (moodEntries.length === 0) return 0
    
    const today = new Date()
    let streak = 0
    
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(today.getDate() - i)
      const dateString = checkDate.toISOString().split('T')[0]
      
      const hasEntry = moodEntries.some(mood => mood.date === dateString)
      if (hasEntry) {
        streak++
      } else {
        break
      }
    }
    
    return streak
  }

  function calculateMeditationStreak(sessions) {
    if (sessions.length === 0) return 0
    
    const today = new Date()
    let streak = 0
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(today.getDate() - i)
      const dateString = checkDate.toISOString().split('T')[0]
      
      const hasSession = sessions.some(session => session.date === dateString)
      if (hasSession) {
        streak++
      } else {
        break
      }
    }
    
    return streak
  }

  function calculateAverageMood(moodEntries) {
    const recentMoods = moodEntries.slice(0, 7)
    if (recentMoods.length === 0) return 'No data'
    
    const moodValues = {
      'happy': 5,
      'excited': 5,
      'content': 4,
      'neutral': 3,
      'tired': 2,
      'sad': 1,
      'angry': 1
    }
    
    const total = recentMoods.reduce((sum, mood) => sum + (moodValues[mood.mood] || 3), 0)
    const average = total / recentMoods.length
    
    if (average >= 4.5) return 'Great'
    if (average >= 3.5) return 'Good'
    if (average >= 2.5) return 'Okay'
    return 'Needs attention'
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard 
                user={user}
                moods={moods}
                stats={stats}
                recentDiaryEntries={diaryEntries.slice(0, 3)}
                recentMeditationSessions={meditationSessions.slice(0, 3)}
              />
            } 
          />
          <Route 
            path="/mood" 
            element={
              <MoodTracking 
                moods={moods}
                onAddMood={addMoodEntry}
                stats={stats}
              />
            } 
          />
          <Route 
            path="/diary" 
            element={
              <Diary 
                entries={diaryEntries}
                onAddEntry={addDiaryEntry}
                user={user}
              />
            } 
          />
          <Route 
            path="/meditation" 
            element={
              <Meditation 
                sessions={meditationSessions}
                onAddSession={addMeditationSession}
                stats={stats}
              />
            } 
          />
          <Route 
            path="/community" 
            element={
              <Community 
                posts={communityPosts}
                onAddPost={addCommunityPost}
                onLikePost={likeCommunityPost}
                user={user}
              />
            } 
          />
          <Route 
            path="/profile" 
            element={<Profile />} 
          />
          <Route 
            path="/counseling" 
            element={<Counseling />} 
          />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
