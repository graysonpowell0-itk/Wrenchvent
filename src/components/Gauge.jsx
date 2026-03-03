import React from 'react';

export const Gauge = ({ level }) => {
  const rot = -90 + (level / 100) * 180;
  const gc = level > 70 ? "#EF4444" : level > 40 ? "#F59E0B" : "#4ADE80";
  
  return (
    <div style={{
      position: 'relative',
      width: 200,
      height: 120,
      margin: '0 auto'
    }}>
      <svg viewBox="0 0 200 120" width={200} height={120}>
        <defs>
          <linearGradient id="ag" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke="rgba(91,153,190,0.08)"
          strokeWidth={12}
          strokeLinecap="round"
        />
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke="url(#ag)"
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={`${(level / 100) * 251.2} 251.2`}
          style={{ transition: 'stroke-dasharray 0.5s ease' }}
        />
        <line
          x1={100}
          y1={110}
          x2={100}
          y2={40}
          stroke={gc}
          strokeWidth={3}
          strokeLinecap="round"
          style={{
            transform: `rotate(${rot}deg)`,
            transformOrigin: '100px 110px',
            transition: 'transform 0.5s ease'
          }}
        />
        <circle cx={100} cy={110} r={6} fill={gc} />
      </svg>
      <div style={{
        textAlign: 'center',
        marginTop: -4,
        fontSize: 12,
        color: 'rgba(160,185,210,0.28)',
        fontFamily: "'Courier New', monospace",
        letterSpacing: 2
      }}>
        PRESSURE
      </div>
    </div>
  );
};
