"use client";
import { useEffect, useState } from "react";
import SideBarAdmin from "./components/SideBar";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: LayoutProps) {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    if (!token) {
      router.replace("/auth/login");
    }
  }, [token]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className={`${collapsed ? "w-[10%]" : "w-1/5"} z-[1000]`}>
        <SideBarAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <section
        className={`flex flex-col bg-white ${collapsed ? "w-full" : "w-4/5"}`}
      >
        {children}
      </section>
    </div>
  );
}
