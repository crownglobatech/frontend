import Image from 'next/image'
export default function CustomerHeader () {
  return (
    <div className='flex justify-between gap-[50px] bg-white px-6 py-4'>
      {/* search and location filters */}
      <div className='flex gap-2 w-full'>
        <select
          name=''
          id=''
          className='px-3 py-2 border border-[var(--heading-color)] rounded-sm text-[12px]'
        >
          <option value='1'>All Nigeria</option>
          <option value='1'>Oyo</option>
          <option value='1'>Plateau</option>
        </select>
        <input
          type='text'
          placeholder='Search for homes and services'
          className='px-4 py-2 border border-[var(--heading-color)] rounded-sm w-full text-[12px]'
        />
      </div>
      {/* profile and notification icons */}
      <div className='flex flex-row-reverse items-center gap-4'>
        <div className='shadow-md rounded-full'>
          <Image
            src='/user.png'
            alt='vendor profile avatar'
            className='object-contain cursor-pointer'
            height={40}
            width={40}
          />
        </div>
        <div className='shadow-md rounded-full'>
          <Image
            src='/notify.png'
            alt='vendor profile avatar'
            className='object-contain cursor-pointer'
            height={40}
            width={40}
          />
        </div>
      </div>
    </div>
  )
}
