import Image from 'next/image'
export default function AdChart () {
  return (
    <div className='flex flex-col gap-8 px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-md'>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-[14px] text-black'>
          Ad Views Over Time
        </h2>
        <select
          name='timeRange'
          id='timeRange'
          className='px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm text-[#334155] text-[12px]'
        >
          <option value='this week'>This Week</option>
          <option value='this month'>This Month</option>
        </select>
      </div>
      <div>
        <Image
          src='/viewchart.png'
          alt='views chart'
          height={300}
          width={300}
          className='w-full object-contain'
        />
      </div>
    </div>
  )
}
