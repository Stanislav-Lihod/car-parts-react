import React from 'react';
import * as style from "../Filter.module.scss";
interface FilterOption {
  id: string | number;
  name?: string;
  title?: string;
  brand?: string;
  yearStart?: number;
  yearEnd?: number;
}

interface FilterSelectProps {
  options: FilterOption[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  disabled?: boolean;
  defaultOption?: string;
}

function FilterSelect({ options, value, onChange, name, disabled, defaultOption }:FilterSelectProps) {
  return (
    <select
      className={style['select']}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">{defaultOption}</option>
      {options?.map((item) => (
        <option
          value={item.id}
          key={item.id}
        >
          {item.name || item.title || item.brand}
          {item.yearStart && item.yearEnd ? ` (${item.yearStart} - ${item.yearEnd})` : ''}
        </option>
      ))}
    </select>
  );
}

export default FilterSelect;