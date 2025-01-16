import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setError} from "../store/redusers/errorSlice";
import {setLoading} from "../store/redusers/userSlice";

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: async (args, api, extraOptions) => {
    const { dispatch } = api;

    try {
      dispatch(setLoading(true));
      const result = await fetchBaseQuery({
        baseUrl: 'https://9aaca2b44dbb58a9.mokky.dev',
        prepareHeaders: (headers, { getState }) => {
          const token = getState().user.token;
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          headers.set('Accept', 'application/json');
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      })(args, api, extraOptions);

      if (result.error) {
        dispatch(setError(result.error.data?.message || 'An error occurred'));
      }

      return result;
    } catch (err) {
      dispatch(setError(err.message || 'An unexpected error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  },
  endpoints: (builder) => ({
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
          orders: []
        },
      }),
    }),
    updateUser:  builder.mutation({
      query: ({userId, body}) => ({
        url: `users/${userId}`,
        method: 'PATCH',
        body
      }),
    }),
    checkUser: builder.query({
      query: (body) => ({
        url: 'auth',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useLoginUserMutation,
  useRegistrationMutation,
  useUpdateUserMutation,
  useLazyCheckUserQuery
} = userApi