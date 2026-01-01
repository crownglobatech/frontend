"use client";
import LoadingDots from "@/app/components/general/LoadingDots";
import { useNotification } from "@/app/contexts/NotificationProvider";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function CreateFeedback() {
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const { notify } = useNotification();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div
      className={`
 flex flex-col gap-2 bg-[var(--foundation-neutral-3)] shadow-lg mt-2 px-4 py-6 rounded-sm`}
    >
      <h2 className="font-semibold text-[12px] text-[var(--text-body)]">
        Help us improve the crown-haven
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
              onClick={() => setRating(star)}
              className="cursor-pointer disabled:cursor-not-allowed"
            >
              {star <= rating ? (
                <FaStar size={14} color="#595959" />
              ) : (
                <FaRegStar size={14} color="#595959" />
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
          name="feedback"
          id="feedback"
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
            // onClick={handleSubmit}
            className="bg-[var(--primary-color)] mt-1 px-6 py-2 rounded-sm font-semibold text-[14px] text-white cursor-pointer"
          >
            {loading ? <LoadingDots /> : "Submit Feedback"}
          </button>
        </div>
      </form>
    </div>
  );
}
