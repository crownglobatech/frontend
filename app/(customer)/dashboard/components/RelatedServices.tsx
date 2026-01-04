"use client";
import { useImperativeHandle, useRef, forwardRef } from "react";
import ApartmentCard from "@/app/components/general/ApartmentCard";
import Link from "next/link";

export type RelatedServicesHandle = {
  scrollLeft: () => void;
  scrollRight: () => void;
};
interface Props {
  relatedServices: any[];
}
const RelatedServices = forwardRef<RelatedServicesHandle>((props, ref) => {
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
        <Link href="/dashboard/details/200">
          <ApartmentCard
            baths={3}
            beds={4}
            image="/estate.png"
            location="Agodi Awolowo, Ibadan"
            price="50000000"
            rating={5}
            title="Vineyard Estate"
            providerVerified={true}
            status="For Sale"
          />
        </Link>

        <Link href="/dashboard/details/200">
          <ApartmentCard
            baths={3}
            beds={4}
            image="/estate.png"
            location="Agodi Awolowo, Ibadan"
            price="50000000"
            rating={5}
            title="Vineyard Estate"
            providerVerified={true}
            status="For Rent"
          />
        </Link>
        <Link href="/dashboard/details/200">
          <ApartmentCard
            baths={3}
            beds={4}
            image="/estate.png"
            location="Agodi Awolowo, Ibadan"
            price="50000000"
            rating={5}
            title="Vineyard Estate"
            providerVerified={true}
            status="For Sale"
          />
        </Link>

        <Link href="/dashboard/details/200">
          <ApartmentCard
            baths={3}
            beds={4}
            image="/estate.png"
            location="Agodi Awolowo, Ibadan"
            price="50000000"
            rating={5}
            title="Vineyard Estate"
            providerVerified={true}
            status="For Rent"
          />
        </Link>
        <Link href="/dashboard/details/200">
          <ApartmentCard
            baths={3}
            beds={4}
            image="/estate.png"
            location="Agodi Awolowo, Ibadan"
            price="50000000"
            rating={5}
            title="Vineyard Estate"
            providerVerified={true}
            status="For Sale"
          />
        </Link>

        <Link href="/dashboard/details/200">
          <ApartmentCard
            baths={3}
            beds={4}
            image="/estate.png"
            location="Agodi Awolowo, Ibadan"
            price="50000000"
            rating={5}
            title="Vineyard Estate"
            providerVerified={true}
            status="For Rent"
          />
        </Link>
        <Link href="/dashboard/details/200">
          <ApartmentCard
            baths={3}
            beds={4}
            image="/estate.png"
            location="Agodi Awolowo, Ibadan"
            price="50000000"
            rating={5}
            title="Vineyard Estate"
            providerVerified={true}
            status="For Sale"
          />
        </Link>

        <Link href="/dashboard/details/200">
          <ApartmentCard
            baths={3}
            beds={4}
            image="/estate.png"
            location="Agodi Awolowo, Ibadan"
            price="50000000"
            rating={5}
            title="Vineyard Estate"
            providerVerified={true}
            status="For Rent"
          />
        </Link>

        <Link href="/dashboard/details/200">
          <ApartmentCard
            baths={3}
            beds={4}
            image="/estate.png"
            location="Agodi Awolowo, Ibadan"
            price="50000000"
            rating={5}
            title="Vineyard Estate"
            providerVerified={true}
            status="For Sale"
          />
        </Link>
      </div>
    </div>
  );
});
export default RelatedServices;
