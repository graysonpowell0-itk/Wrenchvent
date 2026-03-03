import React from 'react';
import { HomI, Wre, Bra, Usr } from './Icons';
import { theme, fonts } from '../styles/theme';

export const Nav = ({ screen, go }) => {
  const items = [
    { s: 'home', ico: HomI, l: 'Home' },
    { s: 'fix', ico: Wre, l: 'Fix' },
    { s: 'memory', ico: Bra, l: 'Memory' },
    { s: 'profile', ico: Usr, l: 'Profile' }
  ];
  
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 72,
      background: `linear-gradient(to top, ${theme.bg} 70%, transparent)`,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      paddingTop: 10,
      zIndex: 50
    }}>
      {items.map(it => {
        const active = screen === it.s;
        return (
          <button
            key={it.s}
            onClick={() => go(it.s)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '6px 18px'
            }}
          >
            <it.ico size={21} color={active ? theme.ice : theme.txMut} />
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 0.8,
              color: active ? theme.ice : theme.txMut,
              fontFamily: fonts.mono
            }}>
              {it.l}
            </span>
          </button>
        );
      })}
    </div>
  );
};
