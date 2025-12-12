import { CiLocationOn } from 'react-icons/ci'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select'
import Image from 'next/image'
import Rating from '@/app/components/general/Rating'
import ReviewCard from '../../components/ReviewCard'
import CreateReview from '../../components/CreateReview'
import MiniChatBox from '../../components/MiniChatBox'
import { getCustomerAdsById } from '@/lib/api'
import { notFound } from 'next/navigation'
import RelatedServicesSection from './RelatedServicesSection'
import ProfileDisplaySection from './ProfileDisplaySection'

interface Props {
  params: Promise<{ detailId: string }>
}
export default async function AdDetailsHomeScreen({ params }: Props) {
  const { detailId } = await params
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
        {/* --- Top Bar --- */}
        <div className='flex justify-between gap-[50px] bg-white shadow-sm px-6 py-4'>
          <div className='flex gap-2 w-full'>
            <div className='relative w-[100px]'>
              <Select>
                <SelectTrigger className='w-full font-semibold text-[12px] text-gray-800'>
                  <SelectValue placeholder='All Areas' />
                </SelectTrigger>
                <SelectContent className='z-[9999] rounded-sm text-[12px]'>
                  <SelectItem value='all'>All Areas</SelectItem>
                  <SelectItem value='oyo'>Oyo</SelectItem>
                  <SelectItem value='plateau'>Plateau</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <input
              type='text'
              placeholder='Search for homes and services'
              className='px-4 py-2 border border-gray-300 rounded-sm w-full text-[12px]'
            />
          </div>

          <ProfileDisplaySection />
        </div>
      </div>
      <div className='flex flex-col px-6'>
        {/* detail image */}
        <div className='rounded-md w-full'>
          <Image
            src={adData.photo_urls[0]}
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
              <p className='text-[10px] text-gray-500'>
                {adData.area || 'Location not stated'}
              </p>
            </div>
          </div>
          {/* ad title and price */}
          <div className='flex justify-between mt-1'>
            <h1 className='font-semibold text-[20px] text-black'>
              {adData.title || 'Title not stated'}
            </h1>
            <h1 className='font-semibold text-[20px] text-[var(--heading-color)]'>
              ₦{adData.price}
            </h1>
          </div>
        </div>

        {/* provider profile and rating */}
        <div className='relative flex items-center gap-4 mt-4'>
          <div className='top-10 right-0 absolute'>
            <MiniChatBox userId={detailId} />
          </div>
          <div className='flex items-center gap-2'>
            <Image
              alt='profile avatar'
              src='/user.png'
              width={30}
              height={30}
              className='rounded-full object-contain'
            />
            <h2 className='font-semibold text-[12px]'>
              {adData.business.business_name || 'Business name  stated'}
            </h2>
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
              {adData.description || 'Description not available'}
            </p>
          </div>

          {/* category and inner features
          <div>

          </div> */}

          {/* gallery (images) */}
          <div className='flex flex-col items-start gap-4'>
            <h2 className='font-semibold text-[18px] text-black'>Gallery</h2>
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
              {adData.photo_urls.map((url, index) => {
                return (
                  <Image
                    key={index}
                    alt={url.slice(69, 150)}
                    src={url}
                    width={300}
                    height={300}
                    className='rounded-md h-[260px] object-cover'
                  />
                )
              })}
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
        <RelatedServicesSection />
      </div>
    </div>
  )
}
