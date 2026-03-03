import React from 'react';
import { ThermoButton } from '../components/ThermoButton';
import { Nav } from '../components/Nav';
import { Cam, Vid, Bra, ChR, Chk, Mic } from '../components/Icons';
import { theme, fonts, categoryColors } from '../styles/theme';
import { sessions } from '../data/mockData';

export const HomeScreen = ({ go, userName }) => {
  const firstName = (userName || 'Marcus').split(' ')[0];
  
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.bg }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '64px 24px 18px' }}>
          <p style={{
            color: theme.txMut,
            fontSize: 11,
            fontFamily: fonts.mono,
            letterSpacing: 2,
            textTransform: 'uppercase',
            margin: 0
          }}>
            Good afternoon
          </p>
          <h1 style={{
            color: theme.tx,
            fontSize: 28,
            fontWeight: 800,
            margin: '6px 0 0',
            fontFamily: fonts.sans
          }}>
            {firstName} 👋
          </h1>
        </div>
        
        <div style={{ padding: '8px 24px 22px' }}>
          <ThermoButton onClick={() => go('vent')} />
        </div>
        
        <div style={{ padding: '0 24px 18px' }}>
          <button
            onClick={() => go('memory')}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: `1px solid ${theme.memBdr}`,
              borderRadius: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: theme.memSoft
            }}
          >
            <Bra size={16} color={theme.mem} />
            <span style={{ color: theme.mem, fontSize: 12, fontWeight: 700, fontFamily: fonts.mono }}>
              Memory Active
            </span>
            <span style={{ color: theme.txMut, fontSize: 10 }}>
              · 4 sessions · 3 fixes
            </span>
          </button>
        </div>
        
        <div style={{ padding: '0 24px 18px' }}>
          <p style={{
            color: theme.txMut,
            fontSize: 10,
            fontFamily: fonts.mono,
            letterSpacing: 2,
            margin: '0 0 10px'
          }}>
            QUICK ACTIONS
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button
              onClick={() => go('fix')}
              style={{
                background: theme.frost,
                border: `1px solid ${theme.bdr}`,
                borderRadius: 15,
                padding: '16px 14px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Cam size={20} color={theme.ice} />
              <div style={{ color: theme.tx, fontSize: 13, fontWeight: 700, marginTop: 9 }}>
                Snap & Solve
              </div>
              <div style={{ color: theme.txDim, fontSize: 11, marginTop: 2 }}>
                Photo troubleshoot
              </div>
            </button>
            <button
              onClick={() => go('live')}
              style={{
                background: theme.frost,
                border: `1px solid ${theme.bdr}`,
                borderRadius: 15,
                padding: '16px 14px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Vid size={20} color={theme.ice} />
              <div style={{ color: theme.tx, fontSize: 13, fontWeight: 700, marginTop: 9 }}>
                Live Assist
              </div>
              <div style={{ color: theme.txDim, fontSize: 11, marginTop: 2 }}>
                Real-time help
              </div>
            </button>
          </div>
        </div>
        
        <div style={{ padding: '0 24px' }}>
          <p style={{
            color: theme.txMut,
            fontSize: 10,
            fontFamily: fonts.mono,
            letterSpacing: 2,
            margin: '0 0 10px'
          }}>
            RECENT SESSIONS
          </p>
          {sessions.slice(0, 3).map((s, i) => (
            <button
              key={i}
              onClick={() => go('detail', s)}
              style={{
                width: '100%',
                background: theme.frost,
                border: `1px solid ${theme.bdr}`,
                borderRadius: 13,
                padding: '12px 14px',
                marginBottom: 8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: s.worked ? theme.okSoft : theme.memSoft,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {s.worked ? <Chk color={theme.ok} /> : <Mic size={15} color={theme.mem} />}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: theme.tx, fontSize: 13, fontWeight: 600 }}>
                    {s.issue || 'Vent session'}
                  </div>
                  <div style={{
                    color: theme.txDim,
                    fontSize: 11,
                    marginTop: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                    <span style={{
                      background: `${categoryColors[s.cat] || theme.mem}15`,
                      color: categoryColors[s.cat] || theme.mem,
                      padding: '1px 6px',
                      borderRadius: 4,
                      fontSize: 9,
                      fontWeight: 700
                    }}>
                      {s.cat}
                    </span>
                    {s.date}
                  </div>
                </div>
              </div>
              <ChR color={theme.txMut} />
            </button>
          ))}
        </div>
      </div>
      <Nav screen="home" go={go} />
    </div>
  );
};
