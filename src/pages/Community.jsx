import React, { useState } from 'react'

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Sarah M.',
        avatar: '👩‍💼',
        verified: true
      },
      content: 'Just finished my morning meditation session! Feeling so much more centered and ready for the day. What are your favorite grounding techniques?',
      time: '2h',
      likes: 24,
      comments: 5,
      category: 'meditation',
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: 'Alex K.',
        avatar: '👨‍🎨',
        verified: false
      },
      content: 'Having a tough day with anxiety. This community always reminds me I\'m not alone. Thank you all for being here 💙',
      time: '4h',
      likes: 48,
      comments: 12,
      category: 'support',
      isLiked: false
    },
    {
      id: 3,
      user: {
        name: 'Dr. Emma',
        avatar: '👩‍⚕️',
        verified: true
      },
      content: 'Weekly reminder: It\'s okay to not be okay. Healing isn\'t linear, and progress comes in waves. Be patient with yourself.',
      time: '1d',
      likes: 156,
      comments: 23,
      category: 'advice',
      isLiked: false
    }
  ])

  const categories = [
    { id: 'all', name: 'All', emoji: '🌟' },
    { id: 'meditation', name: 'Meditation', emoji: '🧘‍♀️' },
    { id: 'support', name: 'Support', emoji: '💙' },
    { id: 'advice', name: 'Advice', emoji: '💡' },
    { id: 'success', name: 'Success', emoji: '🎉' }
  ]

  const [activeCategory, setActiveCategory] = useState('all')
  const [showPostModal, setShowPostModal] = useState(false)
  const [newPostText, setNewPostText] = useState('')
  
  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ))
  }
  
  const handleCreatePost = () => {
    if (newPostText.trim()) {
      const newPost = {
        id: Date.now(),
        user: {
          name: 'You',
          avatar: '👤',
          verified: false
        },
        content: newPostText,
        time: 'now',
        likes: 0,
        comments: 0,
        category: 'support',
        isLiked: false
      }
      setPosts([newPost, ...posts])
      setNewPostText('')
      setShowPostModal(false)
    }
  }
  
  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Community</h1>
            <p className="text-gray-600">Connect with others on their wellness journey</p>
          </div>
          <button 
            onClick={() => setShowPostModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-2xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            + Post
          </button>
        </div>
      </div>

      {/* Category Filter & Stats */}
      <div className="px-6 mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
          <div className="flex overflow-x-auto space-x-3 pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md'
                }`}
              >
                <span className="text-lg">{category.emoji}</span>
                <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-indigo-600">2.5k</div>
                <div className="text-sm text-gray-600">Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">Online</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">89</div>
                <div className="text-sm text-gray-600">Today's Posts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="px-6">
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
              {/* Post Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-xl">
                  {post.user.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{post.user.name}</span>
                    {post.user.verified && (
                      <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{post.time}</span>
                </div>
                <button className="p-2 hover:bg-indigo-100 rounded-2xl transition-all transform hover:scale-105">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>

              {/* Post Content */}
              <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-all transform hover:scale-105 ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <svg className={`w-6 h-6 ${post.isLiked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 transition-all transform hover:scale-105">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="font-medium">{post.comments}</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-all transform hover:scale-105">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Support Access */}
      <div className="px-6 mt-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-red-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🆘</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">Need immediate support?</h3>
              <p className="text-sm text-gray-600">If you're in crisis, please reach out for professional help.</p>
            </div>
          </div>
          <button 
            onClick={() => alert('Emergency support resources:\n\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/')}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Help Now
          </button>
        </div>
      </div>

      {/* New Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-6 z-50">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 w-full max-w-md shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Create Post</h3>
              <button 
                onClick={() => setShowPostModal(false)}
                className="p-2 hover:bg-gray-100 rounded-2xl transition-all transform hover:scale-105"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Share your thoughts with the community..."
              className="w-full p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent mb-6"
              rows={4}
            />
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowPostModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreatePost}
                disabled={!newPostText.trim()}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Community
