
import { api } from "../../../config/apis"
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        regesterMentor: builder.mutation<any, any>({
            query: (data) => ({
                url: `/api/teachers/register`,
                method: "POST",
                data: data,
            }),
        })

    })
})


export const {
    useRegesterMentorMutation,
    
} = authApi;
