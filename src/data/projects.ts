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
    description: "Live client web application for Tulsi Trader, engineered to deliver a seamless, high-performance digital experience with responsive design and interactive animations.",
    longDescription: "A custom frontend web application designed, developed, and deployed live for Tulsi Trader. Built with clean semantic HTML, CSS, and JavaScript, it features high-speed performance, interactive UI animations, and robust client integrations across all devices.",
    technologiesUsed: ["HTML5", "CSS3", "JavaScript", "GSAP 3.12.2", "Google Font API", "Open Graph", "HTTP/3", "LiteSpeed", "Google Maps", "Hostinger"],
    keyFeatures: [
      "Live client web application hosted at tulsitrader.in",
      "Fully responsive UI/UX designed for desktop, tablet, and mobile devices",
      "Interactive animations and transitions powered by GSAP",
      "Integrated Google Maps API for physical storefront location tracking",
      "Optimized for HTTP/3 and hosted on high-performance LiteSpeed servers via Hostinger"
    ],
    challengesSolved: [
      "Optimized assets and image loading to achieve fast page rendering times",
      "Implemented clean semantic HTML structures and responsive stylesheets",
      "Configured production hosting, domain redirecting, and security settings on Hostinger",
      "Integrated metadata standards (Open Graph) to optimize social sharing previews and search rankings"
    ],
    websiteUrl: "https://tulsitrader.in",
    image: "/assets/tulsi.png",
    bgColor: "#ffffff",
    tags: ["HTML5", "CSS3", "JavaScript", "GSAP", "Google Maps", "LiteSpeed", "Hostinger"],
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
    name: "Sprays Perfume E-Commerce",
    slug: "sprays-perfume-ecommerce",
    year: "2026",
    description: "Premium full-stack perfume and fragrance e-commerce web application featuring high-end design aesthetics, custom dynamic slider, interactive cart, and product filters.",
    longDescription: "A luxurious e-commerce storefront designed specifically for perfumes and sprays. Built to replace traditional generic layouts with a premium cinematic design, it features interactive slides, precise product options (weight selector), responsive cart drawer, and high-performance routing.",
    technologiesUsed: ["React (v19)", "React Router (v7)", "Swiper (v12)", "Tailwind CSS (v4)", "GSAP", "RESTful APIs"],
    keyFeatures: [
      "Elegant dark mode hero layout with premium slide transitions (Swiper v12)",
      "Interactive product details card with size selector (80ml, etc.) and wishlist integrations",
      "Responsive navigation panel and shopping cart badge tracking",
      "Vibrant background animations and high-resolution product showcase",
      "Fully responsive design optimized for seamless desktop and mobile experience"
    ],
    challengesSolved: [
      "Engineered a premium look & feel resembling premium themes like Woodmart but optimized for React SPA",
      "Implemented smooth slider transitions using GSAP and Swiper 12",
      "Optimized layout responsiveness for the product detail overlay card and feature lists"
    ],
    websiteUrl: "TBD",
    githubUrl: "https://github.com/Excelsior-Technologies-Community/sprays-kalpesh",
    image: "/assets/sprays.png",
    bgColor: "#ffffff",
    tags: ["React", "React Router", "Swiper", "Tailwind CSS", "GSAP"],
  },
];
