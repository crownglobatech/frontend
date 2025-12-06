// components/ChatHeader.tsx
'use client';

import { bookProvider } from '@/lib/api/bookings';
import { ConversationItem } from '@/lib/types';
import { useEffect, useState } from 'react';

interface ChatHeaderProps {
  conversationId: string;
  conversations: ConversationItem[]; // Receive from parent instead of fetching
}

export default function ChatHeader({ conversationId, conversations }: ChatHeaderProps) {
  const [currentConversation, setCurrentConversation] = useState<ConversationItem | null>(null);

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
          <img
            src={other_user.photo_url || '/default-avatar.png'}
            alt={other_user.full_name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
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
        <button  className="bg-[var(--primary-color)] px-6 py-3 rounded-lg font-bold cursor-pointer text-white text-sm shadow-md transition-all hover:shadow-lg">
          Custom Booking
        </button>
      </div>
    </div>
  );
}