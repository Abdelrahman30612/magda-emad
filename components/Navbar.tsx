import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="relative z-50 w-full px-6 py-6 md:px-16 flex justify-between items-center bg-transparent">
      {/* Mobile Menu Icon (Hidden on desktop for simplicity in this demo, but layout prepared) */}
      <div className="md:hidden text-white cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-12 text-gray-300 font-light text-sm tracking-wide">
        <li className="relative text-white cursor-pointer group">
          Home
          <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
        </li>
        <li className="hover:text-white transition-colors cursor-pointer">About Me</li>
        <li className="hover:text-white transition-colors cursor-pointer">Portfolio</li>
        <li className="hover:text-white transition-colors cursor-pointer">Contact Me</li>
      </ul>
      
      {/* Empty div to balance flex if needed or for future logo on right */}
      <div className="hidden md:block"></div>
    </nav>
  );
};