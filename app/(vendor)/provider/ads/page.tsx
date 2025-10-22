'use client'
import Loader from '@/app/components/general/Loader'
import AdCard from '@/app/components/pages/vendor-dashboard/ads/AdCard'
import AdFilter from '@/app/components/pages/vendor-dashboard/ads/AdFilter'
import HeaderBanner from '@/app/components/pages/vendor-dashboard/ads/HeaderBanner'
import { getAllAds } from '@/lib/api'
import { AllAdsResponse } from '@/lib/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AllAds () {
  const [ads, setAds] = useState<AllAdsResponse>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('User not authenticated')

        const data = await getAllAds(token)
        setAds(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAds()
  }, [])

  if (loading) return <Loader />
  console.log(ads)

  return (
    <>
      <div className='top-0 z-[1000] sticky w-full'>
        <HeaderBanner />
      </div>
      {/* sort and filters */}
      <div className='px-6 py-6'>
        <AdFilter />
      </div>
      {/* Ad Display */}
      <div className='flex flex-col items-center'>
        <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {/* {!ads && !loading ? (
            <div className='flex justify-center items-center space-x-1 h-screen font-semibold text-[16px] text-[var(--danger-color)]'>
              <span >Unable to fetch your Ads</span>
            </div>
          ) : (
            ''
          )} */}
          {ads?.data.data.map((listing, index) => (
            <Link href={`/provider/ads/${listing.id}`} key={index}>
              <AdCard
                baths={listing.bathrooms}
                beds={listing.bedrooms}
                image={listing.photo_urls[0]}
                location={listing.area}
                price={listing.price}
                rating={4.3}
                date={new Date(listing.created_at).toLocaleDateString('en-GB')}
                status={listing.status}
                title={listing.title}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
