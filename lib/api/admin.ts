import { logger } from "../logger";

const base = process.env.NEXT_PUBLIC_BASE_URL;

export const getAdminAnalytics = async (token: string) => {
  if (!base) throw new Error("Base URL not defined");
  if (!token) throw new Error("User not authenticated — token missing.");
  try {
    const response = await fetch(`${base}/api/admin/analytics`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch admin analytics data.");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error; // preserve message + stack
    }
    throw new Error("Unknown Error");
  }
};

export const getAllBookingsAdmin = async (token: string, page?: number) => {
  if (!base) throw new Error("Base URL not defined");
  if (!token) throw new Error("User not authenticated — token missing.");
  try {
    const response = await fetch(`${base}/api/admin/bookings?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch admin bookings data.");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error; // preserve message + stack
    }
    throw new Error("Unknown Error");
  }
};

export const getAllVendorsAdmin = async (token: string, page?: number) => {
  if (!base) throw new Error("Base URL not defined");
  if (!token) throw new Error("User not authenticated — token missing.");
  try {
    const response = await fetch(`${base}/api/admin/vendors?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch admin vendors data.");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error; // preserve message + stack
    }
    throw new Error("Unknown Error");
  }
};

export const getAllUsersAdmin = async (token: string, page?: number) => {
  if (!base) throw new Error("Base URL not defined");
  if (!token) throw new Error("User not authenticated — token missing.");
  try {
    const response = await fetch(`${base}/api/admin/users?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch admin users data.");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error; // preserve message + stack
    }
    throw new Error("Unknown Error");
  }
};

export const getAdminDashboardData = async (token: string) => {
  if (!base) throw new Error("Base URL not defined");
  if (!token) throw new Error("User not authenticated — token missing.");
  try {
    const response = await fetch(`${base}/api/admin/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch admin users data.");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error; // preserve message + stack
    }
    throw new Error("Unknown Error");
  }
};


export const getAllCategories = async () => {
  try {
    const response = await fetch(`${base}/api/categories`);
  const data = await response.json();
  if(!response.ok){
    throw new Error (data.message || "Failed to fetch categories" )
  }
  return data.data;
  } catch (error) {
    logger.error(error)
  }
}