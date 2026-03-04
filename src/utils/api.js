// API utility for making requests to the backend
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// ============ TTS/Voice ============

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

// ============ User Management ============

export const getOrCreateUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    
    if (!response.ok) throw new Error('Failed to get user');
    return await response.json();
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};

export const updateUser = async (userId, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};

// ============ Sessions ============

export const getSessions = async (userId, options = {}) => {
  try {
    const params = new URLSearchParams({
      limit: options.limit || 50,
      ...(options.type && { type: options.type })
    });
    
    const response = await fetch(`${API_BASE_URL}/api/sessions/${userId}?${params}`);
    
    if (!response.ok) throw new Error('Failed to fetch sessions');
    return await response.json();
  } catch (error) {
    console.error('Get sessions error:', error);
    throw error;
  }
};

export const createSession = async (sessionData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData)
    });
    
    if (!response.ok) throw new Error('Failed to create session');
    return await response.json();
  } catch (error) {
    console.error('Create session error:', error);
    throw error;
  }
};

export const updateSession = async (sessionId, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    
    if (!response.ok) throw new Error('Failed to update session');
    return await response.json();
  } catch (error) {
    console.error('Update session error:', error);
    throw error;
  }
};

export const deleteSession = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) throw new Error('Failed to delete session');
    return await response.json();
  } catch (error) {
    console.error('Delete session error:', error);
    throw error;
  }
};

// ============ Stats ============

export const getUserStats = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stats/${userId}`);
    
    if (!response.ok) throw new Error('Failed to fetch stats');
    return await response.json();
  } catch (error) {
    console.error('Get stats error:', error);
    throw error;
  }
};

// ============ Health Check ============

export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'error', hasApiKey: false, database: false };
  }
};
