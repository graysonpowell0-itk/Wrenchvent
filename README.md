# WrenchVent

**Vent. Breathe. Fix it. Remember.**

An AI-powered maintenance assistant for hospitality technicians that combines emotional support with practical troubleshooting guidance.

## Features

- 🎙️ **Vent Session**: Express frustration without judgment
- 🔧 **Fix Mode**: AI-guided troubleshooting with photo analysis
- 🧠 **Memory System**: Recalls past fixes and patterns
- 📹 **Live Assist**: Real-time video guidance
- 🎧 **Voice Profiles**: Powered by Hume AI EVI

## Getting Started

### Prerequisites

- Node.js 14+ installed
- npm or yarn package manager
- Hume AI API key (get one at [platform.hume.ai](https://platform.hume.ai))

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your HUME_API_KEY
```

### Development

Run both the React frontend and Express backend:

```bash
# Run frontend and backend concurrently
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Frontend (port 3000)
npm start

# Terminal 2 - Backend (port 3001)
npm run server
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the React app
npm run build

# Run production server (serves built React app + API)
npm run start:prod
```

## Project Structure

```
wrenchvent/
├── public/           # Static files
├── src/
│   ├── components/   # React components
│   ├── screens/      # Screen components
│   ├── styles/       # CSS and theme
│   ├── utils/        # Helper functions & API
│   ├── data/         # Mock data
│   ├── App.jsx       # Main app component
│   └── index.js      # Entry point
├── server.js         # Express backend server
├── .env.example      # Environment variables template
├── .env              # Your API keys (git-ignored)
├── package.json
└── README.md
```

## TExpress** - Backend server for secure API calls
- **Canvas API** - Custom animations
- **Hume AI** - Professional voice synthesis (server-side)

## Features

🎙️ **High-Quality Voice** - All users get premium Hume AI voices without needing their own API key (your key is used server-side securely
- **React 18** - UI framework
- **React Hooks** - State management
- **Canvas API** - Custom animations
- **Hume AI** - Voice synthesis (optional)

## License

Private & Proprietary
