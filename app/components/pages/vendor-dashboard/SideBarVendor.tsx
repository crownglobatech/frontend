"use client";
import { LogIn, LogOut, PanelRightClose, Settings, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { MdAddCircleOutline, MdDashboard } from "react-icons/md";
import { TbHelpCircle, TbMessageCircle } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { MdCampaign, MdAnalytics } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSidebar } from "@/app/(vendor)/context/SidebarContext";

export default function SideBarVendor() {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const role =
    typeof window != "undefined" ? localStorage.getItem("role") : null;

  useEffect(() => {
    const isLoggedIn = () => {
      if (!user || role !== "service_provider") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };
    isLoggedIn();
  }, [user, role]);

  const navLinks = [
    { href: "/provider/dashboard", label: "Dashboard", icon: MdDashboard },
    { href: `/provider/ads`, label: "My Ads", icon: MdCampaign },
    {
      href: "/provider/post",
      label: "Post New Ad",
      icon: MdAddCircleOutline,
    },
    {
      href: "/provider/analytics",
      label: "Analytics",
      icon: MdAnalytics,
    },
    {
      href: "/provider/inquiries",
      label: "Messages",
      icon: TbMessageCircle,
    },
  ];

  const bottomLinks = [
    {href: "/provider/addBank", label: "Payment Settings", icon: Settings},
    { href: "/provider/faq", label: "Help & Support", icon: TbHelpCircle },
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

      <div
        className={`fixed md:sticky top-0 flex flex-col bg-[var(--primary-color)] px-4 py-6 h-screen z-[1000] w-64 md:w-full
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 ease-in-out
        `}
      >
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
            <Link href= '/provider/dashboard' className="font-thin text-[var(--neutral-white)]/70">
              Assure
            </Link>
            <Link href= '/provider/dashboard' className="font-extrabold text-[var(--neutral-white)]">
              Homes
            </Link>
          </motion.div>
          {/* Close button for mobile */}
          <button onClick={closeSidebar} className="md:hidden p-1 rounded-md hover:bg-white/10">
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col justify-between mt-8 h-full">
          <nav>
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ href, label, icon: Icon }) => {
                // Special case for dynamic route: /provider/[vendor]/ads
                const inAdsSection = pathname.includes("/ads");
                const isActive =
                  pathname === href ||
                  (href === `/provider/ads` && inAdsSection);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeSidebar}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                        isActive
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
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeSidebar}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                        isActive
                          ? "bg-[var(--secondary-color)] text-[var(--heading-color)] font-semibold"
                          : "text-white/70 hover:text-white hover:opacity-100"
                      } text-[13px] leading-relaxed`}
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
        </div>
      </div>
      </div>
    </>
  );
}
