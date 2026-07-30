export interface Project {
  id: string;
  name: string;
  slug: string;
  year: string;
  description: string;
  longDescription?: string;
  technologiesUsed: string[];
  keyFeatures: string[];
  challengesSolved: string[];
  websiteUrl: string;
  githubUrl?: string;
  image: string;
  bgColor: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "01",
    name: "Tulsi Trader",
    slug: "tulsi-trader",
    year: "2026",
    description: "Live client web application for Tulsi Trader, engineered to deliver a seamless, high-performance digital experience with responsive design and modern web architecture.",
    longDescription: "A custom full-stack web application designed, developed, and deployed live for Tulsi Trader. Built with modern web technologies, it features high-speed performance, intuitive user interface design, and robust client integration across all devices.",
    technologiesUsed: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs"],
    keyFeatures: [
      "Live client web application hosted at tulsitrader.in",
      "Fully responsive UI/UX designed for desktop, tablet, and mobile devices",
      "High-performance REST API integration and database management",
      "Modern frontend architecture built with scalable web components"
    ],
    challengesSolved: [
      "Optimized frontend bundle and asset loading for fast page rendering",
      "Implemented clean user navigation and responsive layouts for all viewports",
      "Configured live domain routing and production server deployment"
    ],
    websiteUrl: "https://tulsitrader.in",
    image: "/assets/tulsi.png",
    bgColor: "#ffffff",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs"],
  },
  {
    id: "02",
    name: "Doctor Appointment System",
    slug: "doctor-appointment-system",
    year: "2026",
    description: "Full-stack doctor appointment platform with secure user authentication and role-based access for patients and administrators.",
    longDescription: "A comprehensive healthcare management platform engineered to streamline doctor-patient interactions and appointment scheduling. Features secure role-based access control (RBAC), real-time availability checking, and robust medical record management.",
    technologiesUsed: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs"],
    keyFeatures: [
      "Secure user authentication with role-based access for patients and admins",
      "Interactive appointment booking & real-time slot scheduling",
      "Doctor profile management & specialization categorization",
      "Patient medical record and prescription storage",
      "RESTful API integration with MongoDB database layer"
    ],
    challengesSolved: [
      "Ensured seamless, asynchronous data flow between React.js frontend and Node.js backend",
      "Implemented granular authorization rules to safeguard sensitive patient medical records",
      "Optimized MongoDB query schemas for fast appointment conflict resolution"
    ],
    websiteUrl: "TBD",
    githubUrl: "https://github.com/kalpesh9427/doctor-appointment-system",
    image: "/assets/dentalcenter1.jpg",
    bgColor: "#ffffff",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs"],
  },
  {
    id: "03",
    name: "Woodmart E-Commerce System",
    slug: "woodmart-ecommerce-system",
    year: "2026",
    description: "Full-stack e-commerce application featuring product management, shopping cart functionality, user authentication, and order processing.",
    longDescription: "A feature-rich online shopping platform built to handle product catalog browsing, interactive cart management, dynamic checkout workflows, and inventory tracking with relational MySQL database management.",
    technologiesUsed: ["React.js", "Node.js", "Express.js", "MySQL", "RESTful APIs"],
    keyFeatures: [
      "Product management & dynamic catalog search/filtering",
      "Interactive shopping cart with real-time price & quantity recalculation",
      "Secure user authentication & account order history",
      "Automated order processing & coupon discount system",
      "Relational MySQL inventory and stock level tracking"
    ],
    challengesSolved: [
      "Structured relational data schemas in MySQL to manage complex product variants and coupon rules",
      "Optimized API endpoint latency during checkout & inventory state updates",
      "Built resilient client-side state management for cart synchronization"
    ],
    websiteUrl: "TBD",
    githubUrl: "https://github.com/Excelsior-Technologies-Community/woodmart-kalpesh",
    image: "/assets/fitnesswarrior1.jpg",
    bgColor: "#ffffff",
    tags: ["React.js", "Node.js", "Express.js", "MySQL", "RESTful APIs"],
  },
];
