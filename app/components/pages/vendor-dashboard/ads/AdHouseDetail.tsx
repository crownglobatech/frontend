import Image from 'next/image'
import { CiLocationOn } from 'react-icons/ci'
export default function HouseDetail () {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-[18px] text-[var(--heading-color)]'>
          Vineyard Estate
        </h2>
        <div className='bg-[#C8FFD5] px-4 py-1 rounded-full font-semibold text-[var(--success-color)]'>
          Active
        </div>
      </div>
      <div>
        <Image
          src='/bg-overlay.png'
          alt='house image'
          width={300}
          height={300}
          className='w-full object-contain'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-1'>
          <CiLocationOn size={12} />
          <p className='text-[12px] text-[var(--foundation-neutral-8)]'>
            Agodi Awolowo, Ibadan
          </p>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between'>
            <h2 className='font-semibold text-[16px] text-[var(--heading-color)]'>
              Service Description
            </h2>
            <h2 className='font-semibold text-[var(--heading-color)]'>
              ₦50,000,000.00
            </h2>
          </div>
          <p className='text-[14px] text-[var(--foundation-neutral-8)]'>
            Nestled in a serene and well-developed neighborhood, Vineyard Estate
            offers the perfect blend of comfort, elegance, and modern living.
          </p>
        </div>
        <div className='flex justify-between'> 
          <div>
            <h2 className='font-semibold text-[16px] text-[var(--heading color)]'>Category</h2>
            <p className='text-[14px] text-[var(--foundation-neutral-8)]'>Real Estate</p>
          </div>
          <div>
            <h2 className='font-semibold text-[16px] text-[var(--heading color)]'>Listing</h2>
            <p className='text-[14px] text-[var(--foundation-neutral-8)]'>Rent</p>
          </div>
          <div>
            <h2 className='font-semibold text-[16px] text-[var(--heading color)]'>Bath Room</h2>
            <p className='text-[14px] text-[var(--foundation-neutral-8)]'>4</p>
          </div>
          <div>
            <h2 className='font-semibold text-[16px] text-[var(--heading color)]'>Bed Room</h2>
            <p className='text-[14px] text-[var(--foundation-neutral-8)]'>4</p>
          </div>
        </div>
      </div>
    </div>
  )
}
