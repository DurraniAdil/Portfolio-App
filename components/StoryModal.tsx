import React, { useState, useEffect } from 'react';
import { Story } from '../types';
import { Heart, Send, X } from 'lucide-react';

interface StoryModalProps {
    story: Story;
    onClose: () => void;
    onReply: (msg: string) => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, onClose, onReply }) => {
    const [progress, setProgress] = useState(0);
    const [liked, setLiked] = useState(false);
    const [inputText, setInputText] = useState("");
    const DURATION = 15000;

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


    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-fade-in">

            <div className="absolute top-0 left-0 right-0 z-20 p-2 pt-safe-top">
                <div className="h-1 bg-black/30 rounded-full overflow-hidden mb-3">
                    <div
                        className="h-full bg-black transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between items-center px-1">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${story.color} p-[1.5px]`}>
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-sm overflow-hidden border border-black/10">
                                {story.avatarImage ? (
                                    <img src={story.avatarImage} alt={story.label} className="w-full h-full object-cover" />
                                ) : (
                                    story.icon
                                )}
                            </div>
                        </div>
                        <span className="font-bold text-black text-sm">{story.label}</span>
                        <span className="text-black/60 text-xs">1h</span>
                    </div>
                    <button onClick={onClose} className="text-black/80 hover:text-black p-2">
                        <X size={24} />
                    </button>
                </div>
            </div>

            <div
                className={`flex-1 flex flex-col items-center justify-center relative overflow-hidden ${story.color}`}
                onClick={handleBackgroundClick}
            >
                {story.storyImage ? (
                    <>
                        <img src={story.storyImage} alt="Background" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-50 scale-110 pointer-events-none" />
                        <div
                            className="relative z-10 w-full h-full flex items-center justify-center p-4"
                            onClick={handleBackgroundClick}
                        >
                            <img
                                src={story.storyImage}
                                alt="Story"
                                className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-lg pointer-events-none"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={handleBackgroundClick}></div>
                        <div className="relative z-10 p-8 w-full max-w-md text-center pointer-events-none">
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

            <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 flex items-center gap-4 z-20 safe-bottom">
                <div className="flex-1 h-11 border border-black/30 rounded-full flex items-center px-1 bg-white/20 backdrop-blur-sm">
                    <input
                        type="text"
                        placeholder="Send message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleInputKey}
                        className="w-full bg-transparent border-none text-black text-sm px-4 focus:outline-none placeholder:text-black/50"
                    />
                </div>
                <button
                    onClick={() => setLiked(!liked)}
                    className={`transition-transform active:scale-75 ${liked ? 'text-red-500' : 'text-black'}`}
                >
                    <Heart size={28} fill={liked ? "currentColor" : "none"} />
                </button>
                <button
                    onClick={() => onReply("tuff")}
                    className="text-black hover:text-black/70 transition-colors active:scale-90"
                >
                    <Send size={28} className="-rotate-12" />
                </button>
            </div>
        </div>
    );
};

export default StoryModal;
