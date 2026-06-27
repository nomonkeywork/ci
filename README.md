# Complete Project Setup: nomonkeywork

## Project Overview

**nomonkeywork** - A playful, interactive web application featuring a monkey mascot with 2D smooth-follow eyes and head-tilt functionality. Built with Next.js 14+, Tailwind CSS, and optimized for Vercel deployment.

---

## PART 1: PROJECT INITIALIZATION

### 1.1 Create the Project

```bash
# Create Next.js project with TypeScript and Tailwind
npx create-next-app@latest nomonkeywork --typescript --tailwind --eslint --app

# Navigate to project
cd nomonkeywork

# Install additional dependencies
npm install framer-motion @vercel/analytics @vercel/speed-insights
npm install -D @types/node @types/react @types/react-dom
npm install -D prettier eslint-config-prettier
npm install -D husky lint-staged
```

### 1.2 Environment Setup

Create `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## PART 2: COMPONENT DEVELOPMENT

### 2.1 Enhanced MonkeyEyes Component with 2D Smooth-Follow

Create `app/components/MonkeyEyes.tsx`:

```tsx
"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

interface EyePosition {
  x: number;
  y: number;
}

interface PupilPosition {
  left: EyePosition;
  right: EyePosition;
}

const MonkeyEyes: React.FC = () => {
  // Refs for eye containers
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position state
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  
  // Smooth pupil positions with animation frame
  const [smoothPupilPos, setSmoothPupilPos] = useState<PupilPosition>({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 }
  });
  
  // Window dimensions for tilt calculation
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Handle mouse movement with smooth follow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleWindowResize);
    
    // Initialize window size
    handleWindowResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // Smooth animation loop with easing
  useEffect(() => {
    let animationFrameId: number;
    const smoothFactor = 0.15; // Lower = smoother, higher = more responsive

    const animatePupils = () => {
      const leftPos = calculatePupilPosition(leftEyeRef.current);
      const rightPos = calculatePupilPosition(rightEyeRef.current);

      setSmoothPupilPos(prev => ({
        left: {
          x: prev.left.x + (leftPos.x - prev.left.x) * smoothFactor,
          y: prev.left.y + (leftPos.y - prev.left.y) * smoothFactor
        },
        right: {
          x: prev.right.x + (rightPos.x - prev.right.x) * smoothFactor,
          y: prev.right.y + (rightPos.y - prev.right.y) * smoothFactor
        }
      }));

      animationFrameId = requestAnimationFrame(animatePupils);
    };

    animatePupils();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  // Calculate pupil position with clamping
  const calculatePupilPosition = useCallback((eyeElement: HTMLDivElement | null): EyePosition => {
    if (!eyeElement || typeof window === 'undefined') {
      return { x: 0, y: 0 };
    }

    const rect = eyeElement.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    // Calculate distance from eye center to mouse
    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Max radius the pupil can move (in pixels)
    const maxRadius = 12;
    
    // If mouse is close to center, keep pupil centered
    if (distance < 5) {
      return { x: 0, y: 0 };
    }

    // Calculate angle
    const angle = Math.atan2(deltaY, deltaX);
    
    // Clamp movement to maxRadius
    const clampDistance = Math.min(distance, maxRadius);
    const x = Math.cos(angle) * clampDistance;
    const y = Math.sin(angle) * clampDistance;

    return { x, y };
  }, [mouseX, mouseY]);

  // Calculate head tilt with smooth transition
  const calculateTilt = useCallback(() => {
    if (typeof window === 'undefined' || windowSize.width === 0) {
      return { rotateX: 0, rotateY: 0 };
    }

    // Calculate relative mouse position (0 to 1)
    const relX = mouseX / windowSize.width;
    const relY = mouseY / windowSize.height;

    // Map to rotation (-15 to 15 degrees)
    const maxTilt = 15;
    const rotateY = (relX - 0.5) * 2 * maxTilt;
    const rotateX = (relY - 0.5) * -2 * maxTilt;

    return { rotateX, rotateY };
  }, [mouseX, mouseY, windowSize]);

  const tilt = calculateTilt();

  return (
    <div 
      ref={containerRef}
      className="relative w-[400px] h-[400px] mx-auto cursor-pointer"
      style={{
        perspective: '1000px'
      }}
    >
      {/* 3D Tilt Container */}
      <div 
        className="relative w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `
            rotateX(${tilt.rotateX}deg) 
            rotateY(${tilt.rotateY}deg)
            scale(1.02)
          `
        }}
      >
        {/* Monkey Head Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/monkey-head.png"
            alt="Monkey Head"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Left Eye Container */}
        <div
          ref={leftEyeRef}
          className="absolute z-10"
          style={{
            width: '14%',
            height: '14%',
            top: '37%',
            left: '29%'
          }}
        >
          <div className="w-full h-full bg-white rounded-full shadow-inner flex items-center justify-center border-2 border-gray-300">
            <div
              className="rounded-full bg-gradient-to-b from-gray-800 to-black transition-all duration-75"
              style={{
                width: '60%',
                height: '60%',
                transform: `translate(${smoothPupilPos.left.x}px, ${smoothPupilPos.left.y}px)`
              }}
            >
              {/* Pupil highlight for realistic effect */}
              <div className="w-1/3 h-1/3 bg-white rounded-full opacity-75 ml-1 mt-1"></div>
            </div>
          </div>
        </div>

        {/* Right Eye Container */}
        <div
          ref={rightEyeRef}
          className="absolute z-10"
          style={{
            width: '14%',
            height: '14%',
            top: '37%',
            left: '58%'
          }}
        >
          <div className="w-full h-full bg-white rounded-full shadow-inner flex items-center justify-center border-2 border-gray-300">
            <div
              className="rounded-full bg-gradient-to-b from-gray-800 to-black transition-all duration-75"
              style={{
                width: '60%',
                height: '60%',
                transform: `translate(${smoothPupilPos.right.x}px, ${smoothPupilPos.right.y}px)`
              }}
            >
              <div className="w-1/3 h-1/3 bg-white rounded-full opacity-75 ml-1 mt-1"></div>
            </div>
          </div>
        </div>

        {/* Interactive Glow Effect */}
        <div 
          className="absolute inset-0 z-5 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mouseX - (containerRef.current?.getBoundingClientRect().left || 0)}px ${mouseY - (containerRef.current?.getBoundingClientRect().top || 0)}px, rgba(255,255,255,0.1) 0%, transparent 70%)`
          }}
        />
      </div>
    </div>
  );
};

