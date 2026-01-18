import React, { useState, useMemo } from 'react';
import { ProfileData } from '../types';
import { Search } from 'lucide-react';

interface ExploreProps {
    profile: ProfileData;
}

const Explore: React.FC<ExploreProps> = ({ profile }) => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const isBentoLayout = profile.id === 'developer' || profile.id === 'content' || profile.id === 'operations';

    // Filter items for Bento Layout
    const filteredExploreItems = useMemo(() => {
        if (!searchQuery) return profile.explore;
        const q = searchQuery.toLowerCase();
        return profile.explore.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
        );
    }, [profile.explore, searchQuery]);

    // Extract all unique tags from projects (Legacy logic for non-dev/content/ops profiles)
    const allTags = useMemo(() => {
        if (isBentoLayout) return [];
        const tags = new Set<string>();
        profile.projects.forEach(p => p.tags.forEach(t => tags.add(t)));
        return ["All", ...Array.from(tags)];
    }, [profile.projects, isBentoLayout]);

    // Filter projects based on selected tag AND search query
    const filteredProjects = useMemo(() => {
        let projects = profile.projects;

        // 1. Tag Filter
        if (activeFilter !== "All") {
            projects = projects.filter(p => p.tags.includes(activeFilter));
        }

        // 2. Search Filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            projects = projects.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q))
            );
        }

        return projects;
    }, [activeFilter, profile.projects, searchQuery]);

    // Helper to determine bento grid spans based on index
    const getBentoClass = (index: number) => {
        // Pattern: Big Square, Small, Small, Tall, Wide, Small, Small...
        const pattern = [
            'col-span-2 row-span-1', // 0: Wide
            'col-span-1 row-span-2', // 1: Tall
            'col-span-1 row-span-1', // 2: Small
            'col-span-1 row-span-1', // 3: Small
            'col-span-2 row-span-2', // 4: Big
            'col-span-1 row-span-1', // 5: Small
            'col-span-1 row-span-1', // 6: Small
            'col-span-2 row-span-1', // 7: Wide
            'col-span-1 row-span-1', // 8: Small
            'col-span-1 row-span-2', // 9: Tall
            'col-span-2 row-span-1', // 10: Wide
        ];
        // Repeat pattern if index exceeds length
        return pattern[index % pattern.length] || 'col-span-1 row-span-1';
    };

    const getExploreTitle = () => {
        if (profile.id === 'developer') return "Skills & Tools";
        if (profile.id === 'content') return "Works & Certifications";
        if (profile.id === 'operations') return "Skills & Tools";
        return "Explore";
    }

    return (
        <div className="w-full min-h-screen pb-24 pt-4 animate-fade-in bg-os-bg transition-colors duration-300">
            {/* Search Bar - Kept for aesthetics */}
            <div className="px-4 mb-4 sticky top-4 z-30">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-os-muted transition-colors group-focus-within:text-os-primary" size={16} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={isBentoLayout ? "Search..." : "Search projects..."}
                        className="w-full bg-os-card border border-os-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-os-text focus:outline-none focus:border-os-primary transition-all shadow-sm focus:shadow-os-primary/20 placeholder:text-os-muted"
                    />
                </div>
            </div>

            {isBentoLayout ? (
                // Developer/Content/Ops Profile: Bento Grid
                <div className="px-4">
                    <h3 className="text-sm font-bold text-os-muted uppercase tracking-wider mb-4 font-mono">{getExploreTitle()}</h3>
                    <div className="grid grid-cols-3 gap-3 auto-rows-[100px] grid-flow-dense">
                        {filteredExploreItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`relative bg-os-card border border-os-border rounded-2xl p-4 flex flex-col justify-between overflow-hidden group hover:border-os-primary/50 transition-all duration-300 ${getBentoClass(index)}`}
                            >
                                {/* Background Decoration */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:from-os-primary/10 transition-colors"></div>

                                <div className="relative z-10 flex justify-between items-start">
                                    <div className="w-10 h-10 rounded-xl bg-neutral-800/50 flex items-center justify-center p-2 backdrop-blur-sm border border-white/5 group-hover:scale-110 transition-transform duration-300 text-os-text">
                                        {item.icon ? (
                                            <item.icon className="w-full h-full object-contain" strokeWidth={1.5} />
                                        ) : (
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" />
                                        )}
                                    </div>
                                    {/* Only show category on larger blocks */}
                                    {(getBentoClass(index).includes('span-2')) && (
                                        <span className="text-[10px] font-mono text-os-muted uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full border border-white/5">
                                            {item.category}
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <h4 className={`font-bold text-os-text leading-tight group-hover:text-os-primary transition-colors ${getBentoClass(index).includes('span-2') ? 'text-lg' : 'text-xs'}`}>
                                        {item.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // Other Profiles: Project Grid (Unchanged)
                <>
                    {/* Filters */}
                    <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar mb-4 pb-2">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ease-out active:scale-95 ${activeFilter === tag
                                    ? 'bg-os-text text-os-bg shadow-lg scale-105'
                                    : 'bg-os-card border border-os-border text-os-muted hover:text-os-text hover:border-os-text/50'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Grid of Projects */}
                    <div className="grid grid-cols-2 gap-1 px-1">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`relative group aspect-square bg-os-card overflow-hidden cursor-pointer ${
                                    // Make the first item span 2 columns if it's the 'All' view for variety, else standard grid
                                    (activeFilter === "All" && index === 0) ? 'col-span-2 aspect-video' : ''
                                    }`}
                            >
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                    <p className="text-sm font-bold text-white leading-tight">{project.title}</p>
                                    <div className="flex gap-1 mt-1 flex-wrap">
                                        {project.tags.slice(0, 2).map(t => (
                                            <span key={t} className="text-[9px] text-neutral-300 bg-white/10 px-1 rounded">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                {/* Tag indicator for mobile touch (always visible small gradient or similar if hover not available) */}
                                <div className="absolute inset-0 bg-black/10 group-active:bg-black/30 transition-colors" />
                            </div>
                        ))}

                        {/* Filler for 'All' View */}
                        {activeFilter === "All" && profile.explore.map((item) => (
                            <div key={item.id} className="relative group aspect-square bg-os-card overflow-hidden">
                                <div className="w-full h-full p-8 flex items-center justify-center bg-os-bg/50">
                                    {item.icon ? (
                                        <item.icon size={48} className="text-os-muted opacity-50" />
                                    ) : (
                                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                                    )}
                                </div>
                                <div className="absolute bottom-2 left-2">
                                    <span className="text-[10px] bg-black/50 backdrop-blur px-1.5 py-0.5 rounded text-white border border-white/10">{item.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-os-muted">
                            <p>No projects found with this tag.</p>
                            <button onClick={() => setActiveFilter("All")} className="mt-4 text-os-primary text-sm hover:underline">Clear Filters</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Explore;