import { useNotification } from "@/app/contexts/NotificationProvider";
import { sendMessageCustomer } from "@/services/api";
import {
  acceptCustomBooking,
  confirmCompletion,
  initializePayment,
  rejectBooking,
} from "@/lib/api/bookings";
import { logger } from "@/lib/logger";
import { ConversationItem, Message, User } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

interface UseChatFooterProps {
  chatId: string;
  currentBooking: any | null;
  conversations: ConversationItem[];
  paymentSummary?: any | null;
  onMessageSent: (message: Message) => void;
  senderInfo?: User
}

export const useChatFooter = ({
  chatId,
  currentBooking,
  conversations,
  onMessageSent,
  senderInfo,
}: UseChatFooterProps) => {
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
  const [selectedFiles, setSelectedFiles] = useState<File[] | []>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Pending", "In Progress", "Completed"];
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(steps.length).fill(false)
  );
  const [openTermsDialog, setOpenTermsDialog] = useState(false);

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
  }, [currentBooking?.status]);

  // Sync progress bar with bookingStatus
  useEffect(() => {
    if (!currentBooking?.status) return;
    if (
      currentBooking?.status === "pending" ||
      currentBooking?.status === "confirmed" ||
      currentBooking?.status === "custom_pending"
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

  const handleSendMessage = async () => {
    if (!token) {
      notify(
        "You must be logged in to send messages.",
        "error",
        "Authentication Required"
      );
      return;
    }
    if (!message.trim() && selectedFiles.length === 0) return;

    let tempId: string | undefined;

    // Create optimistic message
    if (senderInfo) {
      tempId = crypto.randomUUID();
      const attachments = selectedFiles.map((file, index) => ({
        id: index, // temp id
        file_path: previewUrls[index], // Use existing preview URL
        file_type: file.type,
      }));

      const optimisticMessage: Message = {
        id: tempId,
        client_uuid: tempId,
        conversation_id: Number(chatId),
        message: message,
        sender_id: senderInfo.id,
        sender: {
          id: senderInfo.id,
          first_name: senderInfo.first_name,
          last_name: senderInfo.last_name,
          role: senderInfo.role,
          email: senderInfo.email,
          phone: senderInfo.phone,
          address: senderInfo.address
        },
        created_at: null,
        is_read: 0,
        attachments: attachments,
        status: "pending",
      };

      onMessageSent(optimisticMessage);
    } else {
       console.warn("Sender info missing, skipping optimistic update");
    }

    // Clear input immediately for optimistic feel
    setMessage("");
    setSelectedFiles([]);
    setPreviewUrls([]);

    try {
      const currentMessage = message; 
      // ... check chatId ... 

      if (!chatId) {
        throw new Error("Failed to get conversation ID from server");
      }
      
      // Perform background send
      // setIsSending(true); // REMOVED: Don't show spinner
      
      // include attached file property in the body
      const response = await sendMessageCustomer(
        String(chatId),
        currentMessage,
        selectedFiles
      );

      // Confirm optimistic message
      if (senderInfo) {
        onMessageSent({ ...response, client_uuid: tempId, status: "sent" });
      }
    } catch (error: any) {
      logger.error("Error in MiniChatBox:", error);
      notify(
        error.message || "Failed to send chat message. Please try again.",
        "error"
      );
      // Revert message if failed (optional, but good UX)
      // setMessage(currentMessage);
      if (senderInfo && tempId) {
         // Optionally emit error status
         console.log("Failed to send message", tempId);
      }
    } finally {
      setIsSending(false);
      setLoading(false);
    }
  };

  // cancel booking
  const handleRejectBooking = async () => {
    setLoadingAction("reject");
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
    setLoadingAction("accept");
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
      notify("An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setSelectedFiles((prev) => [...prev, ...files]);

    // previews for images only
    const newPreviews: string[] = [];

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        newPreviews.push(URL.createObjectURL(file));
      } else {
        newPreviews.push("");
      }
    });

    setPreviewUrls((prev) => [...prev, ...newPreviews]);

    // reset input so same file can be reselected
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    message,
    setMessage,
    loading,
    loadingAction,
    isSending,
    currentConversation,
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
  };
};
