import { motion } from 'framer-motion';
import { 
  Palette, 
  Layout, 
  Zap, 
  Accessibility, 
  Grid3x3, 
  Type,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { SpotlightCard } from '../components/spotlight-card';
import { ScrambleText } from '../components/text-reveal';
import { MagneticButton } from '../components/magnetic-button';

interface Guideline {
  icon: React.ElementType;
  title: string;
  description: string;
  items: string[];
  tips: string[];
}

const guidelines: Guideline[] = [
  {
    icon: Palette,
    title: 'Color Hierarchy',
    description: 'Establish clear visual hierarchy using color effectively',
    items: [
      'Primary colors for CTAs and key actions',
      'Secondary colors for supporting elements',
      'Muted colors for backgrounds and disabled states',
      'Semantic colors (red/yellow/green) for status feedback',
    ],
    tips: [
      'Use 60-30-10 rule: 60% neutral, 30% secondary, 10% accent',
      'Ensure 4.5:1 contrast ratio for text readability',
      'Maintain consistent color meaning across the interface',
    ],
  },
  {
    icon: Layout,
    title: 'Spacing & Layout',
    description: 'Consistent spacing creates visual rhythm and hierarchy',
    items: [
      'Base unit of 4px (0.25rem) for all spacing',
      'Use 8px increments for padding and margins',
      'Section spacing: 24px, 32px, 48px, 64px, 96px',
      'Component internal spacing: 8px, 12px, 16px, 24px',
    ],
    tips: [
      'More spacing = more importance',
      'Group related elements with less spacing',
      'Use whitespace to create breathing room',
    ],
  },
  {
    icon: Type,
    title: 'Typography Scale',
    description: 'Clear typographic hierarchy guides user attention',
    items: [
      'Display: 48-64px for hero sections',
      'H1: 32-40px for page titles',
      'H2: 24-28px for section headers',
      'H3: 18-20px for subsections',
      'Body: 16px for main content',
      'Small/Caption: 12-14px for metadata',
    ],
    tips: [
      'Limit to 2-3 font families maximum',
      'Use font weight to create hierarchy, not just size',
      'Line height: 1.5 for body, 1.2-1.3 for headings',
    ],
  },
  {
    icon: Zap,
    title: 'Animation Principles',
    description: 'Motion should enhance usability, not distract',
    items: [
      'Keep animations under 300ms for responsiveness',
      'Use ease-out for elements entering the screen',
      'Use ease-in for elements leaving the screen',
      'Prefer opacity and transform for performance',
    ],
    tips: [
      'Animate on user interaction (hover, click)',
      'Use stagger animations for lists (50-100ms delay)',
      'Respect prefers-reduced-motion setting',
      'Subtle > dramatic: aim for barely noticeable',
    ],
  },
  {
    icon: Grid3x3,
    title: 'Component Structure',
    description: 'Build reusable, composable components',
    items: [
      'Single responsibility: one component, one job',
      'Props for customization, children for content',
      'Compose complex components from simple ones',
      'Use composition over configuration',
    ],
    tips: [
      'Export component + subcomponents pattern',
      'Provide sensible defaults, allow override',
      'Document prop types and default values',
      'Test edge cases: long text, empty states',
    ],
  },
  {
    icon: Accessibility,
    title: 'Accessibility Basics',
    description: 'Inclusive design benefits all users',
    items: [
      'Semantic HTML: use correct elements (button, nav, main)',
      'ARIA labels for icon-only buttons',
      'Focus indicators for keyboard navigation',
      'Alt text for all meaningful images',
    ],
    tips: [
      'Test with keyboard only (Tab, Enter, Space, Escape)',
      'Use color + icon/shape, never color alone',
      'Minimum touch target: 44x44px on mobile',
      'Provide skip links for navigation',
    ],
  },
];

function GuidelineCard({ guideline, index }: { guideline: Guideline; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <SpotlightCard className="h-full">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <motion.div 
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear/10 text-linear"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <guideline.icon className="w-6 h-6" />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold mb-1">
                {guideline.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {guideline.description}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-linear mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-linear" />
                Guidelines
              </h4>
              <ul className="space-y-2">
                {guideline.items.map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="text-sm text-muted-foreground flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-linear mt-1.5">•</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Pro Tips
              </h4>
              <ul className="space-y-2">
                {guideline.tips.map((tip, i) => (
                  <motion.li 
                    key={i} 
                    className="text-sm text-muted-foreground flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function Guidelines() {
  return (
    <section id="guidelines" className="py-32 scroll-mt-16 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-secondary/20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border mb-6"
          >
            <BookOpen className="w-4 h-4 text-linear" />
            <span className="text-sm font-medium text-muted-foreground">
              <ScrambleText text="Best Practices" delay={0.3} />
            </span>
          </motion.div>
          
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            UI Guidelines for Agents
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
            Best practices and principles for building consistent, accessible, 
            and beautiful user interfaces. Use these guidelines as a reference 
            when generating UI code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guidelines.map((guideline, index) => (
            <GuidelineCard key={guideline.title} guideline={guideline} index={index} />
          ))}
        </div>

        {/* Agent System Prompt Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <SpotlightCard className="border-linear/20 overflow-hidden">
            {/* Gradient header */}
            <div className="p-8 sm:p-12 bg-gradient-to-br from-linear/5 via-linear/10 to-purple-500/5 border-b border-linear/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-3xl font-bold mb-2">
                    Agent System Prompt
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Copy this prompt to use as context when generating UI with AI agents
                  </p>
                </div>
                <MagneticButton
                  onClick={() => {
                    navigator.clipboard.writeText(`You are a UI/UX designer and frontend developer. When generating UI code, follow these principles:

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

Always ask: "Is this accessible? Is it responsive? Is it consistent with the design system?"`);
                  }}
                  className="px-6 py-3 rounded-xl bg-linear text-white font-semibold hover:bg-linear/90 transition-colors shrink-0"
                >
                  Copy Prompt
                </MagneticButton>
              </div>
            </div>
            
            <div className="p-8 sm:p-12">
              <div className="bg-background/50 backdrop-blur rounded-2xl p-8 border border-border/50 overflow-x-auto">
                <pre className="text-sm font-mono text-foreground whitespace-pre-wrap leading-relaxed">
                  <span className="text-linear font-bold">DESIGN SYSTEM:</span>
                  <br />• Colors: Use the Linear/Vercel-inspired palette (Primary: #5E6AD2, Dark: #0F1115, Light: #FFFFFF)
                  <br />• Typography: Inter for body/UI, Space Grotesk for headings, JetBrains Mono for code
                  <br />• Spacing: Base 4px unit, use 8px increments
                  <br />• Border radius: 0.75rem (12px) for cards, 0.5rem (8px) for buttons
                  <br />• Dark mode first, ensure light mode works well too
                  <br /><br />
                  <span className="text-linear font-bold">COMPONENT GUIDELINES:</span>
                  <br />• Build reusable components with clear props interfaces
                  <br />• Use Tailwind CSS for styling
                  <br />• Include hover, focus, and active states
                  <br />• Ensure accessible color contrast (WCAG AA minimum)
                  <br />• Add subtle animations (200-300ms) for interactions
                  <br /><br />
                  <span className="text-linear font-bold">CODE QUALITY:</span>
                  <br />• Write TypeScript with proper types
                  <br />• Use semantic HTML elements
                  <br />• Include ARIA labels where needed
                  <br />• Export components as default + named exports
                  <br />• Add JSDoc comments for complex props
                  <br /><br />
                  <span className="text-purple-400 italic">Always ask: Is this accessible? Is it responsive? Is it consistent with the design system?</span>
                </pre>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
