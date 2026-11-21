import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Icon Graphic: Vertical Bar + Two Q-Nodes */}
      <svg
        className={`flex-shrink-0 text-white fill-current ${
          isSm ? 'w-5 h-7' : isLg ? 'w-8 h-11' : 'w-6 h-8'
        }`}
        viewBox="0 0 28 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left vertical rounded line */}
        <rect x="0" y="2" width="4.5" height="32" rx="2.25" fill="#FFFFFF" />
        
        {/* Top Q Ring */}
        <circle cx="17" cy="9" r="6" stroke="#FFFFFF" strokeWidth="3.2" fill="none" />
        <path d="M18.5 10.5 L22.5 14.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

        {/* Bottom Q Ring */}
        <circle cx="17" cy="27" r="6" stroke="#FFFFFF" strokeWidth="3.2" fill="none" />
        <path d="M18.5 28.5 L22.5 32.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* Wordmark Text: QevoraTech + Tagline */}
      <div className="flex flex-col justify-center">
        <div
          className={`font-display font-extrabold tracking-tight text-white leading-none ${
            isSm ? 'text-lg' : isLg ? 'text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          <span>Qevora</span>
          <span className="text-white font-extrabold">Tech</span>
        </div>
        {showTagline && (
          <span
            className={`font-sans font-normal tracking-wide text-[#93C5FD] leading-tight mt-0.5 ${
              isSm ? 'text-[9px]' : isLg ? 'text-xs' : 'text-[10px] sm:text-[11px]'
            }`}
          >
            Innovation Starts Here.
          </span>
        )}
      </div>
    </div>
  );
};
