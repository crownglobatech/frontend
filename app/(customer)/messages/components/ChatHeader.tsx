// components/ChatHeader.tsx
"use client";
import { ConversationItem } from "@/lib/types";
import { fetchAllConversations } from "@/services/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/app/contexts/NotificationProvider";
import LoadingSpinner from "@/app/components/general/LoadingSpinner";
import { logger } from "@/lib/logger";

interface ChatHeaderProps {
  conversationId: string;
  onBookNow?: (res: any) => Promise<boolean | void> | void;
}

export default function ChatHeader({
  conversationId,
  onBookNow,
}: ChatHeaderProps) {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [openReferenceForm, setOpenReferenceForm] = useState(false)
  const [referenceText, setReferenceText] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()
  const [currentConversation, setCurrentConversation] =
    useState<ConversationItem | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllConversations();
      setConversations(data);
    };
    load();
  }, []);

  useEffect(() => {
    // Find the conversation by ID
    const conv = conversations.find(
      (c: ConversationItem) => String(c.conversation_id) === conversationId
    );
    setCurrentConversation(conv || null);
  }, [conversationId, conversations]);

  if (!currentConversation) {
    return (
      <div className="flex justify-between items-center bg-white p-4 border-b">
        <div className="text-gray-500">Loading chat...</div>
      </div>
    );
  }

  const { other_user } = currentConversation;

  // handle booking
  // handle booking
  const handleBookNow = () => {
    setOpenReferenceForm(true);
  };


  const handleSubmitReference = () => {
    if (!referenceText) {
      notify('Please enter a reference text', 'error');
      return;
    };

    setOpenReferenceForm(false);
    setOpenConfirmDialog(true);
  };

  const handleConfirmBooking = async () => {
    if (!referenceText) return;
    setLoading(true);
    try {
      if (onBookNow) {
        const success = await onBookNow(referenceText);
        if (success) {
          setOpenConfirmDialog(false);
        }
      }
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 border-b shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image
            src={other_user.photo_url || "/user copy.png"}
            alt={other_user.full_name}
            width={10}
            height={10}
            objectFit="contain"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        <div>
          <h3 className="font-bold text-lg text-gray-900">
            {other_user.full_name}
          </h3>
        </div>
      </div>

      <div>
        <button
          onClick={handleBookNow}
          className="bg-[var(--primary-color)] px-6 py-3 rounded-lg font-bold cursor-pointer text-white text-sm shadow-md transition-all hover:shadow-lg"
        >
          Book Now
        </button>
      </div>

      {/* Reference Form Dialog */}
      <Dialog open={openReferenceForm} onOpenChange={setOpenReferenceForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[var(--primary-color)] font-semibold">Details</DialogTitle>
            <DialogDescription>
              Please describe what you need done for this booking.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <textarea
              className="flex min-h-[100px] w-full rounded-md resize-none border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Describe your requirements..."
              value={referenceText}
              onChange={(e) => setReferenceText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" className="text-[var(--primary-color)] font-semibold hover:text-[var(--primary-color)]/70 cursor-pointer" onClick={() => setOpenReferenceForm(false)}>Cancel</Button>
            <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/70 cursor-pointer" onClick={handleSubmitReference}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[var(--primary-color)] font-semibold">Confirm Booking</DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <span className="block text-black">
                Are you sure you want to proceed with this booking?
              </span>

              <span className="block bg-gray-50 border border-gray-100 rounded-md p-3">
                <span className="block text-xs font-semibold text-[var(--primary-color)] mb-1 uppercase tracking-wide">
                  Your Reference Details
                </span>
                <span className="text-sm block bg-local text-gray-600 italic">
                  "{referenceText}"
                </span>
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="text-[var(--heading-color)] font-semibold hover:text-[var(--heading-color)]/70 cursor-pointer" onClick={() => setOpenConfirmDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/70 cursor-pointer" onClick={handleConfirmBooking}>{loading ? <LoadingSpinner size="sm" /> : 'Confirm'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
