import React from 'react';
import { ProfileData } from '../types';
import { Button, Tag } from '../components/UI';
import { Github, Linkedin, Mail, MapPin, Briefcase, Zap, LogOut, FileText, Globe, Instagram, Award, Phone } from 'lucide-react';


const BASE_URL = import.meta.env.BASE_URL || '/';
const media = (path: string) => `${BASE_URL}media/${path}`;

interface ProfileProps {
    profile: ProfileData;
    onLogout: () => void;
    onOpenStory?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, onLogout, onOpenStory }) => {
    const { user } = profile;
    const isContentProfile = profile.id === 'content';
    const isDeveloperProfile = profile.id === 'developer';
    const isOperationsProfile = profile.id === 'operations';

    // cried
    // dont touch please cause it was for some reason was downloading the code for everything in the viewport
    const handleDownload = async (pdfPath: string, fileName: string) => {
        try {
            const response = await fetch(pdfPath);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            //added a fallback as a failsafe to go to a blank page, way better than getting an html file which wont open on your mobile and you'd your device done got compromised 
            window.open(pdfPath, '_blank');
        }
    };

    return (
        <div className="w-full min-h-screen pb-24 pt-14 animate-fade-in bg-os-bg text-os-text transition-colors duration-300">
            <header className="fixed top-0 left-0 right-0 z-30 bg-os-bg/90 backdrop-blur-md h-14 flex items-center justify-between border-b border-os-border px-4 max-w-md mx-auto transition-colors duration-300">
                <span className="font-mono font-bold text-sm text-os-text">{user.handle}</span>
                <button onClick={onLogout} className="text-os-muted hover:text-red-500 transition-colors">
                    <LogOut size={18} />
                </button>
            </header>

            <div className="px-5 pt-6 pb-6">
                <div className="flex items-start justify-between mb-4">
                    <button
                        onClick={onOpenStory}
                        className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-os-primary to-os-accent cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
                    >
                        <img src={user.avatarUrl} alt="Avatar" className="w-full h-full rounded-full border-2 border-os-bg object-cover" />
                    </button>

                    <div className="flex gap-4 flex-1 justify-end pt-2">
                        <div className="text-center">
                            <div className="font-bold text-lg text-os-text">{profile.projects.length}</div>
                            <div className="text-xs text-os-muted">Posts</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-lg text-os-text">{profile.explore.length}</div>
                            <div className="text-xs text-os-muted">{isContentProfile ? 'Works' : 'Skills'}</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-lg text-os-text">{isContentProfile ? profile.activities.filter(a => a.type !== 'experiment').length : (isOperationsProfile ? user.certifications?.length : user.experience.length)}</div>
                            <div className="text-xs text-os-muted">{isContentProfile ? 'Clients' : (isOperationsProfile ? 'Certs' : 'Roles')}</div>
                        </div>
                    </div>
                </div>

                <h1 className="text-lg font-bold text-os-text font-display">{user.name}</h1>
                <p className="text-sm text-os-primary font-medium mb-1 font-sans">{user.role}</p>
                <p className="text-sm text-os-muted leading-relaxed mb-3 font-sans">
                    {user.bio}
                </p>

                {isContentProfile && (
                    <div className="mb-6">
                        <h3 className="text-sm font-bold text-os-text mb-3 font-display">
                            Certification
                        </h3>
                        <a
                            href="https://drive.google.com/file/d/11s9_CrIlTDhfqEskAWiurCk8dPt2Ls5A/view?usp=sharing"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 bg-os-card p-3 rounded-lg border border-os-border hover:border-os-primary/50 hover:bg-os-border/20 transition-colors cursor-pointer"
                        >
                            <div className="p-1.5 bg-amber-500/10 text-amber-600 rounded-full flex-shrink-0">
                                <Award size={16} />
                            </div>
                            <span className="text-sm font-medium text-os-text leading-tight">Publication Certificates</span>
                        </a>
                    </div>
                )}

                {isOperationsProfile && user.certifications && (
                    <div className="mb-6">
                        <h3 className="text-sm font-bold text-os-text mb-3 font-display">Certifications</h3>
                        <div className="space-y-2">
                            {user.certifications.map((cert, i) => (
                                <a
                                    key={i}
                                    href={cert.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 bg-os-card p-3 rounded-lg border border-os-border hover:border-os-primary/50 hover:bg-os-border/20 transition-colors cursor-pointer"
                                >
                                    <div className="p-1.5 bg-green-500/10 text-green-500 rounded-full flex-shrink-0">
                                        <Award size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-os-text leading-tight">{cert.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {!isContentProfile && !isOperationsProfile && user.experience.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-sm font-bold text-os-text mb-3 font-display">Experience</h3>
                        <div className="space-y-4">
                            {user.experience.map((exp, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="mt-1 p-2 bg-os-card rounded-md h-min border border-os-border">
                                        <Briefcase size={16} className="text-os-muted" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-os-text">{exp.role}</p>
                                        <p className="text-xs text-os-accent">{exp.company}</p>
                                        <p className="text-xs text-os-muted font-mono mt-1">{exp.period}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {user.currentlyWorkingOn && !isDeveloperProfile && !isContentProfile && !isOperationsProfile && (
                    <div className="mb-4 inline-flex items-center gap-2 bg-os-card border border-os-border rounded-full px-3 py-1.5 pr-4 shadow-sm hover:border-os-primary/50 transition-colors cursor-default">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-os-primary/10 text-os-primary">
                            <Zap size={10} fill="currentColor" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[9px] font-bold text-os-muted uppercase tracking-wider mb-0.5">Focus</span>
                            <span className="text-xs font-semibold text-os-text">{user.currentlyWorkingOn.title}</span>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-4 text-xs text-os-muted mb-6">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {user.location}</span>
                    <span className="flex items-center gap-1 text-green-500"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Open to work</span>
                </div>

                <div className="flex gap-2 mb-8">
                    <Button
                        className="flex-1 py-2 text-sm bg-os-text text-os-bg hover:opacity-90 shadow-none"
                        onClick={() => window.location.href = 'tel:+917028512087'}
                    >
                        Contact Me
                    </Button>
                    <Button
                        variant="secondary"
                        className="flex-1 py-2 text-sm"
                        onClick={async () => {
                            const url = window.location.href;
                            if (navigator.share) {
                                try {
                                    await navigator.share({
                                        title: 'Check out this portfolio!',
                                        url: url
                                    });
                                    return;
                                } catch (err) {
                                }
                            }
                            // fallback: copy to clipboard using textarea (works on mobile)
                            try {
                                const textarea = document.createElement('textarea');
                                textarea.value = url;
                                textarea.style.position = 'fixed';
                                textarea.style.opacity = '0';
                                document.body.appendChild(textarea);
                                textarea.focus();
                                textarea.select();
                                document.execCommand('copy');
                                document.body.removeChild(textarea);
                                alert('Link copied to clipboard!');
                            } catch (err) {
                                alert('Could not copy link. Please copy manually: ' + url);
                            }
                        }}
                    >
                        Share Profile
                    </Button>
                </div>

                {!isContentProfile && !isDeveloperProfile && !isOperationsProfile && (
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-os-text mb-3 font-display">
                            Expertise
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {user.skills.map(skill => (
                                <Tag key={skill}>{skill}</Tag>
                            ))}
                        </div>
                    </div>
                )}

                <h3 className="text-sm font-bold text-os-text mb-3 font-display">Connect</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <a
                        href={isDeveloperProfile ? user.socials.github : (isOperationsProfile ? user.socials.portfolio : user.socials.github)}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-os-card border border-os-border rounded-lg aspect-square flex flex-col items-center justify-center gap-2 hover:bg-os-border/20 transition-colors group"
                    >
                        {isContentProfile ? (
                            <Instagram size={32} className="text-os-muted group-hover:text-pink-500" />
                        ) : isOperationsProfile ? (
                            <Globe size={32} className="text-os-muted group-hover:text-green-500" />
                        ) : (
                            <Github size={32} className="text-os-muted group-hover:text-os-text" />
                        )}
                        <span className="text-xs font-bold text-os-text">{isContentProfile ? 'Instagram' : (isOperationsProfile ? 'Portfolio' : 'GitHub')}</span>
                    </a>

                    {isDeveloperProfile ? (
                        <button
                            onClick={() => handleDownload(media('resume_developer.pdf'), 'Durrani_Adil_Developer_Resume.pdf')}
                            className="bg-os-card border border-os-border rounded-lg aspect-square flex flex-col items-center justify-center gap-2 hover:bg-os-border/20 transition-colors group cursor-pointer"
                        >
                            <FileText size={32} className="text-os-muted group-hover:text-purple-500" />
                            <span className="text-xs font-bold text-os-text">Resume</span>
                        </button>
                    ) : (
                        <a href={user.socials.linkedin} target="_blank" rel="noreferrer" className="bg-os-card border border-os-border rounded-lg aspect-square flex flex-col items-center justify-center gap-2 hover:bg-os-border/20 transition-colors group">
                            <Linkedin size={32} className="text-os-muted group-hover:text-blue-500" />
                            <span className="text-xs font-bold text-os-text">LinkedIn</span>
                        </a>
                    )}

                    <a href={`mailto:${user.socials.email}`} className="bg-os-card border border-os-border rounded-lg aspect-square flex flex-col items-center justify-center gap-2 hover:bg-os-border/20 transition-colors group">
                        <Mail size={32} className="text-os-muted group-hover:text-orange-500" />
                        <span className="text-xs font-bold text-os-text">Email</span>
                    </a>

                    {/* cried here too */}
                    {isDeveloperProfile ? (
                        <a href="https://durraniadil.github.io/Portfolio-Portal/" target="_blank" rel="noreferrer" className="bg-os-card border border-os-border rounded-lg aspect-square flex flex-col items-center justify-center gap-2 hover:bg-os-border/20 transition-colors group">
                            <Globe size={32} className="text-os-muted group-hover:text-green-500" />
                            <span className="text-xs font-bold text-os-text">Portfolio</span>
                        </a>
                    ) : (
                        <button
                            onClick={() => handleDownload(
                                isOperationsProfile ? media('resume_operations.pdf') : media('resume_writer.pdf'),
                                isOperationsProfile ? 'Durrani_Adil_Operations_Resume.pdf' : 'Durrani_Adil_Writer_Resume.pdf'
                            )}
                            className="bg-os-card border border-os-border rounded-lg aspect-square flex flex-col items-center justify-center gap-2 hover:bg-os-border/20 transition-colors group cursor-pointer"
                        >
                            <FileText size={32} className="text-os-muted group-hover:text-purple-500" />
                            <span className="text-xs font-bold text-os-text">Resume</span>
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Profile;