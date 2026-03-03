import React, { useRef, useEffect } from 'react';
import { Mic } from './Icons';
import { theme, fonts } from '../styles/theme';
import { drawRoundedRect } from '../utils/canvas';

export const ThermoButton = ({ onClick }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const W = 342, H = 100;
    canvas.width = W * 2;
    canvas.height = H * 2;
    ctx.scale(2, 2);
    
    let frame = 0;
    let running = true;
    const bubbles = [];
    
    for (let i = 0; i < 14; i++) {
      bubbles.push({
        x: 22 + Math.random() * 10,
        y: H - 20,
        s: 1 + Math.random() * 2.5,
        sp: 0.5 + Math.random() * 1.5,
        l: Math.random()
      });
    }
    
    function resetBubble(b) {
      b.x = 22 + Math.random() * 10;
      b.y = H - 20;
      b.s = 1 + Math.random() * 2.5;
      b.sp = 0.5 + Math.random() * 1.5;
      b.l = 0;
    }
    
    function draw() {
      if (!running) return;
      frame++;
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      drawRoundedRect(ctx, 0, 0, W, H, 18);
      ctx.clip();
      
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#080D12");
      bg.addColorStop(1, "#060A0E");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      
      const temp = 0.7 + Math.sin(frame * 0.025) * 0.15 + 
                    Math.sin(frame * 0.07) * 0.08 + 
                    Math.sin(frame * 0.13) * 0.04;
      const t = Math.min(1, Math.max(0, temp));
      
      const tubeX = 24, tubeW = 10, tubeTop = 10, tubeBot = H - 28;
      const tubeH = tubeBot - tubeTop;
      const bCx = tubeX + tubeW / 2, bCy = H - 16, bR = 14;
      
      drawRoundedRect(ctx, tubeX, tubeTop, tubeW, tubeH, 5);
      ctx.fillStyle = "rgba(91,153,190,0.04)";
      ctx.fill();
      
      ctx.fillStyle = "rgba(91,153,190,0.04)";
      ctx.beginPath();
      ctx.arc(bCx, bCy, bR, 0, Math.PI * 2);
      ctx.fill();
      
      const fH = tubeH * t;
      const mg = ctx.createLinearGradient(0, tubeBot, 0, tubeBot - fH);
      mg.addColorStop(0, "#FF1A1A");
      mg.addColorStop(0.5, "#FF3300");
      mg.addColorStop(1, t > 0.85 ? "#FF0000" : "#E84400");
      ctx.fillStyle = mg;
      drawRoundedRect(ctx, tubeX + 1, tubeBot - fH, tubeW - 2, fH, 4);
      ctx.fill();
      
      const bG = ctx.createRadialGradient(bCx, bCy, 0, bCx, bCy, bR);
      const hot = 0.7 + t * 0.3;
      bG.addColorStop(0, `rgba(255,${Math.floor(180 - t * 160)},${Math.floor(50 - t * 50)},${hot})`);
      bG.addColorStop(0.6, `rgba(220,20,10,${hot * 0.8})`);
      bG.addColorStop(1, `rgba(150,10,5,${hot * 0.4})`);
      ctx.fillStyle = bG;
      ctx.beginPath();
      ctx.arc(bCx, bCy, bR - 1, 0, Math.PI * 2);
      ctx.fill();
      
      const oG = ctx.createRadialGradient(bCx, bCy, bR, bCx, bCy, bR * 3);
      oG.addColorStop(0, `rgba(255,50,10,${0.15 + t * 0.15})`);
      oG.addColorStop(1, "transparent");
      ctx.fillStyle = oG;
      ctx.beginPath();
      ctx.arc(bCx, bCy, bR * 3, 0, Math.PI * 2);
      ctx.fill();
      
      for (let i = 0; i <= 10; i++) {
        const y = tubeTop + (tubeH / 10) * i;
        const passed = (10 - i) / 10 <= t;
        ctx.fillStyle = passed 
          ? `rgba(255,${Math.floor(200 - (10 - i) * 18)},0,0.6)`
          : "rgba(91,153,190,0.08)";
        ctx.fillRect(tubeX + tubeW + 4, y, i % 2 === 0 ? 10 : 6, 1.5);
      }
      
      const deg = Math.floor(t * 400 + 120 + Math.sin(frame * 0.1) * 8);
      ctx.save();
      ctx.font = `bold 13px ${fonts.mono}`;
      ctx.fillStyle = t > 0.8 
        ? `rgba(255,${Math.floor(60 - t * 50)},20,0.95)`
        : "rgba(91,153,190,0.5)";
      ctx.textAlign = "left";
      ctx.fillText(`${deg}°F`, tubeX + tubeW + 18, H - 14);
      ctx.restore();
      
      if (t > 0.82 && Math.sin(frame * 0.25) > 0) {
        ctx.save();
        ctx.font = `bold 9px ${fonts.mono}`;
        ctx.fillStyle = `rgba(255,40,20,${0.6 + Math.sin(frame * 0.15) * 0.4})`;
        ctx.textAlign = "left";
        ctx.fillText("⚠ OVERHEAT", tubeX + tubeW + 18, tubeTop + 16);
        ctx.restore();
      }
      
      for (let j = 0; j < bubbles.length; j++) {
        const b = bubbles[j];
        b.y -= b.sp;
        b.x += Math.sin(frame * 0.08 + b.y * 0.1) * 0.3;
        b.l += 0.015;
        if (b.l > 1 || b.y < tubeBot - fH) resetBubble(b);
        ctx.save();
        ctx.globalAlpha = (1 - b.l) * 0.5;
        ctx.fillStyle = "rgba(255,200,150,0.6)";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.s, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      if (t > 0.7) {
        const sa = (t - 0.7) * 0.2;
        for (let k = 0; k < 3; k++) {
          const sy = (frame * 0.8 + k * 33) % H;
          ctx.save();
          ctx.globalAlpha = sa * (0.3 + Math.sin(frame * 0.05 + k) * 0.2);
          ctx.fillStyle = "rgba(255,80,20,0.06)";
          ctx.fillRect(0, sy, W, 2);
          ctx.restore();
        }
      }
      
      if (t > 0.88 && Math.sin(frame * 0.2) > 0.3) {
        ctx.save();
        ctx.globalAlpha = 0.04;
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }
      
      ctx.restore();
      requestAnimationFrame(draw);
    }
    
    requestAnimationFrame(draw);
    return () => { running = false; };
  }, []);
  
  return (
    <div onClick={onClick} style={{
      position: 'relative',
      borderRadius: 18,
      overflow: 'visible',
      cursor: 'pointer'
    }}>
      <div style={{
        position: 'absolute',
        inset: -8,
        borderRadius: 26,
        background: `radial-gradient(ellipse at 10% 80%, ${theme.redGlow} 0%, transparent 55%)`,
        animation: 'thermoGlow 2.5s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'relative',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: `0 4px 30px ${theme.redGlow}`
      }}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: 100,
            display: 'block',
            borderRadius: 18
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '0 20px 0 64',
          zIndex: 2
        }}>
          <div style={{
            width: 50,
            height: 50,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Mic size={26} color="#fff" />
          </div>
          <div>
            <div style={{
              color: '#fff',
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: 0.8,
              fontFamily: fonts.mono,
              textShadow: '0 0 20px rgba(204,0,17,0.6)'
            }}>
              LET IT OUT
            </div>
            <div style={{
              color: 'rgba(205,216,228,0.55)',
              fontSize: 12,
              marginTop: 2,
              fontFamily: fonts.sans
            }}>
              Before you boil over — tap here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
