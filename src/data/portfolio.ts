import {
  Box,
  PenTool,
  Monitor,
  Smartphone,
  Database,
  Code,
  Cpu,
  FileCode,
} from "lucide-react";

export const personalInfo = {
  name: "Oussama",
  lastName: "Mouzgui",
  fullName: "Oussama Mouzgui",
  role: "Next.js & Full Stack Specialist",
  location: "Morocco",
  email: "omouzgui@gmail.com",
  profileImage: "/profile-pictures/oussama profile.jpg",
  introduction:
    "Next.js & Full Stack Developer specializing in React, Node.js, and Tailwind CSS to build high-performance digital experiences.",
  bio: "I transform complex ideas into scalable, high-performance applications. My core expertise lies in the Next.js, React, and Node.js ecosystem, complemented by a solid foundation in Laravel, Python, and TypeScript. I'm dedicated to clean code, smooth animations, and exceptional user experiences.",
  mainStack: ["Next.js", "React.js", "Node.js", "Tailwind CSS"],
  skills: {
    expert: ["Next.js", "React.js", "Node.js", "Tailwind CSS", "JavaScript"],
    proficient: ["TypeScript", "Laravel", "PHP", "Supabase", "Firebase"],
    familiar: ["Python", "Three.js", "MySQL", "PostgreSQL"],
  },
  socials: {
    dribbble: "#",
    linkedin: "https://www.linkedin.com/in/mouzgui-oussama-9b046123a/",
    github: "https://github.com/mouzgui",
  },
  stats: {
    yearsOfExperience: "2+",
    satisfiedClients: "15+",
  },
  seo: {
    title: "Oussama Mouzgui | Next.js & Full Stack Specialist",
    description:
      "Portfolio of Oussama Mouzgui, a Next.js & Full Stack Developer specializing in building high-performance headless e-commerce, SaaS, and modern web applications.",
    keywords: [
      "Oussama Mouzgui",
      "Next.js Developer",
      "Full Stack Developer",
      "React Specialist",
      "Headless E-commerce",
      "SaaS Development",
      "Morocco Developer",
      "Web3Forms Integration",
      "PWA Developer",
    ],
    ogImage: "/profile-pictures/oussama profile.jpg",
    twitterHandle: "@mouzgui",
    url: "https://oussama-mouzgui.vercel.app/", // Replace with your actual domain
  },
  portfolio: {
    title: "All Creative Works, Selected projects.",
    subtitle:
      "A collection of production-ready applications, from headless e-commerce stores to complex SaaS management systems.",
    exploreLink: "#",
  },
  blog: {
    title: "What's new? Latest from my blog.",
    subtitle: "Insights",
  },
  contact: {
    title: "Got a project? Let's talk.",
    subtitle:
      "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
    formTitle: "Estimate your project? Let me know here.",
  },
  servicesSection: {
    title: "Turning Ideas into Digital Reality.",
    subtitle:
      "I leverage modern frameworks to build scalable and robust applications for web and mobile.",
  },
};

export const services = [
  {
    title: "Next.js & React",
    level: 95,
    icon: "Code",
    description:
      "Architecting high-performance, SEO-optimized web applications with modern patterns.",
  },
  {
    title: "React Native",
    level: 90,
    icon: "Smartphone",
    description:
      "Building cross-platform mobile experiences with native-like performance and smooth UI.",
  },
  {
    title: "Full Stack (Node/Laravel)",
    level: 85,
    icon: "Database",
    description:
      "Designing scalable APIs and robust backend systems using modern server technologies.",
  },
  {
    title: "UI/UX & Tailwind",
    level: 95,
    icon: "PenTool",
    description:
      "Crafting beautiful, responsive interfaces with a focus on accessibility and performance.",
  },
  {
    title: "Python & AI Integration",
    level: 70,
    icon: "Cpu",
    description:
      "Exploring data processing and integrating AI models into web workflows.",
  },
  {
    title: "TypeScript",
    level: 90,
    icon: "FileCode",
    description:
      "Writing type-safe, maintainable code across the entire development stack.",
  },
];

