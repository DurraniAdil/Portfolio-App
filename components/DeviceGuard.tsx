// mobile version

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeviceGuardProps {
    redirectUrl: string;
    breakpoint?: number;
}

export const DeviceGuard = ({
    redirectUrl,
    breakpoint = 1024
}: DeviceGuardProps) => {
    const [showWarning, setShowWarning] = useState(false);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const checkDevice = () => {
            const isDesktop = window.innerWidth >= breakpoint;
            if (isDesktop) {
                setShowWarning(true);
            } else {
                setShowWarning(false);
            }
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => window.removeEventListener('resize', checkDevice);
    }, [breakpoint]);

    useEffect(() => {
        if (!showWarning) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    window.location.href = redirectUrl;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showWarning, redirectUrl]);

    const handleOverride = () => {
        setShowWarning(false);
    };

    return (
        <AnimatePresence>
            {showWarning && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0118] px-6"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="w-full max-w-sm space-y-8"
                    >
                        {/* login image  */}
                        <div className="flex justify-center">
                            <img
                                src={`${import.meta.env.BASE_URL}media/login.png`}
                                alt="Warning"
                                className="w-20 h-20 rounded-2xl object-cover"
                            />
                        </div>

                        {/* written content box*/}
                        <div className="text-center space-y-4">
                            <h2 className="text-2xl font-bold text-white">
                                Wrong Device!
                            </h2>

                            <div className="space-y-2">
                                <p className="text-base text-gray-400">
                                    Portfolio-App is built for <span className="text-purple-400 font-medium">mobile screens</span>.
                                </p>

                                <p className="text-sm text-gray-500">
                                    You're on a desktop. Try <a href="https://durraniadil.github.io/Portfolio-OS/" className="text-blue-400 font-medium hover:underline">Portfolio-OS</a> instead.
                                </p>
                            </div>

                            <div className="pt-2">
                                <p className="text-sm text-gray-500 italic">
                                    Sending you back to the Portal...
                                </p>
                            </div>
                        </div>

                        {/* countdown*/}
                        <div className="flex flex-col items-center gap-4">
                            <motion.div
                                key={countdown}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                            >
                                {countdown}
                            </motion.div>

                            <div className="w-full h-1 bg-purple-950/50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: '100%' }}
                                    animate={{ width: '0%' }}
                                    transition={{ duration: 10, ease: 'linear' }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                />
                            </div>
                        </div>

                        <p className="text-center text-xs text-gray-600 font-mono">
                            Make the right choice this time.
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
