import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Play, Code2, Sparkles, MousePointer2, MousePointerClick, Repeat } from 'lucide-react';
import { SpotlightCard } from '../components/spotlight-card';
import { ScrambleText } from '../components/text-reveal';

interface AnimationDemo {
  id: string;
  name: string;
  description: string;
  category: 'Hover' | 'Click' | 'Continuous' | 'Micro-interaction';
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  component: React.ReactNode;
  code: string;
  dependencies: string[];
}

// 1. Apple-Style Smooth Button
function AppleButton() {
  return (
    <motion.button
      className="relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
      <span className="relative z-10 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Apple Style
      </span>
    </motion.button>
  );
}

// 2. Linear-style Glow Card
function LinearGlowCard() {
  return (
    <motion.div
      className="relative w-64 h-40 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6 overflow-hidden group cursor-pointer"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.15), transparent 40%)',
        }}
      />
      <div className="relative z-10">
        <h3 className="text-white font-bold text-lg mb-2">Linear Style</h3>
        <p className="text-gray-400 text-sm">Hover to see the spotlight effect</p>
      </div>
      <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
    </motion.div>
  );
}

// 3. Stripe-style Magnetic Button
function StripeMagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  return (
    <motion.button
      ref={ref}
      className="px-8 py-4 bg-[#635BFF] text-white font-bold rounded-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Magnetic
    </motion.button>
  );
}

// 4. Vercel-style Border Gradient
function VercelBorderGradient() {
  return (
    <motion.div
      className="relative p-[2px] rounded-xl bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700"
      whileHover={{ scale: 1.02 }}
    >
      <div className="bg-black rounded-xl p-6">
        <h3 className="text-white font-bold">Vercel Style</h3>
        <p className="text-gray-400 text-sm mt-2">Animated border gradient</p>
      </div>
    </motion.div>
  );
}

