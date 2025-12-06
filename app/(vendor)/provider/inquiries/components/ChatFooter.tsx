'use client';
import { sendMessageCustomer } from '@/services/api';
import { SendIcon } from 'lucide-react';
import { useState } from 'react';
import { MdAttachFile } from 'react-icons/md';
import { useNotification } from '@/app/contexts/NotificationProvider'; // Stubbed below
import ProgressBar from '@/app/(customer)/messages/components/ProgressBar';
import { rejectBooking, vendorRejectBooking } from '@/lib/api/bookings';

interface ChatFooterProps {
  chatId: string;
  onMessageSent: (message: any) => void;
  currentBooking?: null | any
  onRejectBooking? : () => void
}

export default function ChatFooter({ chatId, onMessageSent, currentBooking, onRejectBooking }: ChatFooterProps) {
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


  if (currentBooking) {
    console.log('[Chat Footer Received Booking Details] Current Booking in ChatClient:', currentBooking);
  }


  const handleRejectBooking = async () => {
    const res = await vendorRejectBooking(currentBooking?.id!)
    console.log(res);
    onRejectBooking?.()
    notify('Booking cancelled successfully.', 'success', 'Booking Cancelled');
  }

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

        {currentBooking && currentBooking.status !== 'cancelled' && (
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
                  <p className='text-[#D4AF37] text-[10px]'>You have a booking request from {currentBooking.customer.full_name}</p>
                  <div className='flex gap-2 items-center'>
                    <span onClick={handleRejectBooking} className='bg-transparent border border-[#E63946] text-[10px] font-thin text-[#E63946] shadow-sm px-4 py-1.5 rounded cursor-pointer'>Reject Booking</span>
                    <span className='bg-[var(--success-color)] rounded cursor-pointer text-[10px] font-thin text-white border border-[var(--success-color )] shadow-sm px-4 py-1.5'>Accept Booking</span>

                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}