import axios, { AxiosError } from "axios";
import { getTokenFromCookies } from "@/lib/utils";
import { logger } from "@/lib/logger";

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;
export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Auto-add Bearer token on client only
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      getTokenFromCookies() ||
      localStorage.getItem("token") ||
      localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      logger.warn("No auth token found");
    }
  }
  return config;
});

export const getMyBookings = async () => {
  const res = await apiClient.get("/customer/bookings");
  return res.data.data || res.data;
};
export const bookProvider = async (conversationId: string) => {
  try {
    const res = await apiClient.post(
      `/customer/conversations/${conversationId}/book`,
      {
        conversation_id: Number(conversationId), // Laravel sometimes needs it
      }
    );
    return res.data.data || res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Laravel-style error extraction
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Booking failed";
      throw new Error(message);
    }
  }
};
// edit the functins below to throw proper erros for proper ux
export const updateBookingStatus = async (
  status: string,
  bookingId: number
) => {
  const res = await apiClient.patch(`/customer/bookings/${bookingId}/status`, {
    status,
  });
  return res.data.data || res.data;
};
export const rejectBooking = async (bookingId: number) => {
  const res = await apiClient.post(`/customer/bookings/${bookingId}/reject`);
  logger.log(res);

  return res.data.data || res.data;
};

export const acceptCustomBooking = async (bookingId: number) => {
  const res = await apiClient.patch(`/customer/bookings/${bookingId}/accept`);
  logger.log(res);
  return res.data.data || res.data;
};

export const showBookingDetails = async (bookingId: number) => {
  const res = await apiClient.get(`/service-provider/bookings/${bookingId}`);
  logger.log(res.data.data);
  return res.data.data || res.data;
};
export const getProviderBookings = async () => {
  const res = await apiClient.get("/service-provider/bookings");
  logger.log(res.data.data);
  return res.data.data || res.data;
};
export const vendorRejectBooking = async (bookingId: number) => {
  const res = await apiClient.post(
    `/service-provider/bookings/${bookingId}/reject`
  );
  logger.log(res);
  return res;
};
export const vendorAcceptBooking = async (bookingCode: number) => {
  const res = await apiClient.patch(
    `/service-provider/bookings/${bookingCode}/accept`
  );
};

export const customerUpdateStatus = async (
  status: string,
  bookingId: number
) => {
  const res = await apiClient.patch(`/customer/bookings/${bookingId}/status`, {
    status: status,
  });
  logger.log(res.data);
};
export const markStatusAsCompleted = async (
  status: string,
  bookingId: number
) => {
  const res = await apiClient.patch(
    `/service-provider/bookings/${bookingId}/status`,
    {
      status: status,
    }
  );
};
export const confirmCompletion = async (
  status: string,
  bookingCode: string
) => {
  const res = await apiClient.patch(
    `/customer/bookings/${bookingCode}/status`,
    {
      status: status,
    }
  );
  return res.data;
};

export const initiateCustomBooking = async (
  conversationId: string,
  customPrice: number
) => {
  try {
    const res = await apiClient.post(
      `/service-provider/conversations/${conversationId}/custom-offer`,
      {
        conversation_id: Number(conversationId),
        custom_price: customPrice,
      }
    );
    return res.data.data || res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Booking failed";
      throw new Error(message);
    }
  }
};

export const initializePayment = async (bookingCode: string) => {
  try {
    const res = await apiClient.post(`/customer/payments/initialize`, {
      booking_code: bookingCode,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Payment failed";
      throw new Error(message);
    }
  }
};
