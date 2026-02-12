import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Hexagon, Zap, Palette, Type, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 honeycomb-pattern opacity-30" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 184, 0, 0.4) 0%, transparent 60%)',
            filter: 'blur(60px)',
            top: '20%',
            right: '-10%',
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 60%)',
            filter: 'blur(60px)',
            bottom: '10%',
            left: '-5%',
          }}
          animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div 
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20"
        style={{ y, opacity, scale }}
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/80 backdrop-blur-sm border border-honey/30 mb-10"
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              <Hexagon className="w-4 h-4 text-honey" />
            </motion.div>
            <span className="text-sm font-medium text-muted-foreground">60+ Animations • 50+ Gradients • 50+ Fonts</span>
          </motion.div> */}

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-8 leading-[0.9]"
          >
            <span className="block mb-2 text-foreground">honeybee</span>
            <span className="block gradient-text-animated">designs.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            A curated collection of animations, gradients, and typography. 
            Everything you need to build{' '}
            <span className="text-foreground font-medium">stunning interfaces</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.a
              href="#animations"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-honey text-bee-black font-bold text-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Zap className="w-5 h-5" />
                Explore Animations
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </motion.a>
            
            <motion.a
              href="#gradients"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-secondary text-foreground font-bold text-lg border border-honey/30 hover:bg-honey/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Palette className="w-5 h-5" />
              View Gradients
            </motion.a>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { icon: Zap, text: '60+ Animations' },
              { icon: Palette, text: '50+ Gradients' },
              { icon: Type, text: '50+ Fonts' },
              { icon: Hexagon, text: 'Copy-Paste Ready' },
            ].map((feature) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-honey/20 backdrop-blur-sm"
              >
                <feature.icon className="w-4 h-4 text-honey" />
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: '60+', label: 'Animations' },
              { value: '50+', label: 'Gradients' },
              { value: '50+', label: 'Fonts' },
            ].map((stat, statIndex) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + statIndex * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#animations"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
