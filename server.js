require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeFirebase, getDb } = require('./config/firebase-admin');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Firebase Admin
const db = initializeFirebase();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Support base64 images

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Hume TTS API endpoint
app.post('/api/tts', async (req, res) => {
  const { text, voiceId } = req.body;
  
  if (!text || !voiceId) {
    return res.status(400).json({ error: 'Text and voiceId are required' });
  }
  
  const HUME_API_KEY = process.env.HUME_API_KEY;
  
  if (!HUME_API_KEY) {
    console.error('HUME_API_KEY not found in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }
  
  // Voice descriptions for Hume API
  const voiceDescriptions = {
    ito: "A calm, clear adult male voice with a steady, reassuring American accent. Measured and patient.",
    kora: "A warm, empathetic young adult female voice with a Californian American accent. Naturally expressive and caring.",
    stella: "A sophisticated, composed adult British female voice. Professional, steady, and articulate with gentle warmth.",
    dacher: "A deep, grounded middle-aged American male voice. Speaks with authority and hard-earned wisdom, like a veteran supervisor.",
    finn: "An upbeat, friendly young adult male voice with a warm Midwest American accent. Encouraging and positive energy.",
    rio: "A smooth, direct young adult voice with a neutral American accent. Efficient and clear, no-nonsense delivery."
  };
  
  try {
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch('https://api.hume.ai/v0/tts', {
      method: 'POST',
      headers: {
        'X-Hume-Api-Key': HUME_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        utterances: [{
          text: text,
          description: voiceDescriptions[voiceId] || voiceDescriptions.ito
        }],
        format: { type: 'wav' }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Hume API error:', response.status, errorData);
      return res.status(response.status).json({ 
        error: errorData.message || errorData.error || 'Hume API error' 
      });
    }
    
    const data = await response.json();
    
    if (data.generations && data.generations[0] && data.generations[0].audio) {
      res.json({ audio: data.generations[0].audio });
    } else {
      res.status(500).json({ error: 'No audio in response' });
    }
  } catch (error) {
    console.error('TTS error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate audio' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    hasApiKey: !!process.env.HUME_API_KEY,
    database: !!process.env.MONGODB_URI
  });
});

// ============ USER ENDPOINTS ============

// Get or create user
app.post('/api/user', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId required' });
    }
    
    let user = await User.findOne({ userId });
    
    if (!user) {
      user = newdb
  });
});

// ============ USER ENDPOINTS ============

// Get or create user
app.post('/api/user', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not available' });
    
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      const newUser = {
        userId,
        name: 'Marcus Johnson',
        hotel: 'Grand Hyatt',
        voicePreference: 'ito',
        stats: {
          totalSessions: 0,
          totalFixes: 0,
          totalVents: 0,
          totalVentTime: 0,
          avgIntensity: 0
        },
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      await userRef.set(newUser);
      return res.json(newUser);
    }
    
    res.json(userDoc.data());
  } catch (error) {
    console.error('Get/Create user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Update user profile
app.put('/api/user/:userId', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not available' });
    
    const { userId } = req.params;
    const updates = { ...req.body, lastActive: new Date().toISOString() };
    
    const userRef = db.collection('users').doc(userId);
    await userRef.set(updates, { merge: true });
    
    const userDoc = await userRef.get();
    res.json(userDoc.data());
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// ============ SESSION ENDPOINTS ============

// Get user sessions
app.get('/api/sessions/:userId', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not available' });
    
    const { userId } = req.params;
    const { limit = 50, type } = req.query;
    
    let query = db.collection('sessions')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit));
    
    if (type) {
      query = query.where('type', '==', type);
    }
    
    const snapshot = await query.get();
    const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    res.json(sessions);
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Create new session
app.post('/api/sessions', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not available' });
    
    const sessionData = req.body;
    if (!sessionData.userId) return res.status(400).json({ error: 'userId required' });
    
    sessionData.createdAt = new Date().toISOString();
    sessionData.updatedAt = new Date().toISOString();
    
    const sessionRef = await db.collection('sessions').add(sessionData);
    
    // Update user stats
    const userRef = db.collection('users').doc(sessionData.userId);
    const userDoc = await userRef.get();
    
    if (userDoc.exists) {
      const userData = userDoc.data();
      const stats = userData.stats || {};
      
      await userRef.update({
        'stats.totalSessions': (stats.totalSessions || 0) + 1,
        [`stats.total${sessionData.type === 'fix' ? 'Fixes' : 'Vents'}`]: 
          (stats[`total${sessionData.type === 'fix' ? 'Fixes' : 'Vents'}`] || 0) + 1,
        'stats.totalVentTime': (stats.totalVentTime || 0) + (sessionData.ventDuration || 0),
        lastActive: new Date().toISOString()
      });
    }
    
    const newSession = { id: sessionRef.id, ...sessionData };
    res.status(201).json(newSession);
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Update session
app.put('/api/sessions/:sessionId', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not available' });
    
    const { sessionId } = req.params;
    const updates = { ...req.body, updatedAt: new Date().toISOString() };
    
    const sessionRef = db.collection('sessions').doc(sessionId);
    await sessionRef.update(updates);
    
    const sessionDoc = await sessionRef.get();
    if (!sessionDoc.exists) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.json({ id: sessionDoc.id, ...sessionDoc.data() });
  } catch (error) {
    console.error('Update session error:', error);
    res.status(500).json({ error: 'Failed to update session' });
  }
});

// Delete session
app.delete('/api/sessions/:sessionId', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not available' });
    
    const { sessionId } = req.params;
    await db.collection('sessions').doc(sessionId).delete();
    
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({ error: 'Failed to delete session' });
  }
});

// Get user stats
app.get('/api/stats/:userId', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not available' });
    
    const { userId } = req.params;
    
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    
    const sessionsSnapshot = await db.collection('sessions')
      .where('userId', '==', userId)
      .get();
    
    const sessions = sessionsSnapshot.docs.map(doc => doc.data());
    

// Helper functions
function getRecurringIssues(sessions) {
  const rants = {};
  sessions.forEach(s => {
    (s.rants || []).forEach(r => {
      rants[r] = (rants[r] || 0) + 1;
    });
  });
  return Object.entries(rants)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([topic, count]) => ({ topic, count }));
}

function getCalmMethods(sessions) {
  const methods = {};
  sessions.forEach(s => {
    if (s.calmMethod) {
      methods[s.calmMethod] = {
        count: (methods[s.calmMethod]?.count || 0) + 1,
        avgScore: ((methods[s.calmMethod]?.avgScore || 0) + (s.calmScore || 0)) / 2
      };
    }
  });
  return Object.entries(methods)
    .sort((a, b) => b[1].avgScore - a[1].avgScore)
    .map(([method, data]) => ({ method, ...data }));
}

// Health check endpoint (moved down from original position)

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Hume API key configured: ${!!process.env.HUME_API_KEY}`);
});
