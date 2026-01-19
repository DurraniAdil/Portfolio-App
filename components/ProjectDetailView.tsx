import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, Globe, Code, ArrowLeft, ChevronDown } from 'lucide-react';
import { Button, Tag, SectionTitle } from './UI';

interface ProjectDetailViewProps {
    project: Project;
    onClose: () => void;
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`fixed inset-0 z-[60] bg-os-bg flex flex-col transition-transform duration-300 ease-out ${visible ? 'translate-y-0' : 'translate-y-full'}`}>

            {/* nav*/}
            <div className="h-14 flex items-center justify-between px-4 border-b border-os-border bg-os-bg/95 backdrop-blur z-20">
                <button onClick={handleClose} className="p-2 -ml-2 text-os-text hover:bg-os-card rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <span className="font-bold text-sm text-os-text uppercase tracking-widest font-mono">CASE STUDY</span>
                <button onClick={handleClose} className="p-2 -mr-2 text-os-muted hover:text-os-text transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* scroll */}
            <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
                {/* hero */}
                <div className="relative w-full aspect-video">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-os-bg via-os-bg/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                        <h1 className="text-3xl font-bold text-os-text mb-1 leading-tight drop-shadow-lg">{project.title}</h1>
                        <p className="text-os-primary font-mono text-sm">{project.subtitle}</p>
                    </div>
                </div>

                <div className="px-5 mt-6">
                    {/* meta d */}
                    <div className="flex gap-4 mb-8 border-b border-os-border pb-6">
                        <div>
                            <div className="text-[10px] text-os-muted uppercase font-bold tracking-wider">Role</div>
                            <div className="text-sm font-medium text-os-text">{project.role}</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-os-muted uppercase font-bold tracking-wider">Year</div>
                            <div className="text-sm font-medium text-os-text">{project.year}</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-os-muted uppercase font-bold tracking-wider">Time</div>
                            <div className="text-sm font-medium text-os-text">{project.stats.duration}</div>
                        </div>
                    </div>

                    {/* stories */}
                    <div className="space-y-8">
                        <section>
                            <SectionTitle>The Problem</SectionTitle>
                            <p className="text-os-text/80 leading-relaxed text-sm">{project.details.problem}</p>
                        </section>

                        <section>
                            <SectionTitle>Technical Approach</SectionTitle>
                            <p className="text-os-text/80 leading-relaxed text-sm mb-4">{project.details.approach}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.details.stack.map(tech => (
                                    <Tag key={tech}>{tech}</Tag>
                                ))}
                            </div>
                        </section>

                        <section>
                            <SectionTitle>The Outcome</SectionTitle>
                            <p className="text-os-text/80 leading-relaxed text-sm">{project.details.outcome}</p>
                        </section>
                    </div>

                    <div className="h-10"></div>
                </div>
            </div>

            {/* bt bar */}
            <div className="h-20 border-t border-os-border bg-os-bg px-4 flex items-center gap-3 safe-bottom">
                {project.links.demo && (
                    <a href={project.links.demo} target="_blank" rel="noreferrer" className="flex-1">
                        <Button className="w-full">
                            <Globe size={18} /> Live Demo
                        </Button>
                    </a>
                )}
                {project.links.repo && (
                    <a href={project.links.repo} target="_blank" rel="noreferrer" className="flex-1">
                        <Button variant="secondary" className="w-full">
                            <Code size={18} /> View Code
                        </Button>
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailView;