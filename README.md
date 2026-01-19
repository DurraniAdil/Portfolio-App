# Portfolio App

A modern, mobile-first portfolio web application designed to showcase multiple professional identities through a social media-inspired interface. Built with React 19, TypeScript, and Tailwind CSS, the application presents a unique approach to personal branding by allowing users to explore different professional personas through a familiar Instagram-like experience.

---

## Overview

Portfolio App reimagines the traditional portfolio website as an interactive, password-protected experience. Instead of a static resume, visitors engage with content through stories, posts, and a dynamic feed structure. The application supports three distinct professional profiles, each with its own visual theme, content, and personality.

### Supported Profiles

| Profile | Handle | Theme | Description |
|---------|--------|-------|-------------|
| Developer | @dev.adil | Dark OS (Zinc/Violet) | Front-end development projects and technical skills |
| Operations | @ops.manager | Midnight Ops (Slate/Sky) | Project management, certifications, and coordination work |
| Content | @poet.adil | Literary Warm (Cream/Amber) | Poetry collections, writing portfolio, and creative works |

---

## Architecture

### Technology Stack

- **Framework**: React 19.2.3
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 6.2
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React 0.562

### Project Structure

```
portfolio-app/
├── App.tsx                 # Main application with routing and authentication
├── constants.ts            # Profile data, projects, activities, and themes
├── types.ts                # TypeScript interfaces and type definitions
├── index.tsx               # Application entry point
├── index.html              # HTML template with Tailwind CDN
├── components/
│   ├── NavBar.tsx          # Bottom navigation bar
│   ├── ProjectDetailView.tsx # Full-screen project modal
│   └── UI.tsx              # Reusable UI components (Button, Tag)
├── views/
│   ├── SplashScreen.tsx    # Initial loading animation
│   ├── LoginScreen.tsx     # Profile selection and authentication
│   ├── HomeFeed.tsx        # Main feed with stories and project posts
│   ├── Explore.tsx         # Skills and expertise bento grid
│   ├── Activity.tsx        # Timeline of work history and achievements
│   ├── Profile.tsx         # User profile with connect options
│   └── DirectMessage.tsx   # Contact form interface
└── public/media/           # Static assets (images, PDFs, icons)
```

---

## Features

### Authentication System

The application uses a password-based profile selection system. Each password corresponds to a different professional identity:

- Entering `developer` loads the Developer profile
- Entering `operations` loads the Operations profile
- Entering `content` loads the Content/Poet profile

### Dynamic Theming

Each profile applies a unique color scheme and typography through CSS custom properties. The theme system includes:

- Background, card, and border colors
- Primary and accent colors
- Text and muted text colors
- Body and display font families

Themes are applied dynamically when a user logs in, allowing seamless switching between professional identities.

### Instagram-Style Interface

**Home Feed**
- Story highlights with full-screen viewing capability
- Project posts with double-tap like functionality
- Comment system
- Hide/Report post options
- Direct message integration

**Stories**
- 15-second auto-advancing timer
- Progress bar indicator
- Reply functionality
- Like/React options

**Explore Tab**
- Bento grid layout for skills
- Category-based organization
- Visual icons or technology logos

**Activity Tab**
- Chronological timeline
- Work history entries
- Achievement badges
- Type-based categorization (ship, learn, experiment, publish, manage)

**Profile Tab**
- Avatar and stats display
- Experience and certifications
- Connect grid with social links
- Resume download functionality
- Contact buttons

### Mobile-First Design

The application is optimized for mobile viewing with:

- Maximum width constraint (max-w-md) for consistent presentation
- Touch-friendly interactions
- Native share API integration
- Safe area padding for notched devices

---

## Data Model

### ProfileData Interface

Each profile contains the following data structure:

```typescript
interface ProfileData {
  id: 'developer' | 'operations' | 'content';
  theme: ThemeConfig;
  user: UserProfile;
  stories: Story[];
  projects: Project[];
  activities: ActivityItem[];
  explore: ExploreItem[];
}
```

### Content Types

**Projects**: Portfolio pieces displayed as posts with title, description, tags, stats, and detailed breakdowns including problem, approach, outcome, and tech stack.

**Activities**: Timeline entries representing work history, achievements, and milestones with date, title, description, and type classification.

**Explore Items**: Skills and expertise displayed in a grid format with icons, titles, and category groupings.

---

## Customization

### Adding a New Profile

1. Define the profile data in `constants.ts` following the `ProfileData` interface
2. Add the profile key to the `PROFILES` export
3. Create corresponding media assets in `public/media/`

### Modifying Theme Colors

Update the `theme.colors` object in the profile definition:

```typescript
theme: {
  id: 'custom-theme',
  colors: {
    bg: '#ffffff',
    card: '#f5f5f5',
    border: '#e0e0e0',
    primary: '#3b82f6',
    accent: '#8b5cf6',
    text: '#1f2937',
    muted: '#6b7280',
  },
  fonts: {
    body: 'Inter',
    display: 'Poppins',
  }
}
```

### Adding Projects

Add new entries to the `projects` array in each profile within `constants.ts`. Each project requires:

- Unique ID
- Title and subtitle
- Description
- Image URL
- Role and year
- Tags array
- Stats object
- Details object
- Links object

---

## Browser Compatibility

The application is designed to work on modern browsers with support for:

- CSS Custom Properties
- Flexbox and Grid layouts
- Fetch API
- Web Share API (mobile)
- Blob downloads

For optimal experience, use the latest versions of Chrome, Safari, Firefox, or Edge.

---


## License

This project is private and not licensed for public distribution or modification without explicit permission from the author.

---

## Author

**Durrani Adil Khan**

- GitHub: [DurraniAdil](https://github.com/DurraniAdil)
- LinkedIn: [durraniadil13](https://www.linkedin.com/in/durraniadil13/)
- Email: durraniadil13@gmail.com
- Portfolio: [Portfolio-Portal](https://durraniadil.github.io/Portfolio-Portal/)
