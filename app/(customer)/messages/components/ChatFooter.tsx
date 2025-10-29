// ChatFooter.tsx (Optimized for Backgrounds)
import { SendIcon } from "lucide-react"
import { MdAttachFile } from "react-icons/md"
export default function ChatFooter () {
  return (
    <div className='flex flex-col pb-6 border-t'>
      <div className='flex items-center bg-white mb-6 w-full'>
        {/* Paperclip Button */}
        <button className='ml-2 p-2 cursor-pointer'>
          <MdAttachFile color="black" size={25} />
        </button>
        <input
          type='text'
          placeholder='Type a message...'
          className='flex-1 bg-transparent px-2 py-1 focus:outline-none text-sm'
        />

        {/* Send Button */}
        <button className='bg-[var(--primary-color)] m-1 p-2 rounded-full cursor-pointer'>
         <SendIcon color="white" size={20} />
        </button>
      </div>
    </div>
  )
}
