import ChatFooter from "@/app/(customer)/messages/components/ChatFooter";
import MessageWindow from "@/app/(customer)/messages/components/MessageWindow";
import ProviderChatHeader from "./components/ChatHeader";
import ProviderChatPane from "./components/ChatPane";


export default function VendorMessages () {
  return (
    // Main Content Container (e.g., in a component called ChatPanel.tsx)

    <div className='flex bg-white h-screen'>
      {' '}
      {/* Full screen height and light background */}
      <div className='flex w-full'>
        {/* Left Side: Chat List - Approx 1/3 width */}
        <div className='bg-white border-r w-2/5 h-screen'>
          <ProviderChatPane />
        </div>

        {/* Right Side: Message Window - Approx 2/3 width */}
        <div className='flex flex-col bg-[#F0F0F0] w-3/5'>
          <div className='z-10 shadow-md'>
            <ProviderChatHeader />
          </div>
          <MessageWindow />
          <ChatFooter />
        </div>
      </div>
    </div>
  )
}
