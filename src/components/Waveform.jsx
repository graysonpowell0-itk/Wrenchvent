import React from 'react';

export const Waveform = ({ active }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3,
      height: 55,
      padding: '0 20px'
    }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 4,
            borderRadius: 2,
            height: active ? 8 + Math.random() * 40 : 8,
            backgroundColor: active 
              ? `rgba(204,0,17,${0.4 + Math.random() * 0.6})`
              : 'rgba(91,153,190,0.1)',
            transition: active 
              ? `height ${0.1 + Math.random() * 0.15}s ease`
              : 'height 0.4s ease'
          }}
        />
      ))}
    </div>
  );
};
