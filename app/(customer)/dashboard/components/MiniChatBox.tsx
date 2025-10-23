export default function MiniChatBox () {
  return (
    <div className='flex flex-col items-center gap-2 shadow-lg hover:shadow-xl px-6 py-4 rounded-md transition-all duration-300'>
      <h2 className='font-semibold text-[18px] text-[var(--foundation-neutral-8)]'>
        Chat Vendor
      </h2>
      <input
        type='text'
        placeholder='Type your message'
        className='px-4 py-1.5 border border-[var(--foundation-neutral-6)] rounded-md text-[14px]'
      />
      <div>
        <button className='bg-[var(--primary-color)] mt-1 px-6 py-2 rounded-sm font-semibold text-[14px] text-white cursor-pointer'>
          Send Message
        </button>
      </div>
    </div>
  )
}
