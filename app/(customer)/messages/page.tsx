"use client";
import {
  fetchAllConversations,
  fetchConversationMessages,
} from "@/services/api";
import LoadingSpinner from "@/app/components/general/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import ChatFooter from "./components/ChatFooter";
import ChatHeader from "./components/ChatHeader";
import ChatPane from "./components/ChatPane";
import ChatClient from "./components/ChatClient";
import { useEffect, useState, useCallback, useRef } from "react";
import { ConversationItem, Message } from "@/lib/types";
import { bookProvider, getMyBookings } from "@/lib/api/bookings";
import { useNotification } from "@/app/contexts/NotificationProvider";
import { initPusher } from "@/services/pusher";
import { logger } from "@/lib/logger";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store-hooks";

function MessagesContent() {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedMessages, setSelectedMessages] = useState<Message[]>([]);
  const [loadingConversations, setLoadingConversations] =
    useState<boolean>(true);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [bookingstatus, setBookingstatus] = useState<string>("");
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<
    number | undefined
  >(undefined);

  // Get current user from Redux
  const currentUser = useAppSelector((state) => state.auth.user);
  const currentUserId = currentUser?.id;
  const currentUserName = currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : "";

  const selectedChatRef = useRef<string | null>(null);
  const [allBookings, setAllBookings] = useState<any[]>([]);
  const [currentBooking, setCurrentBooking] = useState<null | any>(null);
  const [paymentSummary, setPaymentSummary] = useState<null | any>(null);
  const searchParams = useSearchParams();
  const urlConversationId = searchParams.get("conversationId");
  const router = useRouter()

  useEffect(() => {
    selectedChatRef.current = selectedChatId;
  }, [selectedChatId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
      }
    }
  }, [router]);

  // Load conversations
  useEffect(() => {
    const load = async () => {
      setLoadingConversations(true);
      try {
        const data = await fetchAllConversations();
        // console.log(" Loaded conversations:", data.length);
        setConversations(data);
      } catch (err) {
        logger.error(" Failed to load conversations:", err);
      } finally {
        setLoadingConversations(false);
      }
    };
    load();
  }, []);

  // useeffect for notification pusher channel
  useEffect(() => {
    if (!currentUserId) return;
    const pusher = initPusher();
    const channelName = `private-user.${currentUserId}`;
    const channel = pusher?.subscribe(channelName);
    channel?.bind("new-message-notification", (data: any) => {
      const { conversation_id, last_message, sender_name } = data.payload;
      const chatId = String(conversation_id);
      const isOwnMessage = currentUserName === sender_name;

      // HARD STOP: if user is already inside this chat
      if (chatId === selectedChatRef.current) {
        // console.log("Realtime ignored – chat already open");
        return;
      }

      updateConversationSnippet(
        chatId,
        {
          message: last_message,
          created_at: new Date().toISOString(),
        } as Message,
        isOwnMessage
      );
    });

    return () => {
      channel?.unbind_all();
      pusher?.unsubscribe(channelName);
    };
  }, [currentUserId]);



  // Fetch messages for selected chat
  const fetchAndSetMessages = useCallback(async (chatId: string) => {
    setLoadingMessages(true);
    try {
      const messages = await fetchConversationMessages(chatId);
      console.log(" Fetched messages for chat", chatId, ":", messages.length);
      console.log(messages);

      setSelectedMessages(messages);
    } catch (err) {
      logger.error(" Failed to load messages:", err);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  // Handle chat selection
  const handleSelectChat = (chatId: string) => {
    if (selectedChatId === chatId) return;
    // console.log(" Selecting chat:", chatId);
    setSelectedChatId(chatId);

    // Clear unread count when opening a chat
    setConversations((prev) =>
      prev.map((conv) =>
        String(conv.conversation_id) === chatId
          ? { ...conv, unread_count: 0 }
          : conv
      )
    );

    fetchAndSetMessages(chatId);

  };

  useEffect(() => {
    if (!urlConversationId) return;
    if (loadingConversations) return;
    if (selectedChatId) return;
    // check if conversation exists
    const exists = conversations.some(
      (c) => String(c.conversation_id) === urlConversationId
    );

    if (exists) {
      logger.log(urlConversationId)
      handleSelectChat(urlConversationId);
    } else {
      // Recovery path
      notify(
        "This conversation no longer exists or you don’t have access.",
        "error",
        "Conversation Not Found"
      );
      router.replace("/messages");
    }
  }, [urlConversationId, conversations, loadingConversations, selectedChatId]);

  // Update conversation snippet in sidebar
  const updateConversationSnippet = useCallback(
    (chatId: string, message: Message, isOwnMessage: boolean) => {
      setConversations((prev) => {
        const index = prev.findIndex(
          (c) => String(c.conversation_id) === chatId
        );
        if (index === -1) return prev;

        const target = prev[index];
        const isOpen = chatId === selectedChatRef.current;

        const updated: ConversationItem = {
          ...target,
          last_message: message.message,
          last_message_timestamp: message.created_at,
          last_message_at: message.created_at,
          unread_count: isOpen
            ? 0
            : isOwnMessage
              ? target.unread_count || 0
              : (target.unread_count || 0) + 1,
        };

        return [updated, ...prev.filter((_, i) => i !== index)];
      });
    },
    []
  );

  // Helper for sorting messages (null created_at goes to bottom)
  const sortMessages = (msgs: Message[]) => {
    return [...msgs].sort((a, b) => {
      if (!a.created_at && !b.created_at) return 0;
      if (!a.created_at) return 1;
      if (!b.created_at) return -1;
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  };

  // Handle message sent by current user (optimistic update and confirmation)
  const handleMessageSent = useCallback(
    (newMessage: Message) => {
      if (String(newMessage.conversation_id) === selectedChatId) {
        setSelectedMessages((prev) => {
          // 1. Check if the REAL message ID already exists (deduplication)
          if (newMessage.id && typeof newMessage.id === 'number' && prev.some((m) => m.id === newMessage.id)) {
            // Remove lingering optimistic if exists (by client_uuid)
            if (newMessage.client_uuid) {
              return prev.filter(m => m.client_uuid !== newMessage.client_uuid || m.id === newMessage.id);
            }
            return prev;
          }

          if (newMessage.client_uuid) {
            const optIndex = prev.findIndex((m) => m.client_uuid === newMessage.client_uuid);
            if (optIndex !== -1) {
              // REPLACE: Swap optimistic with real (or updated status)
              const updated = [...prev];
              updated[optIndex] = newMessage;
              return sortMessages(updated);
            }
          }

          //  Check duplicate by ID again if client_uuid didn't match (e.g. unexpected flow)
          if (newMessage.id && prev.some(m => m.id === newMessage.id)) {
            return prev;
          }

          // Insert new
          return sortMessages([...prev, newMessage]);
        });
      }

      // Update conversation snippet
      updateConversationSnippet(
        String(newMessage.conversation_id),
        newMessage,
        true
      );
    },
    [selectedChatId, updateConversationSnippet]
  );

  const handleNewRemoteMessage = useCallback(
    (newMessage: Message) => {
      const chatId = String(newMessage.conversation_id);
      const isOwnMessage = currentUserId === newMessage.sender_id;
      updateConversationSnippet(chatId, newMessage, isOwnMessage);

      if (chatId !== selectedChatId) return;

      setSelectedMessages((prev) => {
        // 1. Skip if real message already exists
        if (newMessage.id && prev.some((m) => m.id === newMessage.id)) {
          return prev;
        }

        // 2. Check if we can match by client_uuid (if backend includes it in Pusher event)
        if (newMessage.client_uuid) {
          const optIndex = prev.findIndex(m => m.client_uuid === newMessage.client_uuid);
          if (optIndex !== -1) {
            const updated = [...prev];
            updated[optIndex] = newMessage;
            return sortMessages(updated);
          }
        }

        // 3. New real message
        return sortMessages([...prev, newMessage]);
      });
    },
    [selectedChatId, currentUserId, updateConversationSnippet]
  );

  // handle booking logic
  const { notify } = useNotification();

  useEffect(() => {
    if (!selectedChatId) {
      // console.log("No current conversation to load bookings for.");
      return;
    }
    const loadBookings = async () => {
      const data = await getMyBookings();
      // console.log("Provider bookings:", data);
      setAllBookings(data.data);
    };
    loadBookings();
  }, [selectedChatId]);

  useEffect(() => {
    if (!allBookings || allBookings.length === 0 || !selectedChatId) {
      return;
    }
    const booking = allBookings.find(
      (b: any) => b.conversation_id === Number(selectedChatId)
    );
    if (booking) {
      setCurrentBooking(booking);
      setPaymentSummary(booking.payment_summary);
      logger.log(booking);
    } else {
      setCurrentBooking(null);
    }
  }, [allBookings, selectedChatId]);


  const handleBookNow = async (description: string) => {
    if (isBooking || !selectedChatId) return false;

    try {
      const res = await bookProvider(selectedChatId, description);
      if (!res) {
        notify("Please try again", "error", "Booking Failed");
        return false;
      }
      const status = res.status || "unknown";
      setBookingstatus(status);
      setSelectedBookingId(res.id);
      return true;
    } catch (error: any) {
      notify(
        error.message || "Error booking provider",
        "error",
        "Booking-error"
      );
      return false;
    } finally {
      setIsBooking(false);
    }
  };

  // booking real-time bind
  useEffect(() => {
    if (!selectedChatId) return;

    const pusher = initPusher();
    const channelName = `private-conversation.${selectedChatId}`;
    const channel = pusher?.subscribe(channelName);

    channel?.bind("booking.status.updated", (data: any) => {
      console.log("[REALTIME] Booking update received:", data);
      const booking = data.booking || data;
      const payment_summary = data.payment_summary || data.payment_summary;

      const { id, status } = booking;

      if (payment_summary) {
        setPaymentSummary(payment_summary);
      }

      if (String(booking.conversation_id) === selectedChatId) {
        setSelectedBookingId(id);
        setBookingstatus(status);
        setCurrentBooking(booking);

        // Update local storage
        localStorage.setItem(`booking_id_${selectedChatId}`, String(id));
        localStorage.setItem(`booking_status_${selectedChatId}`, status);
      }
    });

    return () => {
      channel?.unbind_all();
      pusher?.unsubscribe(channelName);
    };
  }, [selectedChatId]);


  // ... inside component
  if (loadingConversations) {
    return (
      <div className="flex justify-center h-screen items-center">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    );
  }

  return (
    <div className="flex bg-white h-screen">
      {/* Left: Chat List */}
      <div className="w-2/5 border-r h-screen">
        <ChatPane
          conversations={conversations}
          onSelectChat={handleSelectChat}
          loading={loadingMessages}
          selectedChatId={selectedChatId}
        />
      </div>

      {/* Right: Message Window */}
      <div className="flex flex-col w-3/5 bg-[#f0f2f5]">
        {selectedChatId ? (
          <>
            <ChatHeader
              conversationId={selectedChatId}
              onBookNow={handleBookNow}
            />
            <div className="flex-1 overflow-hidden">
              <ChatClient
                chatId={selectedChatId}
                initialMessages={selectedMessages}
                loadingMessages={loadingMessages}
                onNewRemoteMessage={handleNewRemoteMessage}
              />
            </div>
            <ChatFooter
              chatId={selectedChatId}
              bookingId={selectedBookingId}
              bookingstatus={bookingstatus}
              onMessageSent={handleMessageSent}
              currentBooking={currentBooking}
              conversations={conversations}
              paymentSummary={paymentSummary}
              senderInfo={
                currentUser
                  ? {
                    id: currentUser.id,
                    first_name: currentUser.first_name,
                    last_name: currentUser.last_name,
                    role: currentUser.role,
                    address: currentUser.address,
                    email: currentUser.email,
                    phone: currentUser.phone
                  }
                  : undefined
              }
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p className="text-xl">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Messages() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center h-screen items-center">
          <LoadingSpinner size="lg" variant="primary" />
        </div>
      }
    >
      <MessagesContent />
    </Suspense>
  );
} 
