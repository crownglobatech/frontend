'use client';

import { fetchAllConversations, fetchConversationMessages } from '@/services/api';
import ChatFooter from './components/ChatFooter';
import ChatHeader from './components/ChatHeader';
import ChatPane from './components/ChatPane';
import ChatClient from './ChatClient';
import { useEffect, useState, useCallback, useRef } from 'react'; // MUST import useCallback
import { ConversationItem, Message } from '@/lib/types';
import { bookProvider, getMyBookings, getProviderBookings } from '@/lib/api/bookings';
import { useNotification } from '@/app/contexts/NotificationProvider';
import { initPusher } from '@/services/pusher';

export default function Messages() {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedMessages, setSelectedMessages] = useState<Message[]>([]);
  const [loadingConversations, setLoadingConversations] = useState<boolean>(false);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [bookingstatus, setBookingstatus] = useState<string>('');
  const [selectedBookingId, setSelectedBookingId] = useState<number | undefined>(undefined);
  // Get current user ID
  const [currentUserId, setCurrentUserId] = useState<number | undefined>();
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const selectedChatRef = useRef<string | null>(null);
  const [allBookings, setAllBookings] = useState([])
  const [currentBooking, setCurrentBooking]= useState<null | []>(null)

  useEffect(() => {
    selectedChatRef.current = selectedChatId;
  }, [selectedChatId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setCurrentUserId(user.id);
        setCurrentUserName(`${user.first_name} ${user.last_name}`);
        console.log('👤 Current user ID:', user.id);
      }
    }
  }, []);

  // Load conversations
  useEffect(() => {
    const load = async () => {
      setLoadingConversations(true);
      try {
        const data = await fetchAllConversations();
        console.log(' Loaded conversations:', data.length);
        setConversations(data);
      } catch (err) {
        console.error(" Failed to load conversations:", err);
      } finally {
        setLoadingConversations(false);
      }
    };
    load();
  }, []);

  // useeffect for notification pusher channel
  useEffect(() => {
    if (!currentUserId) return
    const pusher = initPusher()

    const channelName = `private-user.${currentUserId}`
    const channel = pusher?.subscribe(channelName)
    channel?.bind('new-message-notification', (data: any) => {
      const { conversation_id, last_message, sender_name } = data.payload;

      const chatId = String(conversation_id);
      const isOwnMessage = currentUserName === sender_name;


      // HARD STOP: if user is already inside this chat
      if (chatId === selectedChatRef.current) {
        console.log('Realtime ignored – chat already open');
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
      channel?.unbind_all()
      pusher?.unsubscribe(channelName)
    }
  }, [currentUserId]);

  useEffect(() => {
    if (!selectedChatId) return;

    const pusher = initPusher();
    const channelName = `private-conversation.${selectedChatId}`;
    const channel = pusher?.subscribe(channelName);

    channel?.bind('booking.status.updated', (data: any) => {
      console.log('[REALTIME] Booking update received:', data);

      const { id, status } = data.booking ?? data;
      // ✅ single source of truth
      setSelectedBookingId(id);
      setBookingstatus(status);
      // ✅ persistence for refresh survival
      localStorage.setItem(`booking_id_${selectedChatId}`, String(id));
      localStorage.setItem(`booking_status_${selectedChatId}`, status);
    });

    return () => {
      channel?.unbind('booking.status.updated');
      pusher?.unsubscribe(channelName);
    };
  }, [selectedChatId]);

  // Fetch messages for selected chat
  const fetchAndSetMessages = useCallback(async (chatId: string) => {
    setLoadingMessages(true);
    try {
      const messages = await fetchConversationMessages(chatId);
      console.log(' Fetched messages for chat', chatId, ':', messages.length);
      setSelectedMessages(messages);
    } catch (err) {
      console.error(' Failed to load messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  // Handle chat selection
  const handleSelectChat = (chatId: string) => {
    if (selectedChatId === chatId) return;

    console.log(' Selecting chat:', chatId);
    setSelectedChatId(chatId);

    // Clear unread count when opening a chat
    setConversations(prev =>
      prev.map(conv =>
        String(conv.conversation_id) === chatId
          ? { ...conv, unread_count: 0 }
          : conv
      )
    );

    fetchAndSetMessages(chatId);
  };

  // Update conversation snippet in sidebar
  const updateConversationSnippet = useCallback((
    chatId: string,
    message: Message,
    isOwnMessage: boolean
  ) => {
    setConversations(prev => {
      const index = prev.findIndex(
        c => String(c.conversation_id) === chatId
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

      return [
        updated,
        ...prev.filter((_, i) => i !== index),
      ];
    });
  }, []);

  // Handle message sent by current user (optimistic update)
  const handleMessageSent = useCallback((newMessage: Message) => {
    console.log(' [SENT] Optimistic message update:', {
      messageId: newMessage.id,
      conversationId: newMessage.conversation_id,
      selectedChatId,
      preview: newMessage.message.substring(0, 30) + '...'
    });

    // Add message to active view if it belongs to the currently open chat
    if (String(newMessage.conversation_id) === selectedChatId) {
      setSelectedMessages(prev => {
        // Check if already exists (shouldn't for optimistic, but just in case)
        const exists = prev.some(m => m.id === newMessage.id);
        if (exists) {
          console.log('[SENT] Message already exists, skipping');
          return prev;
        }
        console.log('[SENT] Adding to UI');
        return [...prev, newMessage];
      });
    }

    // Update conversation snippet
    updateConversationSnippet(String(newMessage.conversation_id), newMessage, true);
  }, [selectedChatId, updateConversationSnippet]);

  // Handle message received from Pusher (vendor's reply or any remote message)
  const handleNewRemoteMessage = useCallback((newMessage: Message) => {
    const chatId = String(newMessage.conversation_id);

    // Update sidebar immediately
    const isOwnMessage = currentUserId === newMessage.sender_id;
    updateConversationSnippet(chatId, newMessage, isOwnMessage);

    // Only update current chat
    if (chatId !== selectedChatId) return;

    setSelectedMessages(prev => {
      // 1. Real message with server ID already exists? → skip
      if (newMessage.id && prev.some(m => m.id === newMessage.id)) {
        console.log('Duplicate prevented');
        return prev;
      }

      // 2. Find optimistic message by EXACT text match + time proximity
      const optIndex = prev.findIndex(m =>
        (m.id === undefined || m.id < 0) &&
        m.message === newMessage.message &&
        Math.abs(new Date(m.created_at).getTime() - new Date(newMessage.created_at).getTime()) < 8000
      );

      if (optIndex !== -1) {
        console.log('Replaced optimistic message');
        const updated = [...prev];
        updated[optIndex] = newMessage;
        return updated;
      }

      // 3. New message from someone else
      console.log('New real message added');
      return [...prev, newMessage];
    });
  }, [selectedChatId, currentUserId, updateConversationSnippet]);

  // handle booking logic
  const { notify } = useNotification()

    useEffect(() => {
      if (!selectedChatId) {
        console.log('No current conversation to load bookings for.');
        return;
      } else {
        console.log('Loading bookings for conversation:', selectedChatId);
      }
      const loadBookings = async () => {
        const data = await getMyBookings();
        console.log('Provider bookings:', data);
        setAllBookings(data.data);
      }
      loadBookings();
    }, [selectedChatId])

      useEffect(() => {
    if (!allBookings || allBookings.length === 0 || !selectedChatId) {
      return;
    }
    const booking = allBookings.find((b: any) => b.conversation_id === Number(selectedChatId));
    if (booking) {
      console.log('Found booking for current conversation:', booking);
      setCurrentBooking(booking);
    } else {
      setCurrentBooking(null)
      console.log('No booking found for current conversation.');

    }
  }, [allBookings, selectedChatId]);
  // When booking succeeds → save status for THIS specific chat
  const handleBookNow = async () => {
    const res = await bookProvider(selectedChatId!);

    if (!res) {
      notify('Please try again', 'error', 'Booking Failed');
      return;
    }

    const status = res.status || 'unknown';
    setBookingstatus(status);
    setSelectedBookingId(res.id);
    // Save with chat-specific key
    localStorage.setItem(`booking_status_${selectedChatId}`, status);
    localStorage.setItem(`booking_id_${selectedChatId}`, String(res.id));
  };
  // // When component mounts or selectedChatId changes → load the correct one
  // useEffect(() => {
  //   if (!selectedChatId) {
  //     setBookingstatus('');
  //     return;
  //   }
  //   const savedStatus = localStorage.getItem(`booking_status_${selectedChatId}`);
  //   const savedBookingId = localStorage.getItem(`booking_id_${selectedChatId}`);
  //   if (savedBookingId && savedStatus) {
  //     setSelectedBookingId(Number(savedBookingId));
  //     setBookingstatus(savedStatus);
  //   } else {
  //     setSelectedBookingId(undefined);
  //     setBookingstatus(''); // or 'unknown'
  //   }

  // }, [selectedChatId, selectedBookingId]);

    // booking real-time bind
  useEffect(() => {
    if (!selectedChatId) return;

    const pusher = initPusher();
    const channelName = `private-conversation.${selectedChatId}`;
    const channel = pusher?.subscribe(channelName);

    channel?.bind('booking.status.updated', (data: any) => {
      console.log('[REALTIME] Booking update received:', data);

      const booking = data.booking
      const { id, status } = data.booking ?? data;
      setSelectedBookingId(id);
      setBookingstatus(status);
      if (String(booking.conversation_id) === selectedChatId) {
        setCurrentBooking(booking);
        setBookingstatus(status)
      }
      console.log(currentBooking);
      console.log(status)
      localStorage.setItem(`booking_id_${selectedChatId}`, String(id));
      localStorage.setItem(`booking_status_${selectedChatId}`, status);
    });

    return () => {
      channel?.unbind_all();
      pusher?.unsubscribe(channelName);
    };
  }, [selectedChatId]);



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
            <ChatHeader conversationId={selectedChatId} onBookNow={handleBookNow} />
            <div className="flex-1 overflow-hidden">
              <ChatClient
                chatId={selectedChatId}
                initialMessages={selectedMessages}
                // PASS NEW PROP: For remote message updates (Vendor's reply)
                onNewRemoteMessage={handleNewRemoteMessage}
              />
            </div>
            <ChatFooter
              chatId={selectedChatId}
              bookingId={selectedBookingId}
              bookingstatus={bookingstatus}
              onMessageSent={handleMessageSent}
              currentBooking={currentBooking}
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