export interface Address {
  address_line1: string | null
  address_line2: string | null
  city: string | null
  state: string | null
  country: string | null
  postal_code?: string | null // optional if your backend includes it
}

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string | null
  role: string
  address: Address
}

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
  extra_attributes: Record<string, string> | null
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

export interface vendorAd {
  status: 'success' | 'error'
  data: Ad
}
export interface AnalyticsPerformance {
  title: string
  searches: number
  views: number
  clicks: number
  inquiries: number
  status: string
}

// For the "overview" object
export interface AnalyticsOverview {
  total_ads: number
  total_views: number
  total_searches: number
  total_clicks: number
  total_inquiries: number
  conversion_rate: number
}

export interface AnalyticsData {
  overview: AnalyticsOverview
  trend: unknown[] // 'trend' is an empty array
  performance: AnalyticsPerformance[]
}

export interface AnalyticsApiResponse {
  status: string
  data: AnalyticsData
}


// customer response type
export interface Category {
  id: number;
  name: string;
  created_at: string | null; 
  updated_at: string | null;
}

export interface Business {
  id: number;
  user_id: number;
  is_verified: number;
  business_name: string;
  category_id: number;
  logo: string | null;
  description: string | null;
  // --- Updated fields from your customer API response ---
  address_line1?: string;
  address_line2?: string | null;
  city?: string;
  state?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  // --- End of updated fields ---
  created_at: string;
  updated_at: string;
  category?: Category; // Added the nested category
}

export interface CustomerAd {
  id: number;
  title: string;
  description: string;
  price: string;
  listing_type: string;
  status: string;
  size: number;
  area: string;
  country: string;
  state: string;
  lga: string;
  street: string;
  latitude: string | null; // Updated to allow null
  longitude: string | null; // Updated to allow null
  bedrooms: number;
  bathrooms: number;
  email: string;
  phone_country_iso: string;
  phone_e164: string;
  photo_urls: string[];
  photos: string[];
  video_urls: string[] | null;
  videos: string[];
  extra_attributes: Record<string, string> | null;
  created_at: string;
  updated_at: string;
  business_id: number;
  business: Business; // Re-using the Business interface
}

// --- API Response for All Ads (Paginated) ---

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedData<T> {
  current_page: number;
  data: T[]; // Generic data type, e.g., Ad[]
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}
/* eslint-disable @typescript-eslint/no-empty-interface */
// try to not use the customeradresponse
export interface CustomerAdsResponse extends PaginatedData<CustomerAd> {
    _typeBrand?: 'CustomerAdsResponse'
}
/* eslint-enable @typescript-eslint/no-empty-interface */

export interface RecentActivity {
  title: string
  status: string
  updated_at: string
}

export interface RatingsFeedbacks {
  average_rating: number | null
  total_feedbacks: number
  recent_feedbacks: Feedback[]
}

export interface Feedback {
  // Add properties based on your actual feedback structure
  // Example:
  id?: string
  rating: number
  comment?: string
  user_name?: string
  created_at?: string
}

export interface DashboardData {
  views_over_time: ViewOverTime[]
  recent_activities: RecentActivity[]
  ratings_feedbacks: RatingsFeedbacks
}

export interface ViewOverTime {
  // Add properties based on your actual views data
  // Example:
  date: string
  views: number
}

export interface DashboardResponse {
  status: 'success' | 'error' // or string if you want more flexibility
  data: DashboardData
}