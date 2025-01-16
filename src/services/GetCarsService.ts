import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setError} from "../store/redusers/errorSlice";
import {setCarFilterLoading} from "../store/redusers/filterSlice";

export const getCarApi = createApi({
  reducerPath: 'getCarApi',
  baseQuery: async (args, api, extraOptions) => {
    const { dispatch } = api;

    try {
      dispatch(setCarFilterLoading(true));
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
      dispatch(setCarFilterLoading(false));
    }
  },
  endpoints: (builder) => ({
    fetchBrands: builder.query({
      query: () => `brands`,
    }),
    fetchModels: builder.query({
      query: (brand) => (`models/${brand}`),
    }),
    fetchModification: builder.query({
      query: ({brand, model}) => ({
        url: `modification`,
        params:{
          brand,
          model
        }
      }),
    }),
  }),
})

export const { useFetchBrandsQuery,useFetchModelsQuery,useFetchModificationQuery } = getCarApi