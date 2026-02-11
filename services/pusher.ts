import Pusher from "pusher-js";
import { Message } from "@/lib/types";
import { logger } from "@/lib/logger";

const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

let pusherClient: Pusher | null = null;

export const initPusher = () => {
  if (!pusherClient) {
    if (!PUSHER_KEY || !PUSHER_CLUSTER) {
      logger.error("Pusher key or cluster missing in .env.local");
      return null;
    }

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") || localStorage.getItem("access_token")
        : null;
        
    pusherClient = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      forceTLS: true,
      authEndpoint: process.env.NEXT_PUBLIC_BASE_URL + "/api/broadcasting/auth", // <<< FIXED: BaseURL/api/broadcasting/auth
      auth: {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    });
  }
  return pusherClient;
};
// In services/pusher.ts (or wherever you create the Pusher instance)
const pusher = initPusher();
// Expose for debugging (window as any).__debug_pusher = pusher;
if (typeof window !== "undefined") {
  (window as any).__debug_pusher = pusher;
}

export const subscribeToChat = (
  chatId: string,
  onMessage: (message: Message) => void
) => {
  // console.log('Initializing Pusher subscription for chat:', chatId);
  const pusher = initPusher();
  // console.log("Pusher instance:", pusher);
  if (!pusher) {
    logger.warn("Pusher not initialized");
    return () => {};
  }

  const channelName = `private-conversation.${chatId}`;
  // console.log("Subscribing to channel:", channelName);
  const channel = pusher.subscribe(channelName);
  // Bind to the FULL Laravel event name from your dashboard
  channel.bind("App\\Events\\MessageSent", (data: { message: Message }) => {
    console.log("Pusher data received:", data);
    onMessage(data.message);
  });

  // Optional: Fallback bind to short name if your backend is inconsistent
  channel.bind("MessageSent", (data: { message: Message }) => {
    console.log("Fallback short name triggered:", data);
    onMessage(data.message);
  });
  channel.bind("pusher:subscription_succeeded", () => {
    // console.log("✅ SUBSCRIBED SUCCESSFULLY:", channelName);
  });

  channel.bind("pusher:subscription_error", (status: any) => {
    logger.error("❌ SUBSCRIPTION ERROR:", status);
  });

  return () => {
    channel.unbind("App\\Events\\MessageSent");
    channel.unbind("MessageSent");
    pusher.unsubscribe(`private-conversation.${chatId}`);
  };
};

export const subscribeToNotification = (
  chatId: string,
  onMessage: (message: Message) => void
) => {
  // console.log("Initializing susbscription to notification channel");
  const pusher = initPusher();
  if (!pusher) {
    logger.warn("Pusher not initialized");
    return () => {};
  }
  const channelName = `private-notification.${chatId}`;
  logger.log("Subscribing to notification channel:", channelName);
  const channel = pusher.subscribe(channelName);

  channel.bind(
    "App\\Events\\NotificationSent",
    (data: { message: Message }) => {
      // console.log("Pusher notification data received:", data);
      onMessage(data.message);
    }
  );

  channel.bind("NotificationSent", (data: { message: Message }) => {
    // console.log("Pusher notification data received:", data);
    onMessage(data.message);
  });

  channel.bind("pusher:subscription_succeeded", () => {
    // console.log("✅ SUBSCRIBED SUCCESSFULLY:", channelName);
  });

  channel.bind("pusher:subscription_error", (status: any) => {
    logger.error("❌ SUBSCRIPTION ERROR:", status);
  });

  return () => {
    channel.unbind("App\\Events\\NotificationSent");
    channel.unbind("NotificationSent");
    pusher.unsubscribe(`private-notification.${chatId}`);
  };
};
