import React from 'react';
import { Nav } from '../components/Nav';
import { theme } from '../styles/theme';

// Placeholder screens - implement these with full logic from original HTML
export const FixScreen = ({ go }) => (
  <div style={{ height: '100%', background: theme.bg }}>
    <Nav screen="fix" go={go} />
  </div>
);

export const LiveScreen = ({ go }) => (
  <div style={{ height: '100%', background: theme.bg }}>
    <Nav screen="fix" go={go} />
  </div>
);

export const MemoryScreen = ({ go }) => (
  <div style={{ height: '100%', background: theme.bg }}>
    <Nav screen="memory" go={go} />
  </div>
);

export const DetailScreen = ({ s, go }) => (
  <div style={{ height: '100%', background: theme.bg }}>
    {/* Detail view for session */}
  </div>
);

export const ProfileScreen = ({ 
  go, 
  avatar, 
  setAvatar, 
  userName, 
  setUserName,
  hotel,
  setHotel,
  voice,
  setVoice,
  humeKey,
  setHumeKey
}) => (
  <div style={{ height: '100%', background: theme.bg }}>
    <Nav screen="profile" go={go} />
  </div>
);
