// API utility for making requests to the backend
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export const playVoicePreview = async (voiceId, sampleText) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: sampleText,
        voiceId: voiceId
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate audio');
    }
    
    const data = await response.json();
    
    if (data.audio) {
      const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
      return audio;
    } else {
      throw new Error('No audio in response');
    }
  } catch (error) {
    console.error('Voice preview error:', error);
    throw error;
  }
};

export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'error', hasApiKey: false };
  }
};
