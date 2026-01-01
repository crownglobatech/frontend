import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";
import Link from "next/link";
import { MdAddCircleOutline } from "react-icons/md";
export default function AdFilter() {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <label htmlFor="filter" className="font-semibold text-black">
          Sort by:
        </label>
        <Select>
          <SelectTrigger className="bg-[#E9EFF6] cursor-pointer text-[var(--heading-color)] font-bold">
            All Ads
          </SelectTrigger>
          <SelectContent className="bg-[var(--foundation-primary)] cursor-pointer">
            <SelectItem value="All Ads">All Ads</SelectItem>
            <SelectItem value="1">Ad 1</SelectItem>
            <SelectItem value="2">Ad 2</SelectItem>
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
