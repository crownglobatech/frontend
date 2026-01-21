"use client";
import { Icon, PanelRightClose } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { TbHelpCircle, TbMessageCircle } from "react-icons/tb";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { LogOut } from "lucide-react";

export default function SideBarUser() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const role =
    typeof window != "undefined" ? localStorage.getItem("role") : null;

  useEffect(() => {
    const isLoggedIn = () => {
      if (!user || role !== "customer") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };
    isLoggedIn();
  }, [user, role]);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: MdDashboard },
    ...(isLoggedIn
      ? [{ href: "/messages", label: "Messages", icon: TbMessageCircle }]
      : []),
  ];

  const bottomLinks = [
    { href: "/faq", label: "Help & Support", icon: TbHelpCircle },
    isLoggedIn
      ? { href: "/auth/logout", label: "Signout", icon: LogOut }
      : { href: "/auth/login", label: "Login", icon: LogIn },
  ];

  // Helper: Check if the current route starts with the link href
  const isActiveRoute = (href: string) => pathname.startsWith(href);

  return (
    <div className="top-0 sticky flex flex-col bg-[var(--primary-color)] px-4 py-6 h-screen">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <span className="font-thin text-[var(--neutral-white)]/70">
              Crown-
            </span>
            <span className="font-extrabold text-[var(--neutral-white)]">
              Haven
            </span>
          </motion.div>
          <PanelRightClose
            color="white"
            size={20}
            className="opacity-80 hover:opacity-100 transition-all cursor-pointer"
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col justify-between mt-8 h-full">
          <nav>
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = isActiveRoute(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${isActive
                          ? "bg-[var(--secondary-color)] text-[var(--heading-color)] font-semibold"
                          : "text-white/70 hover:text-white hover:opacity-100"
                        }`}
                    >
                      <Icon size={20} />
                      <span className="text-[13px] leading-relaxed">
                        {label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Links */}
          <nav>
            <ul className="flex flex-col gap-2">
              {bottomLinks.map(({ href, label, icon: Icon }) => {
                const isActive = isActiveRoute(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex gap-2 items-center px-3 py-2 rounded-md transition-all ${isActive
                          ? "bg-[var(--secondary-color)] text-[var(--heading-color)] font-semibold"
                          : "text-white/70 hover:text-white hover:opacity-100"
                        } text-[13px] leading-relaxed`}
                    >
                      <Icon size={20} />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
