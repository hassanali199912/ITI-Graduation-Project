import { api } from "../../../config/apis";

const chatApis = api.injectEndpoints({
    endpoints: (builder) => ({
        // Get all messages between two users
        getAllChat: builder.query<any, any>({
            query: ({ currentUserId }) => ({
                url: `api/chat/AllChats`,
                method: "GET",
                params: {
                    currentUserId
                },
            }),
        }),
        getMessagesForChat: builder.query({
            query: ({ currentUserId, otherUserId }) => ({
                url: `api/chat/messages`,
                method: "GET",
                params: {
                    currentUserId,
                    otherUserId
                },
            }),
        }),
        markMessagesAsRead: builder.mutation({
            query: ({ currentUserId, otherUserId }) => ({
                url: `api/chat/messages/mark-as-read`,
                method: "POST",
                data: {
                    currentUserId,
                    otherUserId
                },
            }),
        }),
        sendMessage: builder.mutation({
            query: ({ currentUserId, otherUserId, message }) => ({
                url: `api/chat/sendMessage`,
                method: "POST",
                params: {
                    currentUserId,
                    otherUserId,
                    message
                },
            }),
        }),

    })
});

export const {
    useGetAllChatQuery,
    useLazyGetMessagesForChatQuery,
    useMarkMessagesAsReadMutation,
    useSendMessageMutation
} = chatApis;

export default chatApis;