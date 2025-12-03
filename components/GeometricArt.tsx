import React from 'react';

export const GeometricArt: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center animate-pulse-slow">
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ff0080', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#7928ca', stopOpacity: 0.8 }} />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#00dfd8', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#007cf0', stopOpacity: 0.6 }} />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#ff4d4d', stopOpacity: 0.7 }} />
            <stop offset="100%" style={{ stopColor: '#f9cb28', stopOpacity: 0.7 }} />
          </linearGradient>
        </defs>

        {/* Main Group Rotated to match the diamond shape style */}
        <g transform="translate(250, 250) rotate(-15)">
          
          {/* Back elements */}
          <rect x="-120" y="-120" width="240" height="240" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" transform="rotate(45)" />
          <rect x="-150" y="-80" width="200" height="200" fill="url(#grad2)" transform="rotate(30)" rx="4" />
          
          {/* Scatter Lines */}
          <line x1="-200" y1="0" x2="-100" y2="0" stroke="#00dfd8" strokeWidth="2" />
          <line x1="100" y1="50" x2="220" y2="50" stroke="#ff0080" strokeWidth="2" />
          <line x1="0" y1="-200" x2="0" y2="-150" stroke="#f9cb28" strokeWidth="2" />
          
          {/* Middle Cluster */}
          <rect x="-100" y="-100" width="200" height="200" fill="url(#grad1)" transform="rotate(45)" style={{ mixBlendMode: 'screen' }} />
          <rect x="-80" y="-80" width="160" height="160" fill="none" stroke="white" strokeWidth="1" transform="rotate(45)" />
          
          {/* Offset colorful shapes */}
          <rect x="20" y="-140" width="120" height="120" fill="url(#grad3)" transform="rotate(60)" style={{ mixBlendMode: 'overlay' }} />
          
          {/* Triangles */}
          <polygon points="0,-180 20,-140 -20,-140" fill="#00dfd8" transform="rotate(45)" />
          <polygon points="160,0 180,40 140,40" fill="#ff4d4d" transform="rotate(120)" />

          {/* Wireframe details */}
          <rect x="-160" y="-60" width="300" height="120" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" transform="rotate(-15)" />
          <circle cx="0" cy="0" r="10" fill="#f9cb28" />
          
          {/* Floating tiny squares */}
          <rect x="140" y="-100" width="20" height="20" fill="#00dfd8" transform="rotate(45)" />
          <rect x="-150" y="80" width="15" height="15" fill="#ff0080" transform="rotate(15)" />
        </g>
      </svg>
    </div>
  );
};