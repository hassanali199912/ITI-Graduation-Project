import { api } from "../../../config/apis";

export const sessionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    requestSession: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: "/api/sessions/request",
          method: "POST",
          body: data,
        };
      },
    }),
   getSessionRequestsByTeacherId: builder.query<any, { teacherId: string, pageNumber?: number, pageSize?: number }>({
      query: ({ teacherId, pageNumber = 1, pageSize = 10 }) => ({
        url: `/api/GetSessionRequestByTeacherId`,
        method: "GET",
        params: {
          teacherId,
          pageNumber,
          pageSize
        },
      }),
    }),
  }),
});

export const { useRequestSessionMutation,useLazyGetSessionRequestsByTeacherIdQuery } = sessionsApi;
