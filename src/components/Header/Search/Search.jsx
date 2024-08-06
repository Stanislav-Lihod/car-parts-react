import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from "react";
import * as style from "./Search.module.scss"
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }) {

  function handleSearch(term){
    console.log(term)
  }

  return (
    <div className={style.search}>
      <label htmlFor="search" className={style.search__label}>
        Search
      </label>
      <input
        className={style.search__input}
        placeholder={placeholder}
        onChange={(e)=>{
          handleSearch(e.target.value)
        }}
      />
      <MagnifyingGlassIcon className={style.search__inputIcon} />
    </div>
  );
}
