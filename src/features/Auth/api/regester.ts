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
    uploadFile: builder.mutation({
      query: (file) => {
        const form = new FormData();
        form.append("file", file);
        console.log("this is file ", file);
        console.log("this is file ", form.get("file"));

        return {
          url: "/api/Files/upload",
          method: "POST",
          body: form,
        };
      },
    }),

  }),
});

export const { useRegesterMentorMutation, useUploadFileMutation } = authApi;
