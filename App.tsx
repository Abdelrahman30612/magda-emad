import React from 'react';
import { Navbar } from './components/Navbar';
import { Background } from './components/Background';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#060b28] text-white overflow-x-hidden selection:bg-pink-500 selection:text-white font-sans">
      <Background />
      <Navbar />
      
      <div className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Portfolio />
        <Contact />
        
        {/* Simple Footer */}
        <footer className="py-8 text-center text-white/40 text-sm relative z-10 border-t border-white/5">
          © {new Date().getFullYear()} Magda Emad. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default App;