export default MonkeyEyes;
```

### 2.2 Landing Page

Update `app/page.tsx`:

```tsx
import MonkeyEyes from '@/components/MonkeyEyes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          nomonkeywork
        </h1>

        
        <MonkeyEyes />
        
        <div className="mt-12 space-y-4">
      
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl">
              Get Started
            </button>
            <button className="px-6 py-3 bg-white text-purple-600 rounded-full hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <Analytics />
      <SpeedInsights />
    </main>
  );
}
```

---

## PART 3: TAILWIND CUSTOMIZATION

### 3.1 Update `tailwind.config.ts`

```tsx
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

### 3.2 Add Global Styles

Update `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground antialiased;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    @apply bg-gray-100;
  }
  
  ::-webkit-scrollbar-thumb {
    @apply bg-purple-500 rounded-full;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-purple-600;
  }
}
```

---

## PART 4: CODE QUALITY SETUP

### 4.1 ESLint Configuration

Create `.eslintrc.json`:

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "react-hooks", "jsx-a11y"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/aria-props": "warn"
  }
}
```

### 4.2 Prettier Configuration

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 4.3 Husky Setup

```bash
# Initialize Husky
npm run prepare

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Add pre-push hook
npx husky add .husky/pre-push "npm run type-check && npm run build"
```

Create `lint-staged.config.js`:

```javascript
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss,md,json}': ['prettier --write'],
};
```

---

## PART 5: VERCEL DEPLOYMENT

### 5.1 Create `vercel.json`

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "api/*.ts": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### 5.2 Update `package.json`

```json
{
  "name": "nomonkeywork",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "prepare": "husky install"
  },
  "dependencies": {
    "@vercel/analytics": "^1.0.0",
    "@vercel/speed-insights": "^1.0.0",
    "framer-motion": "^10.0.0",
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.10",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.13.0",
    "@typescript-eslint/parser": "^6.13.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-config-next": "14.0.4",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "husky": "^8.0.3",
    "lint-staged": "^15.1.0",
    "postcss": "^8.4.32",
    "prettier": "^3.1.1",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.3.0"
  }
}
```

### 5.3 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Add environment variables
vercel env add NEXT_PUBLIC_APP_URL
```

