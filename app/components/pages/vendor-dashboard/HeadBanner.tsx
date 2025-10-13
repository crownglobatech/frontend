import Image from 'next/image'
import Rating from '../../general/Rating'
export default function HeaderBanner () {
  return (
    <div className='bg-white shadow-lg px-6 py-4 w-full'>
      {/* welcome user */}
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-[20px]'>Welcome, Oluwapelumi</h2>
        {/* icons */}
        <div className='flex flex-row-reverse items-center gap-8'>
          <Rating rate={5} />
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
    </div>
  )
}
