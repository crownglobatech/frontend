import { FaBed, FaBath } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

interface ApartmentCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  rating: number;
  providerVerified?: boolean;
  status?: string;
}

export default function ApartmentCard({
  image,
  title,
  location,
  price,
  beds,
  baths,
  rating,
  providerVerified = false,
  status = "For Sale",
}: ApartmentCardProps) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg rounded-xl w-[320px] overflow-hidden transition-shadow cursor-pointer">
      {/* Image */}
      <div className="relative mx-2 my-2">
        <img
          src={image}
          alt={title}
          className="rounded-md w-full h-45 object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E5AA882] via-[#1E5AA882] via-[51%] to-[#0C2342F0] to-[94%] rounded-md" />
        <span className="top-3 left-3 absolute bg-white shadow px-3 py-1 rounded-md font-medium text-[12px] text-[var(--text-body)] capitalize">
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-1">
          <CiLocationOn size={12} />
          <p className="text-[10px] text-gray-500">{location}</p>
        </div>

        <div className="flex justify-between">
          <h3 className="font-semibold text-[14px] text-[var(--heading-color)] truncate">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <AiFillStar
                key={i}
                size={10}
                color={i < rating ? "#DDBF5F" : "transparent"}
              />
            ))}
            <span className="ml-1 text-[10px] text-[var(--foundation-neutral-8)]">
              {Number.isFinite(rating) ? Number(rating.toFixed(1)) : "N/A"}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex justify-between text-gray-600 text-sm">
          <div className="flex items-center gap-1 text-[10px] text-[var(--foundation-neutral-8)]">
            <FaBed /> {beds} Bed Room
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[var(--foundation-neutral-8)]">
            <FaBath /> {baths} Bath Room
          </div>
          {/* Provider */}
          {providerVerified && (
            <div className="flex items-center gap-1 text-[10px] text-[var(--foundation-neutral-8)]">
              <MdVerifiedUser color="#28A745" /> Verified Provider
            </div>
          )}
        </div>

        {/* Price + Button */}
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-[18px] text-[var(--heading-color)]">
            ₦{price}
          </span>
          <button className="bg-[var(--primary-color)] hover:bg-blue-700 px-4 py-2 rounded-md font-medium text-[12px] text-white transition-all cursor-pointer">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
