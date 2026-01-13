"use client";
import { sendMessageCustomer } from "@/services/api";
import { SendIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { MdAttachFile } from "react-icons/md";
import { useNotification } from "@/app/contexts/NotificationProvider";
import ProgressBar from "@/app/(customer)/messages/components/ProgressBar";
import dynamic from "next/dynamic";
import {
  markStatusAsCompleted,
  vendorAcceptBooking,
  vendorRejectBooking,
} from "@/lib/api/bookings";
import LoadingDots from "@/app/components/general/LoadingDots";
import { logger } from "@/lib/logger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { generateBookingTermsPDF } from "@/lib/pdfUtils";
import { FaDownload } from "react-icons/fa";

interface ChatFooterProps {
  chatId: string;
  onMessageSent: (message: any) => void;
  currentBooking?: null | any;
  onRejectBooking?: () => void;
}

export default function ChatFooter({
  chatId,
  currentBooking,
}: ChatFooterProps) {
  const Tooltip = dynamic(
    () => import("@/components/ui/tooltip.client").then(m => m.Tooltip),
    { ssr: false }
  );

  const TooltipTrigger = dynamic(
    () => import("@/components/ui/tooltip.client").then(m => m.TooltipTrigger),
    { ssr: false }
  );

  const TooltipContent = dynamic(
    () => import("@/components/ui/tooltip.client").then(m => m.TooltipContent),
    { ssr: false }
  );
  const TooltipProvider = dynamic(
    () => import("@/components/ui/tooltip.client").then(m => m.TooltipProvider),
    { ssr: false }
  );

  const [loadingAction, setLoadingAction] = useState<
    "accept" | "reject" | "completed" | null
  >(null);
  const [message, setMessage] = useState("");
  const primaryColor = "blue-600";
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const [isSending, setIsSending] = useState(false);
  const steps = ["Pending", "In Progress", "Completed"];
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(steps.length).fill(false)
  );
  const [openTermsDialog, setOpenTermsDialog] = useState(false);

  // Sync progress bar with bookingStatus
  useEffect(() => {
    if (!currentBooking?.status) return;

    if (
      currentBooking.status === "pending" ||
      currentBooking.status === "confirmed"
    ) {
      setCurrentStep(0);
      setCompletedSteps([false, false, false]);
    }

    if (currentBooking.status === "in_progress") {
      setCurrentStep(1);
      setCompletedSteps([true, false, false]);
    }

    if (currentBooking.status === "completed") {
      setCurrentStep(2);
      setCompletedSteps([true, true, true]);
    }
  }, [currentBooking?.status]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const trimmedMessage = message.trim();
    try {
      setLoading(true);
      setMessage("");
      setIsSending(true);
      await sendMessageCustomer(String(chatId), trimmedMessage);
      setIsSending(false);
    } catch (error: any) {
      logger.error("Error sending message:", error);
      notify(error.message || "Failed to send message", "error", "Send Failed");
      setMessage(trimmedMessage);
    } finally {
      setIsSending(false)
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRejectBooking = async () => {
    try {
      setLoadingAction("reject");
      if (!currentBooking) return;
      await vendorRejectBooking(currentBooking.id);
      // onRejectBooking?.();
      notify("Booking cancelled successfully.", "success", "Booking Cancelled");
    } catch (error) {
      error &&
        error instanceof Error &&
        notify(
          error.message || "An unknown error occurred",
          "error",
          "Booking Error"
        );
    } finally {
      setLoadingAction(null);
      setOpenTermsDialog(false);
    }
  }

  const handleAcceptBooking = async () => {
    try {
      setLoadingAction("accept");
      if (!currentBooking) return;
      await vendorAcceptBooking(currentBooking.booking_code);
      notify("Booking accepted successfully.,", "success", "Booking Accepted");
    } catch (error) {
      error &&
        error instanceof Error &&
        notify(
          error.message || "An unknown error occurred",
          "error",
          "Booking Error"
        );
    } finally {
      setLoadingAction(null);
      setOpenTermsDialog(false);
    }
  };

  const markAsCompleted = async () => {
    try {
      setLoadingAction("completed");
      if (!currentBooking.booking_code) return;
      await markStatusAsCompleted("completed", currentBooking.booking_code);
      notify(
        "Service as been successfully marked as completed",
        "success",
        "Service Completed"
      );
    } catch (error) {
      error &&
        error instanceof Error &&
        notify(
          error.message || "An unknown error occurred",
          "error",
          "Booking Error"
        );
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="flex flex-col border-t">
      {/* Message Input */}
      <div className="flex gap-2 items-center bg-white w-full p-4">
        <button className="ml-2 p-2 cursor-pointer">
          <MdAttachFile color="black" size={25} />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          disabled={loading}
          className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-sm border rounded-md"
        />
        <button
          onClick={handleSendMessage}
          disabled={loading || !message.trim()}
          className={`bg-${primaryColor} m-1 p-2 rounded-full cursor-pointer disabled:opacity-50 transition-colors`}
        >
          {!isSending ? <SendIcon color="white" size={20} /> : <LoadingDots />}
        </button>
      </div>

      {/* Booking Progress Card */}
      {currentBooking && currentBooking.status === "custom_pending" && (
        <div className="w-full mt-3 px-8">
          <div className="flex flex-col items-start mb-4 w-full">
            <h2 className="text-[18px] font-semibold text-[var(--heading-color)]">
              Service Progress
            </h2>

            <div className="flex flex-col w-full mt-2 gap-3">
              <ProgressBar
                steps={steps}
                completedSteps={completedSteps}
                currentStep={currentStep}
              />
              <div className="bg-[#FBF7EB] border border-[#D4AF37] rounded-sm px-4 py-1.5 w-full flex items-center justify-between">
                <p className="text-[#D4AF37] text-[10px]">
                  Awaiting customer to accept your offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentBooking && currentBooking.status === "pending" && (
        <div className="w-full mt-3 px-8">
          <div className="flex flex-col items-start mb-4 w-full">
            <h2 className="text-[18px] font-semibold text-[var(--heading-color)]">
              Service Progress
            </h2>

            <div className="flex flex-col w-full mt-2 gap-3">
              <ProgressBar
                steps={steps}
                completedSteps={completedSteps}
                currentStep={currentStep}
              />

              <div className="bg-[#FBF7EB] border border-[#D4AF37] rounded-sm px-4 py-1.5 w-full flex items-center justify-between">
                <p className="text-[#D4AF37] text-[10px]">
                  You have a booking request from{" "}
                  {currentBooking.customer.full_name}
                </p>
                <div className="flex gap-2 items-center">
                  <span
                    onClick={() => setOpenTermsDialog(true)}
                    className="bg-[#D4AF37] text-[10px] font-semibold text-white shadow-sm px-4 py-1.5 rounded cursor-pointer"
                  >
                    View Request Details
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentBooking && currentBooking.status === "confirmed" && (
        <div className="w-full mt-3 px-8">
          <div className="flex flex-col gap-2 items-start mb-4 w-full">
            <h2 className="text-[16px] font-semibold text-[var(--heading-color)]">
              Service Progress
            </h2>

            <div className="flex flex-col w-full  mt-2 gap-3">
              <ProgressBar
                steps={steps}
                completedSteps={completedSteps}
                currentStep={currentStep}
              />
            </div>
            <div className="bg-[#FBF7EB] border border-[#D4AF37] rounded-sm px-4 py-1.5 w-full flex items-center justify-between">
              <p className="text-[#D4AF37] text-[10px]">
                Booking accepted. Awaiting customer payment.
              </p>
            </div>
          </div>
        </div>
      )}
      {currentBooking && currentBooking.status === "in_progress" && (
        <div className="w-full mt-3 px-8">
          <div className="flex flex-col gap-2 items-start mb-4 w-full">
            <h2 className="text-[16px] font-semibold text-[var(--heading-color)]">
              Service Progress
            </h2>

            <div className="flex flex-col w-full  mt-2 gap-3">
              <ProgressBar
                steps={steps}
                completedSteps={completedSteps}
                currentStep={currentStep}
              />
            </div>
            <div className="bg-[#FBF7EB] border border-[#D4AF37] rounded-sm px-4 py-1.5 w-full flex items-center justify-between">
              <p className="text-[#D4AF37] text-[10px]">
                Click on 'Completed' when services are finished
              </p>
              <div className="flex gap-2 items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => generateBookingTermsPDF(currentBooking)}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all group animate-bounce"
                      >
                        <FaDownload className="text-[var(--primary-color)] text-xs" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download Booking Terms as PDF</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="flex gap-2">
                  <span
                    onClick={markAsCompleted}
                    className="bg-[var(--success-color)] text-[10px] font-semibold text-white shadow-sm px-4 py-1.5 rounded cursor-pointer"
                  >
                    {loadingAction === "completed" ? <LoadingDots /> : "Completed"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentBooking && currentBooking.status === "completed" && (
        <div className="w-full mt-3 px-8">
          <div className="flex flex-col gap-2 items-start mb-4 w-full">
            <h2 className="text-[16px] font-semibold text-[var(--heading-color)]">
              Service Progress
            </h2>

            <div className="flex flex-col w-full  mt-2 gap-3">
              <ProgressBar
                steps={steps}
                completedSteps={completedSteps}
                currentStep={currentStep}
              />
            </div>
          </div>
        </div>
      )}

      {/* Terms Dialog */}
      <Dialog open={openTermsDialog} onOpenChange={setOpenTermsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[var(--heading-color)] font-semibold">Booking Reference Details</DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <span className="block text-black">
                Below are the reference details provided by the customer for this booking.
              </span>
              <div className="bg-gray-50 border border-gray-100 rounded-md p-3">
                <p className="text-sm text-gray-600 italic">
                  "{currentBooking?.reference_terms || "No reference provided"}"
                </p>
              </div>
              <span className="block">Note: CrownHaven will not be responsible for any transactions done outside this platform</span>

            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-2 justify-end mt-4">
            <span
              onClick={() => {
                handleRejectBooking();
              }}
              className="bg-transparent border border-[#E63946] text-[12px] font-medium text-[#E63946] shadow-sm px-6 py-2 rounded-md cursor-pointer hover:bg-red-50"
            >
              {loadingAction === "reject" ? <LoadingDots /> : "Reject Request"}
            </span>
            <span
              onClick={() => {
                handleAcceptBooking();
              }}
              className="bg-[var(--success-color)] rounded-md cursor-pointer text-[12px] font-medium text-white border border-[var(--success-color)] shadow-sm px-6 py-2 hover:opacity-90"
            >
              {loadingAction === "accept" ? <LoadingDots /> : "Accept Request"}
            </span>
          </DialogFooter>
        </DialogContent>
      </Dialog >
    </div >
  )
}
