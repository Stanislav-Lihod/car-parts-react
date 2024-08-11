import React from 'react';
import * as style from "../Filter.module.scss";

function FilterSelect({ options, value, onChange, name, disabled, defaultOption }) {
  return (
    <select
      className={style.select}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">{defaultOption}</option>
      {options?.map((item) => (
        <option
          value={item.id}
          name={item.name || item.title || item.brand}
          key={item.id}
        >
          {item.name || item.title || item.brand} {item.yearStart && item.yearEnd ? `(${item.yearStart} - ${item.yearEnd})` : ''}
        </option>
      ))}
    </select>
  );
}

export default FilterSelect;