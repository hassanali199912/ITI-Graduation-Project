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
     acceptSessionRequest: builder.mutation<any, { sessionRequestId: string; teacherId: string; scheduledStartTime: string }>({
  query: ({ sessionRequestId, teacherId, scheduledStartTime }) => ({
    url: "/api/sessions/accept",
    method: "POST",
    body: {
      sessionRequestId,
      teacherId,
      scheduledStartTime,
    },
  }),
}),
  }),
});

export const { useAcceptSessionRequestMutation , useRequestSessionMutation,useLazyGetSessionRequestsByTeacherIdQuery } = sessionsApi;
