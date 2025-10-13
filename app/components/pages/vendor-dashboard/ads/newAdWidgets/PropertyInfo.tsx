export default function LocationForm () {
  return (
    <form action='flex flex-col gap-2 mt-4'>
      <div className='gap-2 grid grid-cols-1 md:grid-cols-2 mt-4 w-full'>
        <div className='flex flex-col gap-1'>
          <label
            className='font-semibold text-[14px] text-[var(--heading-color)]'
            htmlFor='street'
          >
            Listing
          </label>
          <select
            name='adlisting'
            id='adlisting'
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
          >
            <option value=''>Select Listing</option>
            <option value=''>Select Listing</option>
          </select>
        </div>
        <div className='flex flex-col gap-1'>
          <label
            className='font-semibold text-[14px] text-[var(--heading-color)]'
            htmlFor='area'
          >
            Size (sq ft)
          </label>
          <input
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
            type='text'
            placeholder='House Size'
          />
        </div>
      </div>
      <div className='gap-2 grid grid-cols-1 md:grid-cols-2 w-full'>
        <div className='flex flex-col gap-1'>
          <label
            className='font-semibold text-[14px] text-[var(--heading-color)]'
            htmlFor='lga'
          >
            Bed Rooms
          </label>
          <input
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
            type='text'
            placeholder='4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            className='font-semibold text-[14px] text-[var(--heading-color)]'
            htmlFor='state'
          >
            Bath Rooms
          </label>
          <input
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
            type='text'
            placeholder='2'
          />
        </div>
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <label
          className='font-semibold text-[14px] text-[var(--heading-color)]'
          htmlFor='country'
        >
          Pricing
        </label>
        <input
          className='bg-white px-4 py-1 border border-[var(--foundation-neutral-6)] rounded-sm'
          type='number'
          placeholder='50,000,000.00'
        />
      </div>
    </form>
  )
}
