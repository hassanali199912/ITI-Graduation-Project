import { api } from "../../../config/apis";
import { type Teacher, type GetTeachersArgs, type GetTeachersResponse } from "../RegisterMentor/types";
export const mentorsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMentors: builder.query<GetTeachersResponse, GetTeachersArgs>({
      query: ({ pageNumber = 1, pageSize = 10, orderByRating = false }) => ({
        url: "/api/teachers",
        params: {
          pageNumber,
          pageSize,
          orderByRating,
        },
      }),
    }),
    getMentorById: builder.query<any, string>({
   query: (id) => ({
    url: `/api/teachers/${id}`, // ← غيّر المسار حسب API بتاعتك
    method: "GET",
  }),
}), 
  }),
});
export const {useLazyGetMentorsQuery,useLazyGetMentorByIdQuery , useGetMentorByIdQuery} = mentorsApi;