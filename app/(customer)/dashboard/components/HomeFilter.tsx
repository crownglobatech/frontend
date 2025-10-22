import { FaChevronDown } from 'react-icons/fa'

export default function HomeFilter () {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between py-2 border-[var(--heading-color)] border-b'>
        <div className='flex items-center gap-6'>
          <span className='font-semibold text-[14px] text-[var(--primary-color)]'>
            All Listings
          </span>
          <span className='text-[14px] text-[var(--muted-text)]'>Buy Homes</span>
          <span className='text-[14px] text-[var(--muted-text)]'>Rent Homes</span>
          <span className='text-[14px] text-[var(--muted-text)]'>Allied Services</span>
        </div>
        <div className='flex items-center gap-6'>
          <span className='font-bold text-[var(--heading-color)]'>Filters</span>
          <span className='font-bold text-[var(--heading-color)]'>Sorting</span>
        </div>
      </div>
      <div className='flex gap-4 mt-2'>
        <div className='flex justify-center items-center gap-2 bg-[var(--foundation-primary)] px-4 py-1.5 rounded-sm cursor-pointer'>
          <select
            name='price'
            id='price'
            className='w-full font-semibold text-[14px] text-[var(--heading-color)] appearance-none cursor-pointer'
          >
            <option value='Price Range'>Price Range</option>
            <option value='Price Range'>Price Range</option>
          </select>
          {/* Chevron icon */}
          <FaChevronDown
            size={14}
            className='text-black pointer-events-none'
          />
        </div>
        <div className='flex justify-center items-center gap-2 bg-[var(--foundation-primary)] px-4 py-1.5 rounded-sm cursor-pointer'>
          <select
            name='price'
            id='price'
            className='w-full font-semibold text-[14px] text-[var(--heading-color)] appearance-none cursor-pointer'
          >
            <option value='Location'>Location</option>
            <option value='Location'>Location</option>
          </select>
          {/* Chevron icon */}
          <FaChevronDown
            size={14}
            className='text-black pointer-events-none'
          />
        </div>
        <div className='flex justify-center items-center gap-2 bg-[var(--foundation-primary)] px-4 py-1.5 rounded-sm cursor-pointer'>
          <select
            name='price'
            id='price'
            className='w-full font-semibold text-[14px] text-[var(--heading-color)] appearance-none cursor-pointer'
          >
            <option value='Property Type'>Property Type</option>
            <option value='Property Type'>Property Type</option>
          </select>
          {/* Chevron icon */}
          <FaChevronDown
            size={14}
            className='text-black pointer-events-none'
          />
        </div>
        <div className='flex justify-center items-center gap-2 bg-[var(--foundation-primary)] px-4 py-1.5 rounded-sm cursor-pointer'>
          <select
            name='servicetype'
            id='servicetype'
            className='w-full font-semibold text-[14px] text-[var(--heading-color)] appearance-none cursor-pointer'
          >
            <option value='Service Type'>Service Type</option>
            <option value='Service Type'>Service Type</option>
          </select>
          {/* Chevron icon */}
          <FaChevronDown
            size={14}
            className='text-black pointer-events-none'
          />
        </div>
        <div className='flex justify-center items-center gap-2 bg-[var(--foundation-primary)] px-4 py-1.5 rounded-sm cursor-pointer'>
          <select
            name='rating'
            id='rating'
            className='w-full font-semibold text-[14px] text-[var(--heading-color)] appearance-none cursor-pointer'
          >
            <option value='Rating'>Rating</option>
            <option value='Rating'>Rating</option>
          </select>
          {/* Chevron icon */}
          <FaChevronDown
            size={14}
            className='text-black pointer-events-none'
          />
        </div>
      </div>
      <span className='mt-2 text-[14px] text-[var(--muted-text)]'>99.3k results</span>
    </div>
  )
}
