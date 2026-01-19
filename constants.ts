import { ProfileData } from './types';
import {
  ClipboardList, GitMerge, Users, UserCheck, FileText, PieChart, MessageSquare,
  BarChart2, HeartHandshake, UserPlus, CalendarRange, Layout, Hash, Grid, Table2,
  Calendar, Store, BookOpen, Scroll, Feather, AlignLeft, Book, Star, Award,
  PenTool
} from 'lucide-react';

// Base URL for GitHub Pages - Vite injects this at build time
const BASE_URL = import.meta.env.BASE_URL || '/';
const media = (path: string) => `${BASE_URL}media/${path}`;

// Shared Socials
const SHARED_SOCIALS = {
  github: "https://github.com/DurraniAdil",
  linkedin: "https://www.linkedin.com/in/durraniadil13/",
  email: "durraniadil13@gmail.com",
  portfolio: "durraniadil.github.io/Portfolio-Portal/"
};


const createSkill = (id: string, title: string, category: string, iconSlug?: string, color?: string) => ({
  id,
  title,
  category,
  // Fallback to UI Avatars if no slug provided, otherwise use Simple Icons
  imageUrl: iconSlug
    ? `https://cdn.simpleicons.org/${iconSlug}/${color || 'ffffff'}`
    : `https://ui-avatars.com/api/?name=${title}&background=random&color=fff&size=200&font-size=0.33`
});

