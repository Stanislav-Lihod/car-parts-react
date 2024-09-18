import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, {useEffect, useState} from "react";
import * as style from "./Search.module.scss"
import {Button} from "../../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {XMarkIcon} from "@heroicons/react/16/solid";
import {useLocation, useNavigate} from "react-router-dom";
import {updateFilter} from "../../../store/redusers/filterSlice";

export default function Search({ placeholder }) {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchLine, setSearchLine] = useState('')
  const {selectedFilters} = useSelector(state => state.filters)
  const {part_name} = selectedFilters

  useEffect(() => {
    setSearchLine(part_name ? part_name[0].slice(1) : '')
  }, [part_name]);

  function handleSearch(term){
    setSearchLine(term)
  }

  const search = (e) =>{
    e.preventDefault()
    e.stopPropagation()
    dispatch(updateFilter({"part_name": searchLine.length > 1 ? '*' + searchLine : ''}))
    if (location.pathname !== '/parts') {
      navigate('/parts')
    }
  }

  const clearSearch = (e)=>{
    e.preventDefault()
    e.stopPropagation()
    setSearchLine('')
    dispatch(setCurrentFilter({"part_name": ''}))
  }

  return (
    <form onSubmit={search} className={style.search}>
      <label htmlFor="search" className={style.search__label}>
        Search
      </label>
      <input
        className={style.search__input}
        placeholder={placeholder}
        value={searchLine}
        onChange={(e)=>{
          handleSearch(e.target.value)
        }}
      />
      <Button
        type='submit'
        additionalStyle={['search']}>
        <MagnifyingGlassIcon
          style={{width: '24px'}}/>
      </Button>
      {searchLine.length > 0 ? (
        <span
          onClick={clearSearch}
          className={style.close}>
          <XMarkIcon style={{width: '16px'}}/>
        </span>
      ): null}
    </form>
  );
}
