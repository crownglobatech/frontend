export default function ContactInfo () {
  return (
    <div className='flex flex-col gap-2 mt-4'>
      <form className='flex flex-col gap-2'>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='email'
            className='font-semibold text-[14px] text-[var(--heading-color)]'
          >
            Email <span className='text-red-500'>*</span>
          </label>
          <input
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
            type='email'
            placeholder='example@gmail.com'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='phone'
            className='font-semibold text-[14px] text-[var(--heading-color)]'
          >
            Phone Number <span className='text-red-500'>*</span>
          </label>
          <input
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
            type='number'
            placeholder='91 2148 2621'
          />
        </div>
      </form>
    </div>
  )
}
