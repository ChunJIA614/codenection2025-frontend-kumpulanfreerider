import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  
  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Johnson',
    studentId: 'STU2023001',
    email: 'alex.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '2001-03-15',
    gender: 'Other',
    universityInfo: {
      university: 'State University',
      faculty: 'Faculty of Computer Science',
      program: 'Bachelor of Computer Science',
      year: '3rd Year',
      gpa: '3.75',
      studentStatus: 'Full-time'
    },
    emergencyContact: {
      name: 'Sarah Johnson',
      relationship: 'Mother',
      phone: '+1 (555) 987-6543'
    },
    preferences: {
      notifications: true,
      darkMode: false,
      language: 'English',
      reminderTime: '20:00',
      studyReminders: true,
      examAlerts: true
    },
    mentalHealthInfo: {
      counselor: 'Dr. Emily Chen - University Counseling Center',
      counselorContact: '+1 (555) 456-7890',
      campusHealthCenter: 'Campus Health & Wellness Center',
      healthCenterHours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-1PM',
      supportGroups: ['Anxiety Support Group', 'Academic Stress Workshop'],
      medications: ['Sertraline 50mg', 'Melatonin 3mg'],
      allergies: 'Penicillin',
      emergencyNotes: 'Anxiety disorder, exam stress, social anxiety'
    }
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [editingSection, setEditingSection] = useState(null)

  const handleEdit = (section) => {
    setIsEditing(true)
    setEditingSection(section)
  }

  const handleSave = () => {
    setIsEditing(false)
    setEditingSection(null)
    // Save to localStorage or API
    localStorage.setItem('userProfile', JSON.stringify(userProfile))
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingSection(null)
  }

  const handleInputChange = (section, field, value) => {
    if (section === 'main') {
      setUserProfile(prev => ({
        ...prev,
        [field]: value
      }))
    } else {
      setUserProfile(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }))
    }
  }

  const ProfileSection = ({ title, children, sectionKey, icon }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {icon}
          <h3 className="text-lg font-bold text-gray-800 ml-3">{title}</h3>
        </div>
        <button
          onClick={() => handleEdit(sectionKey)}
          className="p-2 bg-indigo-100 rounded-xl hover:bg-indigo-200 transition-colors"
        >
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>
      {children}
    </div>
  )

  const InfoItem = ({ label, value, isEditing, onChange, type = "text" }) => (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-600 font-medium">{label}:</span>
      {isEditing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <span className="text-gray-800 font-semibold">{value}</span>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {userProfile.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Basic Information */}
        <ProfileSection 
          title="Student Information" 
          sectionKey="main"
          icon={
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        >
          <div className="space-y-2">
            <InfoItem 
              label="Full Name" 
              value={userProfile.name}
              isEditing={isEditing && editingSection === 'main'}
              onChange={(value) => handleInputChange('main', 'name', value)}
            />
            <InfoItem 
              label="Student ID" 
              value={userProfile.studentId}
              isEditing={isEditing && editingSection === 'main'}
              onChange={(value) => handleInputChange('main', 'studentId', value)}
            />
            <InfoItem 
              label="University Email" 
              value={userProfile.email}
              isEditing={isEditing && editingSection === 'main'}
              onChange={(value) => handleInputChange('main', 'email', value)}
              type="email"
            />
            <InfoItem 
              label="Phone" 
              value={userProfile.phone}
              isEditing={isEditing && editingSection === 'main'}
              onChange={(value) => handleInputChange('main', 'phone', value)}
              type="tel"
            />
            <InfoItem 
              label="Date of Birth" 
              value={userProfile.dateOfBirth}
              isEditing={isEditing && editingSection === 'main'}
              onChange={(value) => handleInputChange('main', 'dateOfBirth', value)}
              type="date"
            />
            <InfoItem 
              label="Gender" 
              value={userProfile.gender}
              isEditing={isEditing && editingSection === 'main'}
              onChange={(value) => handleInputChange('main', 'gender', value)}
            />
          </div>
        </ProfileSection>

        {/* University Information */}
        <ProfileSection 
          title="Academic Information" 
          sectionKey="universityInfo"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          }
        >
          <div className="space-y-2">
            <InfoItem 
              label="University" 
              value={userProfile.universityInfo.university}
              isEditing={isEditing && editingSection === 'universityInfo'}
              onChange={(value) => handleInputChange('universityInfo', 'university', value)}
            />
            <InfoItem 
              label="Faculty" 
              value={userProfile.universityInfo.faculty}
              isEditing={isEditing && editingSection === 'universityInfo'}
              onChange={(value) => handleInputChange('universityInfo', 'faculty', value)}
            />
            <InfoItem 
              label="Program" 
              value={userProfile.universityInfo.program}
              isEditing={isEditing && editingSection === 'universityInfo'}
              onChange={(value) => handleInputChange('universityInfo', 'program', value)}
            />
            <InfoItem 
              label="Year" 
              value={userProfile.universityInfo.year}
              isEditing={isEditing && editingSection === 'universityInfo'}
              onChange={(value) => handleInputChange('universityInfo', 'year', value)}
            />
            <InfoItem 
              label="GPA" 
              value={userProfile.universityInfo.gpa}
              isEditing={isEditing && editingSection === 'universityInfo'}
              onChange={(value) => handleInputChange('universityInfo', 'gpa', value)}
            />
            <InfoItem 
              label="Student Status" 
              value={userProfile.universityInfo.studentStatus}
              isEditing={isEditing && editingSection === 'universityInfo'}
              onChange={(value) => handleInputChange('universityInfo', 'studentStatus', value)}
            />
          </div>
        </ProfileSection>

        {/* Emergency Contact */}
        <ProfileSection 
          title="Emergency Contact" 
          sectionKey="emergencyContact"
          icon={
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        >
          <div className="space-y-2">
            <InfoItem 
              label="Name" 
              value={userProfile.emergencyContact.name}
              isEditing={isEditing && editingSection === 'emergencyContact'}
              onChange={(value) => handleInputChange('emergencyContact', 'name', value)}
            />
            <InfoItem 
              label="Relationship" 
              value={userProfile.emergencyContact.relationship}
              isEditing={isEditing && editingSection === 'emergencyContact'}
              onChange={(value) => handleInputChange('emergencyContact', 'relationship', value)}
            />
            <InfoItem 
              label="Phone" 
              value={userProfile.emergencyContact.phone}
              isEditing={isEditing && editingSection === 'emergencyContact'}
              onChange={(value) => handleInputChange('emergencyContact', 'phone', value)}
              type="tel"
            />
          </div>
        </ProfileSection>

        {/* Mental Health Information */}
        <ProfileSection 
          title="Campus Mental Health Resources" 
          sectionKey="mentalHealthInfo"
          icon={
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          }
        >
          <div className="space-y-2">
            <InfoItem 
              label="Campus Counselor" 
              value={userProfile.mentalHealthInfo.counselor}
              isEditing={isEditing && editingSection === 'mentalHealthInfo'}
              onChange={(value) => handleInputChange('mentalHealthInfo', 'counselor', value)}
            />
            <InfoItem 
              label="Counselor Contact" 
              value={userProfile.mentalHealthInfo.counselorContact}
              isEditing={isEditing && editingSection === 'mentalHealthInfo'}
              onChange={(value) => handleInputChange('mentalHealthInfo', 'counselorContact', value)}
              type="tel"
            />
            <InfoItem 
              label="Campus Health Center" 
              value={userProfile.mentalHealthInfo.campusHealthCenter}
              isEditing={isEditing && editingSection === 'mentalHealthInfo'}
              onChange={(value) => handleInputChange('mentalHealthInfo', 'campusHealthCenter', value)}
            />
            <InfoItem 
              label="Health Center Hours" 
              value={userProfile.mentalHealthInfo.healthCenterHours}
              isEditing={isEditing && editingSection === 'mentalHealthInfo'}
              onChange={(value) => handleInputChange('mentalHealthInfo', 'healthCenterHours', value)}
            />
            <div className="py-2">
              <span className="text-gray-600 font-medium">Support Groups:</span>
              <div className="mt-2 space-y-1">
                {userProfile.mentalHealthInfo.supportGroups.map((group, index) => (
                  <div key={index} className="bg-green-50 px-3 py-1 rounded-lg text-sm text-green-800">
                    {group}
                  </div>
                ))}
              </div>
            </div>
            <div className="py-2">
              <span className="text-gray-600 font-medium">Medications:</span>
              <div className="mt-2 space-y-1">
                {userProfile.mentalHealthInfo.medications.map((med, index) => (
                  <div key={index} className="bg-blue-50 px-3 py-1 rounded-lg text-sm text-blue-800">
                    {med}
                  </div>
                ))}
              </div>
            </div>
            <InfoItem 
              label="Allergies" 
              value={userProfile.mentalHealthInfo.allergies}
              isEditing={isEditing && editingSection === 'mentalHealthInfo'}
              onChange={(value) => handleInputChange('mentalHealthInfo', 'allergies', value)}
            />
            <InfoItem 
              label="Notes" 
              value={userProfile.mentalHealthInfo.emergencyNotes}
              isEditing={isEditing && editingSection === 'mentalHealthInfo'}
              onChange={(value) => handleInputChange('mentalHealthInfo', 'emergencyNotes', value)}
            />
          </div>
        </ProfileSection>

        {/* App Preferences */}
        <ProfileSection 
          title="App Preferences" 
          sectionKey="preferences"
          icon={
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Notifications:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={userProfile.preferences.notifications}
                  onChange={(e) => handleInputChange('preferences', 'notifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Study Reminders:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={userProfile.preferences.studyReminders}
                  onChange={(e) => handleInputChange('preferences', 'studyReminders', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Exam Alerts:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={userProfile.preferences.examAlerts}
                  onChange={(e) => handleInputChange('preferences', 'examAlerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <InfoItem 
              label="Language" 
              value={userProfile.preferences.language}
              isEditing={isEditing && editingSection === 'preferences'}
              onChange={(value) => handleInputChange('preferences', 'language', value)}
            />
            <InfoItem 
              label="Daily Reminder" 
              value={userProfile.preferences.reminderTime}
              isEditing={isEditing && editingSection === 'preferences'}
              onChange={(value) => handleInputChange('preferences', 'reminderTime', value)}
              type="time"
            />
          </div>
        </ProfileSection>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Additional Actions */}
        <div className="space-y-4 mb-8">
          <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Export My Data
          </button>
          
          <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
