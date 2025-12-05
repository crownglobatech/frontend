'use client';
import { useNotification } from '@/app/contexts/NotificationProvider';
import { sendMessageCustomer } from '@/services/api';
import { SendIcon } from 'lucide-react'
import { useEffect, useState } from 'react';
import { MdAttachFile } from 'react-icons/md'
import ProgressBar from './ProgressBar';
import { rejectBooking } from '@/lib/api/bookings';
// Assuming the parent now passes a callback
interface ChatFooterProps {
  chatId: string;
  onMessageSent: (message: any) => void; // <<< ADDED THIS PROP
  bookingstatus?: string; // NEW PROP
  bookingId?: number; // NEW PROP
}
export default function ChatFooter({ chatId, onMessageSent, bookingstatus, bookingId }: ChatFooterProps) {
  const [message, setMessage] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  // Helper to get current user info for optimistic display
  useEffect(() => {
    console.log('Booking status updated:', bookingstatus);

  })
  const getCurrentUser = () => {
    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    return userString ? JSON.parse(userString) : { id: 0, first_name: 'You', role: 'customer' };
  };

  const handleSendMessage = async () => {
    if (!token) {
      notify('You must be logged in to send messages.', 'error', 'Authentication Required')
      return
    }
    if (!message.trim()) return;

    const currentUser = getCurrentUser();

    const tempMessage = {
      id: -Date.now(), // temporary negative or timestamp id
      conversation_id: Number(chatId), // <-- important
      message: message.trim(),
      sender_id: currentUser.id,
      sender: currentUser,
      created_at: new Date().toISOString(),
      is_read: 0,
      read_at: null,
      updated_at: new Date().toISOString(),
    };

    try {
      setLoading(true);
      // 1. Optimistically update the UI
      onMessageSent(tempMessage);
      // 2. Clear input immediately
      setMessage('');
      console.log('Sending message in', `private-conversation.${chatId}`, 'room');
      if (!chatId) {
        throw new Error('Failed to get conversation ID from server');
      }
      // 3. Send message to server (server saves it and triggers Pusher for the Vendor)
      await sendMessageCustomer(String(chatId), tempMessage.message);

    } catch (error: any) {
      console.error('Error in MiniChatBox:', error);
      notify(error.message || 'Failed to send chat message. Please try again.', 'error');
      // Optionally: restore message content on error
      setMessage(tempMessage.message);
    } finally {
      setLoading(false);
    }
  };

  // cancel booking
  const handleRejectBooking = async () => {
    const res = await rejectBooking(bookingId!)
    notify('Booking cancelled successfully.', 'success', 'Booking Cancelled');
    localStorage.removeItem(`booking_status_${chatId}`);
    localStorage.removeItem(`booking_id_${chatId}`);
  }

  // Added onKeyPress to handle sending with Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const primaryColor = 'blue-600';
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Pending', 'In Progress', 'Completed'];
    const [completedSteps, setCompletedSteps] = useState<boolean[]>(
      Array(steps.length).fill(false)
    )
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
          onKeyDown={handleKeyPress} // Use onKeyDown for better Enter handling
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
        {bookingstatus && (
          <div className="w-full mt-3 px-8">
            <div className="flex flex-col items-start mb-4 w-full">
              <h2 className="text-[18px] font-semibold text-[var(--heading-color)]">Service Progress</h2>
              {/* progress */}
                <div className='flex flex-col w-full mt-2 gap-3'>
                  <div>
                    <ProgressBar
                      steps={steps}
                      completedSteps={completedSteps}
                      currentStep={currentStep}
                    />
                  </div>
                  <div className='bg-[#FBF7EB] border border-[#D4AF37] rounded-sm px-4 py-1.5 w-full flex items-center justify-between'>
                    <p className='text-[#D4AF37] text-[10px]'>Awaiting vendor to accept booking.</p>
                    <span onClick={handleRejectBooking} className='bg-[#E63946] text-[10px] font-thin text-white shadow-sm px-4 py-1.5 rounded cursor-pointer'>Cancel Booking</span>
                  </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}