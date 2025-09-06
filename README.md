# Emotional Health Mobile App

A beautiful and intuitive emotional health tracking application built with React and Tailwind CSS, designed to help students monitor their mental wellbeing, practice meditation, and connect with a supportive community.

## Track and Problem Statement
- Track : **Student Lifestyle**
- Problem Statement : 
  - University students today face growing mental health challenges such as anxiety and depression often brought on by financial stress, academic pressure and the demands of campus life.
  - Many students don’t seek help because counseling resources are limited or they fear stigma. This challenge will explore creating tools for self care, mental health support and helping students cope with the demands of university life.


## ❤️‍🔥 Figma Link
- **Dev Mode**: https://www.figma.com/design/VoXZwtc4rl14Sl7oxFc7JI/Hackathon?node-id=0-1&m=dev&t=m8onS0jHPPX6eJxE-1
- **Prototype Mode**: https://www.figma.com/proto/VoXZwtc4rl14Sl7oxFc7JI/Hackathon?node-id=0-1&t=m8onS0jHPPX6eJxE-1

## ✨ Key Features

### 🏠 Dashboard
- **Dynamic Weather Integration**: Real-time weather display with 9+ weather conditions
- **Weather-Based Backgrounds**: Animated backgrounds that change based on current weather
- **Weekly Mood Calendar**: Simplified view showing this week's mood patterns
- **Weather Animations**: Particle effects and dynamic animations for different weather types
- **Responsive Mobile Design**: Optimized for mobile-first experience

### 📊 Mood Tracking  
- **Functional Mood Carousel**: Interactive scrollable mood selector with 8+ emotions
- **Share to Community Integration**: Option to share mood entries to community after saving
- **Photo Attachment Support**: Add images to mood entries
- **Real-time Mood Logging**: Instant saving to diary with timestamp
- **Seamless User Experience**: No interrupting popups during mood selection

### 📖 Diary
- **Interactive Calendar View**: Click any date to view/edit mood entries
- **Add New Diary Entries**: Create diary entries for any date with mood and notes
- **Task Management System**: Add, complete, and delete personal tasks
- **Persistent Data Storage**: All entries saved to localStorage
- **View-Only Mode**: Browse existing mood history and edit when needed
- **Task Deadline Tracking**: Set due dates and manage academic deadlines

### 🧘 Meditation
- **Curated Session Library**: Various meditation types and durations
- **Category-Based Filtering**: Breathing, Balance, Focus, Foundation
- **Guided Meditation Controls**: Play/pause functionality
- **Inspirational Content**: Daily quotes and mindfulness tips
- **Progress Tracking**: Session completion monitoring

### 👥 Community
- **Anonymous Sharing Platform**: Safe space for emotional expression
- **Diary-to-Community Integration**: Share mood entries from diary
- **Enhanced Post Creation**: 
  - Mood selection (4 emotion types)
  - Category selection (Support, Diary, Meditation, Achievement, Advice, General)
  - Image upload functionality
  - Rich text content
- **Post Interaction**: Like and engagement system
- **Category Filtering**: Filter posts by type and topic
- **Crisis Support Resources**: Quick access to emergency mental health resources

## 🎨 Design System

### Color Palette
- **Primary Purple/Indigo**: `#7C4DFF`, `#6B3BFF` - Main actions and highlights
- **Secondary Blue**: `#0ea5e9` - Weather and secondary actions
- **Success Green**: `#22c55e` - Positive states and achievements
- **Warning Red/Orange**: `#ef4444`, `#f97316` - Attention and mood indicators
- **Weather Colors**: Dynamic gradients based on weather conditions
- **Neutral Grays**: Full spectrum for text, backgrounds, and subtle elements

### Weather System Design
- **9 Weather Types**: Sunny, Cloudy, Rainy, Snowy, Windy, Thunderstorm, Foggy, Partly Cloudy, Hot
- **Dynamic Backgrounds**: Gradient transitions matching weather conditions
- **Particle Animations**: Rain drops, snow flakes, fog effects
- **Responsive Weather Display**: Temperature and condition indicators

