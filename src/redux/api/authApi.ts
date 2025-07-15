import { api } from "../../config/apis";
import type RegisterFormData  from "../../domain/types/RegisterFormData";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<any, RegisterFormData>({
      query: (body) => ({
        url: "/api/students/register",
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
} = authApi;
