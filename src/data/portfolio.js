// All portfolio content — file contents keyed by path

export const fileContents = {
  "/About Me/bio.txt": `==============================================
  ABOUT ME
==============================================

Hey there! I'm Oussama Mouzgui — a passionate Full Stack Software Engineer.

I transform complex ideas into scalable, high-performance applications. 
My core expertise lies in architecting robust solutions using React.js, Node.js, 
and modern JavaScript, complemented by a solid foundation in C, PHP, and SQL. 
I am dedicated to writing clean, maintainable code, crafting responsive designs, 
and delivering exceptional user experiences.

I have successfully engineered 6+ robust web development projects, ranging from 
pixel-perfect frontend interfaces to complex fullstack platforms. I thrive on 
solving challenging technical problems, optimizing system performance, and 
crafting modern UI/UX designs that drive user engagement.

Contact: omouzgui@gmail.com
LinkedIn: linkedin.com/in/mouzgui-oussama-9b046123a/
GitHub:  github.com/mouzgui
`,

  "/About Me/values.md": `# My Core Values

## Turning Ideas into Digital Reality
I leverage modern frameworks to build scalable and robust applications for web and mobile.

## Crafting Beautiful UI/UX
Crafting beautiful, responsive interfaces with a focus on accessibility and performance using Tailwind CSS, Bootstrap, and modern styling tools.

## Architecture & Performance
Architecting high-performance, SEO-optimized web applications with modern fullstack patterns.

## Problem Solving
Approaching complex challenges with critical thinking and computer science fundamentals.
`,

  "/About Me/skills.md": `# Technical Skills

## Programming Languages
- JavaScript
- C
- Basic PHP
- SQL

## Frontend Development
- React.js
- React Native
- HTML5 & CSS3
- Tailwind CSS & Bootstrap

## Backend Development
- Node.js
- MySQL

## Tools & Core Knowledge
- Git & GitHub, Terminal & Linux
- Algorithms & Data Structures
- Problem Solving & Critical Thinking
- Responsive Web Design
- Fullstack Architecture
`,

  "/Experience/RWS_Group.md": `# Frontend Software Engineer
**RWS Group** | April 2025 – May 2026

- Engineered complex frontend solutions and integrated advanced AI-related features in a fully remote environment.
- Spearheaded UI improvements and streamlined development workflows, resulting in significantly enhanced web interfaces and user retention.
- Collaborated seamlessly with cross-functional, distributed teams utilizing Agile methodologies to deliver scalable software on tight deadlines.
`,

  "/Experience/Teal_ElGhazali.md": `# Frontend Developer Intern
**Teal ElGhazali** | 3 Months

- Engineered responsive, mobile-first web interfaces in a fast-paced startup environment.
- Contributed to modern frontend development tasks, optimizing application load times and rendering performance.
- Collaborated directly with designers and senior engineers to translate UI/UX wireframes into functional, high-quality code.
`,

  "/Experience/Freelance.md": `# Full Stack Web Developer
**Self-Employed** | 2023 – Present

- Architected and delivered custom websites and fullstack solutions for diverse local and international clients.
- Designed responsive UI layouts and implemented modern web applications using React.js and Node.js.
- Managed the end-to-end project lifecycle—from client requirements gathering to deployment—ensuring exceptional quality and client satisfaction.
`,

  "/Experience/SOREMED.md": `# Accounting Intern
**SOREMED** | 6 Months Internship

- Assisted with financial accounting and streamlined administrative tasks, showcasing strong organizational skills.
- Gained valuable professional experience in corporate operations, data management, and meticulous record-keeping.
`,

  "/Education/ALX_Certificate.md": `# ALX Fullstack Software Engineering
**ALX Africa** | 2021 – 2022

- Completed an intensive, project-based Fullstack Software Engineering training program.
- Gained hands-on experience in advanced software development, system architecture, and modern backend/frontend technologies.
`,

  "/Education/Harvard_CS50.md": `# CS50 – Introduction to Computer Science
**Harvard University** | 2020

- Mastered core computer science fundamentals, including algorithms, memory management, and data structures.
- Demonstrated strong problem-solving capabilities through rigorous programming assignments in C, Python, and SQL.
`,

  "/Education/1337_Bootcamp.md": `# 1337 Coding School – Pool Bootcamp
**1337 (42 Network)** | 2023

- Survived a rigorous, immersive bootcamp focused on low-level systems programming and algorithmic problem-solving.
- Enhanced critical thinking and peer-to-peer collaboration skills through complex C programming challenges.
`,

  "/Education/Udemy_Courses.md": `# Advanced Technical Certifications
**Udemy**

Successfully completed multiple advanced technical courses to stay at the cutting edge of web development:
- **Computer Science Fundamentals**: Deep dive into computational theory and logic.
- **Fullstack JavaScript Development**: Comprehensive training in MERN stack architecture.
- **Node.js Development**: Advanced backend API design, authentication, and database integration.
`,

  "/Playground/ideas.txt": `=== IDEA NOTEBOOK ===

[x] Build a Headless E-commerce Store
[x] Build a Multi-tenant SaaS App
[x] Launch a Mobile App
[ ] Explore Web3Forms Integration
[ ] Dive deeper into Three.js

=== RANDOM THOUGHTS ===

Let's build something remarkable together!
`,

  "/Playground/.secret": `🔮 You found the secret file!

Congratulations, you curious explorer.
Not many people dig this deep.

Here's a little secret: this entire portfolio OS
was built with vanilla JavaScript. No React,
no Vue, no frameworks. Just pure DOM manipulation,
CSS animations, and a lot of attention to detail.

— Oussama
`,
};

