"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdMenu } from "react-icons/md";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  // Auto-close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Buy", href: "/buy" },
    { name: "Rent", href: "/rent" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="relative z-[100] flex items-center justify-between rounded-md bg-[var(--neutral-white)] p-4">
        {/* Logo */}
        <div className="text-[var(--font-md)]">
          <span className="font-normal text-[var(--neutral-black)]">
            Crown-
          </span>
          <span className="font-extrabold text-[var(--neutral-black)]">
            Haven
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={
                isActive(link.href)
                  ? "border-b-2 border-[var(--secondary-color)] font-semibold text-[var(--secondary-color)]"
                  : "text-[var(--neutral-black)]"
              }
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex space-x-4">
          <Link href="/auth/login" className="px-4 py-2 font-semibold">
            Login
          </Link>
          <Link
            href="/auth/register"
            className="rounded-md bg-[var(--primary-color)] px-4 py-2 font-semibold text-white"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Trigger */}
        <button
          onClick={toggleMenu}
          aria-label="Open menu"
          className="block md:hidden"
        >
          <MdMenu size={26} className="text-black" />
        </button>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            navLinks={navLinks}
            isActive={isActive}
            onClose={toggleMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({
  navLinks,
  isActive,
  onClose,
}: {
  navLinks: { name: string; href: string }[];
  isActive: (href: string) => boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[1000]  bg-white p-6 md:hidden pointer-events-auto"
    >

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="text-[var(--font-md)]">
          <span className="font-normal text-[var(--neutral-black)]">
            Crown-
          </span>
          <span className="font-extrabold text-[var(--neutral-black)]">
            Haven
          </span>
        </div>

        <button onClick={onClose} aria-label="Close menu">
          <X size={28} />
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-col items-center space-y-6">
        {navLinks.map((link, index) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className={`text-xl ${isActive(link.href)
                ? "font-bold text-[var(--secondary-color)]"
                : "font-medium text-[var(--neutral-black)]"
                }`}
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* CTAs */}
      <div className="mt-4 mb-8 flex flex-col gap-4">
        <Link
          href="/auth/login"
          onClick={onClose}
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-center font-semibold"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          onClick={onClose}
          className="w-full rounded-md bg-[var(--primary-color)] px-4 py-3 text-center font-semibold text-white"
        >
          Sign up
        </Link>
      </div>
    </motion.div>,
    document.body
  );
}
