import { api } from "../../config/apis";
import type ChatMessage  from "../../domain/types/ChatTypes";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ جلب الرسائل
    getMessages: builder.query<ChatMessage[], { currentUserId: string; otherUserId: string }>({
      query: ({ currentUserId, otherUserId }) => ({
        url: `/api/chat/messages?currentUserId=${currentUserId}&otherUserId=${otherUserId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data.value,
    }),

    // 2️⃣ إرسال رسالة
    sendMessage: builder.mutation<string, { currentUserId: string; otherUserId: string; message: string }>({
      query: ({ currentUserId, otherUserId, message }) => ({
        url: `/api/chat/sendMessage?currentUserId=${currentUserId}&otherUserId=${otherUserId}&message=${encodeURIComponent(message)}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data.value, // بيرجع ID الرسالة
    }),

    // 3️⃣ Mark as Read
    markAsRead: builder.mutation<boolean, { currentUserId: string; otherUserId: string }>({
      query: (body) => ({
        url: `/api/chat/messages/mark-as-read`,
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => response.data.isSuccess,
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
} = chatApi;
