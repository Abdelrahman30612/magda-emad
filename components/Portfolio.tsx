import React from 'react';

const projects = [
  { id: 1, title: 'Brand Identity', category: 'Branding', color: 'from-orange-400 to-pink-500' },
  { id: 2, title: 'App Redesign', category: 'UI/UX', color: 'from-blue-400 to-cyan-500' },
  { id: 3, title: 'Social Media', category: 'Marketing', color: 'from-purple-500 to-indigo-600' },
  { id: 4, title: 'Product Pkg', category: 'Print', color: 'from-green-400 to-emerald-600' },
  { id: 5, title: 'Web Layout', category: 'Web Design', color: 'from-pink-500 to-rose-500' },
  { id: 6, title: 'Illustration', category: 'Art', color: 'from-yellow-400 to-orange-500' },
];

export const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-24 relative z-10">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Portfolio</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
             A curated selection of my latest work. Each project is a unique problem solved with creative visual solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((item) => (
            <div key={item.id} className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-white/5 border border-white/10 transition-all hover:-translate-y-2">
              
              {/* Card Background (Placeholder Gradient) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-40 group-hover:opacity-60 transition-opacity`}></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                <p className="text-sm text-gray-200 uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.category}</p>
                
                <button className="mt-6 px-6 py-2 bg-white text-black text-sm font-semibold rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  View Case
                </button>
              </div>

              {/* Initial Visible Title (Bottom Left) */}
              <div className="absolute bottom-0 left-0 p-6 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                 <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                 <span className="text-xs text-white/70">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <button className="px-8 py-3 border border-white text-white rounded-full hover:bg-white hover:text-brand-dark transition-colors uppercase tracking-wide text-sm font-semibold">
                View All Works
            </button>
        </div>

      </div>
    </section>
  );
};