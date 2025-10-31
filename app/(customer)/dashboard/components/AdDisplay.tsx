'use client'
import ApartmentCard from '@/app/components/general/ApartmentCard'
import Loader from '@/app/components/general/Loader'
import { CustomerAd } from '@/lib/types'
import Link from 'next/link'

interface AdDisplayProps {
  loading: boolean
  ads: CustomerAd[] | null
  error?: string | null
}

export default function AdDisplay ({ loading, ads, error }: AdDisplayProps) {
  // Loading state
  if (loading || ads === null) return <Loader />

  // Error state (API/network/etc.)
  if (error) {
    return (
      <div className='flex flex-col justify-center items-center py-10 text-center'>
        <p className='mb-3 font-medium text-gray-600 text-lg'>
          ⚠️ Unable to load listings
        </p>
        <p className='text-gray-500 text-sm'>
          {error || 'Something went wrong. Please try again later.'}
        </p>
      </div>
    )
  }

  // No results found (filters)
  if (!ads || ads.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center py-10 text-center'>
        <p className='mb-2 font-medium text-gray-600 text-lg'>
          No results found
        </p>
        <p className='text-gray-500 text-sm'>
          Try adjusting your filters or search criteria.
        </p>
      </div>
    )
  }

  // Normal results
  return (
    <div className=''>
      <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {ads.map(ad => (
          <Link href={`/dashboard/details/${ad.id}`} key={ad.id}>
            <ApartmentCard
              baths={ad.bathrooms}
              beds={ad.bedrooms}
              image={
                ad.photo_urls[0] ||
                'https://placehold.co/600x400/eee/ccc?text=No+Image'
              }
              location={ad.area}
              price={ad.price}
              rating={5}
              title={ad.title}
              providerVerified={ad.business.is_verified === 1}
              status={ad.listing_type}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
