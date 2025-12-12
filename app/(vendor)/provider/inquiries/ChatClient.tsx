'use client';

import { useEffect, useRef, useState } from 'react';
import { subscribeToChat } from '@/services/pusher';
import { ConversationItem, Message } from '@/lib/types';

interface ChatClientProps {
  chatId: string;
  initialMessages: Message[];
  loadingMessages: boolean;
  onNewRemoteMessage: (message: Message) => void;
  conversations: ConversationItem[];
  currentUserId?: number;
  currentBooking?: null;

}

export default function ChatClient({
  chatId,
  initialMessages,
  onNewRemoteMessage,
  loadingMessages,
  conversations,
  currentBooking,
  currentUserId
}: ChatClientProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialLoadRef = useRef(true);


  // CRITICAL FIX: Use ref to avoid stale closures
  const onNewRemoteMessageRef = useRef(onNewRemoteMessage);
  const currentUserIdRef = useRef(currentUserId);

  // Update refs when props change
  useEffect(() => {
    onNewRemoteMessageRef.current = onNewRemoteMessage;
  }, [onNewRemoteMessage]);

  useEffect(() => {
    currentUserIdRef.current = currentUserId;
  }, [currentUserId]);

  // Find current conversation
  const currentConversation = conversations.find(
    (c: ConversationItem) => String(c.conversation_id) === chatId
  );

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: isInitialLoadRef.current ? 'auto' : 'smooth'
    });
  };

  useEffect(() => {
    scrollToBottom();
    if (isInitialLoadRef.current && initialMessages.length > 0) {
      isInitialLoadRef.current = false;
    }
  }, [initialMessages.length]); 

  // Sort messages (oldest first)
  const sortedMessages = [...initialMessages].sort((a, b) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  // Pusher subscription with stable callback reference
  useEffect(() => {
    if (!chatId) {
      console.warn(' No chatId provided to ChatClient');
      return;
    }

    console.log(`Subscribing to private-conversation.${chatId}`);

    const cleanup = subscribeToChat(chatId, (msg: Message) => {
      const messageWithChatId: Message = {
        ...msg,
        conversation_id: Number(chatId), 
      };

      console.log('Pusher message received → forcing conversation_id:', chatId);
      onNewRemoteMessageRef.current(messageWithChatId);
    });

    return () => {
      console.log(`🔌 [ChatClient] Unsubscribing from private-conversation.${chatId}`);
      cleanup?.();
    };
  }, [chatId]); // ONLY depends on chatId!

  if (loadingMessages) {
    return (
      <div className='flex items-center justify-center h-full text-gray-500'>
        <p className='text-lg'>Loading messages...</p>
      </div>
    );
  }

  const adTitle = currentConversation?.service_ad?.title || 'Chat';
  const adPrice = currentConversation?.service_ad?.price || 'Price Unavailable';

  if (currentBooking){
    console.log('[Chat Client Received Booking Details] Current Booking in ChatClient:', currentBooking);
  }


  return (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      {/* Ad Banner */}
      <div className='top-0 z-[10] sticky flex justify-between items-center bg-[var(--foundation-primary)] px-8 py-2 w-full'>
        <h2 className="font-bold text-[var(--primary-color)]">{adTitle}</h2>
        <p className="font-semibold text-[var(--primary-color)]">{`₦${adPrice}`}</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#f0f2f5] h-full">
        {sortedMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-lg">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedMessages.map((msg, index) => {
              if (!msg || !msg.message) {
                console.warn(' Invalid message object:', msg);
                return null;
              }
              // Determine if message is from current user
              const isCurrentUser = currentUserId !== undefined && msg.sender_id === currentUserId;

              return (
                <div
                  key={msg.id || `temp-${index}-${msg.created_at}`}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm ${isCurrentUser
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none'
                      }`}
                  >
                    {!isCurrentUser && (
                      <p className="text-xs font-semibold opacity-80 mb-1">
                        {msg.sender?.first_name} {msg.sender?.last_name}
                      </p>
                    )}
                    <p className="text-sm break-words whitespace-pre-wrap">{msg.message}</p>
                    <span className={`text-[10px] mt-1 block ${isCurrentUser ? 'opacity-60' : 'opacity-80'}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              );
            }).filter(Boolean)}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
