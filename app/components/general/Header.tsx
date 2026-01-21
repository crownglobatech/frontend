"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdMenu } from "react-icons/md";
import { X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Auto-close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  const servicesList = [
    "House painters",
    "Electricians",
    "Carpenters",
    "Estate legal practitioners",
    "Surveyors",
    "Developers",
    "House agents",
    "Interior decoration",
    "Gardeners",
    "Plumbers",
    "Van rentals",
    "Event source",
    "Others",
  ];

  return (
    <>
      <header className="relative z-[100] flex items-center justify-between rounded-md bg-[var(--neutral-white)] p-4">
        {/* Logo */}
        <Link href="/" className="text-[var(--font-md)] cursor-pointer">
          <span className="font-normal text-[var(--neutral-black)]">
            Crown-
          </span>
          <span className="font-extrabold text-[var(--neutral-black)]">
            Haven
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={
              isActive("/")
                ? "border-b-2 border-[var(--secondary-color)] font-semibold text-[var(--secondary-color)]"
                : "text-[var(--neutral-black)] hover:text-[var(--secondary-color)] transition-colors"
            }
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              className={`flex items-center gap-1 ${isActive("/services") || isServicesOpen
                  ? "text-[var(--secondary-color)] font-semibold"
                  : "text-[var(--neutral-black)]"
                } hover:text-[var(--secondary-color)] transition-colors`}
            >
              Services
              <ChevronDown size={16} />
            </button>

            {/* Dropdown Content */}
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[280px]"
                >
                  <div className="bg-white shadow-xl rounded-md p-2 border border-gray-100 grid grid-cols-1 gap-1">
                    {servicesList.map((service) => (
                      <Link
                        key={service}
                        href={`/dashboard?category=allied-services&search=${service}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--secondary-color)] rounded-md transition-colors"
                      >
                        {service}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/about"
            className={
              isActive("/about")
                ? "border-b-2 border-[var(--secondary-color)] font-semibold text-[var(--secondary-color)]"
                : "text-[var(--neutral-black)] hover:text-[var(--secondary-color)] transition-colors"
            }
          >
            About
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex space-x-4">
          <Link href="/auth/login" className="px-4 py-2 font-semibold hover:text-[var(--secondary-color)] transition-colors">
            Login
          </Link>
          <Link
            href="/auth/register"
            className="rounded-md bg-[var(--primary-color)] px-4 py-2 font-semibold text-white hover:bg-opacity-90 transition-all"
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
            servicesList={servicesList}
            isActive={isActive}
            onClose={toggleMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({
  servicesList,
  isActive,
  onClose,
}: {
  servicesList: string[];
  isActive: (href: string) => boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

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
      className="fixed inset-0 z-[1000] bg-white p-6 md:hidden pointer-events-auto overflow-y-auto"
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
      <nav className="flex flex-col space-y-6">
        <Link
          href="/"
          onClick={onClose}
          className={`text-xl ${isActive("/")
              ? "font-bold text-[var(--secondary-color)]"
              : "font-medium text-[var(--neutral-black)]"
            }`}
        >
          Home
        </Link>

        {/* Mobile Services Accordion */}
        <div>
          <button
            onClick={() => setIsServicesExpanded(!isServicesExpanded)}
            className="flex items-center justify-between w-full text-xl font-medium text-[var(--neutral-black)]"
          >
            Services
            <ChevronDown
              size={20}
              className={`transition-transform duration-200 ${isServicesExpanded ? "rotate-180" : ""
                }`}
            />
          </button>
          <AnimatePresence>
            {isServicesExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pl-4 mt-2 space-y-3 border-l-2 border-gray-100"
              >
                {servicesList.map((service) => (
                  <Link
                    key={service}
                    href={`/dashboard?category=allied-services&search=${service}`}
                    onClick={onClose}
                    className="block text-base text-gray-600 hover:text-[var(--secondary-color)]"
                  >
                    {service}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/about"
          onClick={onClose}
          className={`text-xl ${isActive("/about")
              ? "font-bold text-[var(--secondary-color)]"
              : "font-medium text-[var(--neutral-black)]"
            }`}
        >
          About
        </Link>
      </nav>

      {/* CTAs */}
      <div className="mt-8 flex flex-col gap-4 border-t pt-8">
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
