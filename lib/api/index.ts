export interface AdFormData {
  title: string;
  description: string;

  // Location
  street: string;
  area: string;
  lga: string;
  state: string;
  country: string;

  // Property info
  listing_type: string;
  size: string;
  bedrooms: string;
  bathrooms: string;
  price: string;

  // Media
  photos: File[];

  // Contact
  email: string;
  phone_e164: string;
  phone_country_iso: string;
}
import {
  AllAdsResponse,
  CustomerAd,
  CustomerAdsResponse,
  DashboardResponse,
  vendorAd,
} from "../types";
import { logger } from "@/lib/logger";

export async function postNewAd(formData: AdFormData) {
  const form = new FormData();

  try {
    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "photos" && Array.isArray(value)) {
        value.forEach((file) => form.append("photos[]", file));
      } else if (typeof value === "string" || value instanceof Blob) {
        form.append(key, value);
      }
    });

    const token = localStorage?.getItem("token");
    if (!token) {
      throw new Error("User not authenticated — token missing.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/ads`,
      {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle non-OK responses gracefully
    if (!response.ok) {
      const errorData = await safeJson(response);
      throw new Error(
        errorData?.message || `Failed to post ad (status: ${response.status})`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error("Error posting new ad:", error);
    throw error;
  }
}

// Helper to safely parse JSON responses.
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// get all available ads
export async function getAllAds(token: string): Promise<AllAdsResponse> {
  try {
    if (!token) {
      throw new Error("User not authenticated — token missing.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/all-ads`,
      {
        method: "GET",
        next: {
          // Caching options
          revalidate: 60, // seconds to revalidate
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch ads: ${response.status} - ${text}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    logger.error("Error fetching all ads:", error);
    throw error;
  }
}

// get specific ad detail
export async function getAdById(token: string, id: string): Promise<vendorAd> {
  try {
    if (!token) {
      throw new Error("User not authenticated — token missing.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/ads/${id}`,
      {
        method: "GET",
        next: {
          // Caching options
          revalidate: 60, // seconds to revalidate
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch ads: ${response.status} - ${text}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    logger.error("Error fetching all ads:", error);
    throw error;
  }
}

// Analytics
export async function getVendorAnalytics(token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/ads-analytics`,
      {
        method: "GET",
        next: {
          // Caching options
          revalidate: 60, // seconds to revalidate
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch ads: ${res.status} - ${text}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    logger.error("Error fetching all ads:", error);
    throw error;
  }
}

// vendor dashboard data
export async function getDashboardData(token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/dashboard`,
      {
        method: "GET",
        next: {
          // Caching options
          revalidate: 60, // seconds to revalidate
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch ads: ${res.status} - ${text}`);
    }
    const data: DashboardResponse = await res.json();
    return data;
  } catch (error) {
    logger.error("Error fetching all ads:", error);
    throw error;
  }
}
// Custoomer API Integration
export interface GetCustomerAdsOptions {
  query?: string;
  filters?: Record<string, string | { min?: number; max?: number }>;
}

export async function getCustomerAds(
  token: string,
  category: string,
  current_page: number,
  options: GetCustomerAdsOptions = {}
): Promise<CustomerAdsResponse> {
  if (!token) throw new Error("User not authenticated");

  const { query, filters = {} } = options;
  const url = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/ads/${category}?page=${current_page}`
  );

  // Query param
  if (query) url.searchParams.set("search", query);
  // Filters
  Object.entries(filters).forEach(([key, value]) => {
    if (!value) {
      url.searchParams.delete(key);
      url.searchParams.delete(`${key}_min`);
      url.searchParams.delete(`${key}_max`);
      return;
    }

    if (typeof value === "string") url.searchParams.set(key, value);
    else {
      if (value.min != null)
        url.searchParams.set(`${key}_min`, String(value.min));
      else url.searchParams.delete(`${key}_min`);
      if (value.max != null)
        url.searchParams.set(`${key}_max`, String(value.max));
      else url.searchParams.delete(`${key}_max`);
    }
  });

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch ads: ${response.status} - ${text}`);
  }
  const data: CustomerAdsResponse = await response.json();
  return data;
}

export async function getCustomerAdsNoAuth(
  category: string,
  options: GetCustomerAdsOptions = {}
): Promise<CustomerAdsResponse> {
  const { query, filters = {} } = options;
  const url = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/ads/${category}`
  );

  // Query param
  if (query) url.searchParams.set("search", query);

  // Filters
  Object.entries(filters).forEach(([key, value]) => {
    if (!value) {
      url.searchParams.delete(key);
      url.searchParams.delete(`${key}_min`);
      url.searchParams.delete(`${key}_max`);
      return;
    }

    if (typeof value === "string") url.searchParams.set(key, value);
    else {
      if (value.min != null)
        url.searchParams.set(`${key}_min`, String(value.min));
      else url.searchParams.delete(`${key}_min`);
      if (value.max != null)
        url.searchParams.set(`${key}_max`, String(value.max));
      else url.searchParams.delete(`${key}_max`);
    }
  });

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch ads: ${response.status} - ${text}`);
  }

  const data: CustomerAdsResponse = await response.json();
  return data;
}

export async function getCustomerAdsById(id: string): Promise<CustomerAd> {
  try {
    if (!id) {
      throw new Error("No product was selected.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/ads/${id}`,
      {
        method: "GET",
        next: {
          // Caching options
          revalidate: 60, // seconds to revalidate
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch ads: ${response.status} - ${text}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    logger.error("Error fetching all ads:", error);
    throw error;
  }
}
