import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- CONFIGURATION ---
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQu2_AMqymAOKRnOKBCB0TFcErl2n1SRpBoVZvtcskbMkQ7eRYdTn98xSPIk1FO94UtremXNxt8izCF/pub?output=csv"; 

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
  description?: string;
}

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Panning State
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Function to parse CSV text into JSON objects
  const parseCSV = (csvText: string) => {
    const lines = csvText.split(/\r\n|\n/);
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
    const parsedData: Project[] = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i];
      if (!currentLine) continue;

      // Handle commas inside quotes logic
      const values = currentLine.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(val => val.trim().replace(/^"|"$/g, ''));

      // Skip invalid lines
      if (values.length < 2) continue;

      // Initialize with default values to prevent undefined errors
      const entry: any = { 
        id: i, 
        title: '', 
        category: 'General', 
        image: '', 
        link: '#', 
        description: '' 
      };

      headers.forEach((header, index) => {
        if (values[index] && values[index].trim() !== "") {
            if (header.includes('title')) entry.title = values[index];
            if (header.includes('category')) entry.category = values[index];
            if (header.includes('image')) entry.image = values[index];
            if (header.includes('link') || header.includes('url')) entry.link = values[index];
            if (header.includes('description') || header.includes('desc')) entry.description = values[index];
        }
      });

      if (entry.title) {
        if (!entry.image) entry.image = "https://via.placeholder.com/600x400/0a1033/ffffff?text=No+Image";
        parsedData.push(entry);
      }
    }
    return parsedData;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      if (!GOOGLE_SHEET_CSV_URL || GOOGLE_SHEET_CSV_URL.trim() === "") {
        setProjects([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!response.ok) throw new Error("Failed to fetch sheet");
        const csvText = await response.text();
        const sheetProjects = parseCSV(csvText);
        
        setProjects(sheetProjects);
      } catch (error) {
        console.warn("Could not load Google Sheet.", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Prevent background scrolling when modal/lightbox is open
  useEffect(() => {
    if (selectedProject || isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject, isLightboxOpen]);

  // Reset zoom and pan when lightbox closes
  useEffect(() => {
    if (!isLightboxOpen) {
      setZoomLevel(1);
      setPan({ x: 0, y: 0 });
    }
  }, [isLightboxOpen]);

  // Dynamically derive categories
  const categories = useMemo(() => {
    const uniqueCats = new Set(projects.map(p => p.category ? p.category.trim() : "").filter(c => c !== ""));
    return ["All", ...Array.from(uniqueCats)];
  }, [projects]);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter((p: Project) => p.category && p.category.trim().toLowerCase() === activeCategory.toLowerCase());

  // --- LIGHTBOX HANDLERS ---

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPan({ x: 0, y: 0 });
      return newZoom;
    }); 
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setZoomLevel(1);
      setPan({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Prevent default scroll behavior if needed, usually handled by body overflow hidden
    if (e.deltaY < 0) {
      // Wheel up - Zoom In
      setZoomLevel(prev => Math.min(prev + 0.25, 4));
    } else {
      // Wheel down - Zoom Out
      setZoomLevel(prev => {
        const newZoom = Math.max(prev - 0.25, 1);
        if (newZoom === 1) setPan({ x: 0, y: 0 });
        return newZoom;
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    // Calculate offset: current mouse position minus current pan position
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    setPan({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="portfolio" className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 relative z-10">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
           <div className="inline-block px-4 py-1 border border-blue-500/50 rounded-full bg-blue-500/10 text-blue-300 text-sm tracking-wider uppercase mb-4">
             Portfolio
           </div>
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">My Projects</h2>
           
           {/* Dynamic Category Filter */}
           {categories.length > 1 && (
             <div className="flex flex-wrap justify-center gap-4">
               {categories.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                     activeCategory === cat
                       ? 'bg-white text-[#060b28] border-white scale-105 shadow-lg'
                       : 'bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
           )}
        </div>

        {/* Gallery Grid */}
        {loading ? (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        ) : filteredProjects.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
                <p>No projects found in the spreadsheet.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: Project) => (
                <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-[#0a1033] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b28] via-[#060b28]/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                    <span className="text-pink-400 text-xs font-bold uppercase tracking-wider mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.category || "General"}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {project.title}
                    </h3>
                </div>
                </div>
            ))}
            </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className="relative bg-[#0a1033] rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl border border-white/10 animate-fade-in-up">
            
            {/* Close Button - UPDATED FOR VISIBILITY */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
              title="Close Modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Side - Click to Expand */}
            <div 
                className="w-full md:w-2/3 h-64 md:h-auto bg-black relative group cursor-pointer overflow-hidden"
                onClick={() => setIsLightboxOpen(true)}
            >
               <img 
                 src={selectedProject.image} 
                 alt={selectedProject.title} 
                 className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
               />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                 <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                    <span className="text-sm font-medium">Click to Fullscreen</span>
                 </div>
               </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/3 p-8 flex flex-col justify-center border-l border-white/5 font-cairo" dir="auto">
              <span className="inline-block px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full w-fit mb-4">
                {(selectedProject.category || "Project").toUpperCase()}
              </span>
              <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
              <div className="w-12 h-1 bg-blue-500 rounded-full mb-6"></div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {selectedProject.description || "No description provided for this project."}
              </p>
              
              {selectedProject.link && selectedProject.link !== "#" && (
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#060b28] py-3 px-6 rounded-full font-bold hover:bg-blue-50 transition-colors"
                >
                  Visit Project
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              )}
            </div>

          </div>
        </div>
      )}

      {/* FULL SCREEN LIGHTBOX */}
      {isLightboxOpen && selectedProject && (
        <div 
            className="fixed inset-0 z-[60] bg-black flex flex-col"
            onWheel={handleWheel}
        >
            {/* LIGHTBOX HEADER - Ensures button is right above/at top */}
            <div className="h-16 flex items-center justify-between px-6 bg-[#060b28] border-b border-white/10 z-[70] shrink-0 shadow-xl">
                 <h3 className="text-white font-bold text-lg truncate max-w-[70%]">{selectedProject.title}</h3>
                 <button 
                    onClick={() => setIsLightboxOpen(false)}
                    className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 text-white transition-colors shadow-md border border-red-400"
                    title="Close Fullscreen"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </button>
            </div>

            {/* Image Container */}
            <div 
                className="flex-1 relative overflow-hidden flex items-center justify-center bg-black/95 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    style={{ 
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out', // Smooth drag, smooth snap
                        maxWidth: '95%',
                        maxHeight: '95%',
                        objectFit: 'contain'
                    }}
                    draggable={false}
                />
            </div>

             {/* ZOOM CONTROLS (Floating Bottom) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/5 shadow-2xl">
                <button onClick={handleZoomOut} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                </button>
                <span className="text-sm font-mono min-w-[3rem] text-center text-white">{Math.round(zoomLevel * 100)}%</span>
                <button onClick={handleZoomIn} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
        </div>
      )}
    </section>
  );
};
