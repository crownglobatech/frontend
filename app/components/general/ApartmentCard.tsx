import { FaBed, FaBath, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { formatPrice } from "@/lib/utils";

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
  state?: string
  category?: string
}

export default function ApartmentCard({
  image,
  title,
  location,
  price,
  beds,
  baths,
  rating,
  category,
  state,
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
        {/* <span className="top-3 left-3 absolute bg-white shadow px-3 py-1 rounded-md font-medium text-[12px] text-[var(--text-body)] capitalize">
          {status}
        </span> */}
      </div>

      {/* Content */}
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-1">
          <CiLocationOn size={12} />
          <p className="text-[10px] text-gray-500">{location}, {state}</p>
        </div>

        <div className="flex justify-between">
          <h3 className="font-semibold text-[14px] text-[var(--heading-color)] truncate">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => {
              const ratingValue = rating || 0;
              if (ratingValue >= i + 1) {
                return <FaStar key={i} size={10} color="#DDBF5F" />;
              } else if (ratingValue >= i + 0.5) {
                return <FaStarHalfAlt key={i} size={10} color="#DDBF5F" />;
              } else {
                return <FaRegStar key={i} size={10} color="#D9D9D9" />;
              }
            })}
            <span className="ml-1 text-[10px] text-[var(--foundation-neutral-8)]">
              {rating > 0 ? rating.toFixed(1) : "0.0"}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex justify-between text-gray-600 text-sm">
          <div className={`flex items-center gap-1 text-[10px] ${beds ? "" : "hidden"} text-[var(--foundation-neutral-8)]`}>
            <FaBed /> {beds} Bed Room
          </div>
          <div className={`flex items-center gap-1 text-[10px] ${baths ? "" : "hidden"} text-[var(--foundation-neutral-8)]`}>
            <FaBath /> {baths} Bath Room
          </div>
          <div className={`flex items-center gap-1 text-[10px] ${!beds && !baths && category ? "" : "hidden"} text-[var(--foundation-neutral-8)]`}>
            {category}
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
            ₦{formatPrice(price)}
          </span>
          <button className="bg-[var(--primary-color)] hover:bg-blue-700 px-4 py-2 rounded-md font-medium text-[12px] text-white transition-all cursor-pointer">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
