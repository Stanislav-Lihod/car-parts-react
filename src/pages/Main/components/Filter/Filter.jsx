import React, {useEffect, useMemo, useRef} from 'react';
import * as style from './Filter.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchBrands,
  fetchModels,
  fetchModification,
  setCurrentFilter
} from "../../../../store/redusers/filterSlice";
import FilterSelect from "./components/FilterSelect";
import {Button} from "../../../../components/Button/Button";

export default function Filter({isPartsPage}) {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  //store variables
  const {
    brands,
    models,
    modifications,
    isLoading,
    currentParams,
    searchParam
  } = useSelector(state => state.filters)

  const {
    "car.brand": currentBrand,
    "car.model": currentModel
  } = currentParams;

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch]);

  useEffect(() => {
    console.log('model')
    dispatch(fetchModels(currentBrand));
  }, [dispatch, currentBrand]);

  useEffect(() => {
    console.log('modification')
    dispatch(fetchModification(currentBrand, currentModel));
  }, [dispatch, currentBrand, currentModel]);

  const selectHandler = (e)=>{
    const tag = e.target.getAttribute('name')
    const params = {
      [tag]: e.target.value
    }
    dispatch(setCurrentFilter(params))
  }

  const searchButton = (e) =>{
    e.preventDefault()
    e.stopPropagation()
    navigate(`/parts${searchParam ? `?${searchParam}` : ''}`)
  }

  return (
    <section className={`${style.section} `}>
      <FilterSelect
        name="car.brand"
        value={currentParams["car.brand"] || ''}
        onChange={selectHandler}
        defaultOption="Brand"
        options={brands}
      />

      <FilterSelect
        name="car.model"
        value={currentParams["car.model"] || ''}
        onChange={selectHandler}
        defaultOption="Model"
        options={models}
        disabled={currentBrand === ''}
      />

      <FilterSelect
        name="car.modification"
        value={currentParams["car.modification"] || ''}
        onChange={selectHandler}
        defaultOption="Modification"
        options={modifications}
        disabled={currentModel === ''}
      />

      <Button onClick={searchButton}>
        {isPartsPage ? 'Filter Car' : 'Search'}
      </Button>


    </section>
  );
}