// 1. DEVELOPER PROFILE
const DEV_PROFILE: ProfileData = {
  id: 'developer',
  theme: {
    id: 'dark-os',
    colors: {
      bg: '#09090b', // Zinc 950
      card: '#18181b', // Zinc 900
      border: '#27272a', // Zinc 800
      primary: '#8b5cf6', // Violet 500
      accent: '#06b6d4', // Cyan 500
      text: '#ffffff',
      muted: '#a1a1aa', // Zinc 400
    },
    fonts: {
      body: 'Inter',
      display: 'JetBrains Mono',
    }
  },
  user: {
    name: "Durrani Adil Khan",
    handle: "@dev.adil",
    role: "Front-end Developer",
    bio: "Building responsive, user-centric web apps. Passionate about pixel-perfect design and clean architecture.",
    location: "Aurangabad, India",
    avatarUrl: media('developer.png'),
    skills: [],
    experience: [
      { company: "Be Endless", role: "Project Manager", period: "Nov 25' - Present" },
    ],
    socials: SHARED_SOCIALS,
    dmTemplate: "Hi Adil, I checked out your developer portfolio and I'm interested in discussing a project regarding..."
  },
  stories: [
    {
      id: 's_dev_me',
      label: 'Me',
      icon: '',
      color: 'bg-[#F4F1EA]',
      content: [],
      avatarImage: media('developer.png'),
      storyImage: media('dev-me-story.png')
    }
  ],
  projects: [
    // These act as "Fav Projects" on Home Feed - Keeping a selection of the resume items
    {
      id: "p_dev_dekonstrt",
      title: "DEKONSTRT",
      subtitle: "AI Code Analysis",
      description: "AI-Powered Code Analysis & Deconstruction Tool designed to turn complex source code into beginner-level understanding.",
      imageUrl: media('dekon.png'),
      role: "Developer",
      year: "2025",
      tags: ["React 19", "TypeScript", "Tailwind"],
      stats: { duration: "Shipped", views: "GitHub", likes: 340 },
      details: {
        problem: "Understanding complex source code is difficult for beginners.",
        approach: "Used semantic analysis to break down code logic into plain English.",
        outcome: "A functional tool that simplifies codebase onboarding.",
        stack: ["React 19", "TypeScript", "Tailwind", "API"]
      },
      links: {}
    },
    {
      id: "p_dev_thematic",
      title: "Thematic Translator",
      subtitle: "Linguistic AI Suite",
      description: "Specialized AI Digitization & Linguistic Analysis Suite for digitizing and translating Urdu poetry.",
      imageUrl: media('trans.png'),
      role: "Engineer",
      year: "2025",
      tags: ["React", "Generative AI", "AI"],
      stats: { duration: "Shipped", likes: 210 },
      details: {
        problem: "Digitizing and translating complex Urdu poetry archives.",
        approach: " leveraged advanced AI models for linguistic nuance and React for the interface.",
        outcome: "Structured logical objects from raw poetic text.",
        stack: ["React", "TypeScript", "Tailwind", "Generative AI"]
      },
      links: {}
    },
    {
      id: "p_dev_ibn",
      title: "IBN-E-ADIL",
      subtitle: "Personal Portfolio",
      description: "Literary-Tech Identity Site serving as an interactive convergence of professional engineering and literary artistry.",
      imageUrl: media('ibn.png'),
      role: "Full Stack",
      year: "2025",
      tags: ["Motion", "TypeScript", "React"],
      stats: { duration: "Ongoing", likes: 500 },
      details: {
        problem: "Showcasing dual identity of Engineer and Poet.",
        approach: "Used advanced animations and thematic pages to separate yet connect the two worlds.",
        outcome: "A unique digital identity.",
        stack: ["React", "TypeScript", "Motion"]
      },
      links: {}
    },
    {
      id: "p_dev_muse",
      title: "Muse",
      subtitle: "Digital Atelier",
      description: "Aesthetic web application designed for the contemplation and creation of digital poetry and quote cards.",
      imageUrl: media('muse.png'),
      role: "Creator",
      year: "2025",
      tags: ["React 19", "Vite", "Tailwind"],
      stats: { duration: "Shipped", likes: 124 },
      details: {
        problem: "Need for a private digital scriptorium to compose and archive poetry with historical aesthetics.",
        approach: "Leveraged React 19 and react-quill-new with a custom aesthetic design system.",
        outcome: "A functional scriptorium with high-quality image export.",
        stack: ["React 19", "Vite", "Tailwind CSS", "Lucide React"]
      },
      links: { demo: "https://durraniadil.github.io/Muse/", repo: "https://github.com/DurraniAdil/Muse" }
    },
    {
      id: "p_dev_endless",
      title: "3D Printing Studio",
      subtitle: "E-Commerce Platform",
      description: "Modern, high-performance e-commerce web application for a premium 3D printing service with product catalog, custom design uploads, and instant quotes.",
      imageUrl: media('endless.png'),
      role: "Developer",
      year: "2026",
      tags: ["React 18", "TypeScript", "Tailwind", "Vite"],
      stats: { duration: "Shipped", views: "Live", likes: 280 },
      details: {
        problem: "Creating a seamless experience for 3D printing customers to browse products and request custom designs.",
        approach: "Built with React 18, TypeScript, and Tailwind CSS with custom animations, product filtering, cart management, and file upload for custom 3D models.",
        outcome: "A premium e-commerce platform with 'wow-factor' UX, smooth animations, and comprehensive customization options.",
        stack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "React Router", "Lucide React"]
      },
      links: { demo: "https://www.endless3dprinting.com/", repo: "https://github.com/shahidsk0403/be-endless-3d-studio" }
    }
  ],
  // Populating Activity with the Resume Projects
  activities: [
    { id: "a_dev_1", date: "Nov 2024", title: "NotePad", description: "Built feature-rich notepad with resizable workspace, dark mode, and local storage.", type: "ship" },
    { id: "a_dev_2", date: "Nov 2024", title: "Random Quote Machine", description: "Developed dynamic quote generator with Fetch API and instant clipboard copy.", type: "ship" },
    { id: "a_dev_3", date: "Nov 2024", title: "Pokédex App", description: "Created interactive Pokémon database using PokeAPI with search/filter.", type: "ship" },
    { id: "a_dev_4", date: "Apr 2024", title: "Authapp", description: "Built full-stack auth system with Google Sign-in and FCM using Next.js & Expo.", type: "ship" },
    { id: "a_dev_5", date: "Mar 2024", title: "EmployWise", description: "Designed employee management frontend with protected routes and React Router.", type: "ship" },
    { id: "a_dev_6", date: "2025", title: "DEKONSTRT", description: "AI-Powered Code Analysis & Deconstruction Tool.", type: "experiment" },
    { id: "a_dev_7", date: "2025", title: "THEMATIC TRANSLATOR", description: "Linguistic AI Suite for Urdu poetry archives.", type: "experiment" },
    { id: "a_dev_8", date: "2025", title: "IBN-E-ADIL", description: "Personal Literary-Tech Identity Site.", type: "experiment" },
    { id: "a_dev_9", date: "2025", title: "MUSE", description: "Digital Atelier for Poetry and Quote Cards.", type: "publish" },
    { id: "a_dev_10", date: "2026", title: "3D Printing Studio", description: "Premium e-commerce platform for BE Endless 3D printing service.", type: "ship" }
  ],
  // Populating Explore with Resume Skills - BENTO GRID DATA
  explore: [
    createSkill('js', 'JavaScript', 'Language', 'javascript', 'F7DF1E'),
    createSkill('react', 'React.js', 'Library', 'react', '61DAFB'),
    createSkill('ts', 'TypeScript', 'Language', 'typescript', '3178C6'),
    createSkill('next', 'Next.js', 'Framework', 'nextdotjs', 'ffffff'),
    createSkill('html', 'HTML5', 'Language', 'html5', 'E34F26'),
    createSkill('css', 'CSS3', 'Language', 'css', '1572B6'),
    createSkill('tw', 'Tailwind', 'Style', 'tailwindcss', '06B6D4'),
    createSkill('node', 'Node.js', 'Runtime', 'nodedotjs', '339933'),
    createSkill('git', 'Git', 'Tool', 'git', 'F05032'),
    createSkill('github', 'GitHub', 'Platform', 'github', 'ffffff'),
    createSkill('firebase', 'Firebase', 'Backend', 'firebase', 'FFCA28'),
    createSkill('framer', 'Framer', 'Animation', 'framer', '0055FF'),
    createSkill('redux', 'Redux', 'State', 'redux', '764ABC'),
    createSkill('figma', 'Figma', 'Design', 'figma', 'F24E1E'),
    createSkill('vite', 'Vite', 'Tool', 'vite', '646CFF'),
    createSkill('postman', 'Postman', 'Tool', 'postman', 'FF6C37'),
    createSkill('vercel', 'Vercel', 'Cloud', 'vercel', 'ffffff'),
    createSkill('sass', 'Sass', 'Style', 'sass', 'CC6699'),
    createSkill('boot', 'Bootstrap', 'Style', 'bootstrap', '7952B3'),
  ]
};

