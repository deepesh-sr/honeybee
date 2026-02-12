import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Code, Layers } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { SpotlightCard } from '../components/spotlight-card';
import { ScrambleText } from '../components/text-reveal';
import { MagneticButton } from '../components/magnetic-button';

interface ComponentExample {
  name: string;
  description: string;
  code: string;
  preview: React.ReactNode;
}

// Button variants
function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const variants = {
    primary: 'bg-foreground text-background hover:bg-foreground/90',
    secondary: 'bg-secondary text-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-secondary text-foreground',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <motion.button 
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

// Card component
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div 
      className={cn(
        'rounded-xl border border-border bg-card p-6 shadow-sm',
        className
      )}
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

// Input component
function Input({ 
  placeholder, 
  type = 'text',
  className 
}: { 
  placeholder?: string; 
  type?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={cn(
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm',
        'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-linear/50',
        'transition-all hover:border-linear/30',
        className
      )}
    />
  );
}

// Badge component
function Badge({ 
  children, 
  variant = 'default' 
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}) {
  const variants = {
    default: 'bg-foreground text-background',
    secondary: 'bg-secondary text-foreground',
    outline: 'border border-input text-foreground',
    destructive: 'bg-red-500 text-white',
  };
  
  return (
    <motion.span 
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant]
      )}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.span>
  );
}

