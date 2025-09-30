import Button from '../../general/Button'

export default function HomeFilter () {
  return (
    <div className='w-full'>
      <div className='flex justify-center gap-1'>
        <Button
          styles='bg-[var(--secondary-color)] w-[60px] text-sm font-semibold rounded-t-[4px] text-white uppercase p-1'
          title='buy'
        />
        <Button
          styles='bg-white text-[var(--heading-color)] rounded-t-[4px] w-[60px] text-sm font-semibold uppercase p-1'
          title='rent'
        />
      </div>
      <div className='flex justify-center bg-white shadow-lg p-6 rounded-md'>
        <form className='flex flex-wrap md:flex-nowrap items-end gap-6 w-full max-w-6xl'>
          {/* Looking For */}
          <div className='flex flex-col flex-1 min-w-[180px]'>
            <label
              className='mb-1 font-semibold text-[var(--heading-color)] text-sm uppercase'
              htmlFor='looking'
            >
              Looking For
            </label>
            <div className='relative w-48'>
              <select
                name='looking'
                id='looking'
                className='bg-white px-4 pr-10 border border-gray-300 focus:border-[var(--primary-color)] rounded-lg focus:outline-none w-full h-11 text-gray-400 appearance-none'
              >
                <option value=''>Property Type</option>
                <option value='Property A'>Property A</option>
                <option value='Property B'>Property B</option>
                <option value='Property C'>Property C</option>
                <option value='Property D'>Property D</option>
              </select>

              {/* Custom caret */}
              <svg
                className='top-1/2 right-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>

          {/* Location */}
          <div className='flex flex-col flex-1 min-w-[180px]'>
            <label
              className='mb-1 font-semibold text-[var(--heading-color)] text-sm uppercase'
              htmlFor='location'
            >
              Location
            </label>
            <div className='relative w-48'>
              <select
                name='location'
                id='location'
                className='bg-white px-4 pr-10 border border-gray-300 focus:border-[var(--primary-color)] rounded-lg focus:outline-none w-full h-11 text-gray-400 appearance-none'
              >
                <option value=''>Select Location</option>
                <option value='Location A'>Location A</option>
                <option value='Location B'>Location B</option>
                <option value='Location C'>Location C</option>
                <option value='Location D'>Location D</option>
              </select>

              {/* Custom caret */}
              <svg
                className='top-1/2 right-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>

          {/* Property Size */}
          <div className='flex flex-col flex-1 min-w-[150px]'>
            <label
              className='mb-1 font-semibold text-[var(--heading-color)] text-sm uppercase'
              htmlFor='size'
            >
              Property Size
            </label>
            <input
              className='shadow-sm px-4 border border-gray-300 focus:border-[var(--primary-color)] rounded-md focus:outline-none h-11 text-gray-700'
              type='number'
              placeholder='Bedrooms'
              min={0}
            />
          </div>

          {/* Budget */}
          <div className='flex flex-col flex-1 min-w-[150px]'>
            <label
              className='mb-1 font-semibold text-[var(--heading-color)] text-sm uppercase'
              htmlFor='budget'
            >
              Budget
            </label>
            <input
              className='shadow-sm px-4 border border-gray-300 focus:border-[var(--primary-color)] rounded-md focus:outline-none h-11 text-gray-700'
              type='number'
              placeholder='Max Price'
              min={0}
            />
          </div>

          {/* Search Button */}
          <div>
            <Button
              styles='bg-[var(--primary-color)] text-white px-6 py-2 rounded-md font-semibold capitalize h-11'
              title='Search'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
