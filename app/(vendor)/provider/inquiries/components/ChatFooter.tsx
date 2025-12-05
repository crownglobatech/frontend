'use client';
import { sendMessageCustomer } from '@/services/api';
import { SendIcon } from 'lucide-react';
import { useState } from 'react';
import { MdAttachFile } from 'react-icons/md';
import { useNotification } from '@/app/contexts/NotificationProvider'; // Stubbed below

interface ChatFooterProps {
  chatId: string;
  onMessageSent: (message: any) => void;
}

export default function ChatFooter({ chatId, onMessageSent }: ChatFooterProps) {
  const [message, setMessage] = useState('');
  const primaryColor = 'blue-600';
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification(); 

  const handleSendMessage = async () => {
    // --- Authentication Check ---
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      notify('You must be logged in to send messages.', 'error', 'Authentication Required');
      return;
    }
    if (!message.trim()) return;

    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const currentUser = userString ? JSON.parse(userString) : { id: 100, role: 'customer', first_name: 'You' };
    const trimmedMessage = message.trim();

    const tempMessage = {
      id: -Date.now(), // temporary ID
      conversation_id: Number(chatId),
      message: trimmedMessage,
      sender_id: currentUser?.id || 0,
      sender: currentUser,
      created_at: new Date().toISOString(),
      is_read: 0,
      read_at: null,
      updated_at: new Date().toISOString(),
    };

    try {
      setLoading(true);
      // 1. Optimistically add message to UI
      onMessageSent(tempMessage);
      // 2. Clear input immediately for better UX
      setMessage('');
      // 3. Send to server
      await sendMessageCustomer(String(chatId), trimmedMessage);

    } catch (error: any) {
      console.error('Error sending message:', error);
      notify(error.message || 'Failed to send message', 'error', 'Send Failed');

      // Restore message to input on error
      setMessage(trimmedMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='flex flex-col border-t'>
      <div className='flex items-center bg-white w-full'>
        <button className='ml-2 p-2 cursor-pointer'>
          <MdAttachFile color='black' size={25} />
        </button>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder='Type a message...'
          disabled={loading}
          className='flex-1 bg-transparent px-4 py-3 focus:outline-none text-sm'
        />
        <button
          onClick={handleSendMessage}
          disabled={loading || !message.trim()}
          className={`bg-${primaryColor} m-1 p-2 rounded-full cursor-pointer disabled:opacity-50 transition-colors`}
        >
          <SendIcon color='white' size={20} />
        </button>
      </div>
      <div className='flex flex-col justify-center items-center min-h-[50px]'>
        <p className='font-normal text-[14px] text-[var(--secondary-color)] text-center'>
          Discuss service details before booking.
        </p>
      </div>
    </div>
  );
}