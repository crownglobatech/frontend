"use client";
import ProfileDropdown from "@/app/components/general/ProfileDropDown";
import Rating from "@/app/components/general/Rating";
import NotificationDropdown from "@/app/components/pages/vendor-dashboard/NotificationDropdown";
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
        <div className='flex flex-row-reverse items-center gap-4'>
          <Rating rate={5} />
          <div className='shadow-sm rounded-full'>
            <ProfileDropdown />
          </div>
          <div className='shadow-sm rounded-full'>
            <NotificationDropdown />
          </div>
        </div>
      )}
    </div>
  );
}