---

## PART 6: ASSET PREPARATION

### 6.1 Monkey Head Asset

Create `public/monkey-head.png`:

- SVG or transparent PNG recommended
- Minimum 400x400px
- No pupils (they'll be created by CSS)
- Center the head in the canvas

### 6.2 Favicon and Metadata

Update `app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'nomonkeywork - Interactive Monkey Mascot',
  description: 'Playful monkey mascot with interactive eye tracking',
  openGraph: {
    title: 'nomonkeywork',
    description: 'Interactive monkey mascot that follows your mouse',
    images: ['/monkey-head.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

---

## PART 7: PERFORMANCE OPTIMIZATION

### 7.1 Next.js Configuration

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
```

### 7.2 Performance Budget

Add to `package.json`:

```json
{
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

---

## PART 8: TESTING

### 8.1 Component Test

Create `app/components/__tests__/MonkeyEyes.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import MonkeyEyes from '../MonkeyEyes';

describe('MonkeyEyes', () => {
  it('renders without crashing', () => {
    render(<MonkeyEyes />);
    expect(screen.getByAltText('Monkey Head')).toBeInTheDocument();
  });

  it('has correct container dimensions', () => {
    render(<MonkeyEyes />);
    const container = screen.getByRole('img', { name: /Monkey Head/i }).parentElement;
    expect(container).toHaveClass('relative w-[400px] h-[400px]');
  });
});
```

---

## PART 9: DEPLOYMENT CHECKLIST

### Final Checks

- [ ] Monkey head image placed in `logo/logo_no_eyes.svg`
- [ ] Eye positions adjusted to match your logo
- [ ] Tailwind configuration optimized
- [ ] All environment variables set
- [ ] Vercel deployment successful
- [ ] Analytics tracking enabled
- [ ] Performance testing complete
- [ ] Cross-browser testing done

### Quick Deploy Command

```bash
# Build locally
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy via GitHub (recommended)
git add .
git commit -m "feat: initial deployment"
git push origin main
```

---

## TROUBLESHOOTING

### Eye Position Issues

- Adjust `top` and `left` percentages in MonkeyEyes component
- Use browser dev tools to inspect eye container positions
- Try using `calc(50% - 20px)` for centering

### Performance Issues

- Reduce animation frame rate if needed
- Use CSS transforms instead of JS where possible
- Implement `shouldComponentUpdate` or `React.memo`

### Build Errors

- Ensure all imports are correct
- Check for missing dependencies
- Run `npm run type-check` locally

---

## NEXT STEPS (Optional Enhancements)

1. **Add sound effects** when clicking the monkey
2. **Implement animations** with Framer Motion
3. **Add multiple monkey variations** for different moods
4. **Create an API route** for monkey behavior analytics
5. **Add WebGL particles** for magical effects around the monkey
6. **Implement dark mode** support
7. **Add responsive** mobile touch support

# Impeccable + Tailwind Setup for nomonkeywork

Here's how to integrate the **Impeccable** design skill and its `/impeccable` commands into your project, alongside the existing Next.js and Tailwind setup.

## 1. Install & Initialize Impeccable

Impeccable runs as a local CLI tool that integrates with your AI coding harness (Cursor, Claude Code, etc.).

### Step 1.1: Install via CLI

```bash
# Navigate to your project
cd nomonkeywork

# Install Impeccable (requires Node 24+)
npx impeccable install
```

This command detects your AI harness and installs the tailored build.

### Step 1.2: Initialize for the Project

```bash
# Run the initial setup in your project root
/impeccable init
```

This creates two key files:

- **`PRODUCT.md`** – Captures your product context (brand voice, users, etc.).
- **`DESIGN.md`** – Houses your visual system in the Google Stitch format, making it portable.

### Step 1.3: Configure Tailwind for Impeccable

Update your `tailwind.config.ts` to work seamlessly with Impeccable's design vocabulary. The `/impeccable` commands will read these tokens and respect them.

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  // ... existing config (darkMode, content, etc.)
  theme: {
    extend: {
      // Impeccable recommends moving away from generic purple gradients.
      // Define a clear, WCAG-compliant palette.
      colors: {
        // Example: A calm, clinical palette for an SRE tool
        brand: {
          primary: '#0F172A', // Slate 900
          secondary: '#334155', // Slate 700
          accent: '#0EA5E9', // Sky 500
          background: '#F8FAFC', // Slate 50
        }
      },
      // Define a deliberate type scale with real contrast
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1' }],
        'heading': ['2.25rem', { lineHeight: '1.2' }],
        'subheading': ['1.5rem', { lineHeight: '1.3' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
      },
      // Use a purposeful font, not the default "Inter"
      fontFamily: {
        sans: ['"Avenir Next"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

## 2. Using Impeccable Commands in Your Workflow

With the setup complete, you can now use `/impeccable` commands in your AI harness (e.g., Cursor, Claude Code). **The skill is designed to be used iteratively during development**, not just as a one-off review.

### 2.1 Core Commands for Your MonkeyEyes Component

| Command | Purpose for `nomonkeywork` |
| :--- | :--- |
| **`/impeccablecraft`** | **Design → Build flow.** Use this to plan the component's UX and then generate the code in one flow. |
| **`/impeccabletypeset`** | Refine the typography of your landing page (headlines, body text) to be intentional, not generic. |
| **`/impeccablecolorize`** | Add strategic color to your UI. The monkey's playful personality could inform a vibrant, but not chaotic, palette. |
| **`/impeccablelayout`** | Polish the spacing and visual rhythm of your page layout, ensuring the monkey is well-integrated. |
| **`/impeccableanimate`** | Review the eye-follow animation. Impeccable can suggest more purposeful motion (e.g., easing) that conveys personality. |
| **`/impeccablepolish`** | The final, meticulous pass before deployment to catch any remaining "slop tells." |

### 2.2 How to Execute

In your AI tool's chat, simply type the command. For example:

```
/impeccablecritique
```

This will trigger a design review of your active code.

```
/impeccablecraft
```

This will guide the AI through a "shape-then-build" flow, first planning the design, then writing the code.

### 2.3 Example Workflow for Your Landing Page

1. **Shape:** `/impeccableshape` to create a design brief for the landing page.
2. **Type & Color:** `/impeccabletypeset` and `/impeccablecolorize` to establish a visual identity that matches the monkey's energy.
3. **Build:** `/impeccablecraft` to generate the final, polished `page.tsx` and component files.
4. **Refine:** `/impeccablepolish` to align everything with your design system before commit.

## 3. Preventing "AI Slop" in Production

Impeccable includes a **detector** you can run as part of your CI/CD pipeline.

### 3.1 Local Detection

Run this command to scan your codebase for 44 known "slop" patterns (e.g., purple gradients, glassmorphism, generic copy).

```bash
npx impeccable detect src/
```

### 3.2 Add to Pre-commit Hook

To automatically prevent slop from being committed, add it to your `lint-staged` config in `package.json`.

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "npx impeccable detect --fix" // Attempt auto-fix where possible
    ]
  }
}
```

### 3.3 Use in CI (e.g., GitHub Actions)

Add a step to your workflow to fail the build if slop is detected.

```yaml
- name: Check for UI anti-patterns
  run: npx impeccable detect src/ --ci
```

## 4. Summary: Updated Project Files

### Updated `package.json` (Dependencies)

No new npm packages are required for Impeccable; it's a CLI tool. However, your `scripts` should include the check.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "prepare": "husky install",
    "ui-check": "npx impeccable detect src/",
    "ui-fix": "npx impeccable detect src/ --fix" 
  }
}
```

### Environment Variables

Impeccable doesn't require specific env vars for operation, but it reads your existing project context from `PRODUCT.md` and `DESIGN.md`.

### Vercel Deployment

The Impeccable tool is a development dependency and doesn't affect the Vercel build process. Your deployment steps remain unchanged.

---

## Key Takeaway

Adding Impeccable to your `nomonkeywork` project provides:

1. **A shared design vocabulary** between you and your AI.
2. **Structured, high-quality code** that avoids common "AI-generated" visual patterns.
3. **Automated quality checks** to prevent design debt from entering production.
4. **A documented design system** (`DESIGN.md`) that makes your project more portable and maintainable.
