import LoadingSpinner from "@/app/components/general/LoadingSpinner";
import { ConversationItem } from "@/lib/types";
import MessageShowcaseCard from "./MessageShowCaseCard";
import { useMemo } from "react";

interface AllMessagesProps {
  conversations: ConversationItem[];
  onSelectChat: (chatId: string) => void;
  loading?: boolean;
  selectedChatId: string | null;
}

export default function AllMessages({
  conversations,
  onSelectChat,
  loading,
  selectedChatId,
}: AllMessagesProps) {
  // CRITICAL: Sort conversations by most recent message timestamp
  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => {
      const dateA = a.last_message_timestamp
        ? new Date(a.last_message_timestamp).getTime()
        : 0;
      // console.log(dateA);
      const dateB = b.last_message_timestamp
        ? new Date(b.last_message_timestamp).getTime()
        : 0;
      // console.log(dateB);
      // console.log(dateB-dateA);

      return dateB - dateA; // Most recent first
    });
  }, [conversations]);

  // Show loading only on initial load
  if (loading && (!conversations || conversations.length === 0)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    );
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center space-x-1 h-[80vh] text-gray-500">
        <span className="font-semibold">No conversations found.</span>
        <span className="font-semibold">
          View the ads to engage to a vendor
        </span>
      </div>
    );
  }

  return (
    <div className="px-4 py-2">
      <div className="flex flex-col gap-2">
        {sortedConversations.map((conv) => (
          <div
            key={conv.conversation_id}
            onClick={() => onSelectChat(String(conv.conversation_id))}
            className="cursor-pointer rounded-lg transition-all"
          >
            <MessageShowcaseCard
              isActive={String(conv.conversation_id) === selectedChatId}
              providerName={conv.other_user.full_name || "Unknown"}
              lastMessageSnippet={conv.last_message || "No messages"}
              timestamp={conv.last_message_at}
              unreadCount={
                String(conv.conversation_id) === selectedChatId
                  ? 0
                  : conv.unread_count
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
