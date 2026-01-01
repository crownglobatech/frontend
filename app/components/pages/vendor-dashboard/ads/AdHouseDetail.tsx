import { Ad } from "@/lib/types";
import { formatK, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

interface Props {
  adData: Ad;
}
export default function HouseDetail({ adData }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-[18px] text-[var(--heading-color)]">
          {adData.title}
        </h2>
        <div
          className={`bg-[#C8FFD5] px-4 py-1 rounded-full font-semibold ${
            adData.status === "paused"
              ? "bg-[#FFF4D3] text-[var(--brand-accent-color)]"
              : adData.status === "approved"
              ? "bg-[#C8FFD5] text-[var(--success-color)]"
              : "bg-[var(--text-body)] text-white"
          } capitalize`}
        >
          {adData.status === "approved" ? "active" : adData.status}
        </div>
      </div>
      <div className="relative">
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E5AA882] via-[#1E5AA882] via-[51%] to-[#0C2342F0] to-[94%] rounded-md" />
        <Image
          src={adData.photo_urls[0]}
          alt="house image"
          width={300}
          height={300}
          className="rounded-md w-full max-h-[500px] object-contain"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <CiLocationOn size={12} />
          <p className="text-[12px] text-[var(--foundation-neutral-8)]">
            {adData.area}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <h2 className="font-semibold text-[16px] text-[var(--heading-color)]">
              Service Description
            </h2>
            <h2 className="font-semibold text-[var(--heading-color)]">
              ₦{formatPrice(adData.price ? adData.price : 0)}
            </h2>
          </div>
          <p className="text-[14px] text-[var(--foundation-neutral-8)]">
            {adData.description}
          </p>
        </div>
        <div className="flex justify-between">
          <div>
            <h2 className="font-semibold text-[16px] text-[var(--heading color)]">
              Category
            </h2>
            <p className="text-[14px] text-[var(--foundation-neutral-8)] capitalize">
              {adData.business.business_name}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-[16px] text-[var(--heading color)]">
              Listing
            </h2>
            <p className="text-[14px] text-[var(--foundation-neutral-8)] capitalize">
              {adData.listing_type}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-[16px] text-[var(--heading color)]">
              Bath Room
            </h2>
            <p className="text-[14px] text-[var(--foundation-neutral-8)]">
              {" "}
              {adData.bathrooms}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-[16px] text-[var(--heading color)]">
              Bed Room
            </h2>
            <p className="text-[14px] text-[var(--foundation-neutral-8)]">
              {" "}
              {adData.bedrooms}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
