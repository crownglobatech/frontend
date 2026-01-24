"use client";

import { LogIn, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { MdDashboard, MdAnalytics, MdPeople } from "react-icons/md";
import { LogOut, BookAIcon, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSidebar } from "../context/SidebarContext";

export default function SideBarAdmin() {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const role =
    typeof window != "undefined" ? localStorage.getItem("role") : null;

  useEffect(() => {
    const isLoggedIn = () => {
      if (!user || role !== "admin") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };
    isLoggedIn();
  }, [user, role]);

  const navLinks = [
    { href: "/workspace/dashboard", label: "Dashboard", icon: MdDashboard },
    { href: "/workspace/users", label: "Users", icon: Users },
    { href: "/workspace/vendors", label: "Vendors", icon: MdPeople },
    { href: "/workspace/bookings", label: "Bookings", icon: BookAIcon },
    { href: "/workspace/analytics", label: "Analytics", icon: MdAnalytics },
  ];

  const bottomLinks = [
    isLoggedIn
      ? { href: "/auth/logout", label: "Signout", icon: LogOut }
      : { href: "/auth/login", label: "Login", icon: LogIn },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black z-[999] md:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed flex h-screen flex-col border-r bg-white z-[1000] w-64
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 transition-transform duration-300 ease-in-out
        `}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between mt-4 px-4">
          <h1 className="text-[18px] font-bold">Crown-Haven</h1>
          {/* Close button for mobile */}
          <button onClick={closeSidebar} className="md:hidden p-1 rounded-md hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* NAV AREA */}
        <nav className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
          {/* Main Nav */}
          <ul className="space-y-2">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeSidebar} // Close on nav click for mobile
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${active
                      ? "bg-[var(--primary-color)] text-white font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="whitespace-nowrap overflow-hidden">
                      {label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Bottom Nav */}
          <ul className="space-y-2 border-t pt-4">
            {bottomLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-all hover:bg-gray-100"
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="whitespace-nowrap overflow-hidden">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
