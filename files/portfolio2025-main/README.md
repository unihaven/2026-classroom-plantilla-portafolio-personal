# Personal Portfolio Website (2025)

A modern, internationalized portfolio website built with Next.js 15, TypeScript, and TailwindCSS 4. This project showcases professional projects, skills, and experience with a focus on performance, accessibility, and SEO.

![Portfolio Preview](/public/images/portfolio.png)

## ✨ Features

- 🌐 **Internationalization**: Multi-language support with next-intl (English/Spanish)
- 🎨 **Theming**: Elegant dark and light mode with next-themes
- 📱 **Responsive Design**: Optimized for all devices from mobile to desktop
- 🚀 **Performance**: Optimized for Core Web Vitals with Next.js App Router
- 🔍 **SEO**: Meta tags, structured data, and optimized images
- 📊 **Project Showcase**: Custom project cards with flexible image alignment
- 💼 **Resume Section**: Organized display of work history and certifications
- 🎬 **Animations**: Smooth transitions and UI effects with tailwindcss-animate
- 📝 **Content**: Markdown support for rich text formatting
- 🧪 **Testing**: Complete test coverage with Jest and React Testing Library

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **Components**: [shadcn/ui](https://ui.shadcn.com/) - Reusable, accessible UI components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful open source icons
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/) - i18n for Next.js
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) - Theme management
- **Animations**: [tailwind-animate](https://github.com/jamiebuilds/tailwindcss-animate) - Animation utilities
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Deployment**: [Vercel](https://vercel.com) - Edge-optimized hosting

## 📁 Project Structure

```
portfolio2025/
├── public/              # Static assets (images, icons, documents)
├── messages/            # i18n translation files (en.json, es.json)
├── src/
│   ├── app/             # Next.js App Router pages and layouts
│   │   └── [locale]/    # Locale-based routing
│   ├── components/      # UI components
│   │   ├── icons/       # Custom icon components
│   │   ├── magicui/     # Special UI effects components
│   │   └── ui/          # Base UI components (shadcn)
│   ├── data/            # Content data (resume, projects, skills)
│   ├── hooks/           # Custom React hooks
│   ├── i18n/            # Internationalization configuration
│   ├── lib/             # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── __tests__/       # Tests (Jest + React Testing Library)
│       ├── components/  # Component tests
│       ├── hooks/       # Hook tests
│       ├── mocks/       # Test mocks
│       └── utils/       # Utility tests
├── .eslintrc.js         # ESLint configuration
├── jest.config.mjs      # Jest configuration
├── tailwind.config.js   # TailwindCSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio2025.git
cd portfolio2025
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Example environment variables (if needed)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🧩 Customization

### Adding Projects

Projects can be added in `src/data/resume.tsx`. Each project is defined using the following structure:

```tsx
{
  title: {
    en: "Project Title in English",
    es: "Project Title in Spanish"
  },
  description: {
    en: "Project description in English with **markdown** support",
    es: "Project description in Spanish with **markdown** support"
  },
  image: "/public/images/project-image.png",
  imagePosition: "left", // "left", "center", or "right"
  technologies: ["React", "TypeScript", "TailwindCSS"],
  links: [
    {
      url: "https://github.com/yourusername/project",
      label: "GitHub",
      icon: "github"
    },
    {
      url: "https://project-demo.com",
      label: "Live Demo",
      icon: "external-link"
    }
  ]
}
```

### Resume and Experience

Edit your professional experience and certifications in `src/data/resume.tsx`:

```tsx
export const workExperience = [
  {
    company: {
      en: "Company Name",
      es: "Nombre de la Empresa"
    },
    role: {
      en: "Your Position",
      es: "Tu Posición"
    },
    period: "2023 - Present",
    description: {
      en: "Description with **markdown** support",
      es: "Descripción con soporte para **markdown**"
    },
    logoUrl: "/images/company-logo.png"
  },
  // ...more experience entries
];
```

### Localization

1. Add or edit translation files in the `messages/` directory:
   - `en.json` - English strings
   - `es.json` - Spanish strings
   - Add more languages as needed

2. Format of translation files:

```json
{
  "Navbar": {
    "home": "Home",
    "projects": "Projects",
    "resume": "Resume",
    "contact": "Contact"
  },
  "Hero": {
    "title": "Hello, I'm {name}",
    "subtitle": "Frontend Developer & UI/UX Designer"
  }
}
```

### Adding New UI Components

1. Create component file in `src/components/`
2. For shadcn components, use the CLI:

```bash
npx shadcn-ui@latest add button
```

## 🧪 Testing

This project uses Jest and React Testing Library for comprehensive testing of components, hooks, and utilities.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

### Test Structure

- Component tests are in `src/__tests__/components/`
- Hook tests are in `src/__tests__/hooks/`
- Utility tests are in `src/__tests__/utils/`
- Common test mocks are in `src/__tests__/mocks/`

### Writing Tests

Example component test:

```tsx
import { render, screen } from '@/src/__tests__/test-utils';
import { ProjectCard } from '@/components/project-card';

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    const project = {
      title: { en: 'Test Project' },
      description: { en: 'Test description' },
      technologies: ['React', 'TypeScript'],
      image: '/images/test.png',
    };
    
    render(<ProjectCard project={project} locale="en" />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
```

## 🚢 Deployment

The site is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure build settings if needed (usually auto-detected)
4. Deploy!

For other platforms, build the project:

```bash
npm run build
```

The build output in the `.next` directory can be deployed to any static hosting service or Node.js server.

## 🧠 Key Design Decisions

### Performance Optimization

- **Image Optimization**: Using Next.js Image component for automatic optimization
- **Code Splitting**: Automatic code splitting by the Next.js App Router
- **Font Optimization**: Local font loading with `next/font`
- **CSS Optimization**: Using TailwindCSS for minimal CSS output

### Accessibility

- **Semantic HTML**: Using proper HTML elements for their intended purpose
- **Keyboard Navigation**: All interactive elements are accessible via keyboard
- **ARIA Attributes**: Used where necessary to enhance accessibility
- **Color Contrast**: Meeting WCAG AA standards for color contrast

### Mobile Responsiveness

- **Mobile-First Approach**: Designed for mobile first, then enhanced for larger screens
- **Custom Hooks**: `useIsMobile` hook to conditionally render components
- **Flexible Layouts**: Using TailwindCSS flex and grid utilities

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[MIT License](LICENSE) - See the LICENSE file for details.

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon set
- [TailwindCSS](https://tailwindcss.com/) for styling utilities
- [Next.js](https://nextjs.org/) for the amazing React framework
- All open-source contributors whose libraries made this project possible

---

Built with ❤️ by [Michael T](https://github.com/mtorresweb)
