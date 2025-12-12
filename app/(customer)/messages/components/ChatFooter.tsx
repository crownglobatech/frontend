'use client';
import { useNotification } from '@/app/contexts/NotificationProvider';
import { sendMessageCustomer } from '@/services/api';
import { SendIcon } from 'lucide-react'
import { useEffect, useState } from 'react';
import { MdAttachFile } from 'react-icons/md'
import ProgressBar from './ProgressBar';
import { confirmCompletion, rejectBooking } from '@/lib/api/bookings';

interface ChatFooterProps {
  chatId: string;
  onMessageSent: (message: any) => void; 
  bookingstatus?: string; 
  bookingId?: number;
  currentBooking?: any | null
}
export default function ChatFooter({ chatId, onMessageSent, bookingstatus, bookingId, currentBooking }: ChatFooterProps) {
  const [message, setMessage] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();


  // Helper to get current user info for optimistic display
  useEffect(() => {
    console.log('Booking status updated:', bookingstatus);
    console.log(currentBooking);
  })

  useEffect(() => {
    if (currentBooking?.status === 'completed') {
      notify('Please review the work and confirm if everything is done.', 'success', 'Service Marked as Completed')
    }
  }, [currentBooking?.status === 'completed'])
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
      id: -Date.now(), 
      conversation_id: Number(chatId),
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
      // Optimistically update the UI
      onMessageSent(tempMessage);
      // Clear input immediately
      setMessage('');
      console.log('Sending message in', `private-conversation.${chatId}`, 'room');
      if (!chatId) {
        throw new Error('Failed to get conversation ID from server');
      }
      // Send message to server
      await sendMessageCustomer(String(chatId), tempMessage.message);

    } catch (error: any) {
      console.error('Error in MiniChatBox:', error);
      notify(error.message || 'Failed to send chat message. Please try again.', 'error');
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

  // Sync progress bar with bookingStatus
  useEffect(() => {
    if (!currentBooking?.status) return;
    if (currentBooking?.status === 'pending' || currentBooking?.status === 'confirmed') {
      setCurrentStep(0);
      setCompletedSteps([false, false, false]);
    }
    if (currentBooking?.status === 'in_progress') {
      setCurrentStep(1);
      setCompletedSteps([true, false, false]);
    }
    if (currentBooking?.status === 'closed') {
      setCurrentStep(2);
      setCompletedSteps([true, true, true]);
    }
  }, [currentBooking?.status]);

  // confirm completion
  const markAsCloased = async () => {
    if (!currentBooking?.id) return
    await confirmCompletion('closed', currentBooking?.id)
    notify('You have confirmed completion, Nice doing business with you', 'success', 'Completion Confirmed')
  }
  return (
    <div className='flex flex-col border-t'>
      <div className='flex gap-2 items-center bg-white w-full p-4'>
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
          className='flex-1 bg-transparent px-4 py-3 focus:outline-none text-sm border rounded-md'
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
        <p className='font-normal mt-1 text-[14px] text-[var(--secondary-color)] text-center'>
          Discuss service details before booking.
        </p>

        {currentBooking?.status && currentBooking?.status === 'pending' && (
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

        {currentBooking?.status && currentBooking?.status === 'confirmed' && (
          <div className='w-full mt-3 px-8  flex flex-col gap-3'>
            <h2 className='text-[var(--heading-color)] font-semibold text-[14px]'>Payment Summary</h2>
            <div className='flex flex-col gap-2 items-start w-full'>
              <div className='flex justify-between items-center w-full'>
                <h3 className='text-[var(--heading-color)] text-[12px]'>Sub-total</h3>
                <p className='text-[var(--heading-color)] text-[12px]'>₦50000</p>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h3 className='text-[var(--heading-color)] text-[12px]'>Service Fee</h3>
                <p className='text-[var(--heading-color)] text-[12px]'>₦1000</p>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h3 className='text-[heading-color] font-semibold text-[13px]'>Total</h3>
                <p className='text-[var(--heading-color)] font-semibold text-[12px]'>₦50100</p>
              </div>
            </div>
            <button className='text-white w-full mb-2 py-1.5 rounded px-4 font-semibold cursor-pointer shadow-sm bg-[var(--success-color)] text-[14px]'>
              Proceed with payment
            </button>
          </div>
        )}

        {currentBooking?.status && currentBooking?.status === 'in_progress' && (
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
                <div className='bg-[#FBF7EB] border border-[#D4AF37] rounded-sm px-4 py-1.5 w-full flex flex-col items-center justify-between'>
                  <p className='text-[#D4AF37] text-[10px]'>This is currently in progress, We will let you know once the vendor confirms service completion</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentBooking?.status && currentBooking?.status === 'completed' && (
          <div className="w-full mt-3 px-8">
            <div className="flex flex-col gap-2 items-start mb-4 w-full">
              <h2 className="text-[16px] font-semibold text-[var(--heading-color)]">Service Progress</h2>

              <div className='flex flex-col w-full  mt-2 gap-3'>
                <ProgressBar
                  steps={steps}
                  completedSteps={completedSteps}
                  currentStep={currentStep}
                />
              </div>
              <div className='bg-[#FBF7EB] border border-[#D4AF37] rounded-sm px-4 py-1.5 w-full flex items-center justify-between'>
                <p className='text-[#D4AF37] text-[10px]'>Click on 'Confirm Completion' when services to close this booking</p>
                <div className='flex gap-2'>
                  <span onClick={markAsCloased} className='bg-[var(--success-color)] text-[10px] font-semibold text-white shadow-sm px-4 py-1.5 rounded cursor-pointer'>Confirm Completion</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}