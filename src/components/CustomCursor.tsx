import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('[data-cursor]');
      if (interactiveEl) {
        const text = interactiveEl.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
        return;
      }

      const isClickable = target.closest('a, button, [role="button"], input, textarea');
      if (isClickable) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        animate={{
          width: cursorText ? 90 : isHovered ? 48 : 12,
          height: cursorText ? 90 : isHovered ? 48 : 12,
          backgroundColor: cursorText ? 'rgba(0, 51, 102, 0.96)' : isHovered ? 'rgba(0, 85, 164, 0.22)' : '#003366',
          borderColor: isHovered ? '#0077B6' : 'transparent',
          borderWidth: isHovered ? 1.5 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="rounded-full flex items-center justify-center backdrop-blur-[2px] transition-colors"
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="text-[10px] font-mono font-bold tracking-widest text-[#00B4D8] uppercase select-none text-center px-1"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
