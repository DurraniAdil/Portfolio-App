import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Phone, Video, X } from 'lucide-react';
import { UserProfile } from '../types';
import emailjs from '@emailjs/browser';

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
  status?: 'sending' | 'sent' | 'delivered' | 'error';
}

// EmailJS Config
const EMAILJS_SERVICE_ID = 'service_87d8r9a';
const EMAILJS_TEMPLATE_ID = 'template_qog2cfk';
const EMAILJS_PUBLIC_KEY = 'sRAhECH2ZABZrrins';

// Auto-replies
const AUTO_REPLIES = [
  "Thanks for reaching out! I've received your message and will get back to you shortly.",
  "Got it! I'll review this and respond as soon as I can. Thanks for connecting!",
  "Message received! Looking forward to discussing this further. Stay tuned!",
  "Hey! Thanks for your interest. I'll circle back to you within 24 hours.",
  "Noted! Your message has been delivered. Expect a response soon!",
];

const DirectMessage: React.FC<DirectMessageProps> = ({ user, onBack, initialMessage }) => {
  // storage key 
  const storageKey = `dm_history_${user.handle}`;

  // Loads messages from localStorage
  const loadMessages = (): Message[] => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load messages:', e);
    }
    // OG welcome message
    return [
      {
        id: 'welcome',
        text: 'Hey there! Thanks for visiting my portfolio. Feel free to drop a message if you want to collaborate or have any questions about my work.',
        sender: 'them',
        time: 'Earlier'
      }
    ];
  };

  const [inputText, setInputText] = useState(initialMessage || user.dmTemplate);
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [showVideoToast, setShowVideoToast] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasAutoSentRef = useRef(false);

  // Dynamic textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // auto correction for scroll height
      textarea.style.height = 'auto';
      // new height maths 
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 44), 120);
      textarea.style.height = `${newHeight}px`;
    }
  };

  // Adjusting height
  useEffect(() => {
    adjustTextareaHeight();
  }, [inputText]);

  // adjusting height on initial load
  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  // saving messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save messages:', e);
    }
  }, [messages, storageKey]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // auto send message from dm to story
  useEffect(() => {
    if (initialMessage && !hasAutoSentRef.current) {
      hasAutoSentRef.current = true;
      setTimeout(() => {
        handleSendMessage(initialMessage);
      }, 300);
    }
  }, [initialMessage]);

  // getting current time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // sending message with EmailJS
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const msgId = Date.now().toString();

    // add message to UI immediately
    const userMsg: Message = {
      id: msgId,
      text: text.trim(),
      sender: 'me',
      time: getCurrentTime(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsSending(true);

    try {
      // send via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: 'Portfolio Visitor',
          email: 'visitor@portfolio.app',
          from_name: 'Portfolio DM',
          from_email: 'dm@portfolio.app',
          subject: `DM via ${user.handle} Profile`,
          message: text,
          time: new Date().toLocaleString(),
          role_type: user.handle,
          project_link: '—',
          team_size: '—',
          operations_scope: '—',
          content_type: 'DM',
          word_count: text.split(' ').length.toString(),
        },
        EMAILJS_PUBLIC_KEY
      );

      // update message status to delivered
      setMessages(prev => prev.map(m =>
        m.id === msgId ? { ...m, status: 'delivered' } : m
      ));

      // send auto-reply after a delay
      setTimeout(() => {
        const randomReply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
        const replyMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: randomReply,
          sender: 'them',
          time: getCurrentTime()
        };
        setMessages(prev => [...prev, replyMsg]);
      }, 1500 + Math.random() * 1000);

    } catch (error) {
      console.error('EmailJS Error:', error);

      // update message status to sent (even if EmailJS fails, show as sent)
      setMessages(prev => prev.map(m =>
        m.id === msgId ? { ...m, status: 'sent' } : m
      ));

      // still send auto-reply for UX
      setTimeout(() => {
        const replyMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for reaching out! I've received your message and will get back to you shortly. 🚀",
          sender: 'them',
          time: getCurrentTime()
        };
        setMessages(prev => [...prev, replyMsg]);
      }, 1500);
    }

    setIsSending(false);
  };

  // handle phone call
  const handlePhoneCall = () => {
    window.location.href = 'tel:+917028512087';
  };

  // handle video call (show toast)
  const handleVideoCall = () => {
    setShowVideoToast(true);
    setTimeout(() => setShowVideoToast(false), 3000);
  };

  // handle keyboard send
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  // clear chat history
  const handleClearHistory = () => {
    const defaultMsg: Message = {
      id: 'welcome',
      text: 'Hey there! Thanks for visiting my portfolio. Feel free to drop a message if you want to collaborate or have any questions about my work.',
      sender: 'them',
      time: 'Just now'
    };
    setMessages([defaultMsg]);
  };

  return (
    <div className="flex flex-col h-full bg-os-bg animate-slide-up">
      {/* ft popup */}
      {showVideoToast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-os-card border border-os-border rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-3">
            <p className="text-sm text-os-text font-medium">Chill, least buy me a drink first!</p>
            <button onClick={() => setShowVideoToast(false)} className="text-os-muted hover:text-os-text">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* head */}
      <div className="h-16 border-b border-os-border flex items-center justify-between px-4 bg-os-bg/95 backdrop-blur z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-os-text hover:text-os-muted">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-os-border">
                <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              </div>
              {/* is online sign */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-os-bg"></div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-os-text leading-none">{user.name}</h3>
              <span className="text-xs text-green-500 font-medium">Active now</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handlePhoneCall}
            className="p-2 rounded-full hover:bg-os-card transition-colors text-os-text"
            title="Call"
          >
            <Phone size={20} />
          </button>
          <button
            onClick={handleVideoCall}
            className="p-2 rounded-full hover:bg-os-card transition-colors text-os-text"
            title="Video Call"
          >
            <Video size={22} />
          </button>
        </div>
      </div>

      {/* chat area */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
        {/* Date separator */}
        <div className="self-center my-2">
          <span className="text-[10px] text-os-muted font-mono bg-os-card px-3 py-1 rounded-full border border-os-border">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 max-w-[85%] ${msg.sender === 'me' ? 'self-end flex-row-reverse' : 'self-start'} animate-fade-in`}
          >
            {msg.sender === 'them' && (
              <div className="w-7 h-7 rounded-full overflow-hidden border border-os-border flex-shrink-0 self-end">
                <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex flex-col">
              <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${msg.sender === 'me'
                ? 'bg-os-primary text-white rounded-br-sm'
                : 'bg-os-card border border-os-border text-os-text rounded-bl-sm'
                }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
              {/* message meta */}
              <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'me' ? 'self-end' : 'self-start'}`}>
                <span className="text-[10px] text-os-muted">{msg.time}</span>
                {msg.sender === 'me' && msg.status && (
                  <span className="text-[10px] text-os-muted">
                    {msg.status === 'sending' && '⏳'}
                    {msg.status === 'sent' && '✓'}
                    {msg.status === 'delivered' && '✓✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* typing indicator when sending */}
        {isSending && (
          <div className="flex gap-2 self-start animate-fade-in">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-os-border flex-shrink-0 self-end">
              <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="bg-os-card border border-os-border rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-os-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-os-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-os-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* input area */}
      <div className="p-4 bg-os-bg border-t border-os-border safe-bottom">
        <div className="relative bg-os-card border border-os-border rounded-3xl p-1 flex items-end">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-os-text text-sm p-3 focus:outline-none resize-none overflow-y-auto"
            placeholder="Message..."
            style={{ minHeight: '44px', maxHeight: '120px' }}
            disabled={isSending}
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || isSending}
            className={`p-2 rounded-full m-1 transition-all active:scale-95 flex-shrink-0 self-end ${inputText.trim() && !isSending ? 'text-os-primary hover:bg-os-primary/10' : 'text-os-muted'
              }`}
          >
            <Send size={20} fill={inputText.trim() ? "currentColor" : "none"} />
          </button>
        </div>

        {/* message count */}
        <div className="flex justify-between items-center mt-2 px-2">
          <span className="text-[10px] text-os-muted">
            {messages.filter(m => m.sender === 'me').length} messages sent
          </span>
          {messages.length > 1 && (
            <button
              onClick={handleClearHistory}
              className="text-[10px] text-os-muted hover:text-red-500 transition-colors"
            >
              Clear history
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectMessage;