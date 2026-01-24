import Image from "next/image";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import Rating from "@/app/components/general/Rating";
import ProfileDropDown from "../ProfileDropDown";
import NotificationDropdown from "../NotificationDropdown";

interface Props {
  query: string;
  setQuery: (query: string) => void;
}
export default function HeaderBanner({ query, setQuery }: Props) {
  return (
    <div className="bg-white shadow-sm px-6 py-4 w-full">
      {/* Top bar */}
      <div className="flex justify-between items-center">
        {/* Search Bar */}
        <div className="relative w-[80%]">
          <FaSearch
            style={{ color: "#BFBFBF", cursor: "pointer" }}
            className="top-1/2 right-3 absolute text-sm -translate-y-1/2"
          />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery?.(e.target.value)}
            placeholder="Search..."
            className="border-1"
          />
        </div>

        {/* Icons */}
        <div className="flex flex-row-reverse items-center gap-4">
          <Rating rate={5} />

          <div className="shadow-sm rounded-full">
            <ProfileDropDown />
          </div>
          <div className="shadow-md rounded-full">
            <NotificationDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}
