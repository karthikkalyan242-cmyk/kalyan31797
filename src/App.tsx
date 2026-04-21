/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Zap, Cpu, Activity, AlertCircle, X, Maximize2, Minimize2 } from 'lucide-react';

const MESSAGES = [
  "INITIALIZING NEURAL LINK...",
  "BYPASSING SECURITY PROTOCOLS...",
  "ACCESSING VOID LAYER...",
  "DECRYPTING CORE DATA...",
  "WARNING: SYSTEM INSTABILITY DETECTED",
  "UPLINK ESTABLISHED. WELCOME, DRUID_01.",
];

export default function App() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'terminal' | 'security'>('terminal');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < MESSAGES.length) {
        setLogs(prev => [...prev, MESSAGES[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 300);
  }, []);

  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-75 grid-bg ${isGlitching ? 'bg-neon-magenta/20' : 'bg-[#050505]'}`}>
      {/* Background Layers */}
      <div className="noise-bg" />
      <div className="scanlines-overlay" />
      
      {/* HUD Frame */}
      <div className="relative z-10 w-full max-w-4xl border-2 border-neon-cyan shadow-[4px_4px_0_#ff00ff] bg-black/90 backdrop-blur-md flex flex-col h-[80vh]">
        
        {/* Header */}
        <header className="border-b border-neon-cyan/30 p-6 flex items-center justify-between bg-black">
          <div className="flex items-center gap-4">
            <Cpu className="w-8 h-8 text-neon-cyan animate-pulse" />
            <div className="flex flex-col">
              <h1 className="text-3xl font-black tracking-widest glitch-text uppercase" data-text="NEURAL_DRIFT">NEURAL_DRIFT</h1>
              <span className="text-[10px] text-neon-magenta tracking-[0.3em] font-bold">SYSTEM_CORRUPTION_DETECTED</span>
            </div>
          </div>
          <div className="text-right font-mono">
            <p className="text-[10px] text-neon-cyan">UPLINK: ACTIVE [77.21.0.4]</p>
            <p className="text-[10px] text-neon-magenta">PROTOCOL: NEURAL_LINK_V8</p>
          </div>
        </header>

        {/* Navigation Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          <nav className="w-20 border-r border-neon-cyan/30 flex flex-col items-center py-8 gap-10 bg-black/50">
            <NavIcon
              active={activeTab === 'terminal'}
              onClick={() => { setActiveTab('terminal'); triggerGlitch(); }}
              icon={<Terminal className="w-6 h-6" />}
              label="CORE"
            />
            <NavIcon
              active={activeTab === 'status'}
              onClick={() => { setActiveTab('status'); triggerGlitch(); }}
              icon={<Shield className="w-6 h-6" />}
              label="SAFE"
            />
            <NavIcon
              active={activeTab === 'security'}
              onClick={() => { setActiveTab('security'); triggerGlitch(); }}
              icon={<Zap className="w-6 h-6" />}
              label="LINK"
            />
          </nav>

          {/* Main Content Area */}
          <main className="flex-1 p-8 overflow-y-auto relative terminal-panel">
            <AnimatePresence mode="wait">
              {activeTab === 'terminal' && (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-neon-magenta/30 pb-2">
                    <div className="flex items-center gap-2 text-neon-magenta">
                      <Terminal className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-widest uppercase truncate">{" > "}MEMORY_DUMP_STREAM</span>
                    </div>
                    <span className="text-[10px] opacity-50">ADDR: 0x00F2A1</span>
                  </div>
                  <div className="space-y-3 font-mono text-base leading-relaxed">
                    {logs.map((log, i) => (
                      <div key={i} className="flex gap-3 group">
                        <span className="opacity-30 group-hover:opacity-100 transition-opacity whitespace-nowrap">[{new Date().toLocaleTimeString()}]</span>
                        <span className={`${log.includes('WARNING') ? 'text-neon-magenta glitch-text' : 'text-neon-cyan'} break-all`}>
                          {log}
                        </span>
                      </div>
                    ))}
                    <motion.div
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-2 h-5 bg-neon-cyan inline-block translate-y-1"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'status' && (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="h-full flex flex-col justify-center items-center gap-10"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="w-56 h-56 border-2 border-dashed border-neon-magenta/40 rounded-full flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-40 h-40 border border-neon-cyan/40 rounded-full flex items-center justify-center"
                      >
                         <div className="w-20 h-20 border-2 border-neon-magenta/60 rotate-45 animate-pulse" />
                      </motion.div>
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <AlertCircle className="w-16 h-16 text-neon-magenta animate-pulse filter drop-shadow-[0_0_10px_#ff00ff]" />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <h2 className="text-5xl font-black text-neon-magenta glitch-text uppercase tracking-tighter" data-text="ACCESS_DENIED">ACCESS_DENIED</h2>
                    <p className="text-neon-cyan text-sm tracking-[0.2em] opacity-60">COOLING_FAILURE // SECTOR_7G_OFFLINE</p>
                  </div>
                  <button
                    onClick={triggerGlitch}
                    className="group relative px-10 py-4 bg-transparent border-2 border-neon-cyan text-neon-cyan font-bold tracking-widest hover:bg-neon-cyan hover:text-black transition-all flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    RETRY_HANDSHAKE
                  </button>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-2 gap-6"
                >
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="border border-neon-cyan/30 bg-black/40 p-5 relative group overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4 cursor-pointer" />
                      </div>
                      <h3 className="text-[10px] font-bold text-neon-magenta mb-4 tracking-[0.2em] uppercase">{" > "}SIGNAL_NODE_0{i}</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-[10px] mb-1 opacity-60 font-mono">
                            <span>LOAD_SEQ</span>
                            <span>{Math.floor(Math.random() * 100)}%</span>
                          </div>
                          <div className="status-bar">
                            <motion.div
                              animate={{ width: `${Math.random() * 100}%` }}
                              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                              className="status-bar-fill"
                            />
                          </div>
                        </div>
                        
                        <div className="text-[9px] opacity-40 font-mono leading-tight bg-neon-cyan/5 p-2 border-l border-neon-cyan/20">
                          TRACE: {Math.random().toString(16).substring(2, 14).toUpperCase()}...<br/>
                          STATUS: [RE-ROUTING_IP]
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t border-neon-cyan/30 px-6 py-4 flex justify-between items-center bg-black text-[10px] tracking-[0.2em] font-mono">
          <div className="flex gap-8">
            <div>LOC: <span className="text-neon-cyan">SHIBUYA_NET_01</span></div>
            <div className="hidden sm:block">SYSTIME: <span className="text-neon-magenta">20:44:01:09</span></div>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
               <span className="text-neon-magenta">GHOST_MODE</span>
               <span className="bg-neon-cyan text-black px-1 font-bold text-[8px]">ENABLED</span>
             </div>
             <div className="opacity-40">V 0.8.2_BETA</div>
          </div>
        </footer>
      </div>

      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[60] bg-gradient-to-b from-transparent via-neon-cyan/[0.02] to-transparent animate-scanline" />
    </div>
  );
}

function NavIcon({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`group relative p-3 rounded-none border-2 transition-all duration-150 ${active ? 'bg-neon-cyan text-black border-neon-cyan shadow-[0_0_15px_rgba(0,255,255,0.5)]' : 'text-neon-cyan border-transparent hover:border-neon-cyan/50'}`}
    >
      {icon}
      <span className={`absolute left-full ml-4 font-bold text-xs p-1 bg-black border border-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity z-50`}>
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="active-nav"
          className="absolute inset-[-4px] border border-neon-cyan opacity-50"
        />
      )}
    </button>
  );
}


