require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

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
  res.json({ status: 'ok', hasApiKey: !!process.env.HUME_API_KEY });
});

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
