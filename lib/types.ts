export interface AllAdsResponse {
  status: 'success' | 'error'
  data: {
    current_page: number
    data: Ad[]
    first_page_url: string
    from: number | null
    last_page: number
    last_page_url: string
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
  }
}

export interface Ad {
  id: number
  title: string
  description: string
  price: string
  listing_type: string
  status: string
  size: number
  area: string
  country: string
  state: string
  lga: string
  street: string
  latitude: string
  longitude: string
  bedrooms: number
  bathrooms: number
  email: string
  phone_country_iso: string
  phone_e164: string
  photo_urls: string[]
  photos: string[]
  video_urls: string[] | null
  videos: string[]
  extra_attributes: Record<string, any> | null
  created_at: string
  updated_at: string
  business_id: number
  business: {
    id: number
    user_id: number
    is_verified: number
    business_name: string
    category_id: number
    logo: string | null
    description: string | null
    created_at: string
    updated_at: string
  }
}