// 2. OPERATIONS PROFILE
const OPS_PROFILE: ProfileData = {
  id: 'operations',
  theme: {
    id: 'midnight-ops', // Switched to Dark Theme for visibility
    colors: {
      bg: '#020617', // Slate 950
      card: '#0f172a', // Slate 900
      border: '#1e293b', // Slate 800
      primary: '#38bdf8', // Sky 400
      accent: '#22d3ee', // Cyan 400
      text: '#f8fafc', // Slate 50
      muted: '#94a3b8', // Slate 400
    },
    fonts: {
      body: 'Lato',
      display: 'Lato',
    }
  },
  user: {
    name: "Durrani Adil Khan",
    handle: "@ops.manager",
    role: "Project Manager & Operations",
    bio: "Results-driven coordinator optimizing workflows and delivering projects on time. Specialist in stakeholder management and resource optimization.",
    location: "Aurangabad, India",
    avatarUrl: media('operations.png'),
    certifications: [
      { name: "Human Resources - GE Aerospace", url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ay2tsYxaTif7Nt6z7/bAPubTkawzGexc6TT_ay2tsYxaTif7Nt6z7_a34c98gcDixQwcwR6_1746354049218_completion_certificate.pdf" },
      { name: "Strategy Consulting - BCG", url: "https://www.theforage.com/completion-certificates/SKZxezskWgmFjRvj9/ntTvo6ru6Tq3A2JPq_SKZxezskWgmFjRvj9_a34c98gcDixQwcwR6_1763027098328_completion_certificate.pdf" },
      { name: "ESG Consultant - TATA Consultancy", url: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/N8Muuhk6XsXgMTeu2_ifobHAoMjQs9s6bKS_a34c98gcDixQwcwR6_1763618164915_completion_certificate.pdf" }
    ],
    // Removed specific experience/skills from Profile Tab display as requested
    experience: [],
    skills: [],
    socials: SHARED_SOCIALS,
    dmTemplate: "Hi Adil, I'm impressed by your operations background and would like to discuss a management role..."
  },
  stories: [
    {
      id: 's_ops_me',
      label: 'Me',
      icon: '',
      color: 'bg-white',
      content: [],
      avatarImage: media('operations.png'),
      storyImage: media('ops-me-story.png')
    }
  ],
  projects: [
    {
      id: "p_ops_1",
      title: "Western Electrical Ops",
      subtitle: "Operations & Tender Mgmt",
      description: "Managed daily operations for a government-licensed contracting firm, overseeing public sector infrastructure execution.",
      imageUrl: media('we-logo.png'),
      role: "Internal Manager",
      year: "2025",
      tags: ["Operations", "Compliance", "Logistics"],
      stats: { duration: "3 months", views: "Impact", likes: 45 },
      details: {
        problem: "Complex coordination required for government tenders, workforce scheduling, and material procurement.",
        approach: "Streamlined inventory management reducing wastage. Acted as primary liaison for government officials to ensure 100% adherence to specs.",
        outcome: "Successful execution of industrial projects with zero compliance issues and reduced procurement delays.",
        stack: ["Trello", "Excel", "Compliance", "Inventory Mgmt"]
      },
      links: {}
    },
    {
      id: "p_ops_2",
      title: "Campus Recruitment Drive",
      subtitle: "P.E.S College Placement",
      description: "Orchestrated 8+ recruitment drives facilitating opportunities for 150+ students.",
      imageUrl: media('pes-ops.jfif'),
      role: "Coordinator",
      year: "2024-25",
      tags: ["Recruitment", "Event Mgmt", "HR"],
      stats: { duration: "9 months", likes: 112 },
      details: {
        problem: "Bridging the gap between engineering students and corporate hiring requirements.",
        approach: "Designed 5+ skill development workshops (resume, interview prep). Managed logistics for visiting companies.",
        outcome: "Placed 150+ students across 4 departments and trained 200+ students in technical communication.",
        stack: ["Event Planning", "Communication", "Training"]
      },
      links: {}
    },
    {
      id: "p_ops_3",
      title: "Student Council Finance",
      subtitle: "Budget Optimization",
      description: "Managed budgets totaling ₹200,000+ for student initiatives with 100% policy compliance.",
      imageUrl: media('pes-college-ops.webp'),
      role: "Financial Lead",
      year: "2024",
      tags: ["Finance", "Reporting", "Audit"],
      stats: { duration: "6 months", likes: 67 },
      details: {
        problem: "Inefficient budget allocation across student council events.",
        approach: "Authored 5 comprehensive quarterly financial reports. Implemented stricter vendor management.",
        outcome: "Achieved 15% improvement in budget allocation efficiency.",
        stack: ["Excel", "Budgeting", "Reporting"]
      },
      links: {}
    },
  ],
  activities: [
    { id: "a_ops_2", date: "Nov 25’ – Present", title: "Project Manager @ Be Endless", description: "Sole client-facing lead for 4+ web projects. Advised C-suite on operational efficiency, reducing pipeline turnaround by 20%.", type: "manage" },
    { id: "a_ops_1", date: "Sept 25’ – Nov 25’", title: "Internal Manager @ Western Electrical", description: "Managed daily operations for public sector infra projects. Coordinated technical workforce and streamlined inventory.", type: "manage" },
    { id: "a_ops_3", date: "Nov 24' – July 25'", title: "Placement Coordinator @ P.E.S College", description: "Orchestrated 8+ recruitment drives for 150+ students. Delivered 5+ skill development workshops.", type: "manage" },
    { id: "a_ops_4", date: "Mar 24' – Oct 24’", title: "Financial Lead @ Student Council", description: "Authored 5 financial reports. Managed ₹200k+ budgets with 100% compliance.", type: "manage" },
    { id: "a_ops_5", date: "Nov 23' – Feb 24'", title: "Event Lead @ P.E.S College", description: "Managed ₹150k+ budgets and 10+ vendors for 3 major events attracting 500+ attendees.", type: "manage" },
    { id: "a_ops_6", date: "July 23’– Nov 24’", title: "Volunteer Coordinator @ P.E.S College", description: "Led recruitment of 30+ volunteers. Designed recognition program boosting retention by 25%.", type: "manage" }
  ],
  explore: [
    { id: 'e_ops_1', title: 'Project Coordination', category: 'Ops', icon: ClipboardList },
    { id: 'e_ops_2', title: 'Workflow Optimization', category: 'Ops', icon: GitMerge },
    { id: 'e_ops_3', title: 'Team Leadership', category: 'HR', icon: Users },
    { id: 'e_ops_4', title: 'Stakeholder Mgmt', category: 'Ops', icon: UserCheck },
    { id: 'e_ops_5', title: 'Reporting', category: 'Ops', icon: FileText },
    { id: 'e_ops_6', title: 'Budget Mgmt', category: 'Ops', icon: PieChart },
    { id: 'e_ops_7', title: 'Workshop Facilitation', category: 'HR', icon: MessageSquare },
    { id: 'e_ops_8', title: 'Performance Tracking', category: 'HR', icon: BarChart2 },
    { id: 'e_ops_9', title: 'Volunteer Mgmt', category: 'HR', icon: HeartHandshake },
    { id: 'e_ops_10', title: 'Onboarding', category: 'HR', icon: UserPlus },
    { id: 'e_ops_11', title: 'MS Project', category: 'Tools', icon: CalendarRange },
    { id: 'e_ops_12', title: 'Trello', category: 'Tools', icon: Layout },
    { id: 'e_ops_13', title: 'Slack', category: 'Tools', icon: Hash },
    { id: 'e_ops_14', title: 'Google Workspace', category: 'Tools', icon: Grid },
    { id: 'e_ops_15', title: 'Excel (Advanced)', category: 'Tools', icon: Table2 },
    { id: 'e_ops_16', title: 'Event Planning', category: 'Tools', icon: Calendar },
    { id: 'e_ops_17', title: 'Vendor Mgmt', category: 'Tools', icon: Store },
  ]
};

// 3. CONTENT PROFILE
const CONTENT_PROFILE: ProfileData = {
  id: 'content',
  theme: {
    id: 'literary-warm',
    colors: {
      bg: '#fbf7f0', // Warm paper / stone-50 ish
      card: '#f4eadd', // Slightly darker warm
      border: '#d6cbb8', // Stone 300
      primary: '#78350f', // Amber 900
      accent: '#ca8a04', // Yellow 600
      text: '#451a03', // Amber 950
      muted: '#a8a29e', // Stone 400
    },
    fonts: {
      body: 'Playfair Display',
      display: 'Playfair Display',
    }
  },
  user: {
    name: "Durrani Adil Khan",
    handle: "@poet.adil",
    role: "Poet & Content Strategist",
    bio: "Published poet and SEO strategist. I merge philosophical inquiry with conversion-focused narratives.",
    location: "Remote / India",
    avatarUrl: media('content.png'),
    // removed currentlyWorkingOn as requested
    skills: ["SEO Writing", "Creative Writing", "Copywriting", "Storytelling", "Research", "Editing"],
    // removed experience from profile view, moved to activities
    experience: [],
    socials: {
      ...SHARED_SOCIALS,
      // Override for Content Profile
      github: "https://www.instagram.com/durrani.hw/"
    },
    dmTemplate: "Hi Adil, I read your poetry and articles, and I'd love to collaborate on a creative piece..."
  },
  stories: [
    {
      id: 's_cont_me',
      label: 'Me',
      icon: '',
      color: 'bg-white',
      content: [],
      avatarImage: media('content.png'),
      storyImage: media('poet-me-story.png')
    }
  ],
  projects: [
    {
      id: "p_cont_1",
      title: "Nazm-e-Adil Vol I",
      subtitle: "Poetry Collection",
      description: "A curated cycle of twenty-three philosophical verses navigating the sacred terrain between divine love and the annihilation of the ego.",
      imageUrl: media('nazmv1.png'), // Placeholder for Abstract book cover/calligraphy
      role: "Author",
      year: "2025",
      tags: ["Poetry", "Philosophy", "Sufism"],
      stats: { duration: "Published", likes: 342 },
      details: {
        problem: "Expressing complex existential and theological concepts through contemporary verse.",
        approach: "Adapting traditional Ghazal structures and rhythmic frameworks to curate a rigorous selection from over three hundred original manuscripts.",
        outcome: "A cohesive body of work merging mystic tradition with modern existential inquiry.",
        stack: ["Creative Writing", "Philosophy", "Literature"]
      },
      links: {}
    },
    {
      id: "p_cont_2",
      title: "Raah-e-Digaar",
      subtitle: "Personal Reflection",
      description: "thinking of taking some other path",
      imageUrl: media('raah.png'), // Placeholder for Path/Nature
      role: "Poet",
      year: "2026",
      tags: ["Reflection", "Life", "Journey"],
      stats: { duration: "Thought", likes: 156 },
      details: {
        problem: "Navigating life's crossroads.",
        approach: "Introspective writing about finding a new path in life",
        outcome: "An ongoing exploration of personal growth and self-discovery.",
        stack: ["Photography", "Writing"]
      },
      links: {}
    },
    {
      id: "p_cont_3",
      title: "Nazm-e-Adil Vol II",
      subtitle: "Poetry Collection",
      description: "The continuation of the Sufi-inspired cycle, delving deeper into the metaphysics of silence and faith.",
      imageUrl: media('nazmv2.png'), // Placeholder for Abstract
      role: "Author",
      year: "2025",
      tags: ["Poetry", "Sequel", "Sufism"],
      stats: { duration: "In Progress", likes: 201 },
      details: {
        problem: "Expanding the thematic universe of Volume One.",
        approach: "Exploring darker themes of separation and divine longing.",
        outcome: "A continuing anthology that deepens the archive's exploration of metaphysical presence through rhythmic persistence.",
        stack: ["Publishing", "Editing"]
      },
      links: {}
    }
  ],
  // Populating Activity with the detailed Work History
  activities: [
    { id: "a_cont_1", date: "Aug 25’ – Oct 25’", title: "Content Writer @ TERN", description: "Drove organic search visibility by authoring 10+ SEO-optimized blogs on AI recruitment. Generated 13k+ words adhering to brand guidelines.", type: "ship" },
    { id: "a_cont_2", date: "Nov 24’ – Mar 25’", title: "Academic Writer @ MyMegaminds", description: "Delivered 40+ academic essays across 15+ disciplines. Maintained 100% compliance with APA/MLA standards.", type: "publish" },
    { id: "a_cont_3", date: "Apr 24’ – Sep 24’", title: "Content Writer @ Nettv4u", description: "Increased organic traffic by 15% via 40+ entertainment articles. Applied strategic keyword targeting.", type: "ship" },
    { id: "a_cont_4", date: "Oct 23’ – Feb 24’", title: "Creative Writer @ Pawwz", description: "Boosted follower engagement by 10% through social campaigns and newsletters. Collaborated with design teams.", type: "manage" },
    { id: "a_cont_5", date: "Jun 23’ – Sep 23’", title: "Content Writer @ NayePankh", description: "Increased engagement by 15% for social awareness campaigns. Drafted newsletters and donor stories.", type: "manage" },
    { id: "a_cont_6", date: "June 21’ – Present", title: "Writer and Poet", description: "Cultivated portfolio of 300+ poems. Developing full-length collection and philosophical novel.", type: "experiment" }
  ],
  // Populating Explore with Literary Works & Certifications (Bento Grid)
  explore: [
    { id: 'e_lit_1', title: 'Nazm-e-Adil I & II', category: 'Poetry', icon: BookOpen },
    { id: 'e_lit_2', title: 'Greek & Latin Fragments', category: 'Poetry', icon: Scroll },
    { id: 'e_lit_3', title: 'Novel Draft', category: 'Fiction', icon: Feather },
    { id: 'e_lit_4', title: 'Essays & Letters', category: 'Non-Fiction', icon: AlignLeft },
    { id: 'e_lit_5', title: 'Voices Unbound', category: 'Publication', icon: Book },
    { id: 'e_lit_6', title: 'Stardust & Sentences', category: 'Publication', icon: Star },
    { id: 'e_lit_7', title: 'Gold Medalist (28x)', category: 'Award', icon: Award },
    { id: 'e_lit_8', title: '3x Published Author', category: 'Achievement', icon: PenTool },
    { id: 'e_lit_9', title: 'She Raises, India Shines', category: 'Co-Author', icon: Users },
  ]
};

export const PROFILES: Record<string, ProfileData> = {
  'developer': DEV_PROFILE,
  'operations': OPS_PROFILE,
  'content': CONTENT_PROFILE
};

// Default fallback (can be empty or one of them)
export const DEFAULT_PROFILE = DEV_PROFILE;