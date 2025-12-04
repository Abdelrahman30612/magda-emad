import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-20 relative z-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-16 items-center">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-8">
           <div className="inline-block px-4 py-1 border border-pink-500/50 rounded-full bg-pink-500/10 text-pink-300 text-sm tracking-wider uppercase mb-4">
             About Me
           </div>
           <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
             Creative Design <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
               Solutions
             </span>
           </h2>
           <p className="text-gray-300 text-lg leading-relaxed">
             I am Magda Emad, a professional Graphic Designer with a deep passion for modern aesthetics. My journey involves exploring the intersection of art and technology to create visually compelling narratives.
           </p>
           <p className="text-gray-400 leading-relaxed">
             From branding and logo design to UI/UX and digital illustration, I focus on delivering designs that are not only beautiful but also functional and meaningful.
           </p>
        </div>

        {/* Visual Element / Placeholder for Image */}
        <div className="w-full md:w-1/2">
           <div className="relative aspect-square md:aspect-[4/5] w-full max-w-md mx-auto">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl opacity-20 transform rotate-6"></div>
             <div className="absolute inset-0 bg-[#0a1033] border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl">
               {/* Placeholder for Profile Image */}
               <svg className="w-32 h-32 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
               </svg>
             </div>
             {/* Floating decorative elements */}
             <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-500 rounded-full blur-2xl opacity-40"></div>
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500 rounded-full blur-3xl opacity-30"></div>
           </div>
        </div>

      </div>
    </section>
  );
};