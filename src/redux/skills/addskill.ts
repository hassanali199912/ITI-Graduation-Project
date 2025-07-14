
import { api } from "../../config/apis";

export const lookupApi = api.injectEndpoints({
  endpoints: (builder) => ({
    
    getLookupByType: builder.query<any, string>({
      query: (type) => ({
        url: `/api/lookup/${type}`,
        method: 'GET',
      }),
      providesTags: (result, error, type) => [{ type: 'Lookup', id: type }],
    }),

   
    addSkill: builder.mutation<any, string>({
      query: (name) => ({
        url: `/api/skills/add`,
        method: 'POST',
       data: { nameAr: name }
      }),
      invalidatesTags: [{ type: 'Lookup', id: 'skilles' }],
    }),
  }),
});

export const {
  useGetLookupByTypeQuery,
  useLazyGetLookupByTypeQuery,
  useAddSkillMutation,
} = lookupApi;
