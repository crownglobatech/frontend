'use client'
interface MiniChatBoxProps {
  userId: string
}
import LoadingDots from "@/app/components/general/LoadingDots"
import { useNotification } from "@/app/contexts/NotificationProvider"
import { initiateChat, sendMessageCustomer } from "@/services/api"
import { useEffect, useState } from "react"
export default function MiniChatBox({ userId }: MiniChatBoxProps) {
  const [userRole, setUserRole] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        console.log(' Current user ID:', user);
        setUserRole(user?.role)
      }
    }
  }, []);
  const hadleSendMessage = async () => {
    if (!token || userRole !== 'customer') {
      notify('You must be logged in as our customer to send messages.', 'error', 'Authentication Required')
      return
    }
    if (!message.trim()) return;


    try {
      setLoading(true);

      //  Initiate chat
      const initiateResponse = await initiateChat({ service_ad_id: userId });
      console.log('initiateChat response:', initiateResponse);

      // Extract conversation_id safely — works for ALL Laravel responses
      const conversationId =
        initiateResponse?.data?.id ||
        initiateResponse?.data?.conversation_id ||
        initiateResponse?.data?.conversation?.id ||
        initiateResponse?.conversation_id ||
        initiateResponse?.id;

      if (!conversationId) {
        throw new Error('Failed to get conversation ID from server');
      }

      console.log('Conversation ID:', conversationId);

      // Send first message
      await sendMessageCustomer(String(conversationId), message);

      // notify customer
      notify('Chat initiated successfully!', 'success', 'Success');
      setMessage('');
    } catch (error: any) {
      console.error('Error in MiniChatBox:', error);
      alert(error.message || 'Failed to start chat. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex flex-col items-center gap-2 shadow-lg hover:shadow-xl px-6 py-4 rounded-md transition-all duration-300'>
      <h2 className='font-semibold text-[18px] text-[var(--foundation-neutral-8)]'>
        Chat Vendor
      </h2>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type your message'
        className='px-4 py-1.5 border border-[var(--foundation-neutral-6)] rounded-md text-[14px]'
      />
      <div>
        <button onClick={hadleSendMessage} className='bg-[var(--primary-color)] mt-1 px-6 py-2 rounded-sm font-semibold text-[14px] text-white cursor-pointer'>
          {loading ? <LoadingDots /> : 'Send Message'}
        </button>
      </div>
    </div>
  )
}
