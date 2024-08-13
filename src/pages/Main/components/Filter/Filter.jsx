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
  const currentBrand = currentParams["car.brand"]
  const currentModel = currentParams["car.model"]
  const currentModification = currentParams["car.modification"]

  const prevBrandRef = useRef(currentBrand);
  const prevModelRef = useRef(currentModel);

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch]);

  useEffect(() => {
    if (currentBrand && currentBrand !== prevBrandRef.current) {
      dispatch(fetchModels(currentBrand));
    }
    prevBrandRef.current = currentBrand;
  }, [dispatch, currentBrand]);

  useEffect(() => {
    if (currentBrand && currentModel && (currentBrand !== prevBrandRef.current || currentModel !== prevModelRef.current)) {
      dispatch(fetchModification(currentBrand, currentModel));
    }
    prevModelRef.current = currentModel;
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
    <section className={`${style.section} ${isPartsPage && style.parts__page}`}>
      <FilterSelect
        name="car.brand"
        value={currentBrand || ''}
        onChange={selectHandler}
        defaultOption="Brand"
        options={brands}
      />

      <FilterSelect
        name="car.model"
        value={currentModel || ''}
        onChange={selectHandler}
        defaultOption="Model"
        options={models}
        disabled={currentBrand === ''}
      />

      <FilterSelect
        name="car.modification"
        value={currentModification || ''}
        onChange={selectHandler}
        defaultOption="Modification"
        options={modifications}
        disabled={currentModel === ''}
      />

      <button onClick={searchButton}>
        {isPartsPage ? 'Filter Car' : 'Search'}
      </button>


    </section>
  );
}