'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      if (!visible) setVisible(true);
    };

    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseenter', enter);
    document.addEventListener('mouseleave', leave);

    const interactiveEls = () =>
      document.querySelectorAll('a, button, [role="tab"], input, textarea, select');

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    const attach = () => {
      interactiveEls().forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseleave', leave);
      observer.disconnect();
    };
  }, [cursorX, cursorY, visible]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden rounded-full mix-blend-difference md:block"
      style={{
        x,
        y,
        width: 24,
        height: 24,
        backgroundColor: 'white',
        opacity: visible ? 1 : 0,
      }}
      animate={{
        scale: hovering ? 2 : 1,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.15 }}
      aria-hidden="true"
    />
  );
}
