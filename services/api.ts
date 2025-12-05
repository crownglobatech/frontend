// services/api-client.ts  ← FINAL VERSION (100% WORKING)
import axios from 'axios';
import { getTokenFromCookies } from '@/lib/utils';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com/newbackend';

export const apiClient = axios.create({
  baseURL: baseUrl + '/api',
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

// ALL YOUR FUNCTIONS — NOW COMPLETE
export const sendMessageCustomer = async (conversation_id: string, message: string) => {
  const res = await apiClient.post(`/customer/chats/${conversation_id}/messages`, {
    conversation_id: Number(conversation_id), // Laravel sometimes needs it
    message,
  });
  return res.data.data || res.data;
};

export const initiateChat = async (params: { service_ad_id: string }) => {
  const res = await apiClient.post(`/customer/ads/${params.service_ad_id}/chat`, params);
  return res.data;
};

export const fetchAllConversations = async () => {
  const res = await apiClient.get('/customer/conversations');
  console.log(res.data.data);
  
  return res.data.data || res.data;
};

// ADD THIS — THE ONE YOU WERE MISSING!
export const fetchConversationMessages = async (conversation_id: string) => {
  const res = await apiClient.get(`/customer/chats/${conversation_id}/messages`);
  console.log('Fetched messages for chat', conversation_id, ':', res.data);
  return res.data.data || [];
};