import React, { useState, useMemo } from 'react';
import { ProfileData } from '../types';
import { Search, ChevronRight } from 'lucide-react';

interface ExploreProps {
    profile: ProfileData;
}

const Explore: React.FC<ExploreProps> = ({ profile }) => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const isBentoLayout = profile.id === 'developer' || profile.id === 'content' || profile.id === 'operations';

    // get unique categories for filtering
    const categories = useMemo(() => {
        if (!isBentoLayout) return [];
        const cats = new Set(profile.explore.map(item => item.category));
        return ["All", ...Array.from(cats)];
    }, [profile.explore, isBentoLayout]);

    // filter items for bento layout
    const filteredExploreItems = useMemo(() => {
        let items = profile.explore;

        // category filter
        if (activeFilter !== "All") {
            items = items.filter(item => item.category === activeFilter);
        }

        // search filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            items = items.filter(item =>
                item.title.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q)
            );
        }

        return items;
    }, [profile.explore, searchQuery, activeFilter]);

    // extract all unique tags from projects (legacy logic for non-dev/content/ops profiles)
    const allTags = useMemo(() => {
        if (isBentoLayout) return [];
        const tags = new Set<string>();
        profile.projects.forEach(p => p.tags.forEach(t => tags.add(t)));
        return ["All", ...Array.from(tags)];
    }, [profile.projects, isBentoLayout]);

    // filter projects based on selected tag AND search query
    const filteredProjects = useMemo(() => {
        let projects = profile.projects;

        if (activeFilter !== "All") {
            projects = projects.filter(p => p.tags.includes(activeFilter));
        }

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

    // get category color for visual distinction
    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Language': 'from-blue-500/20 to-blue-600/5',
            'Framework': 'from-purple-500/20 to-purple-600/5',
            'Library': 'from-cyan-500/20 to-cyan-600/5',
            'Tool': 'from-green-500/20 to-green-600/5',
            'Style': 'from-pink-500/20 to-pink-600/5',
            'State': 'from-violet-500/20 to-violet-600/5',
            'Backend': 'from-orange-500/20 to-orange-600/5',
            'Platform': 'from-slate-500/20 to-slate-600/5',
            'Design': 'from-rose-500/20 to-rose-600/5',
            'Cloud': 'from-sky-500/20 to-sky-600/5',
            'Animation': 'from-indigo-500/20 to-indigo-600/5',
            'Runtime': 'from-emerald-500/20 to-emerald-600/5',
            'Expertise': 'from-amber-500/20 to-amber-600/5',
            'Poetry': 'from-rose-500/20 to-rose-600/5',
            'Fiction': 'from-purple-500/20 to-purple-600/5',
            'Non-Fiction': 'from-blue-500/20 to-blue-600/5',
            'Publication': 'from-emerald-500/20 to-emerald-600/5',
            'Award': 'from-yellow-500/20 to-yellow-600/5',
            'Achievement': 'from-orange-500/20 to-orange-600/5',
            'Co-Author': 'from-teal-500/20 to-teal-600/5',
            'Ops': 'from-blue-500/20 to-blue-600/5',
            'HR': 'from-pink-500/20 to-pink-600/5',
            'Tools': 'from-green-500/20 to-green-600/5',
        };
        return colors[category] || 'from-os-primary/20 to-os-primary/5';
    };

    const getExploreTitle = () => {
        if (profile.id === 'developer') return "Skills & Tools";
        if (profile.id === 'content') return "Works & Expertise";
        if (profile.id === 'operations') return "Skills & Tools";
        return "Explore";
    }

    return (
        <div className="w-full min-h-screen pb-24 pt-4 animate-fade-in bg-os-bg transition-colors duration-300">
            {/* head */}
            <div className="px-4 mb-4">
                <h2 className="text-2xl font-bold text-os-text font-display">{getExploreTitle()}</h2>
                <p className="text-sm text-os-muted mt-1">
                    {profile.id === 'developer' ? 'Technologies I work with' :
                        profile.id === 'content' ? 'My creative portfolio' :
                            profile.id === 'operations' ? 'Competencies & Tools' : 'Explore my work'}
                </p>
            </div>



            {isBentoLayout ? (
                <div className="px-4">
                    {/* filter pills*/}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5 pb-1">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 active:scale-95 ${activeFilter === cat
                                    ? 'bg-os-text text-os-bg shadow-lg'
                                    : 'bg-os-card border border-os-border text-os-muted hover:text-os-text hover:border-os-primary/50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* responsive grid */}
                    <div className="flex flex-wrap -mx-1">
                        {filteredExploreItems.map((item) => (
                            <div
                                key={item.id}
                                className="w-1/2 p-1"
                            >
                                <div className="relative bg-os-card border border-os-border rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:border-os-primary/50 hover:shadow-lg">
                                    {/* gradient background on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(item.category)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                    {/* content - auto-height based on content */}
                                    <div className="relative z-10 p-4">
                                        {/* top row: icon + category */}
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="w-11 h-11 rounded-xl bg-os-bg/80 flex items-center justify-center border border-os-border group-hover:border-os-primary/30 group-hover:scale-105 transition-all duration-300">
                                                {item.icon ? (
                                                    <item.icon className="w-5 h-5 text-os-text" strokeWidth={1.5} />
                                                ) : (
                                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain p-1.5" />
                                                )}
                                            </div>
                                            <span className="text-[9px] font-mono text-os-primary font-bold uppercase tracking-wider bg-os-primary/10 px-2 py-1 rounded-full">
                                                {item.category}
                                            </span>
                                        </div>

                                        {/* title wraps naturally */}
                                        <h4 className="font-bold text-os-text text-sm leading-tight group-hover:text-os-primary transition-colors duration-300">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* empty state */}
                    {filteredExploreItems.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-os-muted">
                            <Search size={40} className="opacity-30 mb-4" />
                            <p className="text-sm">No items found</p>
                            <button
                                onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                                className="mt-3 text-os-primary text-sm hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* stats for footer */}
                    {filteredExploreItems.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-os-border">
                            <div className="flex justify-around text-center">
                                <div>
                                    <div className="text-2xl font-bold text-os-text">{profile.explore.length}</div>
                                    <div className="text-xs text-os-muted">Total Items</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-os-primary">{categories.length - 1}</div>
                                    <div className="text-xs text-os-muted">Categories</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-os-text">
                                        {profile.id === 'developer' ? '3+' : profile.id === 'content' ? '300+' : '5+'}
                                    </div>
                                    <div className="text-xs text-os-muted">
                                        {profile.id === 'developer' ? 'Years Exp' : profile.id === 'content' ? 'Works' : 'Years Exp'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <>
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

                    <div className="grid grid-cols-2 gap-1 px-1">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`relative group aspect-square bg-os-card overflow-hidden cursor-pointer ${(activeFilter === "All" && index === 0) ? 'col-span-2 aspect-video' : ''
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
                                <div className="absolute inset-0 bg-black/10 group-active:bg-black/30 transition-colors" />
                            </div>
                        ))}

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