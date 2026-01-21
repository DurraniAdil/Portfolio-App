import React from 'react';
import { Home, Search, Activity, User } from 'lucide-react';
import { Tab } from '../types';

interface NavBarProps {
  activeTab: Tab;
  onSwitch: (tab: Tab) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeTab, onSwitch }) => {
  const navItems: { id: Tab; icon: React.FC<any> }[] = [
    { id: 'home', icon: Home },
    { id: 'explore', icon: Search },
    { id: 'activity', icon: Activity },
    { id: 'profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-os-bg border-t border-os-border h-[40px] pb-safe-bottom safe-bottom max-w-md mx-auto">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSwitch(item.id)}
              className="relative p-3 flex flex-col items-center justify-center transition-all duration-300 active:scale-90"
            >
              <Icon
                size={18}
                className={`transition-colors duration-300 ${isActive ? 'text-os-text' : 'text-os-muted'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;