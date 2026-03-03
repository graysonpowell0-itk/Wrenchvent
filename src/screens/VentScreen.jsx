import React, { useState, useEffect, useRef } from 'react';
import { XI, Mic, HomI } from '../components/Icons';
import { Gauge } from '../components/Gauge';
import { Waveform } from '../components/Waveform';
import { theme, fonts } from '../styles/theme';

export const VentScreen = ({ go }) => {
  const [on, setOn] = useState(false);
  const [pressure, setPressure] = useState(0);
  const [time, setTime] = useState(0);
  const [waveActive, setWaveActive] = useState(false);
  const interval1 = useRef(null);
  const interval2 = useRef(null);
  
  const start = () => {
    setOn(true);
    setWaveActive(true);
    setPressure(85);
    interval1.current = setInterval(() => {
      setTime(x => x + 1);
      setPressure(x => Math.max(10, x - 0.8));
    }, 1000);
    interval2.current = setInterval(() => {
      setWaveActive(a => !a);
    }, 200);
  };
  
  const stop = () => {
    clearInterval(interval1.current);
    clearInterval(interval2.current);
    setOn(false);
    setWaveActive(false);
    setTimeout(() => go('transition'), 600);
  };
  
  useEffect(() => {
    return () => {
      clearInterval(interval1.current);
      clearInterval(interval2.current);
    };
  }, []);
  
  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: on 
        ? `radial-gradient(ellipse at center, rgba(204,0,17,${0.03 + (pressure / 100) * 0.1}) 0%, ${theme.bg} 70%)`
        : theme.bg,
      transition: 'background 1s',
      padding: '0 24px',
      textAlign: 'center'
    }}>
      <button
        onClick={() => go('home')}
        style={{
          position: 'absolute',
          top: 56,
          right: 20,
          background: theme.frost,
          border: `1px solid ${theme.bdr}`,
          borderRadius: 12,
          width: 36,
          height: 36,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <XI color={theme.txDim} />
      </button>
      
      {!on ? (
        <>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{
              color: theme.tx,
              fontSize: 26,
              fontWeight: 800,
              margin: '0 0 8px',
              fontFamily: fonts.sans
            }}>
              Ready to vent?
            </h2>
            <p style={{ color: theme.txDim, fontSize: 14, margin: 0, lineHeight: 1.5 }}>
              Tap the button and let it all out.<br />No judgment. Just you.
            </p>
          </div>
          <button
            onClick={start}
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              background: `radial-gradient(circle at 40% 40%, #FF2020, ${theme.red})`,
              boxShadow: `0 0 60px ${theme.redGlow}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Mic size={48} color="#fff" />
          </button>
        </>
      ) : (
        <>
          <Gauge level={pressure} />
          <div style={{ margin: '20px 0 14px' }}>
            <Waveform active={waveActive} />
          </div>
          <p style={{
            color: theme.txDim,
            fontSize: 13,
            margin: '0 0 4px',
            fontFamily: fonts.mono
          }}>
            LISTENING — {formatTime(time)}
          </p>
          <p style={{ color: theme.txMut, fontSize: 12, margin: '0 0 28px' }}>
            Take your time.
          </p>
          <button
            onClick={stop}
            style={{
              width: 110,
              height: 110,
              borderRadius: '50%',
              border: '3px solid rgba(204,0,17,0.4)',
              background: 'rgba(204,0,17,0.06)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 4
            }}
          >
            <div style={{ width: 26, height: 26, borderRadius: 6, background: theme.red }} />
            <span style={{
              color: theme.txDim,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              fontFamily: fonts.mono
            }}>
              DONE
            </span>
          </button>
        </>
      )}
    </div>
  );
};
