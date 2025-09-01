import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Diary = () => {
  const navigate = useNavigate()
  const [currentMonth, setCurrentMonth] = useState('August 2023')
  const [selectedDate, setSelectedDate] = useState(3)
  const [diaryEntry, setDiaryEntry] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis tempor felis. Nulla mauris vitae commodo mauris massa, eget cursus varius dolor, pulvinar posuere lorem. Mauris hendrerit pretium mauris dictum eleifend lorem ipsum tempor non enim dapibus. Ut massa dolor consectetur a aliquet egestas et convallis ligula quisque mauris.')
  const [isEditing, setIsEditing] = useState(false)
  
  const [tasks, setTasks] = useState([
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
  ])

  const handleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleEditDiary = () => {
    setIsEditing(!isEditing)
  }

  const handleSaveDiary = () => {
    // Save diary entry logic here
    setIsEditing(false)
    // Could save to localStorage or API
    localStorage.setItem(`diary-${selectedDate}`, diaryEntry)
  }

  const handleDateClick = (date) => {
    setSelectedDate(date)
    // Load diary entry for this date
    const savedEntry = localStorage.getItem(`diary-${date}`)
    if (savedEntry) {
      setDiaryEntry(savedEntry)
    } else {
      setDiaryEntry('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 pb-20">
      {/* Calendar Header */}
      <div className="px-6 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{currentMonth}</h1>
          <p className="text-gray-600 mb-4">Track your daily moods and memories</p>
          <div className="flex justify-center space-x-4">
            <button onClick={() => setCurrentMonth('July 2023')} className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white transition-all shadow-lg transform hover:scale-105">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => setCurrentMonth('September 2023')} className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-white transition-all shadow-lg transform hover:scale-105">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="px-6 mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="grid grid-cols-7 gap-3 mb-4">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
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
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm transition-all duration-200 transform hover:scale-105 ${
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
                    <div className="text-center mt-1">
                      <div className="text-lg">
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
      <div className="px-6 mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex items-start space-x-4">
            <div className="text-5xl">😔</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Sad....</h3>
                <div className="flex space-x-3">
                  <button 
                    onClick={handleEditDiary}
                    className="p-2 hover:bg-indigo-100 rounded-xl transition-all transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-red-100 rounded-xl transition-all transform hover:scale-105">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4">I hope you feel better 💜</p>
              
              {/* Your Diary section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-700">Your Diary</span>
                  </div>
                  {isEditing && (
                    <button 
                      onClick={handleSaveDiary}
                      className="text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                      Save
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <textarea 
                    value={diaryEntry}
                    onChange={(e) => setDiaryEntry(e.target.value)}
                    className="w-full text-sm text-gray-700 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                    rows={4}
                    placeholder="Write about your day..."
                  />
                ) : (
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
                    <p className="text-sm text-gray-700">{diaryEntry || 'No diary entry for this date. Click edit to add one.'}</p>
                  </div>
                )}
              </div>
              
              {/* Photos section */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Photos</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center hover:from-indigo-200 hover:to-purple-200 transition-all transform hover:scale-105 cursor-pointer">
                      <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="px-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Task & Deadline</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20 ${task.completed ? 'opacity-70' : ''} transition-all hover:shadow-xl`}>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleTaskComplete(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      task.completed 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 border-transparent' 
                        : 'border-indigo-300 hover:border-indigo-500'
                    } transition-all hover:scale-110 transform`}
                  >
                    {task.completed && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold text-gray-800 ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{task.dueDate}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full ${task.id === 1 ? 'bg-red-400' : 'bg-blue-400'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Diary
