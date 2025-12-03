import React from 'react';
import { Navbar } from './components/Navbar';
import { Background } from './components/Background';
import { GeometricArt } from './components/GeometricArt';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-brand-dark text-white overflow-hidden selection:bg-pink-500 selection:text-white">
      <Background />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow flex flex-col md:flex-row items-center px-6 md:px-16 lg:px-24">
          
          {/* Left Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center pt-10 md:pt-0 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-light text-gray-200">
                Hello, I'm
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-lg">
                Magda
              </h1>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-cyan drop-shadow-lg leading-tight">
                Graphic Designer
              </h1>
            </div>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md pt-4">
              Specializing in brand identity, visual storytelling, and digital art. I bring creative visions to life through bold colors and innovative design solutions.
            </p>

            <div className="pt-6">
              <button className="bg-white text-brand-dark font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 transform active:scale-95">
                My Work
              </button>
            </div>
          </div>

          {/* Right Content - Abstract Art */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0 relative">
             {/* Decorative lines behind the art */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none"></div>
            <GeometricArt />
          </div>

        </main>
      </div>
    </div>
  );
};

export default App;