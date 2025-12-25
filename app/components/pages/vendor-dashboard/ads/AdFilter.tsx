import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { FaChevronDown } from "react-icons/fa";

export default function AdFilter() {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <label htmlFor="filter" className="font-semibold text-black">
          Sort by:
        </label>
        {/* 
        <div className='relative'>
          <select
            name='filter'
            id='filter'
            className='bg-[var(--foundation-primary)] px-3 py-1 pr-8 rounded-md focus:outline-none font-semibold text-[14px] text-black appearance-none cursor-pointer'
          >
            <option value='All Ads'>All Ads</option>
            <option value='1'>Ad 1</option>
            <option value='2'>Ad 2</option>
          </select> */}

        {/* Chevron icon */}
        {/* <FaChevronDown
            size={14}
            className='top-1/2 right-2 absolute text-black -translate-y-1/2 pointer-events-none'
          />
        </div> */}
        <Select>
          <SelectTrigger className="bg-[var(--foundation-primary)] cursor-pointer">
            All Ads
          </SelectTrigger>
          <SelectContent className="bg-[var(--foundation-primary)] cursor-pointer">
            <option value="All Ads">All Ads</option>
            <option value="1">Ad 1</option>
            <option value="2">Ad 2</option>
          </SelectContent>
        </Select>
      </div>
      <div>
        <button className="bg-transparent px-4 py-2 border border-[var(--primary-color)] rounded-md font-semibold text-[var(--primary-color)] cursor-pointer">
          Post New Ad
        </button>
      </div>
    </div>
  );
}
