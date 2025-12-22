"use client";
import LoadingDots from "@/app/components/general/LoadingDots";
import { useNotification } from "@/app/contexts/NotificationProvider";
import { canUserReview } from "@/lib/api";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

interface Props {
  detailId: string;
}
export default function CreateReview({ detailId }: Props) {
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const { notify } = useNotification();
  const [reviewEligibility, setReviewEligibility] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);

  // can user review
  useEffect(() => {
    if (!token) return;

    const checkEligibility = async () => {
      try {
        const res = await canUserReview(detailId, token);
        setReviewEligibility(res.canReview);
        setBookingId(res.booking_id);
      } catch {
        setReviewEligibility(false);
      }
    };

    checkEligibility();
  }, [detailId, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!rating) {
      notify("Please select a rating", "error", "Validation");
      setLoading(false);
      return;
    }
    if (!text?.trim()) {
      notify("Please write a comment", "error", "Validation");
      setLoading(false);
      return;
    }
    if (!bookingId) {
      notify("Invalid booking reference", "error", "Validation");
      setLoading(false);
      return;
    }
    // Payload is clean and deterministic
    const payload = {
      booking_id: bookingId,
      rating, // number of filled stars
      feedback: text,
    };

    console.log("Review Payload:", payload);
    try {
      const res = await fetch(
        `$process.env.NEXT_PUBLIC_BASE_URL}/api/customer/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
    } catch (error) {
      console.error("Error submitting review:", error);
      notify(
        "Failed to submit review. Please try again later.",
        "error",
        "Error"
      );
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${!reviewEligibility ? "opacity-50 pointer-events-none" : ""}
 flex flex-col gap-2 bg-[var(--foundation-neutral-3)] shadow-lg mt-2 px-4 py-6 rounded-md`}
    >
      <h2 className="font-semibold text-[12px] text-[var(--text-body)]">
        Leave a Review
      </h2>
      <div className="flex flex-col gap-1">
        <h2 className="text--[var(--foundation-neutral-8)] text-[10px]">
          Your Rating
        </h2>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={!reviewEligibility}
              onClick={() => setRating(star)}
              className="cursor-pointer disabled:cursor-not-allowed"
            >
              {star <= rating ? (
                <FaStar size={14} color="#8B4513" />
              ) : (
                <FaRegStar size={14} color="#8B4513" />
              )}
            </button>
          ))}
        </div>
      </div>
      <form className="flex flex-col gap-1">
        <label
          htmlFor="comment"
          className="font-semibold text-[10px] text-black"
        >
          Your Comment
        </label>
        <textarea
          name="review"
          id="review"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          cols={30}
          className="bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full text-[12px] text-[var(--text-body)] resize-none"
          draggable={false}
          placeholder="Share your experience"
          onDragStart={(e) => e.preventDefault()}
        ></textarea>

        <div>
          <button
            onClick={handleSubmit}
            className="bg-[var(--primary-color)] mt-1 px-6 py-2 rounded-sm font-semibold text-[14px] text-white cursor-pointer"
          >
            {loading ? <LoadingDots /> : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
