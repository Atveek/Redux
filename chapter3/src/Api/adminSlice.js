import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: () => `accounts`,
      providesTags: ["accounts"],
    }),
    addAccount: builder.mutation({
      query: ({ id, amount }) => ({
        url: "accounts",
        method: "POST",
        body: { id, amount },
      }),
      invalidatesTags: ["accounts"],
    }),
    updateAccount: builder.mutation({
      query: ({ id, amount }) => ({
        url: `accounts/${id}`,
        method: "PATCH",
        body: { amount },
      }),
      invalidatesTags: ["accounts"],
    }),
    delAccount: builder.mutation({
      query: ({ id }) => ({
        url: `accounts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["accounts"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAccountsQuery,
  useAddAccountMutation,
  useDelAccountMutation,
  useUpdateAccountMutation,
} = adminApi;
