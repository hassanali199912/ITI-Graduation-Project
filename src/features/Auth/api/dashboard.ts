import { api } from "../../../config/apis";
export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<any, any>({
      query: ({ pageNumber = 1, pageSize = 13 }) => ({
        url: `/api/GetStudents`,
        method: "GET",
        params: {
          pageNumber,
          pageSize,
        },
      }),
    }),
    getSessions: builder.query<any, any>({
      query: ({ pageNumber = 1, pageSize = 13 }) => ({
        url: `/api/GetAllSssions`,
        method: "GET",
        params: {
          pageNumber,
          pageSize,
        },
      }),
    }),
    getTeachers: builder.query<any, any>({
      query: ({ status, pageNumber = 1, pageSize = 13 }) => ({
        url: `/api/GetTeachers`,
        method: "GET",
        params: {
          status,
          pageNumber,
          pageSize,
        },
      }),
    }),
  }),
});
export const { useLazyGetStudentsQuery, useLazyGetSessionsQuery , useLazyGetTeachersQuery } =
  dashboardApi;