const componentExamples: ComponentExample[] = [
  {
    name: 'Buttons',
    description: 'Primary, secondary, ghost, and destructive button variants',
    code: `<button className="inline-flex items-center justify-center rounded-lg font-medium transition-colors px-4 py-2 bg-foreground text-background hover:bg-foreground/90">
  Primary Button
</button>

<button className="inline-flex items-center justify-center rounded-lg font-medium transition-colors px-4 py-2 bg-secondary text-foreground hover:bg-secondary/80">
  Secondary Button
</button>

<button className="inline-flex items-center justify-center rounded-lg font-medium transition-colors px-4 py-2 hover:bg-secondary text-foreground">
  Ghost Button
</button>`,
    preview: (
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    ),
  },
  {
    name: 'Button Sizes',
    description: 'Small, medium, and large button sizes',
    code: `<button className="px-3 py-1.5 text-sm rounded-lg bg-foreground text-background">
  Small
</button>

<button className="px-4 py-2 rounded-lg bg-foreground text-background">
  Medium
</button>

<button className="px-6 py-3 text-lg rounded-lg bg-foreground text-background">
  Large
</button>`,
    preview: (
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    ),
  },
  {
    name: 'Cards',
    description: 'Versatile card component with various content layouts',
    code: `<div className="rounded-xl border border-border bg-card p-6 shadow-sm">
  <h3 className="font-semibold text-lg mb-2">Card Title</h3>
  <p className="text-muted-foreground text-sm">
    Card description goes here
  </p>
</div>`,
    preview: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
        <Card>
          <h3 className="font-semibold text-lg mb-2">Card Title</h3>
          <p className="text-muted-foreground text-sm">
            A simple card with title and description text.
          </p>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-linear" />
            <div>
              <p className="font-medium">User Name</p>
              <p className="text-sm text-muted-foreground">@username</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Card with avatar and user information layout.
          </p>
        </Card>
      </div>
    ),
  },
  {
    name: 'Inputs',
    description: 'Text inputs with various states and sizes',
    code: `<input 
  type="text"
  placeholder="Enter text..."
  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
/>`,
    preview: (
      <div className="space-y-4 max-w-sm">
        <Input placeholder="Default input" />
        <Input placeholder="With icon placeholder" />
        <div className="flex gap-2">
          <Input placeholder="First name" className="flex-1" />
          <Input placeholder="Last name" className="flex-1" />
        </div>
      </div>
    ),
  },
  {
    name: 'Badges',
    description: 'Status badges and labels in different styles',
    code: `<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-foreground text-background">
  Default
</span>

<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-foreground">
  Secondary
</span>

<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-input text-foreground">
  Outline
</span>`,
    preview: (
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge>Active</Badge>
        <Badge variant="secondary">Pending</Badge>
        <Badge variant="outline">Draft</Badge>
      </div>
    ),
  },
  {
    name: 'Navigation Tabs',
    description: 'Horizontal tab navigation component',
    code: `<div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
  <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-background shadow-sm">
    Active
  </button>
  <button className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">
    Inactive
  </button>
</div>`,
    preview: (
      <div className="flex flex-col gap-4">
        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-secondary w-fit">
          {['Overview', 'Analytics', 'Settings'].map((tab, i) => (
            <motion.button
              key={tab}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-all',
                i === 0 ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-secondary w-fit">
          {['Grid', 'List'].map((tab, i) => (
            <motion.button
              key={tab}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-all',
                i === 1 ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: 'Modal/Dialog',
    description: 'Dialog overlay with header, content, and actions',
    code: `<div className="rounded-xl border border-border bg-card shadow-lg max-w-md">
  <div className="p-6">
    <h3 className="font-semibold text-lg mb-2">Dialog Title</h3>
    <p className="text-muted-foreground text-sm mb-4">
      Dialog description text goes here.
    </p>
    <div className="flex justify-end gap-2">
      <button className="px-4 py-2 rounded-lg hover:bg-secondary">
        Cancel
      </button>
      <button className="px-4 py-2 rounded-lg bg-foreground text-background">
        Confirm
      </button>
    </div>
  </div>
</div>`,
    preview: (
      <motion.div 
        className="rounded-xl border border-border bg-card shadow-lg max-w-md"
        whileHover={{ y: -2 }}
      >
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2">Delete Project</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Are you sure you want to delete this project? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </div>
      </motion.div>
    ),
  },
  {
    name: 'Alert/Toast',
    description: 'Notification alerts with different severity levels',
    code: `<div className="rounded-lg border p-4 bg-green-500/10 border-green-500/20">
  <p className="text-sm font-medium text-green-600">
    Success! Your changes have been saved.
  </p>
</div>`,
    preview: (
      <div className="space-y-3 max-w-md">
        {[
          { color: 'green', text: 'Success! Your changes have been saved.' },
          { color: 'yellow', text: 'Warning! Please review your settings.' },
          { color: 'red', text: 'Error! Something went wrong.' },
          { color: 'blue', text: 'Info: New updates are available.' },
        ].map((alert, i) => (
          <motion.div
            key={i}
            className={`rounded-lg border p-4 bg-${alert.color}-500/10 border-${alert.color}-500/20`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4 }}
          >
            <p className={`text-sm font-medium text-${alert.color}-600 dark:text-${alert.color}-400`}>
              {alert.text}
            </p>
          </motion.div>
        ))}
      </div>
    ),
  },
];

function ComponentCard({ example, index }: { example: ComponentExample; index: number }) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <SpotlightCard className="h-full">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{example.name}</h3>
            <p className="text-sm text-muted-foreground">{example.description}</p>
          </div>
          <div className="flex items-center gap-1">
            <MagneticButton
              onClick={() => setShowCode(!showCode)}
              className={cn(
                'p-2.5 rounded-lg transition-all',
                showCode ? 'bg-linear text-white' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
              strength={0.3}
            >
              <Code className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              onClick={copyCode}
              className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              strength={0.3}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check className="w-4 h-4 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Copy className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </MagneticButton>
          </div>
        </div>
        <div className="p-6">
          <AnimatePresence mode="wait">
            {showCode ? (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <pre className="bg-secondary/50 p-4 rounded-xl overflow-x-auto border border-border/50">
                  <code className="text-sm font-mono text-foreground">
                    {example.code}
                  </code>
                </pre>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="min-h-[120px] flex items-center"
              >
                {example.preview}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function ComponentGallery() {
  return (
    <section id="components" className="py-32 scroll-mt-16 relative">
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
            <Layers className="w-4 h-4 text-linear" />
            <span className="text-sm font-medium text-muted-foreground">
              <ScrambleText text="Copy-Paste Ready" delay={0.3} />
            </span>
          </motion.div>
          
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Component Gallery
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
            Ready-to-use React components with live previews and copy-paste code.
            Click the code icon to view the source.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {componentExamples.map((example, index) => (
            <ComponentCard key={example.name} example={example} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
