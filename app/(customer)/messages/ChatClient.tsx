"use client";

import { useEffect, useRef, useState } from "react";
import { subscribeToChat } from "@/services/pusher";
import { ConversationItem, Message } from "@/lib/types";
import { useAppSelector } from "@/app/store-hooks";
import { fetchAllConversations } from "@/services/api";

interface ChatClientProps {
  chatId: string;
  initialMessages: Message[]; // Messages loaded by parent
  onNewRemoteMessage: (message: Message) => void; // Callback for Pusher-received messages
}

export default function ChatClient({
  chatId,
  initialMessages,
  onNewRemoteMessage,
}: ChatClientProps) {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<ConversationItem | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  const isInitialLoadRef = useRef(true); // For scroll behavior
  const onNewRemoteMessageRef = useRef(onNewRemoteMessage);

  // Update refs when props change
  useEffect(() => {
    onNewRemoteMessageRef.current = onNewRemoteMessage;
  }, [onNewRemoteMessage]);

  // Load conversations for header/ad info
  useEffect(() => {
    const load = async () => {
      const data = await fetchAllConversations();
      setConversations(data);
    };
    load();
  }, []);

  useEffect(() => {
    if (!chatId) {
      console.warn(" No chatId provided to ChatClient");
      return;
    }

    console.log(`Subscribing to private-conversation.${chatId}`);
    const cleanup = subscribeToChat(chatId, (msg: Message) => {
      // CRITICAL FIX: Force conversation_id because backend doesn't send it
      const messageWithChatId: Message = {
        ...msg,
        conversation_id: Number(chatId), // THIS IS THE MAGIC LINE
      };

      console.log("Pusher message received → forcing conversation_id:", chatId);
      onNewRemoteMessageRef.current(messageWithChatId);
    });

    return () => {
      console.log(
        `🔌 [ChatClient] Unsubscribing from private-conversation.${chatId}`
      );
      cleanup?.();
    };
  }, [chatId]);

  // Find the conversation for UI display
  useEffect(() => {
    const conv = conversations.find(
      (c: ConversationItem) => String(c.conversation_id) === chatId
    );
    setCurrentConversation(conv || null);
  }, [chatId, conversations]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: isInitialLoadRef.current ? "auto" : "smooth",
    });
    if (isInitialLoadRef.current && initialMessages.length > 0) {
      isInitialLoadRef.current = false;
    }
  }, [initialMessages]);

  const sortedMessages = [...initialMessages].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const adTitle = currentConversation?.service_ad.title;
  const adPrice = currentConversation?.service_ad.price;

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      {/* Ad Banner Display */}
      <div className="top-0 z-[10] sticky flex justify-between items-center bg-[var(--foundation-primary)] px-8 py-2 w-full">
        <h2 className="font-bold text-[var(--primary-color)]">{adTitle}</h2>
        <p className="font-semibold text-[var(--primary-color)]">{`₦${
          adPrice ? adPrice : ""
        }`}</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20">
        <div className="space-y-4">
          {sortedMessages.map((msg) => {
            const isMe =
              currentUserId !== undefined && msg.sender?.id === currentUserId;

            return (
              <div
                key={msg.id || `temp-${msg.created_at}`}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {!isMe && (
                    <p className="text-xs font-semibold opacity-80 mb-1">
                      {msg?.sender?.first_name} {msg?.sender?.last_name}
                    </p>
                  )}
                  <p className="btext-sm break-words whitespace-pre-wrap">
                    {msg.message}
                  </p>
                  <p
                    className={`text-[10px] mt-1 block ${
                      isMe ? "opacity-60" : "opacity-80"
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
