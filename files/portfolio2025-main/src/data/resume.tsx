import { Icons } from "@/components/icons";

export const DATA = {
  name: "Michael Torres",
  initials: "MT",
  url: "https://michaelt.engineer",
  location: "Colombia",
  locationLink: "https://www.google.com/maps/place/colombia",
  description:
    "Systems Engineer specialized in full-stack development with expertise in React, Next.js, and Node.js. Proficient in designing and implementing responsive web applications and RESTful APIs. Committed to delivering high-quality solutions through clean code and modern development practices.",
  summary:
    "My journey in software development began at Universidad Popular del Cesar, where I earned my Systems Engineering degree while simultaneously serving as a Systems Monitor. This dual role allowed me to apply theoretical knowledge in practical settings, managing IT infrastructure and developing internal applications. Throughout my career, I've cultivated expertise in front-end technologies like React and Next.js, while also maintaining proficiency in back-end development with Node.js and database management systems. I thrive in collaborative environments and am particularly passionate about creating elegant solutions to complex technical challenges.",
  skills: [
    "React",
    "React Native",
    "Next.js",
    "Typescript",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "TailwindCSS",
    "Docker",
    "Git",
    "Zustand",
    "Redux Toolkit",
    "Sass",
    "Framer Motion",
    "Socket.io",
    "RESTful APIs",
    "SCRUM",
    "Kanban",
    "CI/CD",
    "Unit Testing",
    "Jest",
    "React Testing Library",
    "Figma",
    "Postman",
    "Microsoft Office",
    "Google Workspace",
  ],
  navbar: [
    { href: "#hero", icon: Icons.home },
    { href: "#about", icon: Icons.user },
    { href: "#work", icon: Icons.work },
    { href: "#education", icon: Icons.education },
    { href: "#skills", icon: Icons.shield },
    { href: "#projects", icon: Icons.folder },
    { href: "#certifications", icon: Icons.certifications },
    { href: "#contact", icon: Icons.contact },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/mtorresweb",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/michaeltrs",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/Michael_Tors?t=VX1ZY_nmI0uJu4GExnyoIg&s=08",
        icon: Icons.x,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Universidad Popular del Cesar",
      href: "https://aguachica.unicesar.edu.co/",
      badges: [],
      location: "On-site",
      title: "Systems Monitor",
      logoUrl: "/icons/upc-logo.png",
      start: "09/2024",
      end: "12/2024",
      description:
        "Provided technical support to students and faculty, managed IT infrastructure, and contributed to the development of internal applications to enhance operational efficiency.",
    },
    {
      company: "Freelance",
      href: "#",
      badges: [],
      location: "Remote",
      title: "Freelance Developer",
      logoUrl: "/icons/icon.png",
      start: "2023",
      end: "Present",
      description:
        "Led the design and development of custom web solutions for clients across various industries, focusing on scalability, clean code, and user experience. Key projects include:\n• A symbolic computation application with full support for mathematical notation using LaTeX.\n• An end-to-end platform for a local transportation company to manage services, drivers, vehicles, and incident tracking, featuring real-time dashboards and data visualization.\n• Institutional repository systems with advanced file management, permission control, and GitHub integration to support academic collaboration and project traceability.",
    },
  ],
  education: [
    {
      school: "Universidad Popular del Cesar",
      href: "https://aguachica.unicesar.edu.co/",
      degree: "Systems Engineering",
      logoUrl: "/icons/upc-logo.png",
      start: "2020",
      end: "2024",
    },
    {
      school: "Open English",
      href: "https://www.openenglish.com/",
      degree: "English B2",
      logoUrl: "/icons/open-english.png",
      start: "2022",
      end: "2022",
    },
    {
      school: "SENA",
      href: "https://www.sena.edu.co/",
      degree: "Technical Degree in Administrative Assistance",
      logoUrl: "/icons/sena.png",
      start: "2018",
      end: "2019",
    },
  ],
  projects: [
    {
      title: "Real-Time Chat Application",
      href: "https://chatapp.michaelt.engineer",
      active: true,
      description:
        "Developed a real-time chat application with user authentication, private messaging, and group chat features, utilizing React, Express, and Socket.io.",
      technologies: [
        "React",
        "Socket.io",
        "MongoDB",
        "mongoose",
        "Material UI",
        "Cloudinary",
        "Express",
        "Node.js",
        "JWT",
      ] as string[],
      links: [
        {
          type: "Website",
          href: "https://chatapp.michaelt.engineer",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/mtorresweb/chatApp",
          icon: <Icons.githubInverted className="size-3" />,
        },
      ],
      image: "/images/chat.png",
      imageAlign: "left",
      video: "",
    },
    {
      title: "Project and Task Management Tool",
      href: "https://tasksapp.michaelt.engineer",
      active: true,
      description:
        "Designed a project and task management application with features for creating, updating, and deleting projects and tasks, leveraging React, Express, and PostgreSQL.",
      technologies: [
        "React",
        "PostgreSQL",
        "Sequelize",
        "Express",
        "Node.js",
        "JWT",
        "Redux Toolkit",
      ] as string[],
      links: [
        {
          type: "Website",
          href: "https://tasksapp.michaelt.engineer",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/mtorresweb/tasksApp",
          icon: <Icons.githubInverted className="size-3" />,
        },
      ],
      image: "/images/tasks.png",
      imageAlign: "left",
      video: "",
    },
    {
      title: "Portfolio Template",
      href: "https://template.michaelt.engineer",
      active: true,
      description:
        "Created a portfolio template using React, Sass, and Framer Motion, featuring smooth animations and a responsive design.",
      technologies: [
        "React",
        "Sass",
        "Framer Motion",
        "React Markdown",
        "Node.js",
      ] as string[],
      links: [
        {
          type: "Website",
          href: "https://template.michaelt.engineer",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/mtorresweb/personal-portfolio",
          icon: <Icons.githubInverted className="size-3" />,
        },
      ],
      image: "/images/template.png",
      imageAlign: "left",
      video: "",
    },
    {
      title: "Personal Portfolio Website",
      href: "#",
      active: true,
      description:
        "Developed a personal portfolio website using Next.js, Typescript, and TailwindCSS, showcasing projects and skills with a focus on performance and SEO.",
      technologies: [
        "Next.js",
        "Typescript",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "i18n",
        "Next Intl",
        "Motion",
        "React Markdown",
      ] as string[],
      links: [
        {
          type: "Source",
          href: "https://github.com/mtorresweb/portfolio2025",
          icon: <Icons.githubInverted className="size-3" />,
        },
      ],
      image: "/images/portfolio.png",
      imageAlign: "center",
      video: "",
    },
    {
      title: "Social Media Application",
      href: "https://expo.dev/preview/update?message=Initial%20preview%20release&updateRuntimeVersion=1.0.0&createdAt=2025-05-07T19%3A06%3A28.672Z&slug=exp&projectId=aa937293-d403-4c39-b026-fd50f8f604b5&group=f8365701-ac1a-4c6a-a3da-10cf90cba85b",
      active: true,
      description:
        "Built a social media application with Clerk authentication, post creation, bookmarks, likes, followers, and commenting features, leveraging React Native and Convex for real-time data synchronization. To test the app, go to the Expo link and scan the QR code with the Expo Go app.",
      technologies: [
        "React Native",
        "TypeScript",
        "Expo",
        "Convex",
        "Clerk",
        "Expo Router",
        "React Navigation",
        "Reanimated",
        "Expo Secure Store",
      ] as string[],
      links: [
        {
          type: "Expo QR",
          href: "https://expo.dev/preview/update?message=Initial%20preview%20release&updateRuntimeVersion=1.0.0&createdAt=2025-05-07T19%3A06%3A28.672Z&slug=exp&projectId=aa937293-d403-4c39-b026-fd50f8f604b5&group=f8365701-ac1a-4c6a-a3da-10cf90cba85b",
          icon: <Icons.qr className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/mtorresweb/SpotLight",
          icon: <Icons.githubInverted className="size-3" />,
        },
      ],
      image: "/images/spotlight.jpg",
      imageAlign: "center",
      video: "",
    },
    {
      title: "Music Player Application",
      href: "https://expo.dev/preview/update?message=fix%3A%20correct%20paddingBottom%20logic%20in%20SafeLayout%20component&updateRuntimeVersion=1.0.0&createdAt=2025-05-09T03%3A23%3A53.828Z&slug=exp&projectId=8b189c16-377f-47ee-8e98-9fc8877d9a0f&group=b83f981e-45e2-4c5c-a7e5-538545df2e69",
      active: true,
      description:
        "A sleek music player app with playlists, favorites, artist browsing, search, and seamless playback. Includes volume control, dark mode, and a custom audio player. Scan the Expo QR code with Expo Go to test.",
      technologies: [
        "React Native",
        "TypeScript",
        "Expo",
        "expo-av",
        "zustand",
        "React Navigation",
      ] as string[],
      links: [
        {
          type: "Expo QR",
          href: "https://expo.dev/preview/update?message=fix%3A%20correct%20paddingBottom%20logic%20in%20SafeLayout%20component&updateRuntimeVersion=1.0.0&createdAt=2025-05-09T03%3A23%3A53.828Z&slug=exp&projectId=8b189c16-377f-47ee-8e98-9fc8877d9a0f&group=b83f981e-45e2-4c5c-a7e5-538545df2e69",
          icon: <Icons.qr className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/mtorresweb/music-player",
          icon: <Icons.githubInverted className="size-3" />,
        },
      ],
      image: "/images/music-player.jpg",
      imageAlign: "center",
      video: "",
    },
  ],
  certifications: [
    {
      title: "Switching, Routing and Wireless Essentials",
      dates: "Nov 27, 2023",
      location: "Remote",
      description:
        "Completed a course on CISCO Switching, Routing, and Wireless Essentials, covering all fundamentals.",
      image: "/icons/cisco.svg",
      links: [
        {
          title: "Certificate",
          icon: <Icons.filePdf className="h-4 w-4" />,
          href: "/docs/CISCO-Routing.pdf",
        },
      ],
    },
    {
      title: "Introduction to networks",
      dates: "May 31, 2023",
      location: "Remote",
      description:
        "Completed a course on CISCO networking fundamentals, covering network protocols, topologies, and security.",
      image: "/icons/cisco.svg",
      links: [
        {
          title: "Certificate",
          icon: <Icons.filePdf className="h-4 w-4" />,
          href: "/docs/CISCO-Fundamentals.pdf",
        },
      ],
    },
    {
      title: "SCRUM for software development",
      dates: "May 11, 2023",
      location: "Remote",
      description:
        "Completed a course on SCRUM methodology for software development, covering principles, roles, and practices.",
      image: "/icons/sena.png",
      links: [],
    },
    {
      title: "API RESTful",
      dates: "Apr 12, 2023",
      location: "Remote",
      description:
        "Completed a course on RESTful API development, covering design principles, authentication, and security.",
      image: "/icons/udemy.jpg",
      links: [
        {
          title: "Certificate",
          icon: <Icons.filePdf className="h-4 w-4" />,
          href: "/docs/API.pdf",
        },
      ],
    },
    {
      title: "Professional GIT",
      dates: "Nov 14, 2022",
      location: "Remote",
      description:
        "Completed a course on SCRUM methodology for software development, covering principles, roles, and practices.",
      image: "/icons/codigofacilito.png",
      links: [
        {
          title: "Certificate",
          icon: <Icons.filePdf className="h-4 w-4" />,
          href: "/docs/git.pdf",
        },
      ],
    },
    {
      title: "Open English",
      dates: "October 17, 2022",
      location: "Remote",
      description:
        "Obtained a B2 certification from Open English, showcasing advanced proficiency in English, including fluency in conversational and written communication.",
      image: "/icons/open-english.png",
      links: [
        {
          title: "Test Report",
          icon: <Icons.filePdf className="h-4 w-4" />,
          href: "/docs/Open-English.pdf",
        },
      ],
    },
  ],
} as const;
