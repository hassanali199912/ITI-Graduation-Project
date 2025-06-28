
import { api } from "../../../config/apis"



export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.query<any, any>({
            query: () => ({
                url: `/posts`,
                method: "GET",
                // data: {
                //     userName: "hassan",
                //     Password: "123456",
                // },
                // params: {
                //     userName: "hassan",
                //     Password: "123456",
                // },
            }),
        }),
        rejester: builder.query<any, any>({
            query: () => ({
                url: `/rejester`,
                method: "Post",
                // data: {
                //     userName: "hassan",
                //     Password: "123456",
                // },
                // params: {
                //     userName: "hassan",
                //     Password: "123456",
                // },
            }),
        }),

    })
})


export const {
    useLoginQuery
    , useLazyLoginQuery,
    useLazyRejesterQuery, 
    useRejesterQuery
} = authApi;
