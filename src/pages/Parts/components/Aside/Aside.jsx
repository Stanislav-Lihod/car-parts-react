import React from 'react';
import * as style from './Aside.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setRangeFilter, toggleFilter} from "../../../../store/redusers/filterSlice";
import {filtersData} from "./initialFilters";
import CheckboxFilter from "./CheckboxFilter";
import SelectFilter from "./SelectFilter";

export const Aside = () => {
  const dispatch = useDispatch();
  const {selectedFilters} = useSelector((state) => state.filters);

  const handleFilterChange = (type, value) => {
    dispatch(toggleFilter({ type, value }));
  };
  const handleRangeChange = (type, value,) => {
    dispatch(setRangeFilter({ type, value}));
  };

  return (
    <aside className={style.aside}>
      {filtersData.map((filter) => (
        <FilterGroup
          key={filter.type}
          filter={filter}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onRangeChange={handleRangeChange}
        />
      ))}
    </aside>
  );
};

const FilterGroup = ({ filter, selectedFilters, onFilterChange, onRangeChange }) => {
  if (filter.optionsType === 'checkbox') {
    return (<CheckboxFilter filter={filter} selectedFilters={selectedFilters} onFilterChange={onFilterChange}/>)
  }

  if (filter.optionsType === 'range') {
    return (<SelectFilter filter={filter} selectedFilters={selectedFilters} onRangeChange={onRangeChange}/>);
  }
  return null;
};