### Typography
- **Font Family**: Inter - Clean, modern, and highly readable
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive Scaling**: Mobile-first approach with sm: breakpoints
- **Accessibility**: High contrast and readable font sizes

### Component Design
- **Glassmorphism**: Backdrop blur effects with transparency
- **Rounded Corners**: Consistent border-radius (xl, 2xl, 3xl)
- **Smooth Animations**: Transform, scale, and transition effects
- **Gradient Buttons**: Beautiful gradient backgrounds for CTAs
- **Shadow System**: Layered shadows for depth and hierarchy

### Component Architecture
- **Modal System**: Overlay modals for task creation, diary entries, and community posts
- **Carousel Components**: Smooth scrolling mood selectors
- **Calendar Interface**: Interactive date selection with mood indicators
- **Form Components**: Styled inputs, textareas, and select dropdowns
- **Button Variants**: Primary, secondary, icon, and gradient styles
- **Card Layouts**: Glassmorphism effects with rounded corners and shadows

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChunJIA614/hackaton.git
   cd hackaton
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to view the app

### Build for Production
```bash
npm run build
npm run preview
```

## 📱 Mobile-First Design

The app is optimized for mobile devices with:
- **Responsive Layout**: Mobile-first approach with desktop scaling
- **Touch-Friendly**: Large tap targets and gesture support
- **Bottom Navigation**: Easy thumb navigation on mobile devices
- **Viewport Optimization**: Full-screen mobile experience
- **Smooth Animations**: 60fps animations and transitions

## 🛠️ Technology Stack

- **Framework**: React 18 with Hooks (useState, useEffect)
- **Styling**: Tailwind CSS with custom configuration
- **Routing**: React Router v6 for navigation
- **Build Tool**: Vite for fast development and HMR
- **Icons**: Custom SVG icon components
- **State Management**: React hooks with localStorage persistence
- **Data Storage**: Browser localStorage for client-side persistence
- **Animations**: CSS transitions and transforms

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout with bottom navigation
│   └── Icons.jsx       # Custom SVG icon library
├── pages/              # Main application pages
│   ├── Dashboard.jsx   # Weather dashboard with mood calendar
│   ├── MoodTracking.jsx # Mood carousel with community sharing
│   ├── Diary.jsx       # Interactive calendar with task management
│   ├── Meditation.jsx  # Meditation sessions and mindfulness
│   └── Community.jsx   # Social platform with enhanced posting
├── App.jsx             # Main app with routing configuration
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 Core Functionality Implementation

### Weather Integration System
- **Real-time Weather Display**: Dynamic weather conditions with temperature
- **9 Weather Types**: Comprehensive weather coverage
- **Animated Backgrounds**: Weather-specific gradient transitions
- **Particle Effects**: Rain, snow, and atmospheric animations
- **Background Coverage**: Weather effects cover half of mood component

### Enhanced Mood Tracking
- **Functional Carousel**: Smooth scrolling between 8 emotion types
- **Share Integration**: Mood entries automatically saved to diary
- **Community Sharing**: Option to share mood to community after tracking
- **No Interruptions**: Removed blocking popups for better UX
- **Persistent Storage**: All mood data saved with timestamps

### Advanced Diary Features
- **Task Management**: 
  - Add new tasks with due dates
  - Mark tasks as complete/incomplete
  - Delete tasks with confirmation
  - Random color assignment for visual organization
  - Persistent storage with localStorage
- **Diary Entry Creation**:
  - Add entries for any calendar date
  - Mood selection with 4 emotion types
  - Rich text notes and descriptions
  - Instant save to localStorage
- **Calendar Navigation**: Click any date to view/edit existing entries

### Community Platform Enhancement
- **Enhanced Post Creation**:
  - Mood selector integration (4 emotions)
  - Category selection (6 categories available)
  - Image upload with preview functionality
  - Rich text content support
- **Post Display Features**:
  - Mood indicators on posts
  - Category filtering system
  - Image display in posts
  - Anonymous user posting
