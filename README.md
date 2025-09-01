# Emotional Health Mobile App

A beautiful and intuitive emotional health tracking application built with React and Tailwind CSS, designed to help users monitor their mental wellbeing, practice meditation, and connect with a supportive community.

## ✨ Features

### 🏠 Dashboard
- Welcome screen with current weather
- Mood calendar with streak tracking
- Quick emotion selector
- Activity shortcuts (Community, Breathing, Counseling)
- Daily inspirational quotes

### 📊 Mood Tracking  
- Interactive mood selection with emoji scale
- Detailed emotion categorization
- Photo attachment support
- Journal entry functionality
- Real-time mood visualization

### 📖 Diary
- Monthly calendar view with mood indicators
- Detailed diary entries with photos
- Task and deadline management
- Rich text journal entries
- Mood history visualization

### 🧘 Meditation
- Curated meditation sessions
- Category-based filtering (Breathing, Balance, Focus, Foundation)
- Guided meditation with play controls
- Inspirational quotes
- Progress tracking

### 👥 Community
- Anonymous sharing platform
- Feed of community posts
- Like and comment system
- Faculty-based communities
- Support network building

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#0ea5e9` - For main actions and navigation
- **Secondary Yellow**: `#eab308` - For highlights and accents  
- **Success Green**: `#22c55e` - For positive states and achievements
- **Warning Orange**: `#f97316` - For attention and mood indicators
- **Neutral Grays**: Full spectrum for text and backgrounds

### Typography
- **Font Family**: Inter - Clean, modern, and highly readable
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive scaling** with mobile-first approach

### Components
- **Cards**: Rounded corners with soft shadows
- **Buttons**: Primary, secondary, and icon variants
- **Mood Indicators**: Emoji-based with color coding
- **Navigation**: Bottom tab bar with active states

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd emotional-health-app
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

The app is designed with a mobile-first approach, featuring:
- **Max width container** (max-w-sm) for mobile screens
- **Touch-friendly** button sizes and spacing
- **Gesture-based** navigation and interactions
- **iOS-style** status bar and navigation
- **Responsive grid** layouts for different content types

## 🛠️ Technology Stack

- **Framework**: React 18 with Hooks
- **Styling**: Tailwind CSS with custom configuration
- **Routing**: React Router v6
- **Build Tool**: Vite for fast development and building
- **Icons**: Custom SVG icon components
- **State Management**: React useState and useEffect hooks

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout with navigation
│   └── Icons.jsx       # Custom icon components
├── pages/              # Main application pages
│   ├── Dashboard.jsx   # Home/dashboard view
│   ├── MoodTracking.jsx # Mood selection and logging
│   ├── Diary.jsx       # Calendar and journal entries
│   ├── Meditation.jsx  # Meditation sessions
│   └── Community.jsx   # Social community features
├── App.jsx             # Main app component with routing
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 Key Features Implementation

### Mood Tracking System
- **5-point emotion scale** with emoji representations
- **Detailed emotion categories** for nuanced tracking
- **Visual calendar** with mood indicators
- **Streak tracking** for consistency motivation

### Meditation Platform
- **Categorized sessions** by type and difficulty
- **Duration indicators** for planning
- **Play controls** for guided sessions
- **Progress tracking** across sessions

### Community Features
- **Anonymous posting** for privacy and safety
- **Faculty-based organization** for relevant connections
- **Engagement metrics** (likes, comments)
- **Real-time feed** updates

## 🔧 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: { /* Blue shades */ },
  secondary: { /* Yellow shades */ },
  success: { /* Green shades */ },
  warning: { /* Orange shades */ },
  neutral: { /* Gray shades */ }
}
```

### Components
All components use Tailwind utility classes and can be easily customized by modifying the className props.

## 📈 Future Enhancements

- **Data persistence** with local storage or backend integration
- **Push notifications** for mood tracking reminders
- **Analytics dashboard** for mood patterns
- **Therapist integration** for professional support
- **Group meditation** sessions
- **Achievement system** with badges and rewards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Figma Design**: Original UI/UX design concepts
- **Tailwind CSS**: Utility-first CSS framework
- **React Team**: For the amazing React library
- **Vite**: For the lightning-fast build tool

---

Built with ❤️ for mental health and wellbeing
