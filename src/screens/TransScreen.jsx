import React, { useState, useEffect } from 'react';
import { Wre, HomI } from '../components/Icons';
import { theme, fonts } from '../styles/theme';

export const TransScreen = ({ go }) => {
  const [step, setStep] = useState(0);
  const [showBtns, setShowBtns] = useState(false);
  
  const msgs = [
    "I hear you, man.",
    "That sounds really frustrating.",
    "Take a deep breath for me.",
    "Feeling better?"
  ];
  
  useEffect(() => {
    const timeouts = msgs.map((_, i) => 
      setTimeout(() => setStep(i + 1), (i + 1) * 2000)
    );
    const btnTimeout = setTimeout(() => setShowBtns(true), msgs.length * 2000 + 500);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(btnTimeout);
    };
  }, []);
  
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `radial-gradient(ellipse at 50% 30%, ${theme.iceGlow} 0%, ${theme.bg} 70%)`,
      padding: '0 32px',
      textAlign: 'center'
    }}>
      <div style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        marginBottom: 32,
        background: `linear-gradient(135deg, ${theme.ice}, #3a7a9e)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 40px ${theme.iceGlow}`
      }}>
        <span style={{ fontSize: 36 }}>🎧</span>
      </div>
      
      <div style={{ minHeight: 140 }}>
        {msgs.slice(0, step).map((m, i) => (
          <p
            key={i}
            style={{
              color: i === step - 1 ? theme.tx : 'rgba(180,200,220,0.25)',
              fontSize: i === step - 1 ? 20 : 16,
              fontWeight: i === step - 1 ? 700 : 400,
              margin: '0 0 16px',
              transition: 'all 0.6s ease',
              lineHeight: 1.4,
              fontFamily: fonts.sans
            }}
          >
            {m}
          </p>
        ))}
      </div>
      
      {!showBtns ? (
        <div style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          marginTop: 24,
          background: theme.iceSoft,
          border: `2px solid rgba(91,153,190,0.2)`,
          animation: 'breathe 4s ease-in-out infinite'
        }} />
      ) : (
        <div style={{
          marginTop: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          width: '100%',
          maxWidth: 280
        }}>
          <button
            onClick={() => go('fix')}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: 14,
              border: 'none',
              cursor: 'pointer',
              background: `linear-gradient(135deg, ${theme.ice}, #3a7a9e)`,
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              fontFamily: fonts.sans,
              boxShadow: `0 4px 20px ${theme.iceGlow}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            <Wre size={18} color="#fff" />
            Help me fix something
          </button>
          <button
            onClick={() => go('home')}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: 14,
              border: `1px solid ${theme.bdr}`,
              cursor: 'pointer',
              background: theme.frost,
              color: theme.txDim,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: fonts.sans,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            <HomI size={16} color={theme.txDim} />
            Just needed to vent — I'm good
          </button>
        </div>
      )}
    </div>
  );
};
