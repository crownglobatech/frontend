// AllMessages.tsx

import MessageShowcaseCard from './MessageShowCaseCard'

export default function AllMessages () {
  return (
    // 1. Change the outer div to flex-1 (to ensure it fills its parent container, which is already set in ChatPane)
    // 2. Set overflow-y-auto to enable vertical scrolling when content exceeds the container height
    // 3. Remove the existing py-6 (we'll add padding to the inner container)
    <div className='px-4 w-full'>
      <div className='flex flex-col gap-4'>
        {' '}
        {/* Added py-6 back here for inner padding */}
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
        <MessageShowcaseCard />
      </div>
    </div>
  )
}
