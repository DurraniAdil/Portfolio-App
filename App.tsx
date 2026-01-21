import React, { useState, useEffect, useCallback } from 'react';
import HomeFeed from './views/HomeFeed';
import Explore from './views/Explore';
import Activity from './views/Activity';
import Profile from './views/Profile';
import DirectMessage from './views/DirectMessage';
import SplashScreen from './views/SplashScreen';
import LoginScreen from './views/LoginScreen';
import NavBar from './components/NavBar';
import ProjectDetailView from './components/ProjectDetailView';
import StoryModal from './components/StoryModal';
import { Tab, Project, ProfileData, ViewState, Story } from './types';
import { PROFILES } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [pendingDmMessage, setPendingDmMessage] = useState<string>('');
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);


  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = sessionStorage.getItem('portfolio_auth');
    return saved === 'true';
  });
  const [currentProfile, setCurrentProfile] = useState<ProfileData | null>(() => {
    const savedProfileId = sessionStorage.getItem('portfolio_profile');
    return savedProfileId ? PROFILES[savedProfileId] || null : null;
  });
  const [loginError, setLoginError] = useState<string>('');

  useEffect(() => {
    if (currentProfile) {
      applyTheme(currentProfile.theme);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      window.history.replaceState({ view: currentView, isApp: true }, '', `#${currentView}`);
    }

    const handlePopState = (event: PopStateEvent) => {
      if (selectedProject) {
        setSelectedProject(null);
        return;
      }
      if (isStoryOpen) {
        return;
      }

      if (currentView === 'dm') {
        setCurrentView('home');
        window.history.pushState({ view: 'home', isApp: true }, '', '#home');
        return;
      }

      if (event.state?.isApp && event.state?.view) {
        setCurrentView(event.state.view);
        return;
      }
      if (currentView !== 'home') {
        setCurrentView('home');
        window.history.pushState({ view: 'home', isApp: true }, '', '#home');
        return;
      }

      // somewhat figured out the routing issue 
      window.history.pushState({ view: 'home', isApp: true }, '', '#home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated, currentView, selectedProject, isStoryOpen]);

  const navigateTo = useCallback((view: ViewState) => {
    if (view !== currentView) {
      window.history.pushState({ view, isApp: true }, '', `#${view}`);
      setCurrentView(view);
    }
  }, [currentView]);

  const handleOpenProject = useCallback((project: Project) => {
    window.history.pushState({ view: currentView, project: true, isApp: true }, '', '#project');
    setSelectedProject(project);
  }, [currentView]);
  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  useEffect(() => {
    if (isStoryOpen) {
      window.history.pushState({ view: currentView, story: true, isApp: true }, '', '#story');

      const handleStoryBack = (event: PopStateEvent) => {
        if (!event.state?.story) {
          setIsStoryOpen(false);
        }
      };

      window.addEventListener('popstate', handleStoryBack);
      return () => window.removeEventListener('popstate', handleStoryBack);
    }
  }, [isStoryOpen, currentView]);

  const handleLogin = (password: string) => {
    const profile = PROFILES[password];
    if (profile) {
      setCurrentProfile(profile);
      setIsAuthenticated(true);
      setLoginError('');
      sessionStorage.setItem('portfolio_auth', 'true');
      sessionStorage.setItem('portfolio_profile', password);
      applyTheme(profile.theme);
      window.history.replaceState({ view: 'home', isApp: true }, '', '#home');
    } else {
      setLoginError('Access Denied. Invalid Key.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentProfile(null);
    setCurrentView('home');
    setLoginError('');
    sessionStorage.removeItem('portfolio_auth');
    sessionStorage.removeItem('portfolio_profile');
    window.history.replaceState(null, '', window.location.pathname);
  };

  const handleOpenDM = (message?: string) => {
    setPendingDmMessage(message || '');
    navigateTo('dm');
  };

  const handleBackFromDM = () => {
    setCurrentView('home');
    window.history.pushState({ view: 'home', isApp: true }, '', '#home');
  };

  const handleTabSwitch = (tab: Tab) => {
    navigateTo(tab);
  };

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

    if (theme.id === 'corporate-clean') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  };

  const renderContent = () => {
    if (currentView === 'dm') {
      return (
        <DirectMessage
          user={currentProfile!.user}
          onBack={handleBackFromDM}
          initialMessage={pendingDmMessage}
        />
      );
    }

    switch (currentView) {
      case 'home': return <HomeFeed profile={currentProfile!} onOpenProject={handleOpenProject} onOpenDM={handleOpenDM} onToggleStoryMode={setIsStoryOpen} />;
      case 'explore': return <Explore profile={currentProfile!} />;
      case 'activity': return <Activity profile={currentProfile!} />;
      case 'profile': return <Profile profile={currentProfile!} onLogout={handleLogout} onOpenStory={() => {
        if (currentProfile!.stories.length > 0) {
          setSelectedStory(currentProfile!.stories[0]);
          setIsStoryOpen(true);
        }
      }} />;
      default: return <HomeFeed profile={currentProfile!} onOpenProject={handleOpenProject} onOpenDM={handleOpenDM} onToggleStoryMode={setIsStoryOpen} />;
    }
  };

  if (loading) {
    if (isAuthenticated && currentProfile) {
      setLoading(false);
      return null;
    }
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  if (!isAuthenticated || !currentProfile) {
    return <LoginScreen onLogin={handleLogin} onReboot={() => setLoading(true)} error={loginError} />;
  }
  return (
    <div className="relative bg-os-bg min-h-screen text-os-text font-sans overflow-hidden transition-colors duration-500">

      <div className="max-w-md mx-auto h-screen relative bg-os-bg shadow-2xl overflow-hidden flex flex-col transition-colors duration-500">

        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative bg-os-bg">
          {renderContent()}
        </main>

        {currentView !== 'dm' && !isStoryOpen && (
          <NavBar activeTab={currentView as Tab} onSwitch={handleTabSwitch} />
        )}

        {selectedProject && (
          <ProjectDetailView
            project={selectedProject}
            onClose={handleCloseProject}
          />
        )}

        {selectedStory && (
          <StoryModal
            story={selectedStory}
            onClose={() => {
              setSelectedStory(null);
              setIsStoryOpen(false);
            }}
            onReply={(msg) => {
              setSelectedStory(null);
              setIsStoryOpen(false);
              handleOpenDM(msg);
            }}
          />
        )}
      </div>

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