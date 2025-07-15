import { api } from "../../../config/apis";
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    regesterMentor: builder.mutation<any, any>({
      query: (data) => ({
        url: `/api/teachers/register`,
        method: "POST",
        data: data,
      }),
    }),
uploadFile: builder.mutation<{ data: { fileUrl: string }}, File>({
  query: (file) => {
    const form = new FormData();
    form.append("file", file);          

    return {
      url: "/api/files/upload",                
      method: "POST",
      body: form,
    };
  },
}),

  }),
});

export const { useRegesterMentorMutation , useUploadFileMutation} = authApi;
