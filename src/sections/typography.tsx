import { motion } from 'framer-motion';
import { Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { SpotlightCard } from '../components/spotlight-card';
import { ScrambleText } from '../components/text-reveal';

interface FontPairing {
  name: string;
  description: string;
  heading: {
    font: string;
    weight: string;
    sizes: string[];
  };
  body: {
    font: string;
    weight: string;
    sizes: string[];
  };
  code: {
    font: string;
  };
  sample: {
    heading: string;
    body: string;
  };
}

const fontPairings: FontPairing[] = [
  {
    name: 'Modern Tech',
    description: 'Clean and professional, perfect for SaaS applications',
    heading: {
      font: 'Inter',
      weight: '600-800',
      sizes: ['48px', '36px', '24px', '18px'],
    },
    body: {
      font: 'Inter',
      weight: '400-500',
      sizes: ['18px', '16px', '14px', '12px'],
    },
    code: {
      font: 'JetBrains Mono',
    },
    sample: {
      heading: 'Build faster with better tools',
      body: 'Typography is the voice of your interface. Choose fonts that reflect your brand personality while maintaining excellent readability across all devices and screen sizes.',
    },
  },
  {
    name: 'Editorial Bold',
    description: 'High contrast pairing for content-heavy sites',
    heading: {
      font: 'Space Grotesk',
      weight: '500-700',
      sizes: ['56px', '42px', '28px', '22px'],
    },
    body: {
      font: 'Inter',
      weight: '400-500',
      sizes: ['20px', '17px', '15px', '13px'],
    },
    code: {
      font: 'JetBrains Mono',
    },
    sample: {
      heading: 'Design Systems That Scale',
      body: 'A well-crafted design system provides consistency, efficiency, and scalability. It serves as a single source of truth for your entire product team.',
    },
  },
  {
    name: 'Minimal Mono',
    description: 'Ultra-minimal aesthetic for developer tools',
    heading: {
      font: 'Inter',
      weight: '500-700',
      sizes: ['44px', '32px', '22px', '16px'],
    },
    body: {
      font: 'Inter',
      weight: '400',
      sizes: ['16px', '15px', '14px', '12px'],
    },
    code: {
      font: 'JetBrains Mono',
    },
    sample: {
      heading: 'npm install ui-hub',
      body: 'Developer-focused interfaces prioritize clarity and function. Every element serves a purpose, removing distractions while maintaining visual appeal.',
    },
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={copy}
      className="opacity-0 group-hover:opacity-100 transition-all p-2 rounded-lg hover:bg-linear/10 hover:text-linear"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Copy CSS"
    >
      <motion.div
        initial={false}
        animate={{ scale: copied ? [1, 1.2, 1] : 1 }}
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </motion.div>
    </motion.button>
  );
}

export function Typography() {
  return (
    <section id="typography" className="py-32 scroll-mt-16 relative">
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
            <Sparkles className="w-4 h-4 text-linear" />
            <span className="text-sm font-medium text-muted-foreground">
              <ScrambleText text="Font Pairings" delay={0.3} />
            </span>
          </motion.div>
          
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Typography
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
            Curated font pairings with sizing scales, usage guidelines, and ready-to-use CSS.
          </p>
        </motion.div>

        <div className="space-y-16">
          {fontPairings.map((pairing, index) => (
            <motion.div
              key={pairing.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SpotlightCard className="overflow-hidden">
                <div className="p-6 sm:p-10 border-b border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                      <h3 className="font-display text-2xl font-bold">{pairing.name}</h3>
                      <p className="text-muted-foreground mt-1">{pairing.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Font Specs */}
                    <div className="space-y-8">
                      <div className="group">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-linear">Heading</span>
                          <CopyButton text={`font-family: '${pairing.heading.font}', sans-serif;\nfont-weight: ${pairing.heading.weight};`} />
                        </div>
                        <p className="text-lg font-medium">{pairing.heading.font}</p>
                        <p className="text-sm text-muted-foreground">Weight: {pairing.heading.weight}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {pairing.heading.sizes.map((size) => (
                            <motion.span 
                              key={size} 
                              className="text-xs px-3 py-1.5 rounded-full bg-secondary font-mono"
                              whileHover={{ scale: 1.05, backgroundColor: 'rgba(94, 106, 210, 0.1)' }}
                            >
                              {size}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="group">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-linear">Body</span>
                          <CopyButton text={`font-family: '${pairing.body.font}', sans-serif;\nfont-weight: ${pairing.body.weight};`} />
                        </div>
                        <p className="text-lg font-medium">{pairing.body.font}</p>
                        <p className="text-sm text-muted-foreground">Weight: {pairing.body.weight}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {pairing.body.sizes.map((size) => (
                            <motion.span 
                              key={size} 
                              className="text-xs px-3 py-1.5 rounded-full bg-secondary font-mono"
                              whileHover={{ scale: 1.05, backgroundColor: 'rgba(94, 106, 210, 0.1)' }}
                            >
                              {size}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="group">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-linear">Code</span>
                          <CopyButton text={`font-family: '${pairing.code.font}', monospace;`} />
                        </div>
                        <p className="text-lg font-medium">{pairing.code.font}</p>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-secondary/50 to-secondary/20 border border-border/50">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-6">Live Preview</p>
                      <h4 
                        className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
                        style={{ fontFamily: pairing.heading.font }}
                      >
                        {pairing.sample.heading}
                      </h4>
                      <p 
                        className="text-base leading-relaxed text-muted-foreground mb-6"
                        style={{ fontFamily: pairing.body.font }}
                      >
                        {pairing.sample.body}
                      </p>
                      <code 
                        className="block p-4 rounded-xl bg-background/80 border border-border/50 text-sm font-mono"
                        style={{ fontFamily: pairing.code.font }}
                      >
                        <span className="text-purple-500">const</span>{' '}
                        <span className="text-blue-500">theme</span>{' '}
                        <span className="text-foreground">=</span>{' '}
                        <span className="text-green-500">"{pairing.name.toLowerCase().replace(' ', '-')}"</span>
                      </code>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Type Scale Reference */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <SpotlightCard className="p-8 sm:p-12">
            <div className="mb-10">
              <h3 className="font-display text-3xl font-bold mb-3">Type Scale Reference</h3>
              <p className="text-muted-foreground text-lg">
                Complete typography scale with line heights and weights
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                { name: 'Display', size: '3rem / 48px', lineHeight: '1.1', weight: '700' },
                { name: 'H1', size: '2.25rem / 36px', lineHeight: '1.2', weight: '700' },
                { name: 'H2', size: '1.5rem / 24px', lineHeight: '1.3', weight: '600' },
                { name: 'H3', size: '1.25rem / 20px', lineHeight: '1.4', weight: '600' },
                { name: 'Body Large', size: '1.125rem / 18px', lineHeight: '1.6', weight: '400' },
                { name: 'Body', size: '1rem / 16px', lineHeight: '1.6', weight: '400' },
                { name: 'Small', size: '0.875rem / 14px', lineHeight: '1.5', weight: '400' },
                { name: 'Tiny', size: '0.75rem / 12px', lineHeight: '1.5', weight: '400' },
              ].map((scale, scaleIndex) => (
                <motion.div
                  key={scale.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: scaleIndex * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8 }}
                  className="flex items-baseline gap-4 sm:gap-8 py-2 border-b border-border/50 last:border-0 group cursor-default"
                >
                  <span className="w-28 text-sm font-medium text-muted-foreground group-hover:text-linear transition-colors">
                    {scale.name}
                  </span>
                  <span 
                    className="flex-1 group-hover:text-foreground transition-colors"
                    style={{ 
                      fontSize: scale.size.split(' / ')[0], 
                      lineHeight: scale.lineHeight,
                      fontWeight: scale.weight 
                    }}
                  >
                    The quick brown fox jumps
                  </span>
                  <span className="hidden sm:block text-xs text-muted-foreground font-mono bg-secondary/50 px-2 py-1 rounded">
                    {scale.size}
                  </span>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
