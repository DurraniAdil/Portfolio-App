import React, { useState, useEffect } from 'react';
import HomeFeed from './views/HomeFeed';
import Explore from './views/Explore';
import Activity from './views/Activity';
import Profile from './views/Profile';
import DirectMessage from './views/DirectMessage';
import SplashScreen from './views/SplashScreen';
import LoginScreen from './views/LoginScreen';
import NavBar from './components/NavBar';
import ProjectDetailView from './components/ProjectDetailView';
import { Tab, Project, ProfileData, ViewState } from './types';
import { PROFILES } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home'); // Manages Tab + DM view
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [pendingDmMessage, setPendingDmMessage] = useState<string>('');
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<ProfileData | null>(null);
  const [loginError, setLoginError] = useState<string>('');

  // Handle Login
  const handleLogin = (password: string) => {
    const profile = PROFILES[password];
    if (profile) {
      // Remove setLoading(true) here to prevent the splash screen (boot sequence) 
      // from running again after the profile-specific login animation.
      setCurrentProfile(profile);
      setIsAuthenticated(true);
      setLoginError('');
      // Apply theme CSS variables
      applyTheme(profile.theme);
    } else {
      setLoginError('Access Denied. Invalid Key.');
    }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      setCurrentProfile(null);
      setCurrentView('home');
      setLoginError('');
  };

  const handleOpenDM = (message?: string) => {
      setPendingDmMessage(message || '');
      setCurrentView('dm');
  };

  // CSS Variable Injection for Theming
  const applyTheme = (theme: ProfileData['theme']) => {
    const root = document.documentElement;
    const { colors, fonts } = theme;
    
    root.style.setProperty('--bg-color', colors.bg);
    root.style.setProperty('--card-color', colors.card);
    root.style.setProperty('--border-color', colors.border);
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--accent-color', colors.accent);
    root.style.setProperty('--text-color', colors.text);
    root.style.setProperty('--muted-color', colors.muted);
    
    root.style.setProperty('--font-body', fonts.body);
    root.style.setProperty('--font-display', fonts.display);

    // Toggle dark mode class based on profile for Tailwind utilities that rely on 'dark'
    if (theme.id === 'corporate-clean') {
        root.classList.remove('dark');
    } else {
        root.classList.add('dark');
    }
  };

  // Main Render Logic
  const renderContent = () => {
      if (currentView === 'dm') {
          return (
            <DirectMessage 
                user={currentProfile!.user} 
                onBack={() => setCurrentView('home')} 
                initialMessage={pendingDmMessage}
            />
          );
      }
      
      switch (currentView) {
        case 'home': return <HomeFeed profile={currentProfile!} onOpenProject={setSelectedProject} onOpenDM={handleOpenDM} onToggleStoryMode={setIsStoryOpen} />;
        case 'explore': return <Explore profile={currentProfile!} />;
        case 'activity': return <Activity profile={currentProfile!} />;
        case 'profile': return <Profile profile={currentProfile!} onLogout={handleLogout} />;
        default: return <HomeFeed profile={currentProfile!} onOpenProject={setSelectedProject} onOpenDM={handleOpenDM} onToggleStoryMode={setIsStoryOpen} />;
      }
  };

  // Initial Splash
  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  // Login View
  if (!isAuthenticated || !currentProfile) {
    return <LoginScreen onLogin={handleLogin} error={loginError} />;
  }

  // Authenticated App View
  return (
    <div className="relative bg-os-bg min-h-screen text-os-text font-sans overflow-hidden transition-colors duration-500">
      {/* Container constrained to mobile max-width for desktop viewing convenience */}
      <div className="max-w-md mx-auto h-screen relative bg-os-bg shadow-2xl overflow-hidden flex flex-col transition-colors duration-500">
        
        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative bg-os-bg">
            {renderContent()}
        </main>

        {/* Bottom Navigation - Hide if in DM view or Story is open */}
        {currentView !== 'dm' && !isStoryOpen && (
            <NavBar activeTab={currentView as Tab} onSwitch={(t) => setCurrentView(t)} />
        )}

        {/* Project Detail Overlay */}
        {selectedProject && (
          <ProjectDetailView 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </div>

      {/* Desktop Helper Background */}
      <div className="hidden lg:block fixed inset-0 -z-10 bg-neutral-900 pointer-events-none transition-all duration-700"
           style={{ backgroundColor: currentProfile.theme.colors.bg === '#09090b' ? '#111' : '#ccc' }}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-os-text font-bold text-6xl opacity-10 font-display tracking-tighter uppercase">
                {currentProfile.id} OS
            </h2>
        </div>
      </div>
    </div>
  );
};

export default App;