'use client';

import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/contact', label: 'Contact' },
];

const linkFocusClass =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c84b31] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]';

function getInitialScrollProgress() {
  if (typeof window === 'undefined') {
    return 0;
  }

  const maxScroll = Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    1,
  );

  return window.scrollY / maxScroll;
}

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [homeHasPassedHero, setHomeHasPassedHero] = useState(
    () => getInitialScrollProgress() > 0.05,
  );
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 24,
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHomePage = pathname === '/';
  const isVisible = !isHomePage || homeHasPassedHero;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isHomePage) {
      setHomeHasPassedHero(latest > 0.05);
    }
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileOpen]);

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMobileOpen(false);

    if (href.startsWith('#')) {
      event.preventDefault();
      document.querySelector(href)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return;
    }

    if (href === pathname) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (href === '/') {
      setHomeHasPassedHero(false);
    }

    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            className="fixed left-0 right-0 top-0 z-50 transition-colors duration-300"
            style={{
              backgroundColor: isScrolled ? 'rgba(61,44,26,0.94)' : 'transparent',
              backdropFilter: isScrolled ? 'blur(16px)' : 'none',
              borderBottom: isScrolled
                ? '1px solid rgba(255,255,255,0.1)'
                : '1px solid transparent',
            }}
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <nav
              className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8"
              aria-label="Primary navigation"
            >
              <Link
                href="/"
                scroll={false}
                onClick={(event) => handleNavigation(event, '/')}
                aria-label="Navigate to home"
                className={`flex rounded-sm ${linkFocusClass}`}
              >
                <span
                  className="text-xl font-bold tracking-tighter"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  W.I.P
                </span>
                <span
                  className="ml-1 text-sm font-semibold tracking-tight"
                  style={{ color: '#c84b31' }}
                >
                  Restaurant
                </span>
              </Link>

              <div className="hidden items-center gap-8 md:flex">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      scroll={false}
                      onClick={(event) => handleNavigation(event, link.href)}
                      aria-label={`Navigate to ${link.label}`}
                      className={`rounded-sm text-sm font-medium tracking-tight transition-colors hover:text-white ${linkFocusClass}`}
                      style={{
                        color: isActive
                          ? 'rgba(255,255,255,0.9)'
                          : 'rgba(255,255,255,0.62)',
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <button
                type="button"
                className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm md:hidden ${linkFocusClass}`}
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                <motion.span
                  className="block h-0.5 w-5 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                  animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="block h-0.5 w-5 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="block h-0.5 w-5 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                  animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                />
              </button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 h-full w-full cursor-default"
              style={{ backgroundColor: 'rgba(0,0,0,0.48)' }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            />
            <motion.aside
              id="mobile-navigation"
              className="absolute right-0 top-0 flex h-full w-80 max-w-[86vw] flex-col px-6 py-8"
              style={{
                backgroundColor: '#3d2c1a',
                borderLeft: '1px solid rgba(255,255,255,0.1)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              aria-label="Mobile navigation"
            >
              <div className="mb-10 flex items-center justify-between">
                <div className="flex items-baseline">
                  <span
                    className="text-xl font-bold tracking-tighter"
                    style={{ color: 'rgba(255,255,255,0.9)' }}
                  >
                    W.I.P
                  </span>
                  <span
                    className="ml-1 text-sm font-semibold"
                    style={{ color: '#c84b31' }}
                  >
                    Restaurant
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${linkFocusClass}`}
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                  aria-label="Close navigation menu"
                >
                  X
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + index * 0.04, ease: 'easeOut' }}
                    >
                      <Link
                        href={link.href}
                        scroll={false}
                        onClick={(event) => handleNavigation(event, link.href)}
                        aria-label={`Navigate to ${link.label}`}
                        className={`block rounded-lg px-3 py-4 text-lg font-medium tracking-tight ${linkFocusClass}`}
                        style={{
                          backgroundColor: isActive
                            ? 'rgba(200,75,49,0.16)'
                            : 'transparent',
                          color: isActive ? '#c84b31' : 'rgba(255,255,255,0.72)',
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
