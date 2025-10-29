// ChatPane.tsx (Corrected)

import AllMessages from './AllMessages'
import SearchMessages from './ChatPaneSearch'

export default function ChatPane () {
  return (
    // 1. MUST use flex-col and h-full to establish the fixed height and vertical stack.
    // 2. overflow-y-hidden prevents the entire pane from scrolling, forcing internal scroll.
    <div className='relative flex flex-col gap-4 bg-white w-full h-full overflow-y-auto scrollbar-hide'> 

      {/* SearchMessages: Use sticky to fix it to the top of the scroll container. */}
      {/* It will stay within the boundaries of the ChatPane's width. */}
      <div className='top-0 z-10 sticky bg-white shadow-md w-full'>
        <SearchMessages />
      </div>

      {/* AllMessages Wrapper: MUST use flex-1 to occupy the remaining vertical space. */}
      <div className='flex-1 px-4'> 
        <AllMessages />
      </div>

    </div>
  )
}