import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'icon' }> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = "font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-os-primary text-white rounded-lg px-4 py-3 shadow-lg shadow-os-primary/20 hover:opacity-90",
    secondary: "bg-os-card border border-os-border text-os-text rounded-lg px-4 py-3 hover:bg-os-border/20",
    ghost: "text-os-muted hover:text-os-text px-2 py-1",
    icon: "p-2 rounded-full hover:bg-white/10 text-os-text"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Tag: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color }) => (
  <span className="text-xs font-mono font-medium px-2 py-1 rounded-md bg-white/5 text-os-muted border border-os-border whitespace-nowrap">
    {children}
  </span>
);

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-os-card rounded ${className}`} />
);

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-bold text-os-muted uppercase tracking-wider mb-3 pl-1 font-mono">
    {children}
  </h3>
);