// Project data
import opticianBanner from "../projects/optician-shop-manager/opticina-banner.png";
import headlessBanner from "../projects/Headless-store-assets/Headless-Store-PWA.png";
import zombieBanner from "../projects/zombie-app/zombie-banner.png";
import complaintsBanner from "../projects/complaints_app/complaints-banner.png";
import dashboardBanner from "../projects/Dashboard/ayman-banner.png";
import gestionBanner from "../projects/gestion-de-stock/gestion-de-stock.png";

export const projects = {
  "Red Gold Portal.app": {
    title: "Red Gold - Business Portal",
    icon: "🏆",
    description:
      "A comprehensive, secure, and multi-lingual business management portal designed to streamline daily operations, track sales, manage inventory, and generate detailed financial reports.",
    tech: ["Next.js 16", "React", "Tailwind CSS v4", "Supabase", "TypeScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/mouzgui/red-gold-portal",
    year: "2024",
    image: dashboardBanner,
    details: {
      highlights: [
        {
          title: "📊 Real-Time Dashboard",
          description:
            "Immediate insights into total revenue, profits, monthly trends, and low-stock alerts.",
        },
        {
          title: "📄 Advanced PDF Reporting",
          description:
            "Automatically generate financial reports with multi-language and RTL table layout support.",
        },
        {
          title: "🌍 Multi-lingual & PWA",
          description:
            "Built-in i18n (English, French, Arabic RTL) and installable as a standalone app on desktop and mobile.",
        },
      ],
      features: [
        {
          category: "💰 Sales & Inventory",
          items: [
            "Track products and categorize items",
            "Log sales with guide commissions",
            "Expense tracking to calculate net income",
          ],
        },
        {
          category: "⚙️ Core Capabilities",
          items: [
            "Secure Supabase Authentication",
            "Row Level Security (RLS)",
            "Fully responsive design",
          ],
        },
      ],
    },
  },
  "Optician Shop Management.app": {
    title: "Optician Shop Management.",
    icon: "🏢",
    description:
      "A complete multi-shop management solution for optical retail businesses, supporting multiple independent businesses, branches, staff, and inventory.",
    tech: ["Laravel", "React", "TypeScript", "Inertia.js"],
    liveUrl: "#",
    githubUrl: "https://github.com/mouzgui/optician-shop-managment",
    year: "2024",
    image: opticianBanner,
    details: {
      highlights: [
        {
          title: "🏢 Multi-Shop Architecture",
          description:
            "Single installation manages multiple businesses with complete data isolation",
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
      ],
      features: [
        {
          category: "👥 Customer Management",
          items: [
            "Complete customer profiles",
            "Family linking system",
            "Prescription expiry alerts",
          ],
        },
        {
          category: "💳 Point of Sale (POS)",
          items: [
            "Touch-optimized interface",
            "Split payments",
            "Multiple payment methods",
          ],
        },
      ],
    },
  },
  "Headless-PWA-store.app": {
    title: "Headless-PWA-store.",
    icon: "🛒",
    description:
      "A high-performance headless e-commerce store with full PWA support, multi-theme capability, and real-time push notifications.",
    tech: ["Next.js 15", "React 19", "Tailwind 4", "Firebase"],
    liveUrl: "https://healdess-woo-store.vercel.app/",
    githubUrl: "#",
    year: "2024",
    image: headlessBanner,
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
      ],
      features: [
        {
          category: "🛍️ Shopping Experience",
          items: [
            "Advanced Cart & Wishlist",
            "Secure checkout flow",
            "Real-time tracking",
          ],
        },
        {
          category: "⚙️ Core Capabilities",
          items: [
            "Offline functionality",
            "Auto-detect Dark Mode",
            "Full Authentication",
          ],
        },
      ],
    },
  },
  "Zombie Subscriptions.app": {
    title: "Zombie Subscriptions.",
    icon: "🧟",
    description:
      "A beautiful, modern subscription tracker app. Manage your recurring payments with ease and never miss a renewal.",
    tech: ["React Native", "Expo", "Supabase", "Lucide"],
    liveUrl: "https://appetize.io/app/b_mlkz4wtkvntp5cug43t2kgkhye",
    githubUrl: "https://github.com/mouzgui/reminder-subscriptions-app",
    year: "2024",
    image: zombieBanner,
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
      ],
      features: [
        {
          category: "✨ App Features",
          items: [
            "Beautiful UI with smooth animations",
            "Dark/Light Mode switching",
            "Supabase Auth",
          ],
        },
      ],
    },
  },
  "Complaints App.app": {
    title: "Union Complaint System",
    icon: "⚖️",
    description:
      "A robust complaint management system for union members, featuring multi-language support, real-time notifications, and automated workflows.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    year: "2024",
    image: complaintsBanner,
    details: {
      highlights: [
        {
          title: "🌍 Multi-Language Support",
          description: "Complete support for Arabic and French with RTL UI.",
        },
        {
          title: "🔒 CNDP Compliance",
          description:
            "Strict data privacy features and automated consent tracking.",
        },
        {
          title: "📱 Responsive Design",
          description:
            "Optimized for all devices including mobile-friendly data tables.",
        },
      ],
      features: [
        {
          category: "🛡️ Security",
          items: ["Row Level Security", "Two-Factor Auth", "Audit Logging"],
        },
        {
          category: "📊 Management",
          items: [
            "Admin Dashboard",
            "Export to CSV/PDF",
            "Real-time analytics",
          ],
        },
      ],
    },
  },
  "Gestion de Stock.app": {
    title: "Gestion de Stock",
    icon: "📦",
    description:
      "A modern, responsive, and multilingual Stock Management System built with Next.js, Supabase, and Tailwind CSS. This application helps businesses efficiently track inventory, manage stock movements, and monitor low-stock alerts in real-time.",
    tech: ["Next.js 16", "Supabase", "Tailwind CSS v4", "Zustand"],
    liveUrl: "#",
    githubUrl: "#",
    year: "2024",
    image: gestionBanner,
    details: {
      highlights: [
        {
          title: "📊 Interactive Dashboard",
          description:
            "Overview of total products, stock quantities, stock health, and recent movements.",
        },
        {
          title: "🚨 Low Stock Alerts",
          description:
            "Automatically highlights products that fall below their minimum required quantity.",
        },
        {
          title: "🌍 Multilingual & PWA",
          description:
            "Fully localized in English, French, and Arabic (RTL) and installable as a PWA.",
        },
      ],
      features: [
        {
          category: "📦 Stock Management",
          items: [
            "Add, edit, delete, and search products easily",
            "Dedicated interfaces for Stock In and Stock Out",
            "Comprehensive log of all stock movements",
          ],
        },
        {
          category: "⚙️ Core Capabilities",
          items: [
            "Admin login powered by Supabase Auth",
            "Responsive UI for mobile, tablet, and desktop",
            "Zustand state management",
          ],
        },
      ],
    },
  },
};

