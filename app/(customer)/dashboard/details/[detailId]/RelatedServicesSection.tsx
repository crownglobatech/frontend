"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import RelatedServices, {
  RelatedServicesHandle,
} from "../../components/RelatedServices";
import { logger } from "@/lib/logger";

interface Props {
  relatedServices?: any[];
}
export default function RelatedServicesSection({ relatedServices }: Props) {
  const relatedRef = useRef<RelatedServicesHandle>(null);

  return (
    <div className="-mx-6 mb-10">
      <div className="flex justify-between items-center px-6">
        <h2 className="font-semibold text-[18px] text-black">
          Related Services
        </h2>

        <div className="flex items-center gap-2">
          <ChevronLeftIcon
            onClick={() => relatedRef.current?.scrollLeft()}
            className="cursor-pointer"
            size={30}
            color="black"
          />
          <ChevronRightIcon
            onClick={() => relatedRef.current?.scrollRight()}
            className="cursor-pointer"
            size={30}
            color="black"
          />
        </div>
      </div>

      <div className="overflow-x-hidden">
        <RelatedServices ref={relatedRef} relatedServices={relatedServices!} />
      </div>
    </div>
  );
}
