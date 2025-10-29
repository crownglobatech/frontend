'use client'
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchMessages() {
  return (
    <div className="bg-transparent px-8 py-5">
      <div className="relative border rounded-sm w-full">
        <input type="text" placeholder="Search Messages " className="px-6 py-1.5 w-full text-[14px]" />
        <FaMagnifyingGlass className="top-3 right-10 absolute text-[var(--foundation-neutral-6)]" />
      </div>
    </div>
  );
}