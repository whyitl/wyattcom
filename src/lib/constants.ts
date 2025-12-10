// SEO and Site Constants

export const SITE_CONFIG = {
  baseUrl: "https://wyattlain.com",
  siteName: "Wyatt Lain - Web Developer",
  author: "Wyatt Lain",
  email: "contact@wyattlain.com",
  phone: "+1-XXX-XXX-XXXX", // Update with your phone number
  location: {
    city: "Calgary",
    province: "AB",
    country: "Canada",
    postalCode: "T2P 2G8",
    lat: "51.0447",
    lng: "-114.0719",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/wyattlain/",
    twitter: "@wyattlain",
    github: "https://github.com/wyattlain", // Update if applicable
  },
  company: "TUCN Media",
  defaultOgImage: "/og-image.png",
};

export const DEFAULT_META = {
  description:
    "Finance-driven web developer in Calgary specializing in React, Next.js, and data-driven websites. Founder of TUCN Media. Fast, modern web solutions.",
  keywords:
    "Calgary web developer, React developer Calgary, web design Calgary, TUCN Media, Wyatt Lain, Next.js developer",
};

// Page metadata templates
export const PAGE_METADATA = {
  home: {
    title: "Calgary Web Developer | React & Modern Web Design - Wyatt Lain",
    description: DEFAULT_META.description,
    keywords: DEFAULT_META.keywords,
  },
  services: {
    title: "Web Development Services | React, Next.js, TypeScript | Wyatt Lain",
    description:
      "Custom web development services in Calgary. React and Next.js expertise. Fast, scalable, and modern web solutions for your business.",
    keywords:
      "web development Calgary, React services, Next.js development, web design Calgary",
  },
  portfolio: {
    title: "Portfolio | Web Projects & Case Studies | Wyatt Lain",
    description:
      "View my recent web development projects and case studies. React, Next.js, and modern web applications.",
    keywords:
      "portfolio, web projects, case studies, React projects, Calgary web developer",
  },
  about: {
    title: "About | Wyatt Lain - Web Developer & Founder",
    description:
      "Learn about Wyatt Lain, a finance-driven web developer and founder of TUCN Media. Based in Calgary, Alberta.",
    keywords:
      "about Wyatt Lain, web developer biography, Calgary, TUCN Media founder",
  },
  contact: {
    title: "Contact | Get in Touch with Wyatt Lain",
    description:
      "Have a project in mind? Let's talk. Contact Wyatt Lain for web development services in Calgary.",
    keywords: "contact, get in touch, web development inquiry, Calgary web developer",
  },
  blog: {
    title: "Blog | Web Development Articles & Insights | Wyatt Lain",
    description:
      "Read articles about web development, React, Next.js, and digital strategy from Wyatt Lain.",
    keywords: "blog, web development articles, React tips, Next.js guides",
  },
};

// Color scheme for theming
export const THEME = {
  colors: {
    primary: "#0066cc",
    secondary: "#667eea",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    dark: "#1f2937",
    light: "#f3f4f6",
  },
};

// Analytics events
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  PROJECT_VIEW: "project_view",
  BLOG_POST_VIEW: "blog_post_view",
  DOWNLOAD_RESUME: "download_resume",
  EXTERNAL_LINK_CLICK: "external_link_click",
};

// Blog categories
export const BLOG_CATEGORIES = [
  "Web Development",
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Performance",
  "SEO",
  "Web Design",
  "Career",
  "Tutorials",
];

// Services list
export const SERVICES = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Custom web applications built with modern technologies like React and Next.js.",
    icon: "Code",
  },
  {
    id: "web-design",
    title: "Web Design",
    description:
      "Beautiful, intuitive interfaces that combine aesthetics with functionality.",
    icon: "Palette",
  },
  {
    id: "digital-consulting",
    title: "Digital Consulting",
    description:
      "Expert guidance on technology choices, architecture, and digital strategy.",
    icon: "Lightbulb",
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization",
    description:
      "Making your web applications faster and more efficient for better user experience.",
    icon: "Zap",
  },
];

// Tech stack
export const TECH_STACK = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "React Query",
  ],
  backend: [
    "Node.js",
    "Express",
    "NestJS",
    "GraphQL",
    "REST APIs",
    "WebSockets",
  ],
  database: ["PostgreSQL", "MongoDB", "Firebase", "Supabase"],
  tools: [
    "Git",
    "Docker",
    "AWS",
    "Vercel",
    "GitHub Actions",
    "ESLint",
    "Prettier",
  ],
  other: ["Web Vitals", "SEO", "Accessibility (a11y)", "Performance Testing"],
};
