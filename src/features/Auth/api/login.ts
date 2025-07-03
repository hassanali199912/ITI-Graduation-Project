
import { api } from "../../../config/apis"



export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.query<any, any>({
            query: ({ email, password }) => ({
                url: `api/auth/login`,
                method: "POST",
                data: {
                    email: email,
                    password: password
                },
            }),
        }),

        forgetPassword: builder.query<any, any>({
            query: ({ email }) => ({
                url: `api/auth/forgot-password`,
                method: "POST",
                data: {
                    email: email,
                },
            }),
        }),
         verifyEmial: builder.query<any, any>({
            query: ({ email,otp }) => ({
                url: `api/auth/verify-email`,
                method: "POST",
                data: {
                    email:email,
                    otp:otp
                },
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
    useLoginQuery,
    useLazyLoginQuery,
    useLazyRejesterQuery,
    useRejesterQuery,
    useForgetPasswordQuery, 
    useLazyForgetPasswordQuery,
    useVerifyEmialQuery,
    useLazyVerifyEmialQuery
} = authApi;
