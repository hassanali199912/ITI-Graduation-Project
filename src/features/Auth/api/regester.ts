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
    uploadFile: builder.mutation<{ url: string }, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "/api/files/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useRegesterMentorMutation , useUploadFileMutation} = authApi;
