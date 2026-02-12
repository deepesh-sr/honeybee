import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check, Palette, Sparkles, Layers, Zap, Box, Circle, Triangle } from 'lucide-react';
import { SpotlightCard } from '../components/spotlight-card';
import { ScrambleText } from '../components/text-reveal';

interface Gradient {
  id: string;
  name: string;
  description: string;
  category: 'Mesh' | 'Aurora' | 'Neon' | 'Metallic' | 'Glass' | 'Organic';
  css: string;
  preview: React.ReactNode;
  usage: string;
}

const gradients: Gradient[] = [
  {
    id: 'aurora-borealis',
    name: 'Aurora Borealis',
    description: 'Flowing northern lights effect with dynamic motion',
    category: 'Aurora',
    usage: 'Hero sections, backgrounds, loading states',
    css: `background: linear-gradient(125deg, #0f0c29, #302b63, #24243e);
position: relative;
overflow: hidden;

&::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(0, 255, 255, 0.1) 50%,
    transparent 70%
  );
  animation: aurora 6s linear infinite;
}

@keyframes aurora {
  0% { transform: translateX(-50%) rotate(0deg); }
  100% { transform: translateX(50%) rotate(360deg); }
}`,
    preview: (
      <div className="w-full h-full rounded-xl relative overflow-hidden" style={{
        background: 'linear-gradient(125deg, #0f0c29, #302b63, #24243e)'
      }}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.2) 50%, transparent 70%)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(-45deg, transparent 30%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)',
          }}
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    ),
  },
  {
    id: 'mesh-purple',
    name: 'Purple Mesh',
    description: 'Soft multi-point mesh gradient like Apple Music',
    category: 'Mesh',
    usage: 'Music apps, creative portfolios, branding',
    css: `background: 
  radial-gradient(at 40% 20%, hsla(270,100%,70%,1) 0px, transparent 50%),
  radial-gradient(at 80% 0%, hsla(320,100%,70%,1) 0px, transparent 50%),
  radial-gradient(at 0% 50%, hsla(250,100%,70%,1) 0px, transparent 50%),
  radial-gradient(at 80% 50%, hsla(280,100%,60%,1) 0px, transparent 50%),
  radial-gradient(at 0% 100%, hsla(300,100%,70%,1) 0px, transparent 50%),
  hsla(260, 50%, 10%, 1);`,
    preview: (
      <div className="w-full h-full rounded-xl" style={{
        background: `
          radial-gradient(at 40% 20%, hsla(270,100%,70%,1) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsla(320,100%,70%,1) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsla(250,100%,70%,1) 0px, transparent 50%),
          radial-gradient(at 80% 50%, hsla(280,100%,60%,1) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(300,100%,70%,1) 0px, transparent 50%),
          hsla(260, 50%, 10%, 1)
        `
      }} />
    ),
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    description: 'High contrast neon with glowing border effect',
    category: 'Neon',
    usage: 'Gaming interfaces, dark themes, futuristic designs',
    css: `background: #0a0a0a;
border: 2px solid transparent;
border-radius: 16px;
background-clip: padding-box;
position: relative;

&::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #ff00ff, #00ffff);
  border-radius: inherit;
  z-index: -1;
}

box-shadow: 
  0 0 20px rgba(255, 0, 255, 0.5),
  0 0 40px rgba(0, 255, 255, 0.3),
  inset 0 0 20px rgba(255, 0, 255, 0.1);
animation: neonPulse 2s ease-in-out infinite;

@keyframes neonPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 255, 0.5); }
  50% { box-shadow: 0 0 40px rgba(255, 0, 255, 0.8); }
}`,
    preview: (
      <div className="w-full h-full rounded-xl relative p-[2px]" style={{
        background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
      }}>
        <motion.div 
          className="w-full h-full rounded-xl flex items-center justify-center text-white font-bold"
          style={{
            background: '#0a0a0a',
          }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(255, 0, 255, 0.1)',
              '0 0 40px rgba(255, 0, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(255, 0, 255, 0.2)',
              '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(255, 0, 255, 0.1)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          NEON
        </motion.div>
      </div>
    ),
  },
  {
    id: 'liquid-chrome',
    name: 'Liquid Chrome',
    description: 'Reflective metallic surface with liquid feel',
    category: 'Metallic',
    usage: 'Luxury brands, premium products, 3D interfaces',
    css: `background: linear-gradient(
  135deg,
  #8e8e8e 0%,
  #d4d4d4 20%,
  #ffffff 40%,
  #8e8e8e 60%,
  #d4d4d4 80%,
  #8e8e8e 100%
);
position: relative;
animation: shimmer 3s ease-in-out infinite;

&::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.4) 0%,
    transparent 50%,
    rgba(0,0,0,0.2) 100%
  );
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}`,
    preview: (
      <div className="w-full h-full rounded-xl relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #8e8e8e 0%, #d4d4d4 20%, #ffffff 40%, #8e8e8e 60%, #d4d4d4 80%, #8e8e8e 100%)',
        backgroundSize: '200% 100%',
      }}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    ),
  },
  {
    id: 'frosted-glass',
    name: 'Frosted Glass',
    description: 'Modern glass morphism with backdrop blur',
    category: 'Glass',
    usage: 'Modal overlays, cards, modern UI elements',
    css: `background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 16px;
box-shadow: 
  0 8px 32px 0 rgba(31, 38, 135, 0.37),
  inset 0 0 0 1px rgba(255, 255, 255, 0.1);

&::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.2) 0%,
    transparent 50%,
    rgba(255,255,255,0.1) 100%
  );
  border-radius: inherit;
  pointer-events: none;
}`,
    preview: (
      <div className="w-full h-full rounded-xl relative overflow-hidden flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}>
        <div className="w-4/5 h-4/5 rounded-xl flex items-center justify-center text-white font-bold"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
        >
          GLASS
        </div>
      </div>
    ),
  },
  {
    id: 'sunset-waves',
    name: 'Sunset Waves',
    description: 'Warm flowing gradient inspired by sunsets',
    category: 'Organic',
    usage: 'Lifestyle apps, travel websites, warm themes',
    css: `background: linear-gradient(125deg, #2d1b4e, #1a1a2e, #0f0f23);
position: relative;
overflow: hidden;

&::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 100, 50, 0.3),
    rgba(255, 200, 50, 0.2),
    transparent
  );
  animation: sunset 5s ease-in-out infinite;
}

@keyframes sunset {
  0%, 100% { transform: translateX(-50%); }
  50% { transform: translateX(50%); }
}`,
    preview: (
      <div className="w-full h-full rounded-xl relative overflow-hidden" style={{
        background: 'linear-gradient(125deg, #2d1b4e, #1a1a2e, #0f0f23)',
      }}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 100, 50, 0.4), rgba(255, 200, 50, 0.3), transparent)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    ),
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    description: 'Deep sea gradient with cyan and blue tones',
    category: 'Mesh',
    usage: 'Marine apps, meditation, cool themes',
    css: `background: 
  radial-gradient(at 0% 0%, hsla(190,100%,50%,0.8) 0px, transparent 50%),
  radial-gradient(at 100% 0%, hsla(220,100%,60%,0.8) 0px, transparent 50%),
  radial-gradient(at 100% 100%, hsla(240,100%,50%,0.8) 0px, transparent 50%),
  radial-gradient(at 0% 100%, hsla(200,100%,40%,0.8) 0px, transparent 50%),
  hsla(220, 50%, 10%, 1);`,
    preview: (
      <div className="w-full h-full rounded-xl" style={{
        background: `
          radial-gradient(at 0% 0%, hsla(190,100%,50%,0.8) 0px, transparent 50%),
          radial-gradient(at 100% 0%, hsla(220,100%,60%,0.8) 0px, transparent 50%),
          radial-gradient(at 100% 100%, hsla(240,100%,50%,0.8) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(200,100%,40%,0.8) 0px, transparent 50%),
          hsla(220, 50%, 10%, 1)
        `
      }} />
    ),
  },
  {
    id: 'electric-blue',
    name: 'Electric Blue',
    description: 'Pulsing electric blue neon effect',
    category: 'Neon',
    usage: 'Tech interfaces, gaming, futuristic UI',
    css: `background: #0a0a0a;
border: 2px solid #00ffff;
border-radius: 16px;
box-shadow: 
  0 0 10px #00ffff,
  0 0 20px #00ffff,
  0 0 40px #00ffff,
  inset 0 0 20px rgba(0, 255, 255, 0.1);
animation: electricPulse 2s ease-in-out infinite;

@keyframes electricPulse {
  0%, 100% {
    box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff;
  }
  50% {
    box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff;
  }
}`,
    preview: (
      <motion.div
        className="w-full h-full rounded-xl flex items-center justify-center text-cyan-400 font-bold"
        style={{
          background: '#0a0a0a',
          border: '2px solid #00ffff',
        }}
        animate={{
          boxShadow: [
            '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff, inset 0 0 20px rgba(0, 255, 255, 0.1)',
            '0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff, inset 0 0 30px rgba(0, 255, 255, 0.2)',
            '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff, inset 0 0 20px rgba(0, 255, 255, 0.1)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ELECTRIC
      </motion.div>
    ),
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    description: 'Elegant rose gold metallic finish',
    category: 'Metallic',
    usage: 'Luxury products, fashion, premium services',
    css: `background: linear-gradient(
  135deg,
  #b76e79 0%,
  #e8c4c4 25%,
  #f4e4e4 50%,
  #e8c4c4 75%,
  #b76e79 100%
);
position: relative;

&::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.3) 0%,
    transparent 40%,
    rgba(0,0,0,0.1) 100%
  );
}`,
    preview: (
      <div className="w-full h-full rounded-xl relative" style={{
        background: 'linear-gradient(135deg, #b76e79 0%, #e8c4c4 25%, #f4e4e4 50%, #e8c4c4 75%, #b76e79 100%)',
      }}>
        <div className="absolute inset-0 rounded-xl" style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)',
        }} />
      </div>
    ),
  },
  {
    id: 'dark-crystal',
    name: 'Dark Crystal',
    description: 'Dark glass with purple crystal tint',
    category: 'Glass',
    usage: 'Dark mode UI, dashboards, premium apps',
    css: `background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
position: relative;

.glass-layer {
  background: rgba(147, 51, 234, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}`,
    preview: (
      <div className="w-full h-full rounded-xl relative overflow-hidden flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      }}>
        <div className="w-4/5 h-4/5 rounded-xl flex items-center justify-center text-purple-300 font-bold"
          style={{
            background: 'rgba(147, 51, 234, 0.1)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(147, 51, 234, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
        >
          CRYSTAL
        </div>
      </div>
    ),
  },
  {
    id: 'candy-floss',
    name: 'Candy Floss',
    description: 'Soft pastel gradient with pink and blue',
    category: 'Organic',
    usage: 'Kids apps, creative tools, playful interfaces',
    css: `background: linear-gradient(
  135deg,
  #ff9a9e 0%,
  #fecfef 50%,
  #fecfef 50%,
  #a8edea 100%
);
position: relative;

&::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 50%
  );
}`,
    preview: (
      <div className="w-full h-full rounded-xl relative" style={{
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #a8edea 100%)',
      }}>
        <div className="absolute inset-0 rounded-xl" style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
        }} />
      </div>
    ),
  },
  {
    id: 'northern-lights',
    name: 'Northern Lights',
    description: 'Green aurora effect with flowing motion',
    category: 'Aurora',
    usage: 'Nature apps, environmental themes, night mode',
    css: `background: linear-gradient(125deg, #0a1628, #1a3a3a, #0a1628);
position: relative;
overflow: hidden;

&::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(50, 255, 100, 0.2) 50%,
    transparent 60%
  );
  animation: aurora 8s linear infinite;
}

@keyframes aurora {
  0% { transform: translateX(-50%) rotate(0deg); }
  100% { transform: translateX(50%) rotate(360deg); }
}`,
    preview: (
      <div className="w-full h-full rounded-xl relative overflow-hidden" style={{
        background: 'linear-gradient(125deg, #0a1628, #1a3a3a, #0a1628)',
      }}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, transparent 40%, rgba(50, 255, 100, 0.3) 50%, transparent 60%)',
          }}
          animate={{ x: ['-100%', '100%'], rotate: [0, 180] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    ),
  },
];