// CV content for PDF viewer
export const cvContent = {
  name: "Oussama Mouzgui",
  title: "Next.js & Full Stack Specialist",
  contact:
    "omouzgui@gmail.com • Morocco • github.com/mouzgui • linkedin.com/in/mouzgui-oussama",
  summary:
    "I transform complex ideas into scalable, high-performance applications. My core expertise lies in the Next.js, React, and Node.js ecosystem, complemented by a solid foundation in Laravel, Python, and TypeScript. I'm dedicated to clean code, smooth animations, and exceptional user experiences.",
  experience: [
    {
      company: "Freelance",
      role: "Full Stack Specialist",
      dates: "2+ Years Experience",
      bullets: [
        "Built and delivered production-ready applications for 15+ satisfied clients",
        "Architected high-performance, SEO-optimized web applications with modern patterns",
        "Designed scalable APIs and robust backend systems using modern server technologies",
        "Developed full headless e-commerce stores with PWA capabilities",
      ],
    },
  ],
  skills: [
    "Next.js",
    "React.js",
    "Node.js",
    "Tailwind CSS",
    "TypeScript",
    "Laravel",
    "Supabase",
    "Firebase",
  ],
  education: {
    school: "Self-Taught & Ongoing Learning",
    degree: "Full Stack Development",
    year: "Present",
  },
};
