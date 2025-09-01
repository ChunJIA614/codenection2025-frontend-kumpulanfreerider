import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Diary = () => {
  const navigate = useNavigate()
  const [currentMonth, setCurrentMonth] = useState('August 2023')
  const [selectedDate, setSelectedDate] = useState(3)
  const [diaryEntry, setDiaryEntry] = useState('Feeling a bit down today, but trying to stay positive. Sometimes life feels overwhelming but I know this too shall pass.')
  const [isEditing, setIsEditing] = useState(false)
  const [selectedMood, setSelectedMood] = useState('😔')
  const [moodNote, setMoodNote] = useState('')
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showDiaryModal, setShowDiaryModal] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDueDate, setNewTaskDueDate] = useState('')
  const [newDiaryDate, setNewDiaryDate] = useState('')
  const [newDiaryMood, setNewDiaryMood] = useState('😐')
  const [newDiaryNote, setNewDiaryNote] = useState('')
  
  const [tasks, setTasks] = useState([])

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('userTasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      // Set default tasks if none exist
      const defaultTasks = [
        {
          id: 1,
          title: 'SACS3203 assignment submission',
          dueDate: 'Due August 30, 2023',
          color: 'bg-red-100',
          completed: false
        },
        {
          id: 2,
          title: 'Replacement class for SACS3203',
          dueDate: 'Due August 30, 2023',
          color: 'bg-blue-100',
          completed: false
        }
      ]
      setTasks(defaultTasks)
      localStorage.setItem('userTasks', JSON.stringify(defaultTasks))
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('userTasks', JSON.stringify(tasks))
    }
  }, [tasks])

  const handleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const handleEditDiary = () => {
    setIsEditing(!isEditing)
  }

  const handleSaveDiary = () => {
    // Save mood entry as diary
    const moodDiaryEntry = {
      mood: selectedMood,
      note: moodNote || diaryEntry,
      date: selectedDate,
      timestamp: Date.now()
    }
    
    setIsEditing(false)
    // Save to localStorage
    localStorage.setItem(`diary-${selectedDate}`, JSON.stringify(moodDiaryEntry))
    
    // Update diary entry display
    setDiaryEntry(moodNote || diaryEntry)
  }

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        dueDate: newTaskDueDate || 'No due date',
        color: ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100'][Math.floor(Math.random() * 5)],
        completed: false
      }
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
      setNewTaskDueDate('')
      setShowTaskModal(false)
    }
  }

  const handleAddDiary = () => {
    if (newDiaryDate && newDiaryNote.trim()) {
      const day = parseInt(newDiaryDate)
      const diaryEntry = {
        mood: newDiaryMood,
        note: newDiaryNote,
        date: day,
        timestamp: Date.now()
      }
      
      // Save to localStorage
      localStorage.setItem(`diary-${day}`, JSON.stringify(diaryEntry))
      
      // If the new diary is for the currently selected date, update the display
      if (day === selectedDate) {
        setSelectedMood(newDiaryMood)
        setDiaryEntry(newDiaryNote)
        setMoodNote(newDiaryNote)
      }
      
      setNewDiaryDate('')
      setNewDiaryMood('😐')
      setNewDiaryNote('')
      setShowDiaryModal(false)
    }
  }

  const handleDateClick = (date) => {
    setSelectedDate(date)
    // Load mood diary entry for this date
    const savedEntry = localStorage.getItem(`diary-${date}`)
    if (savedEntry) {
      try {
        const parsedEntry = JSON.parse(savedEntry)
        setSelectedMood(parsedEntry.mood || '😐')
        setDiaryEntry(parsedEntry.note || '')
        setMoodNote(parsedEntry.note || '')
      } catch (e) {
        // Handle old format
        setDiaryEntry(savedEntry)
        setMoodNote(savedEntry)
      }
    } else {
      setDiaryEntry('')
      setMoodNote('')
      setSelectedMood('😐')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 pb-20">
      {/* Calendar Header */}
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center">
          <div className="flex justify-between items-center mb-2">
            <div></div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{currentMonth}</h1>
            <button 
              onClick={() => setShowDiaryModal(true)}
              className="p-2 sm:p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl sm:rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              title="Add Diary Entry"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Track your daily moods and memories</p>
          <div className="flex justify-center space-x-3 sm:space-x-4">
            <button onClick={() => setCurrentMonth('July 2023')} className="p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:bg-white transition-all shadow-lg transform hover:scale-105">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => setCurrentMonth('September 2023')} className="p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:bg-white transition-all shadow-lg transform hover:scale-105">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-white/20">
          <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-3 sm:mb-4">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center text-xs sm:text-sm font-medium text-gray-500 py-2">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Calendar dates */}
            {Array.from({ length: 35 }, (_, i) => {
              const date = i - 2; // Start from -2 to show previous month dates
              const isCurrentMonth = date >= 1 && date <= 31;
              const isToday = date === selectedDate;
              const hasMood = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].includes(date);
              
              return (
                <div key={i} className="flex flex-col items-center">
                  <button 
                    onClick={() => isCurrentMonth && handleDateClick(date)}
                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-xs sm:text-sm transition-all duration-200 transform hover:scale-105 ${
                      isToday 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold shadow-lg' 
                        : isCurrentMonth 
                          ? 'text-gray-800 hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-100' 
                          : 'text-gray-400'
                    }`}
                  >
                    {date > 0 && date <= 31 ? date : date <= 0 ? 29 + date : date - 31}
                  </button>
                  {hasMood && isCurrentMonth && (
                    <div className="text-center mt-0.5 sm:mt-1">
                      <div className="text-sm sm:text-lg">
                        {date === 3 || date === 4 ? '😊' : 
                         date === 5 ? '😤' : 
                         date === 6 || date === 7 ? '😊' : '😐'}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Diary Entry Detail */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-white/20">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0">
              {/* Mood selector */}
              {isEditing ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-xs text-gray-600">Mood:</span>
                  <div className="grid grid-cols-2 gap-1">
                    {['😔', '😤', '😐', '😊'].map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`text-2xl sm:text-3xl p-1 rounded-lg hover:bg-indigo-100 transition-all ${
                          selectedMood === mood ? 'bg-indigo-100 ring-2 ring-indigo-300' : ''
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-3xl sm:text-5xl">{selectedMood}</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  {selectedMood === '😔' ? 'Feeling Down' : 
                   selectedMood === '😤' ? 'Frustrated' :
                   selectedMood === '😐' ? 'Neutral' : 'Happy'}
                </h3>
                <div className="flex space-x-2 sm:space-x-3">
                  <button 
                    onClick={handleEditDiary}
                    className="p-1.5 sm:p-2 hover:bg-indigo-100 rounded-lg sm:rounded-xl transition-all transform hover:scale-105"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="p-1.5 sm:p-2 hover:bg-red-100 rounded-lg sm:rounded-xl transition-all transform hover:scale-105">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                How are you feeling today? Share your thoughts...
              </p>
              
              {/* Mood Note section */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">Mood Note</span>
                  </div>
                  {isEditing && (
                    <button 
                      onClick={handleSaveDiary}
                      className="text-xs sm:text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                      Save Mood Entry
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <textarea 
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    className="w-full text-sm text-gray-700 bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                    rows={4}
                    placeholder="How are you feeling? What's on your mind today..."
                  />
                ) : (
                  <div className="bg-white/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/30">
                    <p className="text-sm text-gray-700">{moodNote || diaryEntry || 'No mood entry for this date. Click edit to add one.'}</p>
                  </div>
                )}
              </div>
              
              {/* Photos section */}
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Photos</h4>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center hover:from-indigo-200 hover:to-purple-200 transition-all transform hover:scale-105 cursor-pointer">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task & Deadline */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Task & Deadline</h2>
            <button 
              onClick={() => setShowTaskModal(true)}
              className="p-2 sm:p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl sm:rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className={`bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-white/20 ${task.completed ? 'opacity-70' : ''} transition-all hover:shadow-xl`}>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button 
                    onClick={() => handleTaskComplete(task.id)}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      task.completed 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 border-transparent' 
                        : 'border-indigo-300 hover:border-indigo-500'
                    } transition-all hover:scale-110 transform`}
                  >
                    {task.completed && (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm sm:text-lg font-semibold text-gray-800 ${task.completed ? 'line-through' : ''} break-words`}>
                      {task.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{task.dueDate}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0 ${task.color || 'bg-indigo-400'}`}></div>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1 hover:bg-red-100 rounded-lg transition-all transform hover:scale-105"
                      title="Delete task"
                    >
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Add New Task</h3>
              <button 
                onClick={() => {
                  setShowTaskModal(false)
                  setNewTaskTitle('')
                  setNewTaskDueDate('')
                }}
                className="p-2 hover:bg-gray-100 rounded-2xl transition-all transform hover:scale-105"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title..."
                className="w-full p-3 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date (optional)</label>
              <input
                type="text"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                placeholder="e.g., Due September 15, 2025"
                className="w-full p-3 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowTaskModal(false)
                  setNewTaskTitle('')
                  setNewTaskDueDate('')
                }}
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                disabled={!newTaskTitle.trim()}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Diary Modal */}
      {showDiaryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Add Diary Entry</h3>
              <button 
                onClick={() => {
                  setShowDiaryModal(false)
                  setNewDiaryDate('')
                  setNewDiaryMood('😐')
                  setNewDiaryNote('')
                }}
                className="p-2 hover:bg-gray-100 rounded-2xl transition-all transform hover:scale-105"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <select
                value={newDiaryDate}
                onChange={(e) => setNewDiaryDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              >
                <option value="">Select a date...</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mood</label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { emoji: '😔', label: 'Sad' },
                  { emoji: '😤', label: 'Angry' },
                  { emoji: '😐', label: 'Neutral' },
                  { emoji: '😊', label: 'Happy' }
                ].map((mood) => (
                  <button
                    key={mood.emoji}
                    onClick={() => setNewDiaryMood(mood.emoji)}
                    className={`p-3 rounded-xl text-center transition-all transform hover:scale-105 ${
                      newDiaryMood === mood.emoji
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-xl mb-1">{mood.emoji}</div>
                    <div className="text-xs font-medium">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Diary Note</label>
              <textarea
                value={newDiaryNote}
                onChange={(e) => setNewDiaryNote(e.target.value)}
                placeholder="How are you feeling? What's on your mind..."
                className="w-full p-3 border border-gray-300 rounded-xl resize-none h-32 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDiaryModal(false)
                  setNewDiaryDate('')
                  setNewDiaryMood('😐')
                  setNewDiaryNote('')
                }}
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDiary}
                disabled={!newDiaryDate || !newDiaryNote.trim()}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Diary
