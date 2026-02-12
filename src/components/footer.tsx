import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter, Heart } from 'lucide-react';
import { MagneticButton } from './magnetic-button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-linear/50 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-linear to-purple-600 text-white shadow-lg shadow-linear/25"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <span className="font-display font-bold text-xl">UI Hub</span>
          </motion.div>

          {/* Description */}
          <p className="text-muted-foreground text-center max-w-md">
            Premium UI resources for developers and AI agents. 
            Built with attention to detail.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <MagneticButton
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-linear/10 text-muted-foreground hover:text-linear transition-all"
              strength={0.3}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-linear/10 text-muted-foreground hover:text-linear transition-all"
              strength={0.3}
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </MagneticButton>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="my-10 h-px bg-gradient-to-r from-transparent via-border to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} UI Inspiration Hub. All rights reserved.
          </p>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React, Tailwind & Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