export const projects = [
  {
    id: 5,
    title: "Optician Shop Management.",
    description:
      "A complete multi-shop management solution for optical retail businesses, supporting multiple independent businesses, branches, staff, and inventory.",
    category: "Web, SaaS",
    tags: ["Laravel", "React", "TypeScript", "Inertia.js"],
    image: "/projects/optician-shop-manager/opticina-banner.png",
    featured: true,
    githubUrl: "https://github.com/mouzgui/optician-shop-managment",
    details: {
      highlights: [
        {
          title: "🏢 Multi-Shop Architecture",
          description:
            "Single installation manages multiple businesses with complete data isolation",
        },
        {
          title: "🏪 Multi-Branch Support",
          description:
            "Each business can have multiple branches (stores/locations)",
        },
        {
          title: "👓 Optical-Specific Workflows",
          description:
            "Handles the unique 'Deposit → Lab Work → Pickup' sales cycle",
        },
        {
          title: "📋 Prescription Management",
          description:
            "Complete spectacle and contact lens prescription tracking with expiry alerts",
        },
        {
          title: "🎨 White-Label Ready",
          description: "Custom branding (logo, colors, footer) per business",
        },
      ],
      features: [
        {
          category: "👥 Customer Management",
          items: [
            "Complete customer profiles with contact information",
            "Family linking system (group family members under one head)",
            "Visit history tracking with last_visit_at timestamps",
            "Prescription expiry alerts (rx_expiry_flagged)",
            "Phone-based quick search",
          ],
        },
        {
          category: "📋 Clinical Module",
          items: [
            "Full Rx: Sphere, Cylinder, Axis, ADD, Prism (OD/OS)",
            "Pupillary Distance (PD): Far, Near, Single/Dual type",
            "Expiry tracking with isExpired(), isExpiringSoon() helpers",
            "Contact Lens Prescriptions: Brand, Base Curve, Diameter",
            "Replacement schedules (daily to yearly)",
          ],
        },
        {
          category: "📦 Inventory Management",
          items: [
            "Frames Inventory: SKU & Barcode support, size tracking",
            "Lenses Catalog: Types, Index options, Coatings (HMC, Blue Cut)",
            "Contact Lens Stock: Consumable tracking with expiry dates",
            "Low stock alerts with customizable threshold",
          ],
        },
        {
          category: "💳 Point of Sale (POS)",
          items: [
            "Full-screen, touch-optimized interface",
            "Cart management with discount calculations",
            "Split payments (deposit first, balance on pickup)",
            "Multiple payment methods: cash, card, bank_transfer, insurance",
            "Auto-generated invoice numbers",
          ],
        },
      ],
      techStack: [
        "Laravel 12.x",
        "React 19.x",
        "TypeScript",
        "Inertia.js 2.x",
        "Tailwind CSS 4.0",
        "MySQL",
      ],
    },
  },
  {
    id: 1,
    title: "Headless-PWA-store.",
    description:
      "A high-performance headless e-commerce store with full PWA support, multi-theme capability, and real-time push notifications.",
    category: "Development, PWA",
    tags: ["Next.js 15", "React 19", "Tailwind 4", "Firebase"],
    image: "/projects/Headless-store-assets/Headless-Store-PWA.png",
    featured: true,
    liveUrl: "https://healdess-woo-store.vercel.app/",
    githubUrl: "#",
    details: {
      highlights: [
        {
          title: "🛒 Full E-Commerce",
          description:
            "Complete shopping experience with cart, wishlist, and order tracking.",
        },
        {
          title: "📱 PWA Ready",
          description:
            "Installable on any device with offline support for browsing products.",
        },
        {
          title: "🔔 Push Notifications",
          description:
            "Real-time order status updates powered by Firebase Cloud Messaging.",
        },
        {
          title: "🎨 6 Color Themes",
          description:
            "Switch between Luxury, Tech, Nature, Minimal, and Playful styles.",
        },
      ],
      features: [
        {
          category: "🛍️ Shopping Experience",
          items: [
            "Advanced Cart & Wishlist management",
            "Secure checkout flow",
            "Real-time order tracking",
            "Product search and filtering",
          ],
        },
        {
          category: "⚙️ Core Capabilities",
          items: [
            "PWA: Mobile & Desktop installation",
            "Offline functionality (cached products)",
            "Auto-detect Dark Mode + Manual toggle",
            "Full Authentication: Login, Register, Reset",
          ],
        },
      ],
      techStack: [
        "Next.js 15",
        "React 19",
        "Tailwind CSS 4",
        "Firebase",
        "Shopify API",
      ],
    },
  },
  {
    id: 2,
    title: "Zombie Subscriptions.",
    description:
      "A beautiful, modern subscription tracker app. Manage your recurring payments with ease and never miss a renewal.",
    category: "Mobile, App",
    tags: ["React Native", "Expo", "Supabase", "Lucide"],
    image: "/projects/zombie-app/zombie-banner.png",
    featured: true,
    liveUrl: "https://appetize.io/app/b_mlkz4wtkvntp5cug43t2kgkhye",
    downloadUrl:
      "https://expo.dev/accounts/coldsama/projects/zombie-subscriptions/builds/37c488ed-5c28-40a2-9ac7-2539af62793e",
    githubUrl: "https://github.com/mouzgui/reminder-subscriptions-app",
    details: {
      highlights: [
        {
          title: "📊 Spending Dashboard",
          description:
            "Track total monthly spending and upcoming renewal costs at a glance.",
        },
        {
          title: "🔔 Renewal Reminders",
          description:
            "Automated push notifications to ensure you never miss a payment.",
        },
        {
          title: "🌍 Multi-language",
          description:
            "Full support for English, French, and Arabic interfaces.",
        },
        {
          title: "🎨 Organized Categories",
          description:
            "Subscriptions grouped by Streaming, Productivity, Gaming, etc.",
        },
      ],
      features: [
        {
          category: "✨ App Features",
          items: [
            "Beautiful UI with smooth Framer Motion animations",
            "Dark/Light Mode with automatic theme switching",
            "Supabase Auth: Email and Password login",
            "Subscription Limit: Free tier vs Pro upgrade",
            "Custom Category Icons for quick identification",
          ],
        },
      ],
      techStack: [
        "React Native",
        "Expo",
        "Supabase",
        "TypeScript",
        "NativeWind",
      ],
    },
  },
  {
    id: 6,
    title: "Gestion de Stock.",
    description:
      "A modern, responsive, and multilingual Stock Management System built with Next.js, Supabase, and Tailwind CSS. This application helps businesses efficiently track inventory, manage stock movements, and monitor low-stock alerts in real-time.",
    category: "Web, App",
    tags: ["Next.js 16", "Supabase", "Tailwind CSS v4", "Zustand"],
    image: "/projects/gestion-de-stock/gestion-de-stock.png",
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    details: {
      highlights: [
        {
          title: "📊 Interactive Dashboard",
          description: "Overview of total products, stock quantities, stock health, and recent movements.",
        },
        {
          title: "🚨 Low Stock Alerts",
          description: "Automatically highlights products that fall below their minimum required quantity.",
        },
        {
          title: "🌍 Multilingual Support",
          description: "Fully localized in English, French, and Arabic (with complete RTL support for Arabic).",
        },
        {
          title: "📱 Progressive Web App",
          description: "Installable on mobile and desktop devices for offline-like experiences.",
        },
      ],
      features: [
        {
          category: "📦 Stock Management",
          items: [
            "Add, edit, delete, and search products easily",
            "Dedicated interfaces for Stock In and Stock Out operations",
            "Comprehensive log of all stock movements with filtering",
          ],
        },
        {
          category: "⚙️ Core Capabilities",
          items: [
            "Secure Authentication with Supabase Auth",
            "Beautiful UI that works seamlessly across all devices",
            "Zustand state management",
          ],
        },
      ],
      techStack: [
        "Next.js 16",
        "Supabase (PostgreSQL + RLS)",
        "Tailwind CSS v4",
        "Zustand",
        "Lucide React",
        "Date-fns",
      ],
    },
  },
];

export const blogPosts = [
  {
    date: "Dec 28",
    category: "Next.js",
    title: "Building High-Performance Headless Stores with Next.js 15",
  },
  {
    date: "Nov 15",
    category: "Full Stack",
    title: "Modern SaaS Architecture: Laravel Backend with React Frontend",
  },
  {
    date: "Oct 05",
    category: "Mobile",
    title: "Subscription Tracking: Bridging React Native and Supabase",
  },
];
