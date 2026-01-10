import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Star } from "lucide-react";
import { submitReview } from "@/lib/api";
import { useNotification } from "@/app/contexts/NotificationProvider";
import LoadingDots from "@/app/components/general/LoadingDots";

interface ReviewPopUpBoxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingCode?: string;
}

export default function ReviewPopUpBox({
  open,
  onOpenChange,
  bookingCode,
}: ReviewPopUpBoxProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      notify("Please select a rating", "error");
      return;
    }
    if (!bookingCode) {
      // Ideally this shouldn't happen if parent passes right props
      notify("Missing booking information", "error");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      await submitReview(token, {
        booking_code: bookingCode,
        rating,
        feedback,
      });

      notify("Review submitted successfully!", "success");
      onOpenChange(false);
    } catch (error: any) {
      notify(error.message || "Failed to submit review", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6 bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[var(--heading-color)] text-center">
            Rate your experience
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2">
          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  size={32}
                  className={`${star <= (hoverRating || rating)
                    ? "fill-[#FFD700] text-[#FFD700]"
                    : "fill-none text-gray-300"
                    } transition-colors duration-200`}
                />
              </button>
            ))}
          </div>

          <div className="text-center text-sm font-medium text-gray-500 min-h-[20px]">
            {hoverRating === 1 && "Terrible"}
            {hoverRating === 2 && "Bad"}
            {hoverRating === 3 && "Okay"}
            {hoverRating === 4 && "Good"}
            {hoverRating === 5 && "Excellent"}
          </div>

          {/* Feedback Textarea */}
          <div className="flex flex-col gap-2">
            <label htmlFor="feedback" className="text-sm font-semibold text-[var(--heading-color)]">
              Share your feedback (optional)
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you liked or what could be improved..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 min-h-[100px] text-sm resize-none"
            />
          </div>

          {/* Buttons */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--primary-color)] text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? <LoadingDots /> : "Submit Review"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
