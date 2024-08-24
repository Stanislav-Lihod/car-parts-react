import React from 'react';
import * as style from "./Aside.module.scss";

export default function CheckboxFilter({filter, selectedFilters, onFilterChange}) {
  return (
    <div className={style.group}>
      <h4>{filter.name}</h4>
      <ul className={style.checkbox}>
        {filter.options.map((option) => (
          <li key={option.value}>
            <label>
              <input
                type="checkbox"
                checked={selectedFilters[filter.type]?.includes(option.value) || false}
                onChange={() => onFilterChange(filter.type, option.value)}
              />
              {option.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}