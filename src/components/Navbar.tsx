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
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]';

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
            className="fixed left-0 right-0 top-0 z-50"
            style={{
              backgroundColor: isScrolled
                ? 'rgba(61,44,26,0.85)'
                : 'rgba(61,44,26,0)',
              backdropFilter: isScrolled ? 'blur(20px) saturate(1.4)' : 'blur(0px)',
              WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(1.4)' : 'blur(0px)',
              borderBottom: isScrolled
                ? '1px solid rgba(212,168,83,0.12)'
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
                className={`flex items-center gap-2 rounded-sm ${linkFocusClass}`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4a853]/20 backdrop-blur-sm">
                  <span
                    className="text-xs font-bold tracking-tighter"
                    style={{ color: '#d4a853' }}
                  >
                    W
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span
                    className="text-lg font-bold tracking-tighter"
                    style={{ color: 'rgba(255,255,255,0.9)' }}
                  >
                    W.I.P
                  </span>
                  <span
                    className="ml-1.5 text-xs font-semibold tracking-tight uppercase"
                    style={{ color: '#d4a853' }}
                  >
                    Restaurant
                  </span>
                </div>
              </Link>

              <div className="hidden items-center gap-1 md:flex">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      scroll={false}
                      onClick={(event) => handleNavigation(event, link.href)}
                      aria-label={`Navigate to ${link.label}`}
                      className={`relative rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-all duration-300 ${linkFocusClass}`}
                      style={{
                        color: isActive
                          ? 'rgba(255,255,255,0.95)'
                          : 'rgba(255,255,255,0.6)',
                      }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full"
                          style={{
                            backgroundColor: 'rgba(212,168,83,0.12)',
                            border: '1px solid rgba(212,168,83,0.2)',
                          }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  );
                })}

                <Link
                  href="/reservations"
                  className="ml-4 rounded-full bg-[#d4a853] px-5 py-2 text-sm font-semibold text-[#3d2c1a] transition-all duration-300 hover:bg-[#e8c882] hover:shadow-lg hover:shadow-[#d4a853]/20"
                >
                  Reserve
                </Link>
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
              style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            />
            <motion.aside
              id="mobile-navigation"
              className="absolute right-0 top-0 flex h-full w-80 max-w-[86vw] flex-col px-6 py-8"
              style={{
                backgroundColor: 'rgba(61,44,26,0.95)',
                backdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(212,168,83,0.15)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              aria-label="Mobile navigation"
            >
              <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4a853]/20">
                    <span className="text-xs font-bold text-[#d4a853]">W</span>
                  </div>
                  <div className="flex items-baseline">
                    <span
                      className="text-xl font-bold tracking-tighter"
                      style={{ color: 'rgba(255,255,255,0.9)' }}
                    >
                      W.I.P
                    </span>
                    <span
                      className="ml-1.5 text-xs font-semibold uppercase"
                      style={{ color: '#d4a853' }}
                    >
                      Restaurant
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${linkFocusClass}`}
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                  aria-label="Close navigation menu"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
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
                        className={`block rounded-lg px-4 py-3.5 text-base font-medium tracking-tight transition-all ${linkFocusClass}`}
                        style={{
                          backgroundColor: isActive
                            ? 'rgba(212,168,83,0.1)'
                            : 'transparent',
                          border: isActive
                            ? '1px solid rgba(212,168,83,0.2)'
                            : '1px solid transparent',
                          color: isActive ? '#d4a853' : 'rgba(255,255,255,0.72)',
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href="/reservations"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d4a853] px-6 py-3.5 text-sm font-semibold text-[#3d2c1a] transition-all hover:bg-[#e8c882]"
                >
                  Reserve a Table
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
