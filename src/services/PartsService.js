import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setError} from "../store/redusers/errorSlice";
import {setLoading} from "../store/redusers/filterSlice";

export const partsApi = createApi({
    reducerPath: 'partsApi',
    baseQuery: async (args, api, extraOptions) => {
      const { dispatch } = api;

      try {
        dispatch(setLoading(true));
        const result = await fetchBaseQuery({
          baseUrl: 'https://9aaca2b44dbb58a9.mokky.dev',
        })(args, api, extraOptions);

        if (result.error) {
          dispatch(setError(result.error.data?.message || 'An error occurred'))
        }

        return result;
      } catch (error) {
        dispatch(setError(error.message || 'An unexpected error occurred'))
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    endpoints: (builder) => ({
      fetchParts: builder.query({
        query: (filters) => {
          const params = new URLSearchParams({
            limit: 9,
          });

          for (let key in filters) {
            if (Array.isArray(filters[key])) {
              filters[key].forEach(value => {
                params.append(key, value);
              });
            } else {
              if (filters[key] !== ''){
                params.append(key, filters[key]);
              }
            }
          }

          return {
            url: 'parts',
            params
          };
        }
    }),
  }),
  })

export const { useFetchPartsQuery } = partsApi