import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorDot {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor() {
  const [dots, setDots] = useState<CursorDot[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Add trail dots
      setDots(prev => {
        const newDots = [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }];
        if (newDots.length > 8) {
          return newDots.slice(newDots.length - 8);
        }
        return newDots;
      });
      
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Clean up old dots
    const interval = setInterval(() => {
      setDots(prev => prev.filter(dot => Date.now() - dot.id < 150));
    }, 50);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(interval);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Cursor trail */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ 
            opacity: 0,
            scale: 0,
            x: dot.x - 4,
            y: dot.y - 4
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            width: 8,
            height: 8,
            backgroundColor: '#5E6AD2',
            borderRadius: '50%',
          }}
        />
      ))}
      
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div 
          className={`w-full h-full rounded-full border-2 border-[#5E6AD2] transition-all duration-200 ${
            isHovering ? 'bg-[#5E6AD2]/20' : 'bg-transparent'
          }`}
        />
      </motion.div>
      
      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-2 h-2 bg-[#5E6AD2] rounded-full" />
      </motion.div>
    </>
  );
}
