import { api } from "../../../config/apis";

export const lookupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<any, void>({
      query: () => ({
        url: '/api/lookup/country',
        method: 'GET',
      }),
    }),
    getGender:builder.query<any,void>({
      query : () => ({
        url:'/api/lookup/gender',
        method: "GET",
      })
    })
  }),
});
export const {
  useLazyGetCountriesQuery,
  useLazyGetGenderQuery
} = lookupsApi;
