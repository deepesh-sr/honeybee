import { motion } from 'framer-motion';
import { Moon, Sun, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { SpotlightCard } from '../components/spotlight-card';
import { ScrambleText } from '../components/text-reveal';

interface ColorPalette {
  name: string;
  description: string;
  colors: {
    name: string;
    hex: string;
    usage: string;
  }[];
}

const colorPalettes: ColorPalette[] = [
  {
    name: 'Linear',
    description: 'Clean, modern palette inspired by Linear.app',
    colors: [
      { name: 'Primary', hex: '#5E6AD2', usage: 'Primary actions, links' },
      { name: 'Primary Light', hex: '#7B82E1', usage: 'Hover states' },
      { name: 'Primary Dark', hex: '#4B55B8', usage: 'Active states' },
      { name: 'Background', hex: '#0F1115', usage: 'Dark mode background' },
      { name: 'Surface', hex: '#1A1D23', usage: 'Cards, elevated surfaces' },
      { name: 'Border', hex: '#2A2E37', usage: 'Borders, dividers' },
      { name: 'Text Primary', hex: '#F7F8F8', usage: 'Primary text' },
      { name: 'Text Secondary', hex: '#8A8F98', usage: 'Secondary text' },
    ],
  },
  {
    name: 'Vercel',
    description: 'High-contrast palette from Vercel design system',
    colors: [
      { name: 'Black', hex: '#000000', usage: 'Primary text, backgrounds' },
      { name: 'White', hex: '#FFFFFF', usage: 'Light backgrounds, text' },
      { name: 'Gray 100', hex: '#111111', usage: 'Dark surfaces' },
      { name: 'Gray 200', hex: '#333333', usage: 'Borders on dark' },
      { name: 'Gray 500', hex: '#666666', usage: 'Secondary text' },
      { name: 'Gray 700', hex: '#999999', usage: 'Tertiary text' },
      { name: 'Blue', hex: '#0070F3', usage: 'Links, accent' },
      { name: 'Cyan', hex: '#50E3C2', usage: 'Success, highlights' },
    ],
  },
  {
    name: 'Stripe',
    description: 'Professional palette inspired by Stripe',
    colors: [
      { name: 'Purple', hex: '#635BFF', usage: 'Primary brand color' },
      { name: 'Purple Light', hex: '#7A73FF', usage: 'Hover states' },
      { name: 'Navy', hex: '#0A2540', usage: 'Dark backgrounds' },
      { name: 'Gray 50', hex: '#F6F9FC', usage: 'Light backgrounds' },
      { name: 'Gray 100', hex: '#E3E8EE', usage: 'Borders' },
      { name: 'Gray 500', hex: '#697386', usage: 'Secondary text' },
      { name: 'Cyan', hex: '#00D4FF', usage: 'Accent, highlights' },
      { name: 'Pink', hex: '#FF6B9D', usage: 'CTA, important actions' },
    ],
  },
  {
    name: 'Framer',
    description: 'Vibrant palette from Framer',
    colors: [
      { name: 'Blue', hex: '#0055FF', usage: 'Primary brand color' },
      { name: 'Blue Light', hex: '#3380FF', usage: 'Hover states' },
      { name: 'Dark', hex: '#111111', usage: 'Dark backgrounds' },
      { name: 'Light', hex: '#FAFAFA', usage: 'Light backgrounds' },
      { name: 'Purple', hex: '#8B5CF6', usage: 'Accent color' },
      { name: 'Pink', hex: '#EC4899', usage: 'Highlights' },
      { name: 'Orange', hex: '#F97316', usage: 'Warnings, CTAs' },
      { name: 'Green', hex: '#22C55E', usage: 'Success states' },
    ],
  },
];

function ColorCard({ color, index }: { color: ColorPalette['colors'][0]; index: number }) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate if color is light or dark for text contrast
  const r = parseInt(color.hex.slice(1, 3), 16);
  const g = parseInt(color.hex.slice(3, 5), 16);
  const b = parseInt(color.hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const isLight = brightness > 128;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-xl cursor-pointer"
      onClick={copyToClipboard}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color.hex}40, transparent 70%)`,
        }}
      />
      
      <button
        className="w-full aspect-square flex flex-col items-center justify-center p-4 transition-all relative z-10"
        style={{ backgroundColor: color.hex }}
      >
        <motion.span 
          className={cn(
            'font-mono text-sm font-medium mb-1',
            isLight ? 'text-black/80' : 'text-white/80'
          )}
          animate={{ y: isHovered ? -2 : 0 }}
        >
          {color.hex}
        </motion.span>
        <motion.span 
          className={cn(
            'text-xs opacity-70',
            isLight ? 'text-black/60' : 'text-white/60'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3" /> Copied!
            </span>
          ) : (
            'Click to copy'
          )}
        </motion.span>
      </button>
      
      <div className="p-3 bg-card border-t border-border relative z-10">
        <p className="font-medium text-sm">{color.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{color.usage}</p>
      </div>
    </motion.div>
  );
}

export function ColorSystems() {
  return (
    <section id="colors" className="py-32 scroll-mt-16 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <div className="w-2 h-2 rounded-full bg-linear animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              <ScrambleText text="Design Tokens" delay={0.3} />
            </span>
          </motion.div>
          
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Color Systems
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
            Production-ready color palettes from industry-leading design systems. 
            Click any color to copy its hex value.
          </p>
        </motion.div>

        <div className="space-y-24">
          {colorPalettes.map((palette, paletteIndex) => (
            <motion.div
              key={palette.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: paletteIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl font-bold mb-2">
                    {palette.name}
                  </h3>
                  <p className="text-muted-foreground text-lg">{palette.description}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-8 h-px bg-border" />
                  {palette.colors.length} colors
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {palette.colors.map((color, colorIndex) => (
                  <ColorCard
                    key={color.name}
                    color={color}
                    index={colorIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Semantic Colors Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <SpotlightCard className="p-8 sm:p-12 border-linear/20">
            <div className="mb-10">
              <h3 className="font-display text-3xl font-bold mb-3">
                Semantic Colors
              </h3>
              <p className="text-muted-foreground text-lg">
                Meaningful color tokens for states and feedback
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Success', light: '#22C55E', dark: '#4ADE80', usage: 'Positive actions, confirmations', icon: '✓' },
                { name: 'Warning', light: '#F59E0B', dark: '#FBBF24', usage: 'Alerts, caution states', icon: '!' },
                { name: 'Error', light: '#EF4444', dark: '#F87171', usage: 'Errors, destructive actions', icon: '✕' },
                { name: 'Info', light: '#3B82F6', dark: '#60A5FA', usage: 'Informational messages', icon: 'i' },
              ].map((semantic, index) => (
                <motion.div
                  key={semantic.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <div className="flex gap-3 mb-4">
                    <motion.div
                      className="flex-1 h-24 rounded-xl flex flex-col items-center justify-center gap-2 shadow-lg"
                      style={{ backgroundColor: semantic.light }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Sun className="w-5 h-5 text-white/80" />
                      <span className="text-xs text-white/60 font-mono">{semantic.light}</span>
                    </motion.div>
                    <motion.div
                      className="flex-1 h-24 rounded-xl flex flex-col items-center justify-center gap-2 shadow-lg"
                      style={{ backgroundColor: semantic.dark }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Moon className="w-5 h-5 text-white/80" />
                      <span className="text-xs text-white/60 font-mono">{semantic.dark}</span>
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span 
                      className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: semantic.light }}
                    >
                      {semantic.icon}
                    </span>
                    <div>
                      <p className="font-semibold">{semantic.name}</p>
                      <p className="text-xs text-muted-foreground">{semantic.usage}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
