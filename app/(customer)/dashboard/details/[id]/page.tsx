import { CiLocationOn } from 'react-icons/ci'
import CustomerHeader from '../../components/CustomerHeader'
import Image from 'next/image'
import Rating from '@/app/components/general/Rating'
import ReviewCard from '../../components/ReviewCard'
import CreateReview from '../../components/CreateReview'
import MiniChatBox from '../../components/MiniChatBox'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import RelatedServices from '../../components/RelatedServices'
import { getCustomerAdsById } from '@/lib/api'
import { Ad } from '@/lib/types'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}
export default async function AdDetailsHomeScreen ({ params }: Props) {
  const detailId = params.id
  let adData
  try {
    adData = await getCustomerAdsById(detailId)
    console.log(adData)
    if (!adData) {
      notFound()
    }
  } catch (error: unknown) {
    console.error('Failed to fetch ad:', error)
    if (error instanceof Error && error.message.includes('404')) {
      notFound()
    }
    throw error
  }
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
            <h1 className='font-semibold text-[20px] text-black'>
              Vineyard Estate
            </h1>
            <h1 className='font-semibold text-[20px] text-[var(--heading-color)]'>
              ₦50,000,000.00
            </h1>
          </div>
        </div>

        {/* provider profile and rating */}
        <div className='relative flex items-center gap-4 mt-4'>
          <div className='top-10 right-0 absolute'>
            <MiniChatBox />
          </div>
          <div className='flex items-center gap-2'>
            <Image
              alt='profile avatar'
              src='/user.png'
              width={30}
              height={30}
              className='rounded-full object-contain'
            />
            <h2 className='font-semibold text-[12px]'>Peter Omoh</h2>
          </div>
          <div className='flex items-center gap-2'>
            <Rating rate={5} />
          </div>
        </div>

        <div className='flex flex-col gap-4 mt-6 mb-8 w-[60%]'>
          {/* service description */}
          <div className='flex flex-col items-start gap-2'>
            <h2 className='font-semibold text-[18px] text-black'>
              Service Description
            </h2>
            <p className='max-w-[80%] text-[13px] text-[var(--foundation-neutral-8)]'>
              Nestled in a serene and well-developed neighborhood, Vineyard
              Estate offers the perfect blend of comfort, elegance, and modern
              living.
            </p>
          </div>

          {/* category and inner features
          <div>

          </div> */}

          {/* gallery (images) */}
          <div className='flex flex-col items-start gap-4'>
            <h2 className='font-semibold text-[18px] text-black'>Gallery</h2>
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
              <Image
                alt='house image'
                src='/bg-overlay.png'
                width={300}
                height={300}
                className='rounded-md object-cover'
              />
              <Image
                alt='house image'
                src='/bg-overlay.png'
                width={300}
                height={300}
                className='rounded-md object-contain'
              />
              <Image
                alt='house image'
                src='/bg-overlay.png'
                width={300}
                height={300}
                className='rounded-md object-contain'
              />
              <Image
                alt='house image'
                src='/bg-overlay.png'
                width={300}
                height={300}
                className='rounded-md object-contain'
              />
            </div>
          </div>

          {/* reviews */}
          <div>
            <div className='flex justify-between items-center gap-2 w-full'>
              <div className='flex justify-between items-center gap-2'>
                <h2 className='font-semibold text-[18px] text-black'>
                  Customers Reviews
                </h2>
                <div className='flex items-center gap-1'>
                  <div className='flex items-center gap-2'>
                    <Rating rate={5} />
                  </div>
                  <span className='text-[10px]'>(25 Reviews)</span>
                </div>
              </div>
              <h2 className='font-semibold text-[14px] text-[var(--primary-color)]'>
                More reviews
              </h2>
            </div>
            {/* all reviews */}
            <div className='gap-4 grid grid-cols-1 mt-4'>
              <ReviewCard />
              <ReviewCard />
            </div>
          </div>

          {/* create new review */}
          <div className='opacity-30'>
            <CreateReview />
          </div>
        </div>

        {/* Related Services */}
        <div className='-mx-6 mb-10'>
          {/* title + arrows */}
          <div className='flex justify-between items-center px-6'>
            <h2 className='font-semibold text-[18px] text-black'>
              Related Services
            </h2>
            <div className='flex items-center gap-2'>
              <ChevronLeftIcon
                className='cursor-pointer'
                size={30}
                color='black'
              />
              <ChevronRightIcon
                className='cursor-pointer'
                size={30}
                color='black'
              />
            </div>
          </div>

          {/* display of related services */}
          <div className='overflow-x-hidden'>
            <RelatedServices />
          </div>
        </div>
      </div>
    </div>
  )
}
