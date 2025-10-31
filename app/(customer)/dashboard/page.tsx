'use client'
import { useEffect, useState } from 'react'
import CustomerHeader from './components/CustomerHeader'
import { getCustomerAds } from '@/lib/api'
import { CustomerAd } from '@/lib/types'
import AdDisplay from './components/AdDisplay'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function CustomerDashboard () {
  const [token, setToken] = useState<string | null>('')
  const [category, setCategory] = useState<string>('all')
  const [loading, setLoading] = useState(false)
  const [ads, setAds] = useState<CustomerAd[] | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [totalResults, setTotalResults] = useState<number | null>(0)

  useEffect(() => {
    const userToken = localStorage.getItem('token')
    setToken(userToken)
    console.log(userToken)
  }, [])

  useEffect(() => {
    const fetchAllAds = async () => {
      if (!token) return
      // Update the URL query param
      const params = new URLSearchParams(searchParams.toString())
      params.set('category', category)
      router.replace(`${pathname}?${params.toString()}`)
      setLoading(true)

      try {
        const res = await getCustomerAds(token, category)
        setAds(res.data)
        setTotalResults(res.total)
        console.log('Fetched ads:', res.data)
      } catch (error) {
        console.error('Error fetching ads:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllAds()
  }, [token, category])

  return (
    <div>
      <div className='top-0 z-[50] sticky w-full'>
        <CustomerHeader setCategory={setCategory} totalResults={totalResults} currentCategory={category}/>
      </div>
      <div className='px-6'>
        <AdDisplay ads={ads} loading={loading} />
      </div>
    </div>
  )
}
