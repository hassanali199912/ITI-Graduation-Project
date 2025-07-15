import { api } from "../../config/apis";

export const lookupApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLookupByType: builder.query<any, string>({
      query: (type) => ({
        url: `/api/lookup/${type}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetLookupByTypeQuery,
  useLazyGetLookupByTypeQuery,
} = lookupApi;
