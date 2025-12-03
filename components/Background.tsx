import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Left Blob - Purple/Blue */}
      <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-purple-900/40 rounded-full mix-blend-screen filter blur-[100px] opacity-60"></div>
      
      {/* Bottom Right Blob - Pink/Purple */}
      <div className="absolute -bottom-[10%] -right-[10%] w-[70vw] h-[70vw] bg-pink-900/30 rounded-full mix-blend-screen filter blur-[120px] opacity-50"></div>
      
      {/* Top Right Blob - Teal/Blue */}
      <div className="absolute top-[5%] right-[0%] w-[40vw] h-[40vw] bg-blue-900/30 rounded-full mix-blend-screen filter blur-[80px] opacity-40"></div>
      
      {/* Bottom Left Accent - Dark */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-dark to-transparent opacity-80"></div>
    </div>
  );
};