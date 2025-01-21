import React from 'react';
import * as style from "./Aside.module.scss";

interface Filter {
  name: string;
  type: string;
  options: {
    min: number;
    max: number;
    range: number;
    reverse?: boolean;
  };
}

interface SelectFilterProps {
  filter: Filter;
  selectedFilters: Record<string, string | number>;
  onFilterChange: (key: string, value: string) => void;
}

export default function SelectFilter({
                                       filter,
                                       selectedFilters,
                                       onFilterChange,
                                     }: SelectFilterProps) {
  const generateOptions = (min: number, max: number, range: number, reverse = false): number[] => {
    const result: number[] = [];
    for (let i = min; i <= max; i += range) {
      result.push(i);
    }
    return reverse ? result.reverse() : result;
  };

  const optionValues = generateOptions(
    filter.options.min,
    filter.options.max,
    filter.options.range,
    filter.options.reverse ?? false
  );

  return (
    <div className={style['group']}>
      <h4>{filter.name}</h4>
      <div className={style['range']}>
        <select
          value={selectedFilters[filter.type + '[from]'] || ''}
          onChange={(e) => onFilterChange(filter.type + '[from]', e.target.value)}
        >
          <option value="">From</option>
          {optionValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select
          value={selectedFilters[filter.type + '[to]'] || ''}
          onChange={(e) => onFilterChange(filter.type + '[to]', e.target.value)}
        >
          <option value="">To</option>
          {optionValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}