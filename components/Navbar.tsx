import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-6 py-6 md:px-16 flex justify-between items-center bg-[#060b28]/80 backdrop-blur-md border-b border-white/5">
      {/* Logo or Brand placeholder if needed, using text for now or just layout */}
       <div className="text-xl font-bold tracking-widest text-white uppercase hidden md:block">
        Magda.
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-white cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-12 text-gray-200 font-normal text-base tracking-wide mx-auto">
        <li>
          <a href="#home" className="hover:text-white transition-colors cursor-pointer relative group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-white transition-colors cursor-pointer relative group">
            About Us
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </a>
        </li>
        <li>
          <a href="#portfolio" className="hover:text-white transition-colors cursor-pointer relative group">
            Our Portfolio
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-white transition-colors cursor-pointer relative group">
            Contact Us
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </a>
        </li>
      </ul>
      
      {/* Empty div for layout balance on large screens */}
      <div className="hidden md:block w-[70px]"></div>
    </nav>
  );
};