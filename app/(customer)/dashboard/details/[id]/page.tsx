import { CiLocationOn } from 'react-icons/ci'
import CustomerHeader from '../../components/CustomerHeader'
import Image from 'next/image'

export default function AdDetailsHomeScreen () {
  return (
    <div>
      {/* can be set to layout instead of repitition */}
      <div className='top-0 z-[1000] sticky w-full'>
        <CustomerHeader />
      </div>
      <div className='flex flex-col px-6'>
        {/* detail image */}
        <div className='rounded-md w-full'>
          <Image
            src='/bg-overlay.png'
            alt='detail image, could be a house or a service description image'
            width={300}
            height={300}
            className='rounded-md w-full max-h-[250px] object-cover'
          />
        </div>
        <div className='mt-4'>
          <div className=''>
            <div className='flex items-center gap-1'>
              <CiLocationOn size={12} />
              <p className='text-[10px] text-gray-500'>Agodi Awolowo, Ibadan</p>
            </div>
          </div>
          {/* ad title and price */}
          <div className='flex justify-between mt-1'>
            <h1 className='font-semibold text-[20px] text-black'>Vineyard Estate</h1>
            <h1 className='font-semibold text-[20px] text-[var(--heading-color)]'>₦50,000,000.00</h1>
          </div>
        </div>

        {/* provider profile and rating */}
        <div>

        </div>
      </div>
    </div>
  )
}
