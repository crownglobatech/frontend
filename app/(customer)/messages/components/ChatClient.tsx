"use client";

import { useEffect, useRef, useState } from "react";
import { subscribeToChat } from "@/services/pusher";
import { ConversationItem, Message } from "@/lib/types";
import { useAppSelector } from "@/app/store-hooks";
import { fetchAllConversations } from "@/services/api";
import { logger } from "@/lib/logger";
import MessageAttachment from "./MessageAttachment";

interface ChatClientProps {
  chatId: string;
  initialMessages: Message[]; // Messages loaded by parent
  onNewRemoteMessage: (message: Message) => void; // Callback for Pusher-received messages
  loadingMessages: boolean
}

export default function ChatClient({
  chatId,
  initialMessages,
  loadingMessages,
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
      logger.warn(" No chatId provided to ChatClient");
      return;
    }
    const cleanup = subscribeToChat(chatId, (msg: Message) => {
      const messageWithChatId: Message = {
        ...msg,
        conversation_id: Number(chatId), // THIS IS THE MAGIC LINE
      };
      // console.log("Pusher message received → forcing conversation_id:", chatId);
      onNewRemoteMessageRef.current(messageWithChatId);
    });

    return () => {
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

  const sortedMessages = [...initialMessages].sort((a, b) => {
    if (!a.created_at && !b.created_at) return 0;
    if (!a.created_at) return 1;
    if (!b.created_at) return -1;
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  console.log(sortedMessages);

  const adTitle = currentConversation?.service_ad.title;
  const adPrice = currentConversation?.service_ad.price;

  if (loadingMessages) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p className="text-lg">Loading messages...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      {/* Ad Banner Display */}
      <div className="top-0 z-[10] sticky flex justify-between items-center bg-[var(--foundation-primary)] px-8 py-2 w-full">
        <h2 className="font-bold text-[var(--primary-color)]">{adTitle}</h2>
        <p className="font-semibold text-[var(--primary-color)]">{`₦${adPrice ? adPrice : ""
          }`}</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20">
        <div className="space-y-4">
          {sortedMessages.map((msg) => {
            const isMe =
              currentUserId !== undefined && msg.sender?.id === currentUserId;
            const isSending = msg.status === "sending" || msg.status === "pending";

            return (
              <div
                key={msg.client_uuid || msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${isMe
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                >
                  {!isMe && (
                    <p className="text-xs font-semibold opacity-80 mb-1">
                      {msg?.sender?.first_name} {msg?.sender?.last_name}
                    </p>
                  )}
                  {msg.attachments?.map((file, i) => (
                    <div key={file.id || i} className="relative">
                      <div className={isSending ? "opacity-50 blur-sm" : ""}>
                        <MessageAttachment attachment={file} />
                      </div>
                      {isSending && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        </div>
                      )}
                    </div>
                  ))}

                  <p
                    className={`text-sm break-words whitespace-pre-wrap ${msg.attachments ? "mt-2" : ""
                      }`}
                  >
                    {msg.message}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <p
                      className={`text-[10px] block ${isMe ? "opacity-60" : "opacity-80"
                        }`}
                    >
                      {isSending || !msg.created_at ? "Sending..." : new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {isMe && (
                      <span className="opacity-70">
                        {isSending ? (
                          // Clock icon for sending
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        ) : (
                          // Double check/sent icon (simplified)
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
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
