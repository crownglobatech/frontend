import { CiLocationOn } from "react-icons/ci";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Rating from "@/app/components/general/Rating";
import ReviewCard from "../../components/ReviewCard";
import CreateReview from "../../components/CreateReview";
import MiniChatBox from "../../components/MiniChatBox";
import { getCustomerAdsById } from "@/lib/api";
import { notFound } from "next/navigation";
import RelatedServicesSection from "./RelatedServicesSection";
import { Input } from "@/components/ui/input";

interface Props {
  params: Promise<{ detailId: string }>;
}
export default async function AdDetailsHomeScreen({ params }: Props) {
  const { detailId } = await params;
  let adData;
  try {
    adData = await getCustomerAdsById(detailId);
    console.log(adData);
    if (!adData) {
      notFound();
    }
  } catch (error: unknown) {
    console.error("Failed to fetch ad:", error);
    if (error instanceof Error && error.message.includes("404")) {
      notFound();
    }
    throw error;
  }

  // Convert 0/1 to boolean
  const isMessagingCredible = adData?.business?.is_verified === 1;
  const photos = Array.isArray(adData.photo_urls) ? adData.photo_urls : [];

  const vendorReviews = adData?.reviews || [];

  return (
    <div>
      {/* can be set to layout instead of repitition */}
      <div className="top-0 z-[1000] sticky w-full">
        {/* --- Top Bar --- */}
        <div className="flex justify-between gap-[50px] bg-white shadow-sm px-6 py-4">
          <div className="flex gap-2 w-full">
            <div className="relative w-[100px]">
              <Select>
                <SelectTrigger className="w-full font-semibold text-[12px] text-gray-800">
                  <SelectValue placeholder="All Areas" />
                </SelectTrigger>
                <SelectContent className="z-[9999] rounded-sm text-[12px]">
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="oyo">Oyo</SelectItem>
                  <SelectItem value="plateau">Plateau</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              type="text"
              placeholder="Search for homes and services"
              className="px-4 py-2 border border-gray-300 rounded-sm w-full text-[12px] placeholder:text-[12px] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6">
        {/* detail image */}
        <div className="rounded-md w-full">
          <Image
            src={photos[0] || "/bg-overlay.png"}
            alt="detail image, could be a house or a service description image"
            width={300}
            height={300}
            className="rounded-md w-full max-h-[250px] object-cover"
          />
        </div>
        <div className="mt-4">
          <div className="">
            <div className="flex items-center gap-1">
              <CiLocationOn size={12} />
              <p className="text-[10px] text-gray-500">
                {adData.area || "Location not stated"}
              </p>
            </div>
          </div>
          {/* ad title and price */}
          <div className="flex justify-between mt-1">
            <h1 className="font-semibold text-[20px] text-black">
              {adData?.title || "Title not stated"}
            </h1>
            <h1 className="font-semibold text-[20px] text-[var(--heading-color)]">
              ₦{adData?.price}
            </h1>
          </div>
        </div>

        {/* provider profile and rating */}
        <div className="relative flex items-center gap-4 mt-4">
          <div className="top-10 right-0 absolute">
            {isMessagingCredible && (
              <MiniChatBox
                userId={detailId}
                isMesagingCredible={isMessagingCredible}
              />
            )}
          </div>
          <div
            className={`flex items-center gap-2 ${
              isMessagingCredible ? "" : "blur-sm"
            }`}
          >
            <Image
              alt="profile avatar"
              src="/user.png"
              width={30}
              height={30}
              className="rounded-full object-contain"
            />
            <h2 className="font-semibold text-[12px]">
              {adData?.business?.business_name || "Business name not stated"}
            </h2>
          </div>
          <div
            className={`flex items-center gap-2 ${
              isMessagingCredible ? "" : "blur-sm"
            }`}
          >
            <Rating rate={5} />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6 mb-8 w-[60%]">
          {/* service description */}
          <div className="flex flex-col items-start gap-2">
            <h2 className="font-semibold text-[18px] text-black">
              Service Description
            </h2>
            <p className="max-w-[80%] text-[13px] text-[var(--foundation-neutral-8)]">
              {adData.description || "Description not available"}
            </p>
          </div>

          {/* gallery (images) */}
          <div className="flex flex-col items-start gap-4">
            <h2 className="font-semibold text-[18px] text-black">Gallery</h2>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              {photos.map((url, index) => {
                return (
                  <Image
                    key={index}
                    alt={url.slice(69, 150)}
                    src={url}
                    width={300}
                    height={300}
                    className="rounded-md h-[260px] object-cover"
                  />
                );
              })}
            </div>
          </div>

          {/* reviews */}
          <div>
            <div className="flex justify-between items-center gap-2 w-full">
              <div className="flex justify-between items-center gap-2">
                <h2 className="font-semibold text-[18px] text-black">
                  Customers Reviews
                </h2>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-2">
                    <Rating rate={5} />
                  </div>
                  <span className="text-[10px]">
                    ({adData.review_count !== 0 ? adData.review_count : ""}{" "}
                    {adData?.review_count && adData.review_count > 1
                      ? "Reviews"
                      : adData.review_count === 0
                      ? "No Reviews"
                      : "Review"}
                    )
                  </span>
                </div>
              </div>
            </div>
            {/* all reviews */}
            <div className="gap-4 grid grid-cols-1 mt-4 ">
              {vendorReviews.length === 0 ? (
                <p className="text-[12px] text-gray-500">No reviews yet.</p>
              ) : (
                vendorReviews
                  .slice(0, 4)
                  .map((review, index) => (
                    <ReviewCard key={index} review={review} />
                  ))
              )}
            </div>
          </div>

          {/* create new review */}
          <div className="">
            <CreateReview detailId={detailId} />
          </div>
        </div>

        {/* Related Services */}
        <RelatedServicesSection />
      </div>
    </div>
  );
}
