"use client";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
interface SearchMessagesProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}
export default function SearchMessages({
  searchQuery,
  onSearchChange,
}: SearchMessagesProps) {
  return (
    <div className="bg-transparent px-8 py-5">
      <div className="relative border rounded-sm w-full">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search Messages "
          className="px-6 py-1.5 w-full text-[14px]"
        />
        <FaMagnifyingGlass className="top-2.5 right-10 absolute text-[var(--foundation-neutral-6)] cursor-pointer" />
      </div>
    </div>
  );
}
