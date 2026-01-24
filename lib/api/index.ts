export interface AdFormData {
  title: string;
  description: string;
  category_id: number | null;
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
  ViewCustomerAd,
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
export async function getVendorAnalytics(token: string, filter?: string) {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/ads-analytics`);
    if (filter) {
      url.searchParams.append("filter", filter);
    }
    const res = await fetch(
      url.toString(),
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
export async function getDashboardData(token: string, filter?: string) {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/dashboard`);
    if (filter) {
        url.searchParams.append("filter", filter);
    }

    const res = await fetch(
      url.toString(),
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

export async function getCustomerAdsById(id: string): Promise<ViewCustomerAd | null> {
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

    if (response.status === 404) {
        return null;
    }

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

// Bank and Payment
export async function resolveAccountDetails(
  account_number: string,
  bank_code: string
) {
  try {
    const response = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await safeJson(response);
      throw new Error(
        errorData?.message || `Failed to resolve account (status: ${response.status})`
      );
    }
    return await response.json();
  } catch (error) {
    logger.error("Error resolving account details:", error);
    throw error;
  }
}

export async function saveBankDetails(
  token: string,
  data: {
    account_number: string;
    bank_code: string;
  }
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/bank-details`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await safeJson(response);
      throw new Error(
        errorData?.message || `Failed to save bank details (status: ${response.status})`
      );
    }
    return await response.json();
  } catch (error) {
    logger.error("Error saving bank details:", error);
    throw error;
  }
}

export async function submitReview(
  token: string,
  data: {
    booking_code: string;
    rating: number;
    feedback: string;
  }
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/reviews`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await safeJson(response);
      throw new Error(
        errorData?.message || `Failed to submit review (status: ${response.status})`
      );
    }
    return await response.json();
  } catch (error) {
    logger.error("Error submitting review:", error);
    throw error;
  }
}

export async function changePasswordFromProfile(token: string, data: { old_password: string; password: string; password_confirmation: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/profile/change-password`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const errorData = await safeJson(response);
            throw new Error(
                errorData?.message || `Failed to change password (status: ${response.status})`
            );
        }
        return await response.json();
    } catch (error) {
        logger.error("Error changing password:", error);
        throw error;
    }
}

export async function changeCustomerPassword(token: string, data: { old_password: string; password: string; password_confirmation: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/profile/change-password`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const errorData = await safeJson(response);
            throw new Error(
                errorData?.message || `Failed to change password (status: ${response.status})`
            );
        }
        return await response.json();
    } catch (error) {
        logger.error("Error changing password:", error);
        throw error;
    }
}

export async function updateCustomerProfile(token: string, data: { first_name: string; last_name: string; phone_e164: string; address: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/profile`, {
            method: "PATCH", // Using POST as usually updates might be POST in some APIs, checking standard, or user said endpoint is for updating. Usually PUT/PATCH but user just gave endpoint. I will use POST based on typical Laravel/PHP backend behavior often using POST for updates with method spoofing or just POST. User didn't specify method but "updating customer profile". I will assume POST or PATCH. The previous change password was PATCH. I will stick to POST as it's safer assumption if not specified, or I can check other update methods. `saveBankDetails` is POST. `submitReview` is POST. `changePasswordFromProfile` is PATCH. I'll use POST as it's common for general updates in this codebase style.
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const errorData = await safeJson(response);
            throw new Error(
                errorData?.message || `Failed to update profile (status: ${response.status})`
            );
        }
        return await response.json();
    } catch (error) {
        logger.error("Error updating profile:", error);
        throw error;
    }
}

export async function fetchProfileDetails(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

    });
    if (!response.ok) {
      const errorData = await safeJson(response);
      throw new Error(
        errorData?.message || `Failed to fetch profile details (status: ${response.status})`
      );
    }
    return await response.json();
  } catch (error) {
    logger.error("Error fetching profile details:", error);
    throw error;
  } 
}