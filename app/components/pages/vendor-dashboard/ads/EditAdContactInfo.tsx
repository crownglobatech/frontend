export default function EditContactInfo () {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-[16px] text-[var(--heading-color)]">Edit Contact Info</h2>
      <form className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor='email' className="font-semibold text-[var(--heading-color)]">Email <span className='text-red-500'>*</span></label>
          <input className="bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full" type='email' placeholder='example@gmail.com' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor='phone' className="font-semibold text-[var(--heading-color)]">Phone Number <span className='text-red-500'>*</span></label>
          <input className="bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full" type='number' placeholder='91 2148 2621' />
        </div>
      </form>
    </div>
  )
}
