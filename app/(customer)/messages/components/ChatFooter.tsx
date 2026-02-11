"use client";
import { SendIcon } from "lucide-react";
import { MdAttachFile } from "react-icons/md";
import ProgressBar from "./ProgressBar";
import dynamic from "next/dynamic";
import LoadingDots from "@/app/components/general/LoadingDots";
import ReviewPopUpBox from "./ReviewPopUpBox";
import { ConversationItem, User } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateBookingTermsPDF } from "@/lib/pdfUtils";
import { FaDownload } from "react-icons/fa";
import { useChatFooter } from "../hooks/useChatFooter";

interface ChatFooterProps {
  chatId: string;
  onMessageSent: (message: any) => void;
  bookingstatus?: string;
  bookingId?: number;
  bookingCode?: string;
  currentBooking?: any | null;
  conversations: ConversationItem[];
  paymentSummary?: any | null;
  senderInfo?: User
}

export default function ChatFooter({
  chatId,
  currentBooking,
  conversations,
  paymentSummary,
  onMessageSent,
  senderInfo,
}: ChatFooterProps) {
  const Tooltip = dynamic(
    () => import("@/components/ui/tooltip").then((m) => m.Tooltip),
    { ssr: false }
  );

  const TooltipTrigger = dynamic(
    () => import("@/components/ui/tooltip").then((m) => m.TooltipTrigger),
    { ssr: false }
  );

  const TooltipContent = dynamic(
    () => import("@/components/ui/tooltip").then((m) => m.TooltipContent),
    { ssr: false }
  );
  const TooltipProvider = dynamic(
    () => import("@/components/ui/tooltip").then((m) => m.TooltipProvider),
    { ssr: false }
  );

  const {
    message,
    setMessage,
    loading,
    loadingAction,
    isSending,
    openReviewPopup,
    setOpenReviewPopup,
    selectedFiles,
    previewUrls,
    fileInputRef,
    currentStep,
    steps,
    completedSteps,
    openTermsDialog,
    setOpenTermsDialog,
    handleSendMessage,
    handleRejectBooking,
    handleAcceptBooking,
    handlePayment,
    handleKeyPress,
    markAsClosed,
    handleFileSelect,
    removeFile,
  } = useChatFooter({
    chatId,
    currentBooking,
    conversations,
    paymentSummary,
    onMessageSent,
    senderInfo,
  });

  const primaryColor = "blue-600";

  return (
    <>
      <div className="flex flex-col border-t">
        {selectedFiles.length > 0 && (
          <div className="px-4 pt-3 flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="relative border rounded-md p-2 bg-gray-50 w-[120px]"
              >
                {previewUrls[index] ? (
                  <img
                    src={previewUrls[index]}
                    className="h-24 w-full object-cover rounded-md"
                  />
                ) : (
                  <div className="text-xs flex flex-col items-center justify-center h-24">
                    <MdAttachFile size={20} />
                    <span className="truncate w-full text-center">
                      {file.name}
                    </span>
                  </div>
                )}

                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 items-center bg-white w-full p-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileSelect}
          />

          <button className="ml-2 p-2 cursor-pointer">
            {/* work on the attach file logic */}
            <MdAttachFile color="black" size={25} onClick={() => fileInputRef.current?.click()} />
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
            {isSending ? (
              <LoadingDots />
            ) : (
              <SendIcon color="white" size={20} />
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
                    {paymentSummary?.total_to_pay ||
                      paymentSummary?.total_paid_or_due ||
                      currentBooking?.final_price ||
                      "_"}
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
