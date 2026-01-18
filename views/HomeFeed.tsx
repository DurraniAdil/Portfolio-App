import React, { useState, useEffect, useRef } from 'react';
import { Project, ProfileData, Story } from '../types';
import { Heart, MessageCircle, MoreHorizontal, ExternalLink, Send, X, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Button, Tag } from '../components/UI';

interface HomeFeedProps {
  profile: ProfileData;
  onOpenProject: (project: Project) => void;
  onOpenDM: (message?: string) => void;
  onToggleStoryMode?: (isOpen: boolean) => void;
}

const StoryModal: React.FC<{ story: Story; onClose: () => void; onReply: (msg: string) => void }> = ({ story, onClose, onReply }) => {
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [inputText, setInputText] = useState("");
  const DURATION = 15000; // 15 seconds per story

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        onClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onClose]);

  const handleInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputText.trim()) {
      onReply(inputText);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-fade-in">
      {/* Story Header / Progress */}
      <div className="absolute top-0 left-0 right-0 z-20 p-2 pt-safe-top">
        <div className="h-1 bg-white/30 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-white transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${story.color} p-[1.5px]`}>
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-sm overflow-hidden">
                {story.avatarImage ? (
                  <img src={story.avatarImage} alt={story.label} className="w-full h-full object-cover" />
                ) : (
                  story.icon
                )}
              </div>
            </div>
            <span className="font-bold text-white text-sm">{story.label}</span>
            <span className="text-white/60 text-xs">1h</span>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Story Content - Full Screen Aesthetic */}
      <div className={`flex-1 flex flex-col items-center justify-center relative overflow-hidden ${story.color}`}>
        {story.storyImage ? (
          <>
            {/* Blurred Background Layer */}
            <img src={story.storyImage} alt="Background" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-50 scale-110" />
            {/* Main Content Layer - Responsive Contain */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
              <img
                src={story.storyImage}
                alt="Story"
                className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-lg"
              />
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
            <div className="relative z-10 p-8 w-full max-w-md text-center">
              <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-5xl mb-8 shadow-2xl border border-white/20">
                {story.icon}
              </div>

              <h2 className="text-3xl font-bold text-white mb-8 font-display tracking-tight">{story.label}</h2>

              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl text-left space-y-4">
                {story.content.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                    <p className="text-white font-medium text-lg leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Interactive Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 flex items-center gap-4 z-20 safe-bottom">
        <div className="flex-1 h-11 border border-white/30 rounded-full flex items-center px-1 bg-black/20 backdrop-blur-sm">
          <input
            type="text"
            placeholder="Send message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleInputKey}
            className="w-full bg-transparent border-none text-white text-sm px-4 focus:outline-none placeholder:text-white/70"
          />
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className={`transition-transform active:scale-75 ${liked ? 'text-red-500' : 'text-white'}`}
        >
          <Heart size={28} fill={liked ? "currentColor" : "none"} />
        </button>
        <button
          onClick={() => onReply("tuff")}
          className="text-white hover:text-os-accent transition-colors active:scale-90"
        >
          <Send size={28} className="-rotate-12" />
        </button>
      </div>
    </div>
  );
}

const ProjectCard: React.FC<{ project: Project; onOpen: () => void; onDM: (msg: string) => void }> = ({ project, onOpen, onDM }) => {
  const [liked, setLiked] = useState(false);
  const [showBigHeart, setShowBigHeart] = useState(false);
  const [likesCount, setLikesCount] = useState(project.stats.likes);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comments, setComments] = useState<{ user: string, text: string }[]>([]);
  const [commentInput, setCommentInput] = useState("");

  const handleDoubleTap = () => {
    if (!liked) {
      setLikesCount(p => p + 1);
      setLiked(true);
    }
    setShowBigHeart(true);
    setTimeout(() => setShowBigHeart(false), 800);
  };

  const [isHidden, setIsHidden] = useState(false);
  const [isReported, setIsReported] = useState(false); // Track if specifically reported
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLike = () => {
    if (liked) {
      setLikesCount(p => p - 1);
      setLiked(false);
    } else {
      setLikesCount(p => p + 1);
      setLiked(true);
      setShowBigHeart(true);
      setTimeout(() => setShowBigHeart(false), 800);
    }
  }

  const toggleHide = () => {
    setIsHidden(!isHidden);
    setShowOptions(false);
  };

  const handleReport = () => {
    setIsReported(true);
    setIsHidden(true);
    setShowOptions(false);
  };

  const handlePostComment = () => {
    if (!commentInput.trim()) return;
    setComments([...comments, { user: 'guest_user', text: commentInput }]);
    setCommentInput("");
  };

  return (
    <article className="w-full bg-os-bg border-b border-os-border pb-6 mb-2 transition-all duration-300 relative">

      {/* Hidden Overlay */}
      {isHidden && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <EyeOff size={48} className="text-white mb-4 opacity-50" />
          <p className="text-white text-sm font-medium mb-4">{isReported ? "Thanks for reporting" : "Post Hidden"}</p>
          <button
            onClick={toggleHide}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm font-medium transition-colors flex items-center gap-2 backdrop-blur-md"
          >
            <Eye size={16} /> Unhide Post
          </button>
        </div>
      )}

      {/* Main Content - Blurred when hidden */}
      <div className={`transition-all duration-500 ${isHidden ? 'filter blur-md opacity-50 pointer-events-none select-none grayscale' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-os-primary to-os-accent flex items-center justify-center text-xs font-bold text-white shadow-lg">
              {project.role[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-os-text leading-none font-sans">{project.role}</p>
              <p className="text-xs text-os-muted mt-0.5">{project.subtitle} • {project.year}</p>
            </div>
          </div>
          <div className="relative" ref={optionsRef}>
            <button onClick={() => setShowOptions(!showOptions)} className="text-os-text p-1 hover:bg-os-card rounded-full transition-colors relative z-30">
              <MoreHorizontal size={20} className="text-os-muted" />
            </button>

            {/* Dropdown Menu */}
            {showOptions && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-os-card border border-os-border rounded-xl shadow-2xl z-[60] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={toggleHide}
                  className="w-full text-left px-4 py-3 text-sm text-os-text hover:bg-os-border/50 transition-colors flex items-center gap-2"
                >
                  <EyeOff size={16} className="text-os-muted" /> Hide Post
                </button>
                <button
                  onClick={handleReport}
                  className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-2 border-t border-os-border/50"
                >
                  <ExternalLink size={16} /> Report
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Visual - Tappable with Micro-interaction */}
        <div
          className="relative w-full aspect-square sm:aspect-video bg-os-card overflow-hidden cursor-pointer group"
          onDoubleClick={handleDoubleTap}
        >
          <div className="w-full h-full">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-200 active:scale-[0.99]"
              loading="lazy"
              onClick={onOpen}
            />
            {/* Big Heart Overlay Animation */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${showBigHeart ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <Heart size={100} className="text-white fill-white drop-shadow-2xl animate-pulse-slow" style={{ animationDuration: '0.5s' }} />
            </div>

            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 active:scale-95 transition-transform">
              <span className="text-xs font-medium text-white">View Details</span>
              <ExternalLink size={12} className="text-white" />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={toggleLike} className={`transition-all active:scale-75 duration-200 ${liked ? 'text-red-500' : 'text-os-text hover:text-os-primary'}`}>
              <Heart size={26} fill={liked ? "currentColor" : "none"} />
            </button>
            <button onClick={() => setCommentOpen(!commentOpen)} className="text-os-text hover:text-os-accent transition-colors active:scale-90 duration-150">
              <MessageCircle size={26} />
            </button>
            {/* DM Button (Replaces Share) */}
            <button
              onClick={() => onDM(`Can we talk more about this?`)}
              className="text-os-text hover:text-os-accent transition-colors active:scale-90 duration-150"
            >
              <Send size={26} className="-rotate-12" />
            </button>
          </div>
          <div className="text-xs text-os-muted font-mono">
            {project.stats.duration}
          </div>
        </div>

        <div className="px-4 mb-2">
          <p className="text-sm font-bold text-os-text">{likesCount} likes</p>
        </div>

        {/* Content */}
        <div className="px-4">
          <h3 className="font-bold text-os-text text-base mb-1 cursor-pointer hover:opacity-80 transition-opacity font-display" onClick={onOpen}>
            {project.title}
          </h3>
          <p className="text-sm text-os-muted mb-3 leading-relaxed font-sans">
            <span className="font-semibold text-os-text mr-1">Adil</span>
            {project.description}
          </p>

          {/* Scrollable Tags */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-2">
            {project.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {/* Comments Section */}
          {comments.length > 0 && (
            <div className="mb-3 space-y-1">
              {comments.map((c, i) => (
                <p key={i} className="text-sm text-os-text">
                  <span className="font-bold mr-2">{c.user}</span>
                  {c.text}
                </p>
              ))}
            </div>
          )}

          {/* Comment Input */}
          {commentOpen && (
            <div className="flex gap-2 mt-2 animate-fade-in items-center">
              <div className="w-6 h-6 rounded-full bg-neutral-700 flex-shrink-0"></div>
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-sm text-os-text placeholder:text-os-muted focus:outline-none"
                autoFocus
              />
              <button
                className={`text-sm font-semibold transition-colors ${commentInput ? 'text-os-accent' : 'text-os-muted'}`}
                onClick={handlePostComment}
                disabled={!commentInput}
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const HomeFeed: React.FC<HomeFeedProps> = ({ profile, onOpenProject, onOpenDM, onToggleStoryMode }) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    onToggleStoryMode?.(!!selectedStory);
  }, [selectedStory, onToggleStoryMode]);

  const handleStoryReply = (msg: string) => {
    setSelectedStory(null);
    onOpenDM(msg);
  };

  return (
    <div className="w-full pb-20 animate-fade-in bg-os-bg transition-colors duration-300">
      {/* Sticky Header */}
      <header className="relative z-40 bg-os-bg/80 backdrop-blur-md border-b border-os-border h-14 flex items-center justify-between px-4 max-w-md mx-auto transition-colors duration-300">
        <span className="font-display font-bold text-lg tracking-tighter text-os-text">{profile.user.handle}</span>
        <button onClick={() => onOpenDM()} className="text-os-text hover:text-os-accent transition-colors active:scale-90">
          <div className="relative">
            <Send size={24} className="-rotate-12" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-os-bg"></div>
          </div>
        </button>
      </header>

      {/* Stories / Highlights - Populated from Profile */}
      <div className="w-full overflow-x-auto no-scrollbar py-3 border-b border-os-border flex gap-4 px-4 mb-2">
        {profile.stories.map((story) => (
          <div key={story.id} onClick={() => setSelectedStory(story)} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer active:scale-95 transition-transform duration-200">
            <div className={`w-16 h-16 rounded-full p-[2px] ${story.color}`}>
              <div className="w-full h-full rounded-full bg-os-bg border-2 border-os-bg flex items-center justify-center overflow-hidden">
                {story.avatarImage ? (
                  <img src={story.avatarImage} alt={story.label} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl">{story.icon}</span>
                )}
              </div>
            </div>
            <span className="text-[10px] text-os-muted">{story.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {profile.projects.map(p => (
          <ProjectCard key={p.id} project={p} onOpen={() => onOpenProject(p)} onDM={onOpenDM} />
        ))}
      </div>

      {/* End of Feed */}
      <div className="py-8 flex flex-col items-center justify-center text-os-muted">
        <div className="w-12 h-12 border-2 border-os-border rounded-full flex items-center justify-center mb-4">
          <span className="text-xl text-os-primary">✓</span>
        </div>
        <p className="text-sm">All projects loaded</p>
        <button className="text-os-accent text-sm mt-2 font-medium">Back to Top</button>
      </div>

      {selectedStory && <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} onReply={handleStoryReply} />}
    </div>
  );
};

export default HomeFeed;