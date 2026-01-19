import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Plus, Terminal, Activity, Feather, Copy, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '../components/UI';
import { PROFILES } from '../constants';
import { ProfileData } from '../types';

// NEED TO LEARN THIS BY HEART ATP 
const BASE_URL = import.meta.env.BASE_URL || '/';
const media = (path: string) => `${BASE_URL}media/${path}`;

interface LoginScreenProps {
    onLogin: (password: string) => void;
    error?: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, error }) => {
    const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
    const [password, setPassword] = useState('');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionStage, setTransitionStage] = useState(0);

    // OTP simulation 
    const [otp, setOtp] = useState<string | null>(null);
    const [showOtp, setShowOtp] = useState(false);
    const [generatingOtp, setGeneratingOtp] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

    const profiles = Object.values(PROFILES);

    const handleForgotPassword = () => {
        if (generatingOtp) return;
        setGeneratingOtp(true);

        // network delay simulation
        setTimeout(() => {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setOtp(code);
            setGeneratingOtp(false);
            setShowOtp(true);

            // auto hide after 10s if not copied
            setTimeout(() => setShowOtp(false), 10000);
        }, 1500);
    };

    const copyOtpToClipboard = async () => {
        if (!otp) return;

        const handleSuccess = () => {
            setCopyFeedback("Copied!");
            setTimeout(() => {
                setCopyFeedback(null);
                setShowOtp(false);
            }, 1000);
        };

        const handleFailure = () => {
            setCopyFeedback("Failed");
            setTimeout(() => setCopyFeedback(null), 5000);
        };

        try {
            await navigator.clipboard.writeText(otp);
            handleSuccess();
        } catch (err) {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = otp;

                // avoid scrolling to bottom
                textArea.style.top = "0";
                textArea.style.left = "0";
                textArea.style.position = "fixed";

                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);

                if (successful) handleSuccess();
                else handleFailure();
            } catch (e) {
                handleFailure();
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProfile) return;

        const input = password.trim();
        // validate: check if input matches profile ID (case-insensitive) OR the generated OTP
        const isValid = input.toLowerCase() === selectedProfile.id || (otp && input === otp);

        if (isValid) {
            // trigger transition
            setIsTransitioning(true);
            // pass the valid Profile ID to the transition sequence -> login handler
            startTransitionSequence(selectedProfile.id);
        } else {
            // pass invalid input to parent to trigger error state
            onLogin(input.toLowerCase());
        }
    };

    const startTransitionSequence = (profileId: string) => {
        // sequence timing varies by profile vibe
        if (profileId === 'developer') {
            // matrix code fall -> glitch -> access
            setTimeout(() => setTransitionStage(1), 500); // show code
            setTimeout(() => setTransitionStage(2), 2000); // glitch/success
            setTimeout(() => onLogin(profileId), 2500); // switch
        } else if (profileId === 'operations') {
            // biometric scan -> loading circle -> clean wipe
            setTimeout(() => setTransitionStage(1), 800); // scan complete
            setTimeout(() => setTransitionStage(2), 1800); // loading data
            setTimeout(() => onLogin(profileId), 2200); // switch
        } else {
            // ink spread / fade -> quote -> enter
            setTimeout(() => setTransitionStage(1), 1000); // Fade out UI
            setTimeout(() => setTransitionStage(2), 2000); // Show Quote
            setTimeout(() => onLogin(profileId), 3000); // Switch
        }
    };

    // --- transition overlays ---

    const renderDeveloperTransition = () => (
        <div className="absolute inset-0 z-50 bg-black font-mono flex flex-col items-center justify-center overflow-hidden">
            {/* Matrix Rain Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute text-green-500 text-xs" style={{
                        left: `${i * 5}%`,
                        top: `-${Math.random() * 100}%`,
                        animation: `scan 2s linear infinite`,
                        animationDelay: `${Math.random()}s`
                    }}>
                        {Math.random().toString(36).substring(2, 8)}
                    </div>
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative">
                    <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-ping opacity-20"></div>
                    <div className="w-32 h-32 rounded-full border-4 border-green-500/50 p-1 bg-black overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                        <img
                            src={media('developer.png')}
                            alt="Developer"
                            className="w-full h-full object-cover rounded-full animate-pulse-slow filter sepia-[.5] hue-rotate-[50deg]"
                        />
                    </div>
                </div>

                <div className="space-y-2 text-center">
                    <p className="text-green-500 text-sm animate-typing overflow-hidden whitespace-nowrap border-r-2 border-green-500 pr-1">
                        INITIALIZING SHELL...
                    </p>
                    {transitionStage >= 1 && (
                        <div className="mt-4 border border-green-500 p-3 bg-green-500/10 backdrop-blur-sm animate-fade-in">
                            <p className="text-xl font-bold glitch-text text-green-400" data-text="ACCESS GRANTED">ACCESS GRANTED</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderOperationsTransition = () => (
        <div className="absolute inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center transition-opacity duration-500 overflow-hidden">
            {/* radar scan effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0f172a_80%)] z-10"></div>

            <div className="relative z-20">
                {/* spinning rings */}
                <div className="absolute inset-[-20px] rounded-full border border-blue-500/30 animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute inset-[-40px] rounded-full border border-cyan-500/20 animate-[spin_7s_linear_infinite_reverse]"></div>

                <div className="relative w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-700 overflow-hidden shadow-2xl">
                    <img
                        src={media('operations.png')}
                        alt="Operations"
                        className="w-full h-full object-cover opacity-80"
                    />
                    {/* scanning bar overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent w-full h-full animate-[scan_1.5s_linear_infinite] opacity-50"></div>
                </div>
            </div>

            <div className="mt-12 text-center z-20 space-y-2">
                <h2 className="text-white font-sans text-xl font-bold tracking-[0.2em] animate-pulse">AUTHENTICATING</h2>
                <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                    <p className="text-blue-400 text-xs font-mono">
                        {transitionStage === 0 ? "ID VERIFICATION..." : "SYNCING DATABASES..."}
                    </p>
                </div>
            </div>

            {transitionStage >= 2 && (
                <div className="absolute inset-0 bg-white animate-fade-in z-50"></div>
            )}
        </div>
    );

    const renderContentTransition = () => (
        <div className="absolute inset-0 z-50 bg-[#fbf7f0] flex flex-col items-center justify-center transition-all duration-1000 overflow-hidden">

            {/* ink transition background */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className={`transition-all duration-1000 transform ${transitionStage >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                    <div className="w-40 h-40 rounded-full border-4 border-amber-900/20 p-2 overflow-hidden shadow-xl bg-white mb-8">
                        <img
                            src={media('content.png')}
                            alt="Poet"
                            className="w-full h-full object-cover transition-transform duration-[10s] ease-linear hover:scale-110"
                        />
                    </div>
                </div>

                {transitionStage >= 1 && (
                    <div className="text-center px-8 max-w-xs animate-slide-up">
                        <p className="font-display text-2xl text-amber-950 italic leading-relaxed">
                            "Strokes of 'ع' to swirls of 'ق' to write 'عشق' and for me to be in it."
                        </p>
                        <div className="w-16 h-1 bg-amber-900/30 mx-auto mt-6 rounded-full"></div>
                    </div>
                )}
            </div>
        </div>
    );


    // --- OG RENDER ---

    // view 2: password entry
    if (selectedProfile) {
        return (
            <div className="flex flex-col h-[100dvh] bg-black text-white relative animate-fade-in overflow-hidden">

                {/* transition layer */}
                {isTransitioning && selectedProfile.id === 'developer' && renderDeveloperTransition()}
                {isTransitioning && selectedProfile.id === 'operations' && renderOperationsTransition()}
                {isTransitioning && selectedProfile.id === 'content' && renderContentTransition()}

                {/* otp toast notification */}
                {showOtp && (
                    <div className="absolute top-16 left-4 right-4 z-[60] animate-slide-up">
                        <div className="bg-neutral-800/90 backdrop-blur-md border border-neutral-700 rounded-2xl p-4 shadow-2xl flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2 text-blue-400 text-xs uppercase font-bold tracking-widest">
                                <ShieldCheck size={14} /> Recovery Protocol
                            </div>
                            <div className="flex items-center gap-4 bg-black/50 rounded-xl px-4 py-2 border border-white/5">
                                <span className="text-2xl font-mono font-bold text-white tracking-[0.2em]">{otp}</span>
                                <div className="h-6 w-[1px] bg-white/20"></div>
                                <button onClick={copyOtpToClipboard} className="text-neutral-400 hover:text-white transition-colors active:scale-90 relative">
                                    {copyFeedback ? <span className="text-[10px] text-green-400 font-bold tracking-wider">{copyFeedback}</span> : <Copy size={18} />}
                                </button>
                            </div>
                            <p className="text-[10px] text-neutral-500">Copy to clipboard to dismiss</p>
                        </div>
                    </div>
                )}

                {/* back button */}
                <button
                    onClick={() => { setSelectedProfile(null); setPassword(''); setShowOtp(false); }}
                    className="absolute top-6 left-4 text-white p-2 z-20 hover:opacity-70 transition-opacity"
                >
                    <ArrowLeft size={24} />
                </button>

                {/* background blur */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-gradient-to-b ${selectedProfile.theme.colors.primary} to-transparent`}></div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center px-8 w-full max-w-sm mx-auto z-10">
                    <div className="mb-10 flex flex-col items-center animate-slide-up">
                        <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-purple-500 to-orange-500 mb-4 shadow-2xl">
                            <img src={selectedProfile.user.avatarUrl} alt="profile" className="w-full h-full rounded-full object-cover border-4 border-black bg-neutral-800" />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">{selectedProfile.user.handle}</h2>
                        <p className="text-sm text-neutral-500 mt-1 capitalize">{selectedProfile.id} Account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={`Enter '${selectedProfile.id}'${otp ? ' or Code' : ''}`}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3.5 px-4 text-white focus:border-neutral-600 focus:outline-none transition-all placeholder:text-neutral-600 text-center tracking-widest"
                                autoFocus
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white border-none py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-900/20">
                            Log in
                        </Button>
                        {error && <p className="text-red-500 text-xs font-semibold text-center mt-2 animate-pulse">{error}</p>}
                    </form>

                    <button
                        onClick={handleForgotPassword}
                        disabled={generatingOtp}
                        className="mt-8 text-sm text-blue-400/80 font-medium hover:text-blue-400 flex items-center gap-2"
                    >
                        {generatingOtp ? (
                            <><Loader2 size={14} className="animate-spin" /> Verifying Identity...</>
                        ) : (
                            "Forgot password?"
                        )}
                    </button>
                </div>

                <div className="p-8 border-t border-neutral-900 text-center z-10">
                    <button onClick={() => { setSelectedProfile(null); setPassword(''); }} className="text-sm text-blue-500 font-semibold tracking-wide">
                        Switch accounts
                    </button>
                </div>
            </div>
        )
    }
    //for some reason i think i've messed up the code
    //but it works fine so we dont check it and keep the view one and two as they are
    //cause it done spiraled out and made a new branch for some reason i think which i cant do anything about with absolutely messing up the code
    // view 1: account selection
    return (
        <div className="flex flex-col h-[100dvh] bg-black text-white px-6 animate-fade-in relative overflow-hidden">
            {/* background gradient effects */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-indigo-900/30 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-fuchsia-900/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="flex-1 flex flex-col justify-center w-full max-w-sm mx-auto z-10">
                <div className="flex justify-center mb-8 md:mb-16 scale-100 md:scale-125">
                    {/* logo/title*/}
                    <h1 className="text-4xl font-display font-bold tracking-tighter italic bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Adil<span className="text-neutral-600 not-italic">.OS</span>
                    </h1>
                </div>

                <div className="space-y-3">
                    {profiles.map((profile) => (
                        <button
                            key={profile.id}
                            onClick={() => setSelectedProfile(profile)}
                            className="w-full bg-neutral-900/40 backdrop-blur-md border border-neutral-800/60 p-3 rounded-xl flex items-center gap-4 hover:bg-neutral-800/60 transition-all active:scale-[0.98] group"
                        >
                            <div className="w-12 h-12 rounded-full p-[1.5px] bg-gradient-to-tr from-neutral-700 to-neutral-500 group-hover:from-pink-500 group-hover:to-orange-500 transition-colors duration-500">
                                <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-neutral-800">
                                    <img src={profile.user.avatarUrl} alt={profile.id} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">{profile.user.handle}</div>
                                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">{profile.id}</div>
                            </div>
                            <div className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                <ChevronRight size={20} className="text-neutral-500" />
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <button onClick={() => window.open('https://durraniadil.github.io/Portfolio-Portal/')} className="flex items-center gap-2 text-blue-500 text-sm font-semibold opacity-80 hover:opacity-100 transition-opacity">
                        {/* done messed and branched out for some reason but it works fine now, think it was the deployment issue*/}
                        <Plus size={16} /> Log in using another device
                    </button>
                </div>
            </div>

            <div className="p-4 md:p-8 text-center z-10 pb-[env(safe-area-inset-bottom)]">
                <div className="flex flex-col items-center gap-1 opacity-40">
                    <span className="text-[10px] uppercase tracking-widest font-medium">From</span>
                    <span className="font-bold tracking-tight text-white flex items-center gap-1">
                        <img src={media('login.png')} alt="Logo" className="w-4 h-4 object-contain" />
                        Adil Portfolio
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;