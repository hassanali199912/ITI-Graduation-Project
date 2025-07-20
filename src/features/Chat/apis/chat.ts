import { api } from "../../../config/apis"



const chatApis = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllChat: builder.query({
            query: ({ otherUserId,
                currentUserId }) => ({
                    url: `api/chat/messages`,
                    method: "GET",
                    params: {
                        otherUserId,
                        currentUserId
                    },
                }),
        })
    })
}) 