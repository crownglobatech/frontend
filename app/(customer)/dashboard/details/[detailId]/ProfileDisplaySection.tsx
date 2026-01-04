"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function ProfileDisplaySection() {
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
  return (
    <div>
      {isLoggedIn && (
        <div className="flex flex-row-reverse items-center gap-4">
          <Image
            src="/user.png"
            alt="profile"
            height={40}
            width={40}
            className="shadow-md rounded-full cursor-pointer"
          />
          <Image
            src="/notify.png"
            alt="notifications"
            height={40}
            width={40}
            className="shadow-md rounded-full cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
