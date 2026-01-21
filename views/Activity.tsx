import React, { useState } from 'react';
import { ProfileData, ActivityItem } from '../types';
import { GitCommit, Zap, Beaker, Award, PenTool, ClipboardCheck, ChevronDown, Radar } from 'lucide-react';

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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full min-h-screen pb-24 pt-16 px-4 animate-fade-in bg-os-bg transition-colors duration-300">
      <header className="fixed top-0 left-0 right-0 z-30 bg-os-bg/90 backdrop-blur-md h-14 flex items-center border-b border-os-border px-4 max-w-md mx-auto transition-colors duration-300">
        <h2 className="text-xl font-bold text-os-text font-display">Activity</h2>
      </header>

      <div className="relative border-l border-os-border ml-3 my-4 space-y-4">
        {profile.activities.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div key={item.id} className="relative pl-8">
              {/* dot*/}
              <div className="absolute -left-[19px] top-1 bg-os-bg p-1 transition-colors duration-300">
                <ActivityIcon type={item.type} />
              </div>

              {/* cards click*/}
              <div
                onClick={() => toggleExpand(item.id)}
                className="cursor-pointer group"
              >
                <div className="flex flex-col gap-2 p-3 -ml-3 rounded-lg hover:bg-os-card/50 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-os-muted font-mono">{item.date}</span>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-os-primary border border-os-primary/20 px-1.5 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-os-muted transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>

                  <h3 className="text-base font-semibold text-os-text leading-tight group-hover:text-os-primary transition-colors">
                    {item.title}
                  </h3>

                  {/* accordion */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <p className="text-sm text-os-muted leading-relaxed pt-1 pb-2">
                      {item.description}
                    </p>

                    {item.imageUrl && (
                      <div className="mt-2 w-full h-32 rounded-lg overflow-hidden border border-os-border">
                        <img src={item.imageUrl} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Radar link button */}
                    {item.link && (
                      <div className={`mt-3 flex justify-end transition-all duration-500 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(item.link, '_blank', 'noopener,noreferrer');
                          }}
                          className="group/radar relative p-2.5 bg-os-primary/10 hover:bg-os-primary/20 border border-os-primary/30 hover:border-os-primary/50 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                          title="View Project"
                        >
                          {/* Radar pulse animation */}
                          <span className="absolute inset-0 rounded-full bg-os-primary/20 animate-ping" />
                          <Radar size={18} className="relative z-10 text-os-primary group-hover/radar:rotate-45 transition-transform duration-300" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activity;