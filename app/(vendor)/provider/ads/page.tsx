'use client'
import Loader from '@/app/components/general/Loader'
import AdCard from '@/app/components/pages/vendor-dashboard/ads/AdCard'
import AdFilter from '@/app/components/pages/vendor-dashboard/ads/AdFilter'
import HeaderBanner from '@/app/components/pages/vendor-dashboard/ads/HeaderBanner'
import { getAllAds } from '@/lib/api'
import { AllAdsResponse } from '@/lib/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const listings = [
  {
    id: 1,
    image: '/estate.png',
    title: 'Modern 2-Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '250,000',
    beds: 2,
    baths: 2,
    rating: 4.5,
    status: 'Active'
  },
  {
    id: 2,
    image: '/estate.png',
    title: 'Luxury 4-Bedroom Duplex',
    location: 'Gwarinpa, Abuja',
    price: '85,000,000',
    beds: 4,
    baths: 5,
    rating: 4.8,
    status: 'Active'
  },
  {
    id: 3,
    image: '/estate.png',
    title: 'Cozy Studio Apartment',
    location: 'Yaba, Lagos',
    price: '120,000',
    beds: 1,
    baths: 1,
    rating: 4.2,
    status: 'Inactive'
  },
  {
    id: 4,
    image: '/estate.png',
    title: 'Seaside Villa with Pool',
    location: 'Victoria Island, Lagos',
    price: '150,000,000',
    beds: 5,
    baths: 6,
    rating: 4.9,
    status: 'Active'
  },
  {
    id: 5,
    image: '/estate.png',
    title: '3-Bedroom Bungalow',
    location: 'Port Harcourt, Rivers',
    price: '45,000,000',
    beds: 3,
    baths: 3,
    rating: 4.1,
    status: 'Inactive'
  },
  {
    id: 6,
    image: '/estate.png',
    title: 'Urban Loft Apartment',
    location: 'Maitama, Abuja',
    price: '400,000',
    beds: 2,
    baths: 2,
    rating: 4.7,
    status: 'Active'
  },
  {
    id: 7,
    image: '/estate.png',
    title: 'Charming Country Cottage',
    location: 'Ibadan, Oyo',
    price: '25,000,000',
    beds: 3,
    baths: 2,
    rating: 4.3,
    status: 'Inactive'
  }
]

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