function GradientCard({ gradient, index }: { gradient: Gradient; index: number }) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const copyGradient = async () => {
    await navigator.clipboard.writeText(gradient.css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = () => {
    switch (gradient.category) {
      case 'Mesh': return <Layers className="w-3 h-3" />;
      case 'Aurora': return <Zap className="w-3 h-3" />;
      case 'Neon': return <Sparkles className="w-3 h-3" />;
      case 'Metallic': return <Box className="w-3 h-3" />;
      case 'Glass': return <Circle className="w-3 h-3" />;
      case 'Organic': return <Triangle className="w-3 h-3" />;
      default: return <Palette className="w-3 h-3" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <SpotlightCard className="h-full overflow-hidden">
        <div className="h-48 relative">
          {gradient.preview}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`
              inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-black/50 backdrop-blur-sm text-white
            `}>
              {getCategoryIcon()}
              {gradient.category}
            </span>
          </div>
          <motion.button
            onClick={copyGradient}
            className="absolute top-3 right-3 p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white opacity-0 hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </motion.button>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg font-bold">{gradient.name}</h3>
            <motion.button
              onClick={() => setShowCode(!showCode)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {showCode ? 'Hide Code' : 'View Code'}
            </motion.button>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{gradient.description}</p>
          <p className="text-xs text-linear">Best for: {gradient.usage}</p>
          
          {showCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-4 overflow-hidden"
            >
              <pre className="text-xs font-mono text-foreground bg-secondary/30 p-3 rounded-lg overflow-x-auto">
                <code>{gradient.css}</code>
              </pre>
            </motion.div>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function GradientGallery() {
  return (
    <section id="gradients" className="py-32 scroll-mt-20 relative">
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
            <Palette className="w-4 h-4 text-linear" />
            <span className="text-sm font-medium text-muted-foreground">
              <ScrambleText text="Copy-Paste Gradients" delay={0.3} />
            </span>
          </motion.div>
          
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Gradient Gallery
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Innovative, eye-catching gradients inspired by the world&apos;s best brands. 
            Mesh, aurora, neon, metallic, glass, and organic gradients — all ready to use.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gradients.map((gradient, index) => (
            <GradientCard key={gradient.id} gradient={gradient} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
