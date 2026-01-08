"use client";

import { ConversationItem } from "@/lib/types";
import { useEffect, useState } from "react";
import CustomBooking from "./CustomBooking";
import Image from "next/image";

interface ChatHeaderProps {
  conversationId: string;
  conversations: ConversationItem[]; // Receive from parent instead of fetching
}

export default function ChatHeader({
  conversationId,
  conversations,
}: ChatHeaderProps) {
  const [currentConversation, setCurrentConversation] =
    useState<ConversationItem | null>(null);
  const [openCustomModal, setOpenCustomModal] = useState(false);

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
        <CustomBooking
          onOpenChange={setOpenCustomModal}
          open={openCustomModal}
          conversationId={conversationId}
        />
      </div>
    </div>
  );
}
