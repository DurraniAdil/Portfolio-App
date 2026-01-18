import React from 'react';
import { ProfileData, ActivityItem } from '../types';
import { GitCommit, Zap, Beaker, Award, PenTool, ClipboardCheck } from 'lucide-react';

interface ActivityProps {
  profile: ProfileData;
}

const ActivityIcon: React.FC<{ type: ActivityItem['type'] }> = ({ type }) => {
  switch (type) {
    case 'ship': return <div className="p-2 bg-green-500/10 text-green-500 rounded-full"><Zap size={18} /></div>;
    case 'learn': return <div className="p-2 bg-blue-500/10 text-blue-500 rounded-full"><GitCommit size={18} /></div>;
    case 'experiment': return <div className="p-2 bg-purple-500/10 text-purple-500 rounded-full"><Beaker size={18} /></div>;
    case 'award': return <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-full"><Award size={18} /></div>;
    case 'publish': return <div className="p-2 bg-amber-500/10 text-amber-500 rounded-full"><PenTool size={18} /></div>;
    case 'manage': return <div className="p-2 bg-slate-500/10 text-slate-500 rounded-full"><ClipboardCheck size={18} /></div>;
    default: return <div className="p-2 bg-neutral-500/10 text-neutral-500 rounded-full"><Zap size={18} /></div>;
  }
};

const Activity: React.FC<ActivityProps> = ({ profile }) => {
  return (
    <div className="w-full min-h-screen pb-24 pt-16 px-4 animate-fade-in bg-os-bg transition-colors duration-300">
       <header className="fixed top-0 left-0 right-0 z-30 bg-os-bg/90 backdrop-blur-md h-14 flex items-center border-b border-os-border px-4 max-w-md mx-auto transition-colors duration-300">
        <h2 className="text-xl font-bold text-os-text font-display">Activity</h2>
      </header>

      <div className="relative border-l border-os-border ml-3 my-4 space-y-8">
        {profile.activities.map((item) => (
          <div key={item.id} className="relative pl-8">
            {/* Dot on timeline */}
            <div className="absolute -left-[19px] top-1 bg-os-bg p-1 transition-colors duration-300">
                <ActivityIcon type={item.type} />
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-os-muted font-mono">{item.date}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-os-primary border border-os-primary/20 px-1.5 py-0.5 rounded">
                        {item.type}
                    </span>
                </div>
                
                <h3 className="text-base font-semibold text-os-text leading-tight">{item.title}</h3>
                <p className="text-sm text-os-muted leading-relaxed">{item.description}</p>
                
                {item.imageUrl && (
                    <div className="mt-2 w-full h-32 rounded-lg overflow-hidden border border-os-border">
                        <img src={item.imageUrl} alt="preview" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;