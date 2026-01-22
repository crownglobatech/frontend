import { FaBed, FaBath } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { Calendar } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ApartmentCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  rating: number;
  status: string;
  date: string;
  state?: string
}

export default function ApartmentCard({
  image,
  title,
  location,
  price,
  beds,
  state,
  baths,
  rating,
  date,
  status = "Active",
}: ApartmentCardProps) {
  return (
    <div className="bg-white shadow-sm hover:shadow-sm rounded-xl w-[320px] overflow-hidden transition-shadow cursor-pointer">
      {/* Image */}
      <div className="relative mx-2 my-2">
        <img
          src={image}
          alt={title}
          className="rounded-md w-full h-45 object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E5AA882] via-[#1E5AA882] via-[51%] to-[#0C2342F0] to-[94%] rounded-md" />
        <span
          className={`${status === "approved"
              ? "bg-[#C8FFD5] text-[var(--success-color)]"
              : status === "paused"
                ? "bg-[#FFF4D3] text-[var(--brand-accent-color)]"
                : "bg-[var(--text-body)] text-white"
            } top-3 left-3 absolute shadow px-3 py-1 rounded-md capitalize font-medium text-[12px]`}
        >
          {status === "approved" ? "active" : status}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-1">
          <CiLocationOn size={12} />
          <p className="text-[10px] text-gray-500">{location}, {state}</p>
        </div>

        <div className="flex justify-between">
          <h3 className="font-semibold text-[14px] text-[var(--heading-color)]">
            {title}
          </h3>
        </div>

        {/* Details */}
        <div className="flex justify-between text-gray-600 text-sm">
          <div className="flex items-center gap-1 text-[10px] text-[var(--foundation-neutral-8)]">
            <FaBed /> {beds} Bed Room
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[var(--foundation-neutral-8)]">
            <FaBath /> {baths} Bath Room
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[var(--foundation-neutral-8)]">
            <Calendar className="" size={10} /> {date}
          </div>
        </div>

        {/* Price + Button */}
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-[18px] text-[var(--heading-color)]">
            ₦{formatPrice(price)}
          </span>
          <button className="bg-[var(--primary-color)] hover:bg-blue-700 px-4 py-2 rounded-md font-medium text-[12px] text-white transition-all cursor-pointer">
            Manage Ad
          </button>
        </div>
      </div>
    </div>
  );
}
