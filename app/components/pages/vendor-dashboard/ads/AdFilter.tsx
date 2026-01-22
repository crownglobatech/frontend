import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { MdAddCircleOutline } from "react-icons/md";

interface FilterProps {
  sortBy: "all" | "newest" | "oldest";
  onChangeSort: (value: "all" | "newest" | "oldest") => void;
}

export default function AdFilter({ onChangeSort,sortBy }: FilterProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <label htmlFor="filter" className="font-semibold text-black">
          Sort by:
        </label>
        <Select value={sortBy} onValueChange={onChangeSort}>
          <SelectTrigger className="bg-[#E9EFF6] cursor-pointer text-[var(--heading-color)] font-bold">
            <SelectValue placeholder="All Ads" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--foundation-primary)] cursor-pointer">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Link
        href="/provider/post"
        className="bg-transparent flex gap-1 items-center px-4 py-2 border border-[var(--primary-color)] rounded-md font-semibold text-[var(--primary-color)] cursor-pointer"
      >
        <span className="">
          <MdAddCircleOutline size={16} />
        </span>
        Post New Ad
      </Link>
    </div>
  );
}
