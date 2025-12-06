// components/ChatPane.tsx
import { ConversationItem, Message } from '@/lib/types';
import AllMessages from './AllMessages';
import SearchMessages from './ChatPaneSearch';

interface ChatPaneProps {
  conversations: ConversationItem[];
  onSelectChat: (chatId: string) => void;
  loading?: boolean
  selectedChatId: string | null
} 

export default function ChatPane({ conversations, onSelectChat, loading, selectedChatId }: ChatPaneProps) {
  return (
    <div className="relative flex flex-col bg-white h-full">
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <SearchMessages />
      </div>
      <div className="flex-1 overflow-y-auto">
        <AllMessages conversations={conversations} selectedChatId={selectedChatId} onSelectChat={onSelectChat} loading={loading} />
      </div>
    </div>
  );
}