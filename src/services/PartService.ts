import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setError} from "../store/redusers/errorSlice";

export const partApi = createApi({
  reducerPath: 'partApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://9aaca2b44dbb58a9.mokky.dev',
  }),
  endpoints: (builder) => ({
    getPart: builder.query({
      query: (id) => ({
        url: `parts?part_id=${id}`,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          const errorMessage = error.error?.data?.message || 'An error occurred';
          dispatch(setError(errorMessage));
        }
      },
    }),
    getCarInfo: builder.query({
      query:(id) =>({
        url: `modification?modification.id=${id}`
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          const errorMessage = error.error?.data?.message || 'An error occurred';
          dispatch(setError(errorMessage));
        }
      },
    })
  }),
})

export const {
  useGetPartQuery,
  useGetCarInfoQuery
} = partApi