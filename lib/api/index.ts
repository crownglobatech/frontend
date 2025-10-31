export interface AdFormData {
  title: string
  description: string

  // Location
  street: string
  area: string
  lga: string
  state: string
  country: string

  // Property info
  listing_type: string
  size: string
  bedrooms: string
  bathrooms: string
  price: string

  // Media
  photos: File[]

  // Contact
  email: string
  phone_e164: string
  phone_country_iso: string
}
import { AllAdsResponse, CustomerAdsResponse } from '../types'

export async function postNewAd (formData: AdFormData) {
  const form = new FormData()

  try {
    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'photos' && Array.isArray(value)) {
        value.forEach(file => form.append('photos[]', file))
      } else if (typeof value === 'string' || value instanceof Blob) {
        form.append(key, value)
      }
    })

    const token = localStorage?.getItem('token')
    if (!token) {
      throw new Error('User not authenticated — token missing.')
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/ads`,
      {
        method: 'POST',
        body: form,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    // Handle non-OK responses gracefully
    if (!response.ok) {
      const errorData = await safeJson(response)
      throw new Error(
        errorData?.message || `Failed to post ad (status: ${response.status})`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Error posting new ad:', error)
    throw error
  }
}

// Helper to safely parse JSON responses.
async function safeJson (res: Response) {
  try {
    return await res.json()
  } catch {
    return null
  }
}

// get all available ads
export async function getAllAds (token: string): Promise<AllAdsResponse> {
  try {
    if (!token) {
      throw new Error('User not authenticated — token missing.')
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/all-ads`,
      {
        method: 'GET',
        next: {
          // Caching options
          revalidate: 60 // seconds to revalidate
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Failed to fetch ads: ${response.status} - ${text}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching all ads:', error)
    throw error
  }
}

// get specific ad detail
export async function getAdById (
  token: string,
  id: string
): Promise<AllAdsResponse> {
  try {
    if (!token) {
      throw new Error('User not authenticated — token missing.')
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/ads/${id}`,
      {
        method: 'GET',
        next: {
          // Caching options
          revalidate: 60 // seconds to revalidate
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Failed to fetch ads: ${response.status} - ${text}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching all ads:', error)
    throw error
  }
}

// Custoomer API Integration
export async function getCustomerAds (
  token: string,
  category: string
): Promise<CustomerAdsResponse> {
  try {
    if (!token) {
      throw new Error('User not authenticated - token missing')
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/ads/${category}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Failed to fetch ads: ${response.status} - ${text}`)
    }
    const data: CustomerAdsResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching all ads:', error)
    throw error
  }
}

export async function getCustomerAdsById (
  id: string
): Promise<CustomerAdsResponse> {
  try {
    if (!id) {
      throw new Error('No product was selected.')
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/ads/${id}`,
      {
        method: 'GET',
        next: {
          // Caching options
          revalidate: 60 // seconds to revalidate
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Failed to fetch ads: ${response.status} - ${text}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching all ads:', error)
    throw error
  }
}
