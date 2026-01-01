"use client";
import { ConversationItem, Message } from "@/lib/types";
import AllMessages from "./AllMessages";
import SearchMessages from "./ChatPaneSearch";
import { useEffect, useState } from "react";

interface ChatPaneProps {
  conversations: ConversationItem[];
  onSelectChat: (chatId: string) => void;
  loading?: boolean;
  selectedChatId: string | null;
}

export default function ChatPane({
  conversations,
  onSelectChat,
  loading,
  selectedChatId,
}: ChatPaneProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConversations, setFilteredConversations] =
    useState(conversations);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredConversations(conversations);
      return;
    }
    const filtered = conversations.filter(
      (conversation) =>
        conversation.other_user.full_name?.toLowerCase().includes(query) ||
        conversation.last_message?.toLowerCase().includes(query) ||
        conversation.service_ad.title?.toLowerCase().includes(query)
    );
    setFilteredConversations(filtered);
  }, [searchQuery, conversations]);

  return (
    <div className="relative flex flex-col bg-white h-full">
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <SearchMessages
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <AllMessages
          conversations={filteredConversations}
          selectedChatId={selectedChatId}
          onSelectChat={onSelectChat}
          loading={loading}
        />
      </div>
    </div>
  );
}
