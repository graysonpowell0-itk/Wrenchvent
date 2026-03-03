import React, { useState } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { VentScreen } from './screens/VentScreen';
import { TransScreen } from './screens/TransScreen';
import { 
  FixScreen, 
  LiveScreen, 
  MemoryScreen, 
  DetailScreen, 
  ProfileScreen 
} from './screens/OtherScreens';
import { Wre } from './components/Icons';
import { theme, fonts } from './styles/theme';

function App() {
  const [screen, setScreen] = useState('home');
  const [detail, setDetail] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState('Marcus Johnson');
  const [hotel, setHotel] = useState('Grand Hyatt');
  const [voice, setVoice] = useState('ito');
  const [humeKey, setHumeKey] = useState('');
  
  const go = (s, data) => {
    if (s === 'detail' && data) setDetail(data);
    setScreen(s);
  };
  
  let content;
  switch (screen) {
    case 'home':
      content = <HomeScreen go={go} userName={userName} />;
      break;
    case 'vent':
      content = <VentScreen go={go} />;
      break;
    case 'transition':
      content = <TransScreen go={go} />;
      break;
    case 'fix':
      content = <FixScreen go={go} />;
      break;
    case 'live':
      content = <LiveScreen go={go} />;
      break;
    case 'memory':
      content = <MemoryScreen go={go} />;
      break;
    case 'detail':
      content = <DetailScreen s={detail} go={go} />;
      break;
    case 'profile':
      content = (
        <ProfileScreen
          go={go}
          avatar={avatar}
          setAvatar={setAvatar}
          userName={userName}
          setUserName={setUserName}
          hotel={hotel}
          setHotel={setHotel}
          voice={voice}
          setVoice={setVoice}
          humeKey={humeKey}
          setHumeKey={setHumeKey}
        />
      );
      break;
    default:
      content = <HomeScreen go={go} userName={userName} />;
  }
  
  return (
    <div style={{
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 8
        }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            background: `linear-gradient(135deg, ${theme.red}, #a00010)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 20px ${theme.redGlow}`
          }}>
            <Wre size={20} color="#fff" />
          </div>
          <h1 style={{
            color: theme.tx,
            fontSize: 30,
            fontWeight: 800,
            margin: 0,
            fontFamily: fonts.mono
          }}>
            Wrench<span style={{ color: theme.red }}>Vent</span>
          </h1>
        </div>
        <p style={{ color: theme.txDim, fontSize: 14, margin: 0 }}>
          Vent. Breathe. Fix it. <span style={{ color: theme.mem }}>Remember.</span>
        </p>
      </div>
      
      <div style={{
        width: 390,
        height: 844,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        background: theme.bg,
        boxShadow: `0 0 0 3px #141C24, 0 0 0 6px #080C10, 0 30px 80px rgba(0,0,0,0.7)`
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          fontSize: 13,
          fontWeight: 700,
          color: theme.txDim,
          fontFamily: fonts.mono
        }}>
          <span>9:41</span>
          <div style={{
            width: 16,
            height: 10,
            border: `1.5px solid ${theme.txMut}`,
            borderRadius: 2,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: 1.5,
              left: 1.5,
              bottom: 1.5,
              width: '70%',
              background: theme.txDim,
              borderRadius: 1
            }} />
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 126,
          height: 34,
          background: '#000',
          borderRadius: '0 0 20px 20px',
          zIndex: 101
        }} />
        
        <div style={{ height: '100%', overflow: 'hidden' }}>
          {content}
        </div>
      </div>
      
      <p style={{
        color: theme.txMut,
        fontSize: 11,
        marginTop: 20,
        fontFamily: fonts.mono
      }}>
        ↑ Interactive prototype — tap to explore
      </p>
    </div>
  );
}

export default App;
