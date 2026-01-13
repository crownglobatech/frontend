"use client";
import { useNotification } from "@/app/contexts/NotificationProvider";
import { sendMessageCustomer } from "@/services/api";
import { SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { MdAttachFile } from "react-icons/md";
import ProgressBar from "./ProgressBar";
import dynamic from "next/dynamic";
import {
  acceptCustomBooking,
  confirmCompletion,
  initializePayment,
  rejectBooking,
} from "@/lib/api/bookings";
import LoadingDots from "@/app/components/general/LoadingDots";
import ReviewPopUpBox from "./ReviewPopUpBox";
import { ConversationItem } from "@/lib/types";
import { logger } from "@/lib/logger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateBookingTermsPDF } from "@/lib/pdfUtils";
import { FaDownload } from "react-icons/fa";

interface ChatFooterProps {
  chatId: string;
  onMessageSent: (message: any) => void;
  bookingstatus?: string;
  bookingId?: number;
  bookingCode?: string;
  currentBooking?: any | null;
  conversations: ConversationItem[];
  paymentSummary?: any | null;
}
export default function ChatFooter({
  chatId,
  currentBooking,
  conversations,
  paymentSummary,
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

  const [message, setMessage] = useState("");
  const [loadingAction, setLoadingAction] = useState<
    "accept" | "reject" | null
  >(null);
  const [currentConversation, setCurrentConversation] =
    useState<ConversationItem | null>(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const [isSending, setIsSending] = useState(false);
  const [openReviewPopup, setOpenReviewPopup] = useState(false);

  useEffect(() => {
    const conv = conversations.find(
      (c: ConversationItem) => String(c.conversation_id) === chatId
    );
    setCurrentConversation(conv || null);
  }, [chatId, conversations, currentBooking]);

  useEffect(() => {
    if (currentBooking?.status === "completed") {
      notify(
        "Please review the work and confirm if everything is done.",
        "success",
        "Service Marked as Completed"
      );
    }
  }, [currentBooking?.status === "completed"]);

  const handleSendMessage = async () => {
    if (!token) {
      notify(
        "You must be logged in to send messages.",
        "error",
        "Authentication Required"
      );
      return;
    }
    if (!message.trim()) return;

    try {
      setLoading(true);
      setMessage("");
      if (!chatId) {
        throw new Error("Failed to get conversation ID from server");
      }
      // Send message to server
      setIsSending(true);
      await sendMessageCustomer(String(chatId), message);
      setIsSending(false);
    } catch (error: any) {
      logger.error("Error in MiniChatBox:", error);
      notify(
        error.message || "Failed to send chat message. Please try again.",
        "error"
      );
      setMessage(message);
    } finally {
      setIsSending(false)
      setLoading(false);
    }
  };

  // cancel booking
  const handleRejectBooking = async () => {
    setLoadingAction('reject')
    try {
      const res = await rejectBooking(currentBooking.booking_code!);
      notify(
        res.message || "Booking cancelled successfully.",
        "success",
        "Booking Cancelled"
      );
      localStorage.removeItem(`booking_status_${chatId}`);
      localStorage.removeItem(`booking_id_${chatId}`);
    } catch (error: any) {
      notify(error.message, "error");
    } finally {
      setLoadingAction(null);
    }
  };
  const handleAcceptBooking = async () => {
    setLoadingAction('accept');
    try {
      const res = await acceptCustomBooking(currentBooking.booking_code!);
      notify(
        res.message || "Booking accepted successfully.",
        "success",
        "Booking Cancelled"
      );
      localStorage.removeItem(`booking_status_${chatId}`);
      localStorage.removeItem(`booking_id_${chatId}`);
    } catch (error: any) {
      notify(error.message, "error");
    } finally {
      setLoadingAction(null);
    }
  };

  const handlePayment = async () => {
    if (!currentBooking) return;
    setLoading(true);
    try {
      const response = await initializePayment(currentBooking.booking_code);
      const paymentUrl = response?.data?.payment_url;
      if (!paymentUrl) {
        throw new Error("Payment link not available");
      }
      //  signaling intent before redirect
      notify("Redirecting to payment gateway…", "info", "Payment");
      // Hard redirect
      window.location.href = paymentUrl;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Payment was unsuccessful";
      notify(message, "error", "Error");
      logger.log(message);
    } finally {
      setLoading(false);
    }
  };

  // Added onKeyPress to handle sending with Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const primaryColor = "blue-600";
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Pending", "In Progress", "Completed"];
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(steps.length).fill(false)
  );
  const [openTermsDialog, setOpenTermsDialog] = useState(false);

  // Sync progress bar with bookingStatus
  useEffect(() => {
    if (!currentBooking?.status) return;
    if (
      currentBooking?.status === "pending" ||
      currentBooking?.status === "confirmed" || currentBooking?.status === 'custom_pending'
    ) {
      setCurrentStep(0);
      setCompletedSteps([false, false, false]);
    }
    if (currentBooking?.status === "in_progress") {
      setCurrentStep(1);
      setCompletedSteps([true, false, false]);
    }
    if (currentBooking?.status === "closed") {
      setCurrentStep(2);
      setCompletedSteps([true, true, true]);
    }
  }, [currentBooking?.status]);

  // confirm completion
  const markAsClosed = async () => {
    setLoading(true);
    try {
      if (!currentBooking?.booking_code) {
        setLoading(false);
        return;
      }
      await confirmCompletion("closed", currentBooking?.booking_code);
      setOpenReviewPopup(true);
      notify(
        "You have confirmed completion, Nice doing business with you",
        "success",
        "Completion Confirmed"
      );
    } catch (error: any) {
      notify('An error occurred', "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col border-t">
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
            {!isSending ? (
              <SendIcon color="white" size={20} />
            ) : (
              <LoadingDots />
            )}
          </button>
        </div>
        <div className="flex flex-col justify-center items-center min-h-[50px]">
          <p className="font-normal mt-1 text-[14px] text-[var(--secondary-color)] text-center">
            Discuss service details before booking.
          </p>

          {currentBooking?.status &&
            currentBooking?.status === "custom_pending" && (
              <div className="w-full mt-3 px-8">
                <div className="flex flex-col items-start mb-4 w-full">
                  <h2 className="text-[18px] font-semibold text-[var(--heading-color)]">
                    Service Progress
                  </h2>
                  {/* progress */}
                  <div className="flex flex-col w-full mt-2 gap-3">
                    <div>
                      <ProgressBar
                        steps={steps}
                        completedSteps={completedSteps}
                        currentStep={currentStep}
                      />
                    </div>
                    <div className="bg-[#FBF7EB] border border-[#D4AF37] rounded-sm px-4 py-1.5 w-full flex items-center justify-between">
                      <p className="text-[#D4AF37] text-[10px]">
                        You have a custom booking request of{" "}
                        {currentBooking.custom_price}
                      </p>
                      <div className="flex gap-2 items-center">
                        <span
                          onClick={handleRejectBooking}
                          className="bg-[#E63946] text-[10px] font-thin text-white shadow-sm px-4 py-1.5 rounded cursor-pointer"
                        >
                          {loadingAction === 'reject' ? <LoadingDots /> : "Reject Booking"}
                        </span>
                        <span
                          onClick={handleAcceptBooking}
                          className="bg-[var(--success-color)] rounded cursor-pointer text-[10px] font-thin text-white border border-[var(--success-color )] shadow-sm px-4 py-1.5"
                        >
                          {loadingAction === 'accept' ? <LoadingDots /> : "Accept Booking"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          {currentBooking?.status && currentBooking?.status === "pending" && (
            <div className="w-full mt-3 px-8">
              <div className="flex flex-col items-start mb-4 w-full">
                <h2 className="text-[18px] font-semibold text-[var(--heading-color)]">
                  Service Progress
                </h2>
                {/* progress */}
                <div className="flex flex-col w-full mt-2 gap-3">
                  <div>
                    <ProgressBar
                      steps={steps}
                      completedSteps={completedSteps}
                      currentStep={currentStep}
                    />
                  </div>
                  <div className="bg-[#FBF7EB] border border-[#D4AF37] rounded-sm px-4 py-1.5 w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-[#D4AF37] text-[10px]">
                        Awaiting vendor to accept booking.
                      </p>
                      <span
                        onClick={() => setOpenTermsDialog(true)}
                        className="text-[10px] text-[#D4AF37] underline cursor-pointer font-semibold"
                      >
                        View Details
                      </span>
                    </div>
                    <span
                      onClick={handleRejectBooking}
                      className="bg-[#E63946] text-[10px] font-thin text-white shadow-sm px-4 py-1.5 rounded cursor-pointer"
                    >
                      {loading ? <LoadingDots /> : "Cancel Booking"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentBooking?.status && currentBooking?.status === "confirmed" && (
            <div className="w-full mt-3 px-8  flex flex-col gap-3">
              <h2 className="text-[var(--heading-color)] font-semibold text-[14px]">
                Payment Summary
              </h2>
              <div className="flex flex-col gap-2 items-start w-full">
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-[var(--heading-color)] text-[12px]">
                    Sub-total
                  </h3>
                  <p className="text-[var(--heading-color)] text-[12px]">
                    {paymentSummary?.service_price || currentBooking?.service_ad.price || '_'}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-[var(--heading-color)] text-[12px]">
                    Service Fee
                  </h3>
                  <p className="text-[var(--heading-color)] text-[12px]">
                    {paymentSummary?.protection_fee || currentBooking?.payment_summary?.protection_fee || "_"}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-[heading-color] font-semibold text-[13px]">
                    Total
                  </h3>
                  <p className="text-[var(--heading-color)] font-semibold text-[12px]">
                    {paymentSummary?.total_to_pay ? paymentSummary?.total_to_pay : currentBooking?.final_price || "_"}
                  </p>
                </div>
              </div>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="text-white w-full mb-2 py-1.5 rounded px-4 font-semibold cursor-pointer shadow-sm bg-[var(--success-color)] text-[14px]"
              >
                {loading ? <LoadingDots /> : "Proceed with payment"}
              </button>
            </div>
          )}

          {currentBooking?.status &&
            currentBooking?.status === "in_progress" && (
              <div className="w-full mt-3 px-8">
                <div className="flex flex-col items-start mb-4 w-full">
                  <h2 className="text-[18px] font-semibold text-[var(--heading-color)]">
                    Service Progress
                  </h2>
                  {/* progress */}
                  <div className="flex flex-col w-full mt-2 gap-3">
                    <div>
                      <ProgressBar
                        steps={steps}
                        completedSteps={completedSteps}
                        currentStep={currentStep}
                      />
                    </div>
                    <div className="bg-[#FBF7EB] border border-[#D4AF37] rounded-sm px-4 py-1.5 w-full flex flex-col items-center justify-between">
                      <p className="text-[#D4AF37] text-[10px]">
                        This is currently in progress, We will let you know once
                        the vendor confirms service completion
                      </p>
                      <TooltipProvider delayDuration={20}>
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
                    </div>
                  </div>
                </div>
              </div>
            )}

          {currentBooking?.status && currentBooking?.status === "completed" && (
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
                    Click on 'Confirm Completion' when services to close this
                    booking
                  </p>
                  <div className="flex gap-2">
                    <span
                      onClick={markAsClosed}
                      className="bg-[var(--success-color)] text-[10px] font-semibold text-white shadow-sm px-4 py-1.5 rounded cursor-pointer"
                    >
                      {loading ? <LoadingDots /> : "Confirm Completion"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* popup for review */}
      {openReviewPopup && (
        <ReviewPopUpBox
          open={openReviewPopup}
          onOpenChange={setOpenReviewPopup}
          bookingCode={currentBooking?.booking_code}
        />
      )}

      {/* Terms Dialog */}
      <Dialog open={openTermsDialog} onOpenChange={setOpenTermsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[var(--primary-color)] font-semibold">Booking Reference Details</DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <span className="block text-black">
                Here are the reference details you provided for this booking.
              </span>

              <div className="bg-gray-50 border border-gray-100 rounded-md p-3">
                <p className="text-xs font-semibold text-[var(--primary-color)] mb-1 uppercase tracking-wide">
                  Reference Details
                </p>
                <p className="text-sm text-gray-600 italic">
                  "{currentBooking?.reference_terms || "No reference provided"}"
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
