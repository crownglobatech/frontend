import Image from "next/image";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import Rating from "@/app/components/general/Rating";

export default function HeaderBanner() {
  return (
    <div className="bg-white shadow-lg px-6 py-4 w-full">
      {/* Top bar */}
      <div className="flex justify-between items-center">
        {/* Search Bar */}
        <div className="relative w-[80%]">
          <FaSearch
            style={{ color: "#595959", cursor: "pointer" }}
            className="top-1/2 right-3 absolute text-sm -translate-y-1/2"
          />
          <Input
            type="text"
            placeholder="Search..."
            className="border-1"
            // className="py-1.5 pr-4 pl-10 border border-[var(--heading-color)] rounded focus:outline-none w-full text-[var(--foundation-neutral-6)] appearance-none"
          />
        </div>

        {/* Icons */}
        <div className="flex flex-row-reverse items-center gap-4">
          <Rating rate={5} />

          <div className="shadow-md rounded-full">
            <Image
              src="/user.png"
              alt="vendor profile avatar"
              className="object-contain cursor-pointer"
              height={40}
              width={40}
            />
          </div>
          <div className="shadow-md rounded-full">
            <Image
              src="/notify.png"
              alt="notification icon"
              className="object-contain cursor-pointer"
              height={40}
              width={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
