// services/api-server.ts   ← ONLY import this in page.tsx or server actions
import axios from 'axios';
import { cookies } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export async function fetchConversationMessages(conversation_id: string) {
  let token: string | null = null;

  try {
    const cookieStore = await cookies();
    const t = cookieStore.get('token') ?? cookieStore.get('access_token');
    token = t?.value ?? null;
  } catch {
    // ignore
  }

  const response = await axios.get(`${baseUrl}/api/customer/chats/${conversation_id}/messages`, {
    headers: {
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return response.data.data as any[];
}