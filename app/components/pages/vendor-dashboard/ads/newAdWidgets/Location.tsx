export default function LocationForm () {
  return (
    <form action='flex flex-col gap-2 mt-4'>
      <div className='gap-2 grid grid-cols-1 md:grid-cols-2 mt-4 w-full'>
        <div className='flex flex-col gap-1'>
          <label
            className='font-semibold text-[14px] text-[var(--heading-color)]'
            htmlFor='street'
          >
            Street
          </label>
          <input
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
            type='text'
            placeholder='Carlton Street'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            className='font-semibold text-[14px] text-[var(--heading-color)]'
            htmlFor='area'
          >
            Area
          </label>
          <input
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
            type='text'
            placeholder='Molete'
          />
        </div>
      </div>
      <div className='gap-2 grid grid-cols-1 md:grid-cols-2 w-full'>
        <div className='flex flex-col gap-1'>
          <label
            className='font-semibold text-[14px] text-[var(--heading-color)]'
            htmlFor='lga'
          >
            LGA
          </label>
          <input
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
            type='text'
            placeholder='Ibadan North'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            className='font-semibold text-[14px] text-[var(--heading-color)]'
            htmlFor='state'
          >
            State
          </label>
          <input
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
            type='text'
            placeholder='Oyo State'
          />
        </div>
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <label
          className='font-semibold text-[14px] text-[var(--heading-color)]'
          htmlFor='country'
        >
          Country
        </label>
        <input
          className='bg-white px-4 py-1 border border-[var(--foundation-neutral-6)] rounded-sm'
          type='text'
          placeholder='Nigeria'
        />
      </div>
    </form>
  )
}
