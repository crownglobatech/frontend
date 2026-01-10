import { RatingsFeedbacks } from "@/lib/types";
import { Star } from "lucide-react";

interface Props {
  ratings_feedbacks: RatingsFeedbacks | undefined;
}

export default function CustomerRatingAndFeedbacks({
  ratings_feedbacks,
}: Props) {
  if (
    !ratings_feedbacks?.recent_reviews ||
    ratings_feedbacks.recent_reviews.length === 0
  ) {
    return (
      <p className="text-[12px] text-[var(--foundation-neutral-8)] text-center">
        You’ll start receiving feedbacks as customers engage with your services.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-h-60 overflow-y-auto scrollbar-hide">
      {ratings_feedbacks.recent_reviews.map((item, index) => {
        return (
          <div key={index} className="flex flex-col gap-1">
            {/* Stars and Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${star <= item.rating
                        // Use a specific gold color to match the image or brand accent
                        ? "fill-[#D4AF37] text-[#D4AF37]"
                        : "fill-none text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="text-[12px] font-semibold text-[#1E293B]">
                {item.rating}
              </span>
            </div>

            {/* Feedback Text */}
            {item.feedback && (
              <p className="text-[13px] text-[#475569] leading-relaxed">
                “{item.feedback}”
              </p>
            )}

            {/* Customer Name */}
            {item.customer_name && (
              <p className="text-[11px] text-[#94A3B8]">
                - {item.customer_name}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
