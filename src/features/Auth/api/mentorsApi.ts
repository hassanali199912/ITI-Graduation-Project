import { api } from "../../../config/apis";
import type { GetTeachersArgs, GetTeachersResponse } from "../RegisterMentor/types";
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
  }),
});
export const {useLazyGetMentorsQuery} = mentorsApi;