import { api } from "../../../config/apis";

export const lookupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<any, void>({
      query: () => ({
        url: '/api/lookup/country',
        method: 'GET',
      }),
    }),
    getGender: builder.query<any, void>({
      query: () => ({
        url: '/api/lookup/gender',
        method: "GET",
      })
    }),
    getSpecialization: builder.query<any, void>({
      query: () => ({
        url: '/api/lookup/specialization',
        method: "GET",
      })
    }),
    getAgegroup: builder.query<any, void>({
      query: () => ({
        url: '/api/lookup/agegroup',
        method: "GET",
      })
    }),
    getTeachingAgeArea: builder.query<any, void>({
      query: () => ({
        url: '/api/lookup/teachingarea',
        method: "GET"
      })
    }),
    getTeachingLang: builder.query<any, void>({
      query: () => ({
        url: '/api/lookup/teachingLanguage',
        method: "GET"
      })
    }),
    getCommunicationMethod: builder.query<any, void>({
      query: () => ({
        url: '/api/lookup/communicationmethod',
        method: "GET"
      })
    }),

  }),
});
export const {
  useLazyGetCountriesQuery,
  useLazyGetGenderQuery,
  //communication method
  useLazyGetCommunicationMethodQuery,
  useGetCommunicationMethodQuery,
  //spec
  useLazyGetSpecializationQuery,
  useGetSpecializationQuery,
  //getAgegroup
  useLazyGetAgegroupQuery,
  useGetAgegroupQuery,
  //teaching area 
  useLazyGetTeachingAgeAreaQuery,
  useGetTeachingAgeAreaQuery,
  // teaching language
  useLazyGetTeachingLangQuery,
  useGetTeachingLangQuery

} = lookupsApi;
