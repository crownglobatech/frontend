"use client";
import { useImperativeHandle, useRef, forwardRef } from "react";
import ApartmentCard from "@/app/components/general/ApartmentCard";
import Link from "next/link";
import { CustomerAd } from "@/lib/types";

export type RelatedServicesHandle = {
  scrollLeft: () => void;
  scrollRight: () => void;
};
interface Props {
  relatedServices: CustomerAd[];
}
const RelatedServices = forwardRef<RelatedServicesHandle, Props>((props, ref) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    scrollLeft: () => {
      scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    },
    scrollRight: () => {
      scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    },
  }));

  // Drag scroll logic
  let isDown = false;
  let startX: number;
  let scrollStart: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    if (scrollRef.current) {
      startX = e.pageX - scrollRef.current.offsetLeft;
      scrollStart = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollStart - walk;
  };

  const handleMouseUp = () => (isDown = false);
  const handleMouseLeave = () => (isDown = false);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto cursor-grab active:cursor-grabbing scrollbar-hide"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="flex gap-4 px-2 py-2 w-max">
        {props.relatedServices && props.relatedServices.length > 0 ? (
          props.relatedServices.map((item, index) => (
            <Link key={item.id || index} href={`/dashboard/details/${item.id}`}>
              <ApartmentCard
                baths={item.bathrooms || 0}
                beds={item.bedrooms || 0}
                image={Array.isArray(item.photo_urls) ? item.photo_urls[0] : '/placeholder.png'}
                location={`${item.lga || ""}, ${item.state || ""}`}
                price={item.price || "0"}
                rating={item.average_rating}
                title={item.title || "Untitled Ad"}
                providerVerified={item.business?.is_verified === 1}
                status={item.listing_type || "For Rent"}
              />
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center p-8 w-full text-gray-500 italic">
            No related services found.
          </div>
        )}
      </div>
    </div>
  );
});
export default RelatedServices;
