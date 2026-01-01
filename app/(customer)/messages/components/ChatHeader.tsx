// components/ChatHeader.tsx
"use client";
import { ConversationItem } from "@/lib/types";
import { fetchAllConversations } from "@/services/api";
import { useEffect, useState } from "react";

interface ChatHeaderProps {
  conversationId: string;
  onBookNow?: (res: any) => void;
}

export default function ChatHeader({
  conversationId,
  onBookNow,
}: ChatHeaderProps) {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
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
  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(conversationId);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 border-b shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={other_user.photo_url || "/default-avatar.png"}
            alt={other_user.full_name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        <div>
          <h3 className="font-bold text-lg text-gray-900">
            {other_user.full_name}
          </h3>
          {/* {service_ad && (
            <p className="text-xs text-gray-500 mt-1">
              {service_ad.title}
            </p>
          )} */}
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
    </div>
  );
}
