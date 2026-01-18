import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Phone, Video } from 'lucide-react';
import { UserProfile } from '../types';

interface DirectMessageProps {
  user: UserProfile;
  onBack: () => void;
  initialMessage?: string;
}

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'them';
    time: string;
}

const DirectMessage: React.FC<DirectMessageProps> = ({ user, onBack, initialMessage }) => {
  const [inputText, setInputText] = useState(initialMessage || user.dmTemplate);
  const [canSendMessage, setCanSendMessage] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
      { 
          id: 'welcome', 
          text: 'Hey there! Thanks for visiting my portfolio. Feel free to drop a message if you want to collaborate or have any questions about my work.', 
          sender: 'them', 
          time: 'Just now' 
      }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoSentRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle auto-send for story replies or passed initial messages
  useEffect(() => {
      if (initialMessage && !hasAutoSentRef.current) {
          hasAutoSentRef.current = true;
          // Use a small timeout to make it feel natural after view transition
          setTimeout(() => {
              handleSendAction(initialMessage);
          }, 300);
      }
  }, [initialMessage]);

  const handleSendAction = (text: string) => {
    const userMsg: Message = {
        id: Date.now().toString(),
        text: text,
        sender: 'me',
        time: 'Just now'
    };
    setMessages(prev => [...prev, userMsg]);
    setCanSendMessage(false); // Disable sending more messages

    // Simulate auto-reply
    setTimeout(() => {
        const replyMsg: Message = {
            id: (Date.now() + 1).toString(),
            text: "Thanks for reaching out! I've received your message and will get back to you shortly.",
            sender: 'them',
            time: 'Just now'
        };
        setMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  const handleManualSend = () => {
    if (!inputText.trim()) return;
    handleSendAction(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-os-bg animate-slide-up">
      {/* Header */}
      <div className="h-16 border-b border-os-border flex items-center justify-between px-4 bg-os-bg/95 backdrop-blur z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-os-text hover:text-os-muted">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full overflow-hidden border border-os-border">
                <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
             </div>
             <div>
                <h3 className="text-sm font-bold text-os-text leading-none">{user.name}</h3>
                <span className="text-xs text-os-muted">Active now</span>
             </div>
          </div>
        </div>
        <div className="flex gap-4 text-os-text">
            <Phone size={22} className="opacity-50" />
            <Video size={24} className="opacity-50" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
         <div className="self-center my-4 text-xs text-os-muted font-mono">
            Today
         </div>
         
         {messages.map((msg) => (
             <div key={msg.id} className={`flex gap-2 max-w-[85%] ${msg.sender === 'me' ? 'self-end flex-row-reverse' : 'self-start'} animate-fade-in`}>
                 {msg.sender === 'them' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-os-border flex-shrink-0 self-end">
                        <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                 )}
                 
                 <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                     msg.sender === 'me' 
                        ? 'bg-os-primary text-white rounded-br-none' 
                        : 'bg-os-card border border-os-border text-os-text rounded-bl-none'
                 }`}>
                    <p>{msg.text}</p>
                 </div>
             </div>
         ))}
         <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-os-bg border-t border-os-border safe-bottom">
        {canSendMessage ? (
            <div className="relative bg-os-card border border-os-border rounded-3xl p-1 flex items-end">
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full bg-transparent text-os-text text-sm p-3 max-h-32 focus:outline-none resize-none"
                    rows={1}
                    placeholder="Message..."
                    style={{ minHeight: '44px' }}
                />
                <button 
                    onClick={handleManualSend}
                    disabled={!inputText.trim()}
                    className={`p-2 rounded-full m-1 transition-all active:scale-95 ${
                        inputText.trim() ? 'text-os-primary hover:bg-os-primary/10' : 'text-os-muted'
                    }`}
                >
                    <Send size={20} fill={inputText.trim() ? "currentColor" : "none"} />
                </button>
            </div>
        ) : (
            <div className="bg-os-card border border-os-border rounded-xl p-4 text-center">
                <p className="text-xs text-os-muted">You have reached the message limit for this session.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default DirectMessage;