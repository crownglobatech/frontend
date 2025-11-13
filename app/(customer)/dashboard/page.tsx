'use client'

import { useEffect, useState } from 'react'
import CustomerHeader from './components/CustomerHeader'
import { getCustomerAds, getCustomerAdsWithoutToken } from '@/lib/api'
import { CustomerAd } from '@/lib/types'
import AdDisplay from './components/AdDisplay'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function CustomerDashboard() {
  const [token, setToken] = useState<string | null>(null)
  const [category, setCategory] = useState<string>('all')
  const [query, setQuery] = useState<string>('')
  const [filters, setFilters] = useState<Record<string, string | { min?: number; max?: number }>>({})
  const [ads, setAds] = useState<CustomerAd[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState<number | null>(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    const t = localStorage.getItem('token')
    setToken(t)
  }, [])

  const buildQueryParams = (): URLSearchParams => {
    const params = new URLSearchParams(searchParams.toString())
    const KNOWN_FILTERS = ['price', 'location', 'property_type', 'listing_type']

    // Clean old params
    KNOWN_FILTERS.forEach(key => {
      params.delete(key)
      params.delete(`${key}_min`)
      params.delete(`${key}_max`)
    })

    // Rebuild
    if (category && category !== 'all') params.set('category', category)
    if (query) params.set('search', query)
    else params.delete('search')

    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === 'string' && value) {
        params.set(key, value)
      } else if (typeof value === 'object' && value) {
        if (value.min != null) params.set(`${key}_min`, String(value.min))
        if (value.max != null) params.set(`${key}_max`, String(value.max))
      }
    })

    return params
  }

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true)

      const params = buildQueryParams()
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })

      try {
        let res
        if (token) {
          res = await getCustomerAds(token, category, { query, filters })
        } else {
          res = await getCustomerAdsWithoutToken(category)
        }
        setAds(res.data)
        setTotalResults(res.total)
      } catch (err) {
        console.error('Error fetching ads:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAds()
  }, [token, category, query, filters])

  return (
    <div>
      <div className='top-0 z-[50] sticky w-full'>
        <CustomerHeader
          currentCategory={category}
          setCategory={setCategory}
          query={query}
          setQuery={setQuery}
          filters={filters}
          setFilters={setFilters}
          totalResults={totalResults}
        />
      </div>

      <div className='px-6'>
        <AdDisplay ads={ads} loading={loading} />
      </div>
    </div>
  )
}
