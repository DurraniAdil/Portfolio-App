import React, { useEffect, useState } from 'react';
import { Cpu } from 'lucide-react';

// Base URL for GitHub Pages
const BASE_URL = import.meta.env.BASE_URL || '/';
const media = (path: string) => `${BASE_URL}media/${path}`;

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing Kernel...");
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // first stage
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const increment = Math.random() * 5 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // update status text based on progress
  useEffect(() => {
    if (progress < 20) setStatusText("Initializing Kernel...");
    else if (progress < 40) setStatusText("Mounting File Systems...");
    else if (progress < 60) setStatusText("Loading User Modules...");
    else if (progress < 80) setStatusText("Establishing Network Secure Connection...");
    else if (progress < 95) setStatusText("Starting UI Subsystem...");
    else setStatusText("Ready.");

    if (progress === 100) {
      setShowLogo(true);
      setTimeout(() => {
        onFinish();
      }, 800);
    }
  }, [progress, onFinish]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-white">

      <div className={`transition-all duration-700 transform ${showLogo ? 'scale-110 opacity-100' : 'scale-100 opacity-90'}`}>
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full"></div>
          <div className="relative w-24 h-24 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden p-2">
            <img src={media('login.png')} alt="System Logo" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <div className="text-center z-10">
        <h1 className="text-2xl font-bold tracking-tighter mb-1">
          ADIL<span className="text-blue-500">.OS</span>
        </h1>
        <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] mb-12">Mobile Environment v1.0</p>
      </div>

      <div className="absolute bottom-20 w-64">
        <div className="flex justify-between text-[10px] text-neutral-400 mb-2 font-mono">
          <span>{statusText}</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="absolute bottom-6 text-[9px] text-neutral-700 font-mono">
        © 2026 ADIL DURRANI. ALL SYSTEMS NORMAL.
      </div>
    </div>
  );
};

export default SplashScreen;