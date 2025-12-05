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
    return res.data.data || res.data;
}