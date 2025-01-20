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
        } catch (e: unknown) {
          dispatch(setError(e instanceof Error ? e.message : 'An unknown error occurred'));
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
        } catch (e: unknown) {
          dispatch(setError(e instanceof Error ? e.message : 'An unknown error occurred'));
        }
      },
    })
  }),
})

export const {
  useGetPartQuery,
  useGetCarInfoQuery
} = partApi