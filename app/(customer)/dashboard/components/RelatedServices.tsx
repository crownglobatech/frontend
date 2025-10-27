'use client'
import { useRef } from 'react'
import ApartmentCard from '@/app/components/general/ApartmentCard'
import Link from 'next/link'

export default function RelatedServices() {
  const scrollRef = useRef<HTMLDivElement>(null)
  let isDown = false
  let startX: number
  let scrollLeft: number

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true
    if (scrollRef.current) {
      startX = e.pageX - scrollRef.current.offsetLeft
      scrollLeft = scrollRef.current.scrollLeft
    }
  }

  const handleMouseLeave = () => (isDown = false)
  const handleMouseUp = () => (isDown = false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div
      ref={scrollRef}
      className='overflow-x-auto cursor-grab active:cursor-grabbing scrollbar-hide'
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className='flex gap-4 px-2 py-2 w-max'>
        <Link href='/dashboard/details/200'>
          <ApartmentCard
            baths={3}
            beds={4}
            image='/estate.png'
            location='Agodi Awolowo, Ibadan'
            price='50000000'
            rating={5}
            title='Vineyard Estate'
            providerVerified={true}
            status='For Sale'
          />
        </Link>

        <Link href='/dashboard/details/200'>
          <ApartmentCard
            baths={3}
            beds={4}
            image='/estate.png'
            location='Agodi Awolowo, Ibadan'
            price='50000000'
            rating={5}
            title='Vineyard Estate'
            providerVerified={true}
            status='For Rent'
          />
        </Link>
        <Link href='/dashboard/details/200'>
          <ApartmentCard
            baths={3}
            beds={4}
            image='/estate.png'
            location='Agodi Awolowo, Ibadan'
            price='50000000'
            rating={5}
            title='Vineyard Estate'
            providerVerified={true}
            status='For Sale'
          />
        </Link>

        <Link href='/dashboard/details/200'>
          <ApartmentCard
            baths={3}
            beds={4}
            image='/estate.png'
            location='Agodi Awolowo, Ibadan'
            price='50000000'
            rating={5}
            title='Vineyard Estate'
            providerVerified={true}
            status='For Rent'
          />
        </Link>
        <Link href='/dashboard/details/200'>
          <ApartmentCard
            baths={3}
            beds={4}
            image='/estate.png'
            location='Agodi Awolowo, Ibadan'
            price='50000000'
            rating={5}
            title='Vineyard Estate'
            providerVerified={true}
            status='For Sale'
          />
        </Link>

        <Link href='/dashboard/details/200'>
          <ApartmentCard
            baths={3}
            beds={4}
            image='/estate.png'
            location='Agodi Awolowo, Ibadan'
            price='50000000'
            rating={5}
            title='Vineyard Estate'
            providerVerified={true}
            status='For Rent'
          />
        </Link>
        <Link href='/dashboard/details/200'>
          <ApartmentCard
            baths={3}
            beds={4}
            image='/estate.png'
            location='Agodi Awolowo, Ibadan'
            price='50000000'
            rating={5}
            title='Vineyard Estate'
            providerVerified={true}
            status='For Sale'
          />
        </Link>

        <Link href='/dashboard/details/200'>
          <ApartmentCard
            baths={3}
            beds={4}
            image='/estate.png'
            location='Agodi Awolowo, Ibadan'
            price='50000000'
            rating={5}
            title='Vineyard Estate'
            providerVerified={true}
            status='For Rent'
          />
        </Link>

        <Link href='/dashboard/details/200'>
          <ApartmentCard
            baths={3}
            beds={4}
            image='/estate.png'
            location='Agodi Awolowo, Ibadan'
            price='50000000'
            rating={5}
            title='Vineyard Estate'
            providerVerified={true}
            status='For Sale'
          />
        </Link>
      </div>
    </div>
  )
}
