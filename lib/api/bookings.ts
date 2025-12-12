import axios from 'axios';
import { getTokenFromCookies } from '@/lib/utils';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;
export const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Auto-add Bearer token on client only
apiClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token =
            getTokenFromCookies() ||
            localStorage.getItem('token') ||
            localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn('No auth token found');
        }
    }
    return config;
});

export const getMyBookings = async () => {
    const res = await apiClient.get('/customer/bookings');
    return res.data.data || res.data;
}
export const bookProvider = async (conversationId: string) => {
    const res = await apiClient.post(`/customer/conversations/${conversationId}/book`, {
        conversation_id: Number(conversationId), // Laravel sometimes needs it
    });
    console.log(res.data.data);
    
    return res.data.data || res.data;
}
export const updateBookingStatus = async ( status: string, bookingId: number) => {
    const res = await apiClient.patch(`/customer/bookings/${bookingId}/status`, { status });
    return res.data.data || res.data;
}
export const rejectBooking = async ( bookingId: number) => {
    const res = await apiClient.post(`/customer/bookings/${bookingId}/reject`);
    console.log(res);
    
    return res.data.data || res.data;
}

export const showBookingDetails = async ( bookingId: number) => {
    const res = await apiClient.get(`/service-provider/bookings/${bookingId}`);
    console.log(res.data.data);
    return res.data.data || res.data;
}
export const getProviderBookings = async () => {
    const res = await apiClient.get('/service-provider/bookings');
    console.log(res.data.data);
    return res.data.data || res.data;
}
export const vendorRejectBooking =  async (bookingId: number) => {
    const res = await apiClient.post(`service-provider/bookings/${bookingId}/reject`)
    console.log(res);
    return res
    
}
export const vendorAcceptBooking = async (bookingId: number) => {
    const res = await apiClient.patch(`/service-provider/bookings/${bookingId}/accept`)
}

export const customerUpdateStatus = async (status: string, bookingId: number) => {
    const res = await apiClient.patch(`/customer/bookings/${bookingId}/status`, {
        status: status
    })
    console.log(res.data)
}
export const markStatusAsCompleted = async (status: string, bookingId: number) => {
    const res = await apiClient.patch(`/service-provider/bookings/${bookingId}/status`, {
        status: status
    })
}
export const confirmCompletion = async (status: string, bookingId: number) => {
     const res = await apiClient.patch(`/customer/bookings/${bookingId}/status`, {
        status: status
    })
}