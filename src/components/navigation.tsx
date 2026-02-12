import { Moon, Sun, Hexagon, Menu, X, Zap, Palette, Type } from 'lucide-react';
import { useTheme } from './theme-provider';
import { cn } from '../lib/utils';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { name: 'Animations', icon: Zap, href: '#animations' },
  { name: 'Gradients', icon: Palette, href: '#gradients' },
  { name: 'Fonts', icon: Type, href: '#fonts' },
];

export function Navigation() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'py-3' : 'py-5'
        )}
      >
        <div className={cn(
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-500',
          isScrolled && 'bg-background/80 backdrop-blur-2xl border border-honey/20 rounded-2xl shadow-2xl shadow-honey/5 mt-2'
        )}
        style={isScrolled ? { width: 'calc(100% - 2rem)', maxWidth: '80rem' } : { width: '100%' }}
        >
          <nav className="flex h-14 items-center justify-between">
            <motion.a href="#" className="flex items-center gap-3 group" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <motion.div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-honey to-gold text-bee-black shadow-lg shadow-honey/25"
                animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <Hexagon className="w-6 h-6" strokeWidth={2.5} />
              </motion.div>
              <span className="font-display font-bold text-xl hidden sm:block">honeybee</span>
            </motion.a>

            <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full p-1 border border-honey/20">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a key={item.name} href={item.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1 }}
                    className={cn('flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all', 'text-muted-foreground hover:text-foreground hover:bg-background')}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </motion.a>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <motion.button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className={cn('flex items-center justify-center w-10 h-10 rounded-full transition-all', 'bg-secondary hover:bg-honey/20 text-foreground border border-honey/20')}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <AnimatePresence mode="wait">
                  {resolvedTheme === 'dark' ? (
                    <motion.div key="sun" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                      <Sun className="w-4 h-4 text-honey" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                      <Moon className="w-4 h-4 text-bee-black" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-honey/20 transition-colors border border-honey/20" whileTap={{ scale: 0.95 }}>
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div key="close" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }} className="fixed top-24 left-4 right-4 z-50 md:hidden">
            <div className="bg-background/95 backdrop-blur-xl border border-honey/20 rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.a key={item.name} href={item.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-secondary transition-colors">
                    <item.icon className="w-5 h-5 text-honey" />
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
