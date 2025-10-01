import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col bg-[var(--primary-color)] h-screen">
      {/* Center content */}
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-white shadow-md p-16 rounded-md w-full max-w-lg">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-white text-sm text-center">
        © 2023 Crown Haven. All rights reserved.
      </footer>
    </div>
  );
}
