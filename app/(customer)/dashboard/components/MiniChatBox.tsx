'use client'
interface MiniChatBoxProps {
  userId: string
}
import LoadingDots from "@/app/components/general/LoadingDots"
import { useNotification } from "@/app/contexts/NotificationProvider"
import {  initiateChat, sendMessageCustomer } from "@/services/api"
import { useRouter } from "next/navigation"
import {  useState } from "react"
export default function MiniChatBox({ userId }: MiniChatBoxProps) {
  const [message, setMessage] = useState<string>('')
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()
  const hadleSendMessage = async () => {
    if (!token) {
      notify('You must be logged in to send messages.', 'error', 'Authentication Required')
      return
    }
    if (!message.trim()) return;


    try {
      setLoading(true);

      // Step 1: Initiate chat
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

      // Step 2: Send first message
      await sendMessageCustomer(String(conversationId), message);

      // Step 3: Go to chat
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