- **Crisis Support**: Quick access to mental health resources

## 🔧 Customization & Configuration

### Weather System Configuration
The weather system supports 9 different weather types with customizable:
- Background gradients
- Particle animations  
- Temperature display
- Weather condition icons

### Theme Customization
Edit `tailwind.config.js` to customize the design:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Custom color palette
        primary: { /* Purple/Indigo shades */ },
        weather: { /* Weather-specific colors */ },
        mood: { /* Mood indicator colors */ }
      },
      animation: {
        // Custom animations for weather and transitions
      }
    }
  }
}
```

### Component Styling
All components use Tailwind utility classes and can be customized by:
- Modifying className props
- Updating color schemes
- Adjusting animation timings
- Customizing modal layouts

## � User Flow & Experience

### Student Workflow
1. **Dashboard**: Check weather and weekly mood overview
2. **Mood Tracking**: Log daily emotions with optional sharing
3. **Diary Management**: 
   - View mood history by date
   - Add/edit diary entries
   - Manage academic tasks and deadlines
4. **Community Engagement**: Share experiences and support others
5. **Meditation**: Access mindfulness resources

### Data Persistence
- **localStorage Integration**: All user data persists across sessions
- **Automatic Saving**: Real-time data synchronization
- **Cross-Page Data**: Shared data between mood tracking and diary
- **Task Management**: Persistent task storage with completion tracking

## 📈 Future Enhancement Roadmap

### Planned Features
- **Backend Integration**: User accounts and cloud synchronization
- **Advanced Analytics**: Mood pattern analysis and insights
- **Push Notifications**: Mood tracking reminders and motivational messages
- **Therapist Integration**: Professional support connections
- **Group Features**: Study groups and peer support circles
- **Achievement System**: Gamification with badges and streaks
- **Export Functionality**: PDF reports and data export
- **Advanced Weather**: Location-based weather detection

### Technical Improvements
- **Performance Optimization**: Code splitting and lazy loading
- **Accessibility**: Enhanced screen reader and keyboard navigation
- **PWA Features**: Offline functionality and app installation
- **Real-time Features**: Live community interactions
- **Security Enhancements**: Data encryption and privacy controls

## 🤝 Contributing

We welcome contributions to improve the emotional health app! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the existing code style and component patterns
4. Test your changes across different screen sizes
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request with detailed description

### Contribution Areas
- **UI/UX Improvements**: Enhance design and user experience
- **Feature Development**: Add new functionality
- **Bug Fixes**: Resolve issues and improve stability
- **Performance**: Optimize loading and animations
- **Accessibility**: Improve screen reader and keyboard support
- **Documentation**: Update guides and code comments

## � Development Notes

### Key Technical Decisions
- **Mobile-First Design**: Primary focus on mobile user experience
- **localStorage**: Client-side data persistence for demo purposes
- **Component-Based Architecture**: Reusable and maintainable code structure
- **Weather Integration**: Dynamic UI based on weather conditions
- **Mood-Centric Design**: Emotions as the primary data type

### Performance Considerations
- **Smooth Animations**: 60fps transitions and micro-interactions
- **Optimized Assets**: Efficient SVG icons and minimal bundle size
- **Responsive Loading**: Progressive enhancement for different devices
- **Memory Management**: Efficient state updates and cleanup

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern mobile app design patterns
- **Tailwind CSS**: Utility-first CSS framework enabling rapid development
- **React Team**: For the powerful and flexible React library
- **Vite**: Lightning-fast build tool and development server
- **Mental Health Community**: For insights into emotional wellbeing needs
- **Student Feedback**: User testing and feature suggestions

## 📞 Support & Contact

For questions, suggestions, or support:
- **GitHub Issues**: Report bugs and request features
- **Discussions**: Join community conversations
- **Email**: Contact maintainers for urgent matters

---

**Built with ❤️ for student mental health and wellbeing**

*Empowering students to track, understand, and improve their emotional health through technology.*
