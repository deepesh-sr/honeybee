# UI Inspiration Hub

A premium UI inspiration website providing color systems, font pairings, and reusable React components for developers and AI agents.

![UI Inspiration Hub](https://img.shields.io/badge/UI-Hub-linear)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-06B6D4?logo=tailwindcss)

## ✨ Features

- **🎨 Color Systems** - Curated palettes from Linear, Vercel, Stripe, and Framer with copyable hex values
- **🔤 Typography** - Font pairings with sizing scales and usage guidance
- **🧩 Component Gallery** - Live previews with copy-paste ready code
- **📚 UI Guidelines** - Best practices for color hierarchy, spacing, typography, and animation
- **🌓 Dark Mode** - First-class dark mode with light mode toggle
- **⚡ Smooth Animations** - Framer Motion powered transitions

## 🚀 Quick Start

```bash
# Navigate to the project
cd ui-inspiration-hub

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide Icons** - Icon library
- **Google Fonts** - Inter, Space Grotesk, JetBrains Mono

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── theme-provider.tsx   # Dark/light mode provider
│   ├── navigation.tsx       # Site navigation
│   └── footer.tsx          # Site footer
├── sections/           # Page sections
│   ├── hero.tsx            # Landing hero
│   ├── color-systems.tsx   # Color palettes
│   ├── typography.tsx      # Font pairings
│   ├── component-gallery.tsx # UI components
│   └── guidelines.tsx      # Best practices
├── lib/                # Utilities
│   └── utils.ts           # Helper functions
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## 🎨 Design Tokens

### Colors

Our color system is based on HSL values for easy theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --border: 240 5.9% 90%;
  --radius: 0.75rem;
}
```

### Typography

- **Headings**: Space Grotesk (500-700 weight)
- **Body**: Inter (400-500 weight)
- **Code**: JetBrains Mono (400-600 weight)

### Spacing

- Base unit: `4px` (0.25rem)
- Increments: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

## 🤖 For AI Agents

This project serves as a visual reference for AI agents generating UI code. Here's a system prompt you can use:

```
You are a UI/UX designer and frontend developer. When generating UI code, follow these principles:

DESIGN SYSTEM:
- Colors: Use the Linear/Vercel-inspired palette (Primary: #5E6AD2, Dark: #0F1115, Light: #FFFFFF)
- Typography: Inter for body/UI, Space Grotesk for headings, JetBrains Mono for code
- Spacing: Base 4px unit, use 8px increments
- Border radius: 0.75rem (12px) for cards, 0.5rem (8px) for buttons
- Dark mode first, ensure light mode works well too

COMPONENT GUIDELINES:
- Build reusable components with clear props interfaces
- Use Tailwind CSS for styling
- Include hover, focus, and active states
- Ensure accessible color contrast (WCAG AA minimum)
- Add subtle animations (200-300ms) for interactions

CODE QUALITY:
- Write TypeScript with proper types
- Use semantic HTML elements
- Include ARIA labels where needed
- Export components as default + named exports
- Add JSDoc comments for complex props

Always ask: "Is this accessible? Is it responsive? Is it consistent with the design system?"
```

## 📝 Component Usage

All components are copy-paste ready. Simply:

1. Navigate to the Components section
2. Click the code icon to view source
3. Copy the code
4. Paste into your project

Example button component:

```tsx
<button className="inline-flex items-center justify-center rounded-lg font-medium transition-colors px-4 py-2 bg-foreground text-background hover:bg-foreground/90">
  Primary Button
</button>
```

## 🎯 Color Palettes

### Linear
- Primary: `#5E6AD2`
- Background: `#0F1115`
- Surface: `#1A1D23`

### Vercel
- Black: `#000000`
- White: `#FFFFFF`
- Blue: `#0070F3`

### Stripe
- Purple: `#635BFF`
- Navy: `#0A2540`
- Cyan: `#00D4FF`

### Framer
- Blue: `#0055FF`
- Dark: `#111111`
- Purple: `#8B5CF6`

## 🔧 Customization

To customize the theme, edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: 'hsl(var(--primary))',
      // Add your colors
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      // Add your fonts
    },
  },
}
```

## 📄 License

MIT License - feel free to use this for personal or commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🌟 Credits

Inspired by the beautiful design systems of:
- [Linear](https://linear.app)
- [Vercel](https://vercel.com)
- [Stripe](https://stripe.com)
- [Framer](https://framer.com)

---

Built with ❤️ for developers and AI agents everywhere.
# honeybee
