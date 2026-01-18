import React from 'react';

export type Tab = 'home' | 'explore' | 'activity' | 'profile';
export type ViewState = Tab | 'dm';

export interface ThemeConfig {
  id: string;
  colors: {
    bg: string;
    card: string;
    border: string;
    primary: string;
    accent: string;
    text: string;
    muted: string;
  };
  fonts: {
    body: string;
    display: string;
  };
}

export interface Story {
  id: string;
  label: string;
  icon: string; // Keep as fallback
  content: string[]; // Keep for compatibility, though unused for image stories
  color: string;
  storyImage?: string; // Path to full screen story image
  avatarImage?: string; // Path to preview avatar
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string; // The "caption"
  tags: string[];
  imageUrl: string;
  role: string;
  year: string;
  stats: {
    duration: string;
    views?: string;
    likes: number;
  };
  details: {
    problem: string; // Or "Context"
    approach: string; // Or "Strategy" / "Theme"
    outcome: string; // Or "Results" / "Analysis"
    stack: string[]; // Or "Tools" / "Keywords"
  };
  links: {
    demo?: string; // Or "Live Link" / "Publication"
    repo?: string; // Or "Documentation" / "Draft"
    caseStudy?: string;
  };
}

export interface ActivityItem {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'ship' | 'learn' | 'experiment' | 'award' | 'publish' | 'manage';
  imageUrl?: string;
}

export interface ExploreItem {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  icon?: React.ElementType;
}

export interface UserProfile {
  name: string;
  handle: string;
  role: string;
  bio: string;
  location: string;
  avatarUrl: string;
  currentlyWorkingOn?: {
    title: string;
    description: string;
  };
  skills: string[];
  experience: {
    company: string;
    role: string;
    period: string;
  }[];
  certifications?: { name: string; url: string }[];
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email: string;
    portfolio?: string;
  };
  dmTemplate: string;
}

export interface ProfileData {
  id: 'developer' | 'operations' | 'content';
  theme: ThemeConfig;
  user: UserProfile;
  stories: Story[];
  projects: Project[];
  activities: ActivityItem[];
  explore: ExploreItem[];
}