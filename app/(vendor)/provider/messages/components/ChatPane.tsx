import AllMessages from "@/app/(customer)/messages/components/AllMessages";
import SearchMessages from "@/app/(customer)/messages/components/ChatPaneSearch";


export default function ProviderChatPane () {
  return (

    <div className='relative flex flex-col gap-4 bg-white w-full h-full overflow-y-auto scrollbar-hide'> 
      <div className='top-0 z-10 sticky bg-white shadow-md w-full'>
        <SearchMessages />
      </div>
      <div className='flex-1 px-4'> 
        <AllMessages />
      </div>

    </div>
  )
}