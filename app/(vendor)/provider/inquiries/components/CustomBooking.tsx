"use client";
import { useNotification } from "@/app/contexts/NotificationProvider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { initiateCustomBooking } from "@/lib/api/bookings";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  conversationId: string;
}
export default function CustomBooking({
  open,
  onOpenChange,
  conversationId,
}: Props) {
  const [newPrice, setNewPrice] = useState("");
  const { notify } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const initiateBooking = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(newPrice);
      const response = await initiateCustomBooking(
        conversationId,
        Number(newPrice)
      );
      if (!response) {
        setLoading(false);
        notify("Please try again", "error", "Booking Failed");
        return;
      }
      notify(response.message, "success", "Booking Successful");
      setNewPrice('')
      setTimeout(() => {
        onOpenChange(false);
      }, 600);
    } catch (error) {
      error &&
        error instanceof Error &&
        notify(
          error.message || "An unknown error occurred",
          "error",
          "Booking Error"
        );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="bg-[var(--primary-color)] px-6 py-3 rounded-lg font-bold cursor-pointer text-white text-sm shadow-md transition-all hover:shadow-lg">
        Custom Booking
      </DialogTrigger>
      <DialogContent className="w-[400px] [&>button]:hidden">
        <DialogTitle>Custom Booking</DialogTitle>
        <div>
          <form>
            <label className="font-semibold  text-black" htmlFor="newPrice">
              New Price <span className="text-red-600">*</span>
            </label>
            <Input
              value={newPrice}
              type="number"
              onChange={(e) => setNewPrice(e.target.value)}
              className="mt-2 border border-[#BFBFBF] placeholder:text-[#BFBFBF]"
              placeholder="NGN 40,000,000"
            />
            <div className="flex justify-between mt-4 items-center">
              <DialogClose className="px-4 py-1.5 cursor-pointer bg-transparent text-[#334155] font-semibold">
                Cancel
              </DialogClose>
              <button
                onClick={initiateBooking}
                className="px-4 py-1.5 border cursor-pointer rounded-sm border-[#BFBFBF] bg-[var(--primary-color)] text-white font-semibold"
              >
                {loading ? "Please Wait..." : "Send Offer"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
