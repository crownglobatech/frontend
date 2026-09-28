"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";

interface SidebarContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);
    const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

    const value = useMemo(
        () => ({ isSidebarOpen, toggleSidebar, closeSidebar }),
        [isSidebarOpen, toggleSidebar, closeSidebar]
    );

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
