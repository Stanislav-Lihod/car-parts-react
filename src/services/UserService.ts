import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { setError } from "../store/redusers/errorSlice";
import { setLoading } from "../store/redusers/userSlice";

const baseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const { dispatch } = api;

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://9aaca2b44dbb58a9.mokky.dev',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  });

  try {
    dispatch(setLoading(true));
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error) {
      const error = result.error as { data?: { message?: string } };
      dispatch(setError(error.data?.message || 'An error occurred'));
    }

    return result;
  } catch (e: unknown) {
    return {
      error: {
        status: 'CUSTOM_ERROR',
        data: e instanceof Error ? e.message : 'An unknown error occurred',
      },
    };
  } finally {
    dispatch(setLoading(false));
  }
};

const endpoints = (builder: any) => ({
  loginUser: builder.mutation({
    query: (body) => ({
      url: 'auth',
      method: 'POST',
      body,
    }),
  }),
  registration: builder.mutation({
    query: (body) => ({
      url: 'register',
      method: 'POST',
      body: {
        ...body,
        id: Date.now(),
        orders: [],
      },
    }),
  }),
  updateUser: builder.mutation({
    query: ({ userId, body }) => ({
      url: `users/${userId}`,
      method: 'PATCH',
      body,
    }),
  }),
  checkUser: builder.query({
    query: (body) => ({
      url: 'auth',
      method: 'POST',
      body,
    }),
  }),
});

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints,
});

export const {
  useLoginUserMutation,
  useRegistrationMutation,
  useUpdateUserMutation,
  useLazyCheckUserQuery,
} = userApi;