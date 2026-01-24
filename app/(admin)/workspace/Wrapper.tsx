"use client";
import { useEffect, useState } from "react";
import SideBarAdmin from "./components/SideBar";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "./context/SidebarContext";

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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen relative">
        <SideBarAdmin />
        <section className="flex flex-col bg-white w-full md:w-[calc(100%-256px)] md:ml-[256px]">
          {children}
        </section>
      </div>
    </SidebarProvider>
  );
}
