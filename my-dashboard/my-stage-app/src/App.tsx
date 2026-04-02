// Loc: C:/Users/richa/Desktop/
// stagetrack-v2/my-dashboard/
// my-stage-app/src/App.tsx
// 31-MAR-2026 | W: 2"

import React, { useState } from 'react';

export default function App() {
  const [active, setActive] = useState<string | null>(null);

  // Unified gap for perfect alignment across all axes
  const GAP = '12px';

  const Peo = ({ id }: { id: string }) => {
    const isActive = active === id;
    return (
      <button 
        onClick={() => setActive(id)}
        style={{
          width: '100%',
          aspectRatio: '18/9', 
          backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(24, 24, 27, 0.6)',
          border: `1px solid ${isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)'}`,
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          outline: 'none'
        }}
      >
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: isActive ? '#60a5fa' : 'rgba(255, 255, 255, 0.2)',
          marginBottom: '2px'
        }} />
        <span style={{ fontSize: '9px', color: '#fff', fontFamily: 'monospace' }}>{id}</span>
      </button>
    );
  };

  return (
    <div style={{ 
      height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', 
      backgroundColor: '#000', color: '#fff', overflow: 'hidden', fontFamily: 'sans-serif'
    }}>
      
      {/* BANNER */}
      <div style={{ 
        height: '80px', width: '100%', backgroundColor: '#111', 
        borderBottom: '1px solid #222', display: 'flex', alignItems: 'center'
      }}>
        <div style={{ padding: '0 20px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Header text constrained to a single 2-inch column */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            width: '2in',
            overflowWrap: 'break-word'
          }}>
            <span style={{ color: '#555', fontWeight: '900', fontSize: '11px', letterSpacing: '2px', lineHeight: '1.2' }}>
              GOLD STANDARD STAGE
            </span>
            <span style={{ color: '#333', fontSize: '9px', marginTop: '2px' }}>
              W: 2" | MAR 31, 2026
            </span>
          </div>
          {active && <span style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 'bold' }}>LIVE: {active}</span>}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* SIDEBARS */}
        <div style={{ width: '45px', backgroundColor: 'rgba(255,255,255,0.02)', borderRight: '1px solid #222' }} />

        {/* MAIN STAGE GRID */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          padding: GAP, 
          gap: GAP, 
          justifyContent: 'space-between' 
        }}>
          
          {/* NORTH ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: GAP }}>
            {["N1", "N2", "N3", "N4", "N5"].map(id => <Peo key={id} id={id} />)}
          </div>

          {/* MIDDLE AREA */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 3fr 1fr', 
            gap: GAP, 
            flex: 1 
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, justifyContent: 'center' }}>
              <Peo id="W1" />
              <Peo id="W2" />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ 
                width: '100%', height: '100%', border: '1px solid #222', 
                borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#050505'
              }}>
                <span style={{ opacity: 0.1, fontSize: '3rem', fontWeight: 900, fontStyle: 'italic' }}>
                  {active || "STAGE"}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, justifyContent: 'center' }}>
              <Peo id="E1" />
              <Peo id="E2" />
            </div>
          </div>

          {/* SOUTH ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: GAP }}>
            {["S1", "S2", "S3", "S4", "S5"].map(id => <Peo key={id} id={id} />)}
          </div>

        </div>

        <div style={{ width: '45px', backgroundColor: 'rgba(255,255,255,0.02)', borderLeft: '1px solid #222' }} />
      </div>
    </div>
  );
}