// 5. Airbnb-style Heart Animation
function AirbnbHeart() {
  const [liked, setLiked] = useState(false);

  return (
    <motion.button
      className="relative w-12 h-12 flex items-center justify-center"
      onClick={() => setLiked(!liked)}
      whileTap={{ scale: 0.9 }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill={liked ? '#FF385C' : 'none'}
        stroke={liked ? '#FF385C' : 'currentColor'}
        strokeWidth="2"
      >
        <motion.path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          initial={false}
          animate={liked ? {
            scale: [1, 1.3, 1],
            transition: { duration: 0.3 }
          } : {}}
        />
      </motion.svg>
      <AnimatePresence>
        {liked && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#FF385C]"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// 6. Loading Skeleton Shimmer
function SkeletonShimmer() {
  return (
    <div className="w-64 space-y-3">
      <div className="h-4 bg-gray-800 rounded relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>
      <div className="h-4 bg-gray-800 rounded w-3/4 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.2 }}
        />
      </div>
      <div className="h-20 bg-gray-800 rounded relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.4 }}
        />
      </div>
    </div>
  );
}

// 7. Switch Toggle
function SwitchToggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <motion.button
      className={`w-14 h-8 rounded-full p-1 ${isOn ? 'bg-green-500' : 'bg-gray-600'}`}
      onClick={() => setIsOn(!isOn)}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-md"
        animate={{ x: isOn ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
}

// 8. Notification Badge
function NotificationBadge() {
  const [count, setCount] = useState(3);

  return (
    <motion.button
      className="relative p-3 bg-gray-800 rounded-full"
      onClick={() => setCount(0)}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-xl">🔔</span>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// 9. Progress Bar
function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-64">
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </div>
      <p className="text-sm text-gray-400 mt-2 text-right">{progress}%</p>
    </div>
  );
}

// 10. Morphing Shape
function MorphingShape() {
  return (
    <motion.div
      className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500"
      animate={{
        borderRadius: ['20%', '50%', '20%'],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// 11. Floating Label Input
function FloatingLabelInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="relative w-64">
      <motion.label
        className="absolute left-3 text-gray-400 pointer-events-none"
        animate={{
          y: isFocused || value ? -24 : 12,
          scale: isFocused || value ? 0.85 : 1,
          color: isFocused ? '#6366F1' : '#9CA3AF',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Email Address
      </motion.label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-3 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
      />
    </div>
  );
}

// 12. Card Stack
function CardStack() {
  const cards = [
    { color: 'bg-red-500', text: 'Card 1' },
    { color: 'bg-blue-500', text: 'Card 2' },
    { color: 'bg-green-500', text: 'Card 3' },
  ];

  return (
    <div className="relative w-48 h-32">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={`absolute w-full h-full ${card.color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}
          style={{ zIndex: cards.length - i }}
          initial={{ y: i * 10, x: i * 10 }}
          whileHover={{ y: i * 10 - 20, rotate: (i - 1) * 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {card.text}
        </motion.div>
      ))}
    </div>
  );
}

const animationDemos: AnimationDemo[] = [
  {
    id: 'apple-button',
    name: 'Apple Button',
    description: 'Smooth gradient reveal on hover, inspired by Apple.com',
    category: 'Hover',
    difficulty: 'Easy',
    component: <AppleButton />,
    dependencies: ['framer-motion'],
    code: `<motion.button
  className="relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden group"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
>
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
  />
  <span className="relative z-10">Button Text</span>
</motion.button>`,
  },
  {
    id: 'linear-spotlight',
    name: 'Linear Spotlight Card',
    description: 'Mouse-following spotlight effect like Linear.app',
    category: 'Hover',
    difficulty: 'Advanced',
    component: <LinearGlowCard />,
    dependencies: ['framer-motion'],
    code: `const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty('--mouse-x', \`\${x}px\`);
  e.currentTarget.style.setProperty('--mouse-y', \`\${y}px\`);
};

<motion.div
  className="relative rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6 overflow-hidden group"
  onMouseMove={handleMouseMove}
  whileHover={{ y: -4 }}
>
  <div
    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    style={{
      background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.15), transparent 40%)',
    }}
  />
  <div className="relative z-10">Content</div>
</motion.div>`,
  },
  {
    id: 'stripe-magnetic',
    name: 'Stripe Magnetic Button',
    description: 'Button that follows cursor with spring physics',
    category: 'Hover',
    difficulty: 'Medium',
    component: <StripeMagneticButton />,
    dependencies: ['framer-motion'],
    code: `const [position, setPosition] = useState({ x: 0, y: 0 });

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  setPosition({ x: x * 0.3, y: y * 0.3 });
};

<motion.button
  onMouseMove={handleMouseMove}
  onMouseLeave={() => setPosition({ x: 0, y: 0 })}
  animate={{ x: position.x, y: position.y }}
  transition={{ type: "spring", stiffness: 150, damping: 15 }}
  whileHover={{ scale: 1.05 }}
>
  Magnetic
</motion.button>`,
  },
  {
    id: 'vercel-border',
    name: 'Vercel Border Gradient',
    description: 'Animated gradient border effect',
    category: 'Continuous',
    difficulty: 'Easy',
    component: <VercelBorderGradient />,
    dependencies: ['framer-motion'],
    code: `<motion.div
  className="relative p-[2px] rounded-xl bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700"
  whileHover={{ scale: 1.02 }}
>
  <div className="bg-black rounded-xl p-6">
    Content here
  </div>
</motion.div>`,
  },
  {
    id: 'airbnb-heart',
    name: 'Airbnb Heart',
    description: 'Heart icon with ripple effect on click',
    category: 'Click',
    difficulty: 'Medium',
    component: <AirbnbHeart />,
    dependencies: ['framer-motion'],
    code: `const [liked, setLiked] = useState(false);

<motion.button
  onClick={() => setLiked(!liked)}
  whileTap={{ scale: 0.9 }}
>
  <motion.svg
    fill={liked ? '#FF385C' : 'none'}
    stroke={liked ? '#FF385C' : 'currentColor'}
  >
    <motion.path
      animate={liked ? { scale: [1, 1.3, 1] } : {}}
      d="M12 21.35l-1.45-1.32C5.4 15.36..."
    />
  </motion.svg>
  <AnimatePresence>
    {liked && (
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[#FF385C]"
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        exit={{ opacity: 0 }}
      />
    )}
  </AnimatePresence>
</motion.button>`,
  },
  {
    id: 'skeleton-shimmer',
    name: 'Skeleton Loading',
    description: 'Shimmer effect for loading states',
    category: 'Continuous',
    difficulty: 'Easy',
    component: <SkeletonShimmer />,
    dependencies: ['framer-motion'],
    code: `<div className="h-4 bg-gray-800 rounded relative overflow-hidden">
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
    animate={{ x: ['-100%', '100%'] }}
    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
  />
</div>`,
  },
  {
    id: 'switch-toggle',
    name: 'Switch Toggle',
    description: 'iOS-style animated switch',
    category: 'Click',
    difficulty: 'Easy',
    component: <SwitchToggle />,
    dependencies: ['framer-motion'],
    code: `const [isOn, setIsOn] = useState(false);

<motion.button
  className={\`w-14 h-8 rounded-full p-1 \${isOn ? 'bg-green-500' : 'bg-gray-600'}\`}
  onClick={() => setIsOn(!isOn)}
>
  <motion.div
    className="w-6 h-6 bg-white rounded-full shadow-md"
    animate={{ x: isOn ? 24 : 0 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
  />
</motion.button>`,
  },
  {
    id: 'notification-badge',
    name: 'Notification Badge',
    description: 'Badge with entrance/exit animation',
    category: 'Micro-interaction',
    difficulty: 'Easy',
    component: <NotificationBadge />,
    dependencies: ['framer-motion'],
    code: `<motion.button className="relative">
  🔔
  <AnimatePresence>
    {count > 0 && (
      <motion.span
        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        {count}
      </motion.span>
    )}
  </AnimatePresence>
</motion.button>`,
  },
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    description: 'Animated progress with spring physics',
    category: 'Continuous',
    difficulty: 'Easy',
    component: <ProgressBar />,
    dependencies: ['framer-motion'],
    code: `<div className="h-2 bg-gray-800 rounded-full overflow-hidden">
  <motion.div
    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
    animate={{ width: \`\${progress}%\` }}
    transition={{ type: "spring", stiffness: 50 }}
  />
</div>`,
  },
  {
    id: 'morphing-shape',
    name: 'Morphing Shape',
    description: 'Organic shape transformation',
    category: 'Continuous',
    difficulty: 'Easy',
    component: <MorphingShape />,
    dependencies: ['framer-motion'],
    code: `<motion.div
  className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500"
  animate={{
    borderRadius: ['20%', '50%', '20%'],
    rotate: [0, 180, 360],
    scale: [1, 1.1, 1],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>`,
  },
  {
    id: 'floating-label',
    name: 'Floating Label Input',
    description: 'Material Design style floating label',
    category: 'Micro-interaction',
    difficulty: 'Medium',
    component: <FloatingLabelInput />,
    dependencies: ['framer-motion'],
    code: `const [isFocused, setIsFocused] = useState(false);
const [value, setValue] = useState('');

<div className="relative">
  <motion.label
    className="absolute left-3 pointer-events-none"
    animate={{
      y: isFocused || value ? -24 : 12,
      scale: isFocused || value ? 0.85 : 1,
      color: isFocused ? '#6366F1' : '#9CA3AF',
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    Label
  </motion.label>
  <input
    value={value}
    onChange={(e) => setValue(e.target.value)}
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    className="w-full px-3 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:border-indigo-500 focus:outline-none"
  />
</div>`,
  },
  {
    id: 'card-stack',
    name: 'Card Stack',
    description: 'Interactive stacked cards with hover effect',
    category: 'Hover',
    difficulty: 'Medium',
    component: <CardStack />,
    dependencies: ['framer-motion'],
    code: `const cards = [
  { color: 'bg-red-500', text: 'Card 1' },
  { color: 'bg-blue-500', text: 'Card 2' },
  { color: 'bg-green-500', text: 'Card 3' },
];

<div className="relative w-48 h-32">
  {cards.map((card, i) => (
    <motion.div
      key={i}
      className={\`absolute w-full h-full \${card.color} rounded-xl\`}
      style={{ zIndex: cards.length - i }}
      initial={{ y: i * 10, x: i * 10 }}
      whileHover={{ y: i * 10 - 20, rotate: (i - 1) * 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {card.text}
    </motion.div>
  ))}
</div>`,
  },
];

function AnimationCard({ demo, index }: { demo: AnimationDemo; index: number }) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(demo.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = () => {
    switch (demo.category) {
      case 'Hover': return <MousePointer2 className="w-3 h-3" />;
      case 'Click': return <MousePointerClick className="w-3 h-3" />;
      case 'Continuous': return <Repeat className="w-3 h-3" />;
      default: return <Sparkles className="w-3 h-3" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <SpotlightCard className="h-full overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`
                  inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full
                  ${demo.category === 'Hover' ? 'bg-blue-500/20 text-blue-400' : ''}
                  ${demo.category === 'Click' ? 'bg-green-500/20 text-green-400' : ''}
                  ${demo.category === 'Continuous' ? 'bg-purple-500/20 text-purple-400' : ''}
                  ${demo.category === 'Micro-interaction' ? 'bg-orange-500/20 text-orange-400' : ''}
                `}>
                  {getCategoryIcon()}
                  {demo.category}
                </span>
                <span className={`
                  text-[10px] font-medium px-2 py-0.5 rounded-full
                  ${demo.difficulty === 'Easy' ? 'bg-gray-700 text-gray-300' : ''}
                  ${demo.difficulty === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' : ''}
                  ${demo.difficulty === 'Advanced' ? 'bg-red-900/50 text-red-400' : ''}
                `}>
                  {demo.difficulty}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold">{demo.name}</h3>
            </div>
            <div className="flex items-center gap-1">
              <motion.button
                onClick={() => setShowCode(!showCode)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showCode ? <Play className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
              </motion.button>
              <motion.button
                onClick={copyCode}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{demo.description}</p>
        </div>
        
        <div className="p-8 min-h-[200px] flex items-center justify-center bg-secondary/10">
          {showCode ? (
            <div className="w-full">
              <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                <span>Dependencies:</span>
                {demo.dependencies.map((dep) => (
                  <span key={dep} className="px-2 py-0.5 bg-secondary rounded text-foreground">
                    {dep}
                  </span>
                ))}
              </div>
              <pre className="text-xs font-mono text-foreground overflow-x-auto bg-background/50 p-4 rounded-lg">
                <code>{demo.code}</code>
              </pre>
            </div>
          ) : (
            demo.component
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function AnimationEffects() {
  return (
    <section id="animations" className="py-32 scroll-mt-20 relative">
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
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-linear" />
            </motion.div>
            <span className="text-sm font-medium text-muted-foreground">
              <ScrambleText text="Copy-Paste Animations" delay={0.3} />
            </span>
          </motion.div>
          
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Animation Effects
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Production-ready animations inspired by the world&apos;s best products. 
            From Apple&apos;s smooth transitions to Stripe&apos;s playful interactions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {animationDemos.map((demo, index) => (
            <AnimationCard key={demo.id} demo={demo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
