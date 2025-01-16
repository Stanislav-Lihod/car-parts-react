import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FilterState {
  isLoading: boolean;
  isCarFilterLoading: boolean;
  searchParam: string;
  selectedFilters: Record<string, any>;
  currentCarFilter: Record<string, any>;
}

const initialState: FilterState = {
  isLoading: false,
  isCarFilterLoading: false,
  searchParam: '',
  selectedFilters:{},
  currentCarFilter: {}
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers:{
    setLoading(state, action: PayloadAction<boolean>){
      state.isLoading = action.payload
    },
    setCarFilterLoading(state, action: PayloadAction<boolean>){
      state.isCarFilterLoading = action.payload
    },
    updateFilter(state, action: PayloadAction<{ type: string; value: string; isMultipleChoice?: boolean }>){
      delete state.selectedFilters.page
      const { type, value, isMultipleChoice = false } = action.payload;

      if (!isMultipleChoice) {
        value !== ''
          ? state.selectedFilters[type] = [value]
          : delete state.selectedFilters[type];
      } else {
        state.selectedFilters[type] = state.selectedFilters[type] || [];
        state.selectedFilters[type] = state.selectedFilters[type].includes(value)
          ? state.selectedFilters[type].filter(item => item !== value)
          : [...state.selectedFilters[type], value];

        if (!state.selectedFilters[type].length) delete state.selectedFilters[type];
      }

      filterSlice.caseReducers.updateSearchParam(state);
    },
    updateCarFilter(state, action: PayloadAction<Record<string, string>>) {
      delete state.selectedFilters.page;

      const clearFilter = Object.entries(action.payload).reduce((acc, [key, value]) => {
        if (value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>);

      state.currentCarFilter = clearFilter;
      filterSlice.caseReducers.updateSearchParam(state);
    },
    updateSearchParam(state){
      const searchParams = new URLSearchParams({
        ...state.selectedFilters,
        ...state.currentCarFilter
      })
      state.searchParam = decodeURIComponent(searchParams.toString())
    },
    decodeSearchParams(state, action: PayloadAction<string>) {
      const searchParams = new URLSearchParams(action.payload);
      const carFilterArray = ['brand', 'model', 'modification']

      searchParams.forEach((value, type) => {
        if (carFilterArray.includes(type)) {
          if (value !== ''){
            state.currentCarFilter[type] = value
          }
        } else {
          const values = value.split(',');
          values.forEach(value => {
            if (value !== '') {
              filterSlice.caseReducers.updateFilter(
                state,
                {
                  type: 'filters/updateFilter',
                  payload: { type, value, isMultipleChoice: values.length > 1 },
                } as PayloadAction<{ type: string; value: string; isMultipleChoice?: boolean }>
              );
            }
          });
        }
      });

      filterSlice.caseReducers.updateSearchParam(state);
    },
    clearFilters(state){
      state.selectedFilters = {}
      filterSlice.caseReducers.updateSearchParam(state);
    }
  }
})

export const {
  setLoading,
  setCarFilterLoading,
  updateFilter,
  updateCarFilter,
  decodeSearchParams,
  clearFilters
} = filterSlice.actions
export default filterSlice.reducer