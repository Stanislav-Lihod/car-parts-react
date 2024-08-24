import React, {useEffect, useMemo, useRef, useState} from 'react';
import * as style from './Filter.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchBrands,
  fetchModels,
  fetchModification, setCurrentCar, updateSearchParam
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
  } = useSelector(state => state.filters)

  const {
    "car.brand": currentBrand,
    "car.model": currentModel,
    "car.modification": currentModification,
  } = currentParams;

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchModels(currentBrand));
  }, [dispatch, currentBrand]);

  useEffect(() => {
    dispatch(fetchModification(currentBrand, currentModel));
  }, [dispatch, currentBrand, currentModel]);

  const selectHandler = (name, value) => {
    dispatch(setCurrentCar({ [name]: value}));
  };

  const searchButton = (e) =>{
    e.preventDefault()
    e.stopPropagation()
    dispatch(updateSearchParam())
    !isPartsPage && navigate('/parts')
  }

  return (
    <section className={`${style.section} `}>
      <FilterSelect
        name="car.brand"
        value={currentBrand || ''}
        onChange={(e) => selectHandler(e.target.name, e.target.value)}
        defaultOption="Brand"
        options={brands}
      />

      <FilterSelect
        name="car.model"
        value={currentModel || ''}
        onChange={(e) => selectHandler(e.target.name, e.target.value)}
        defaultOption="Model"
        options={models}
        disabled={currentBrand === ''}
      />

      <FilterSelect
        name="car.modification"
        value={currentModification || ''}
        onChange={(e) => selectHandler(e.target.name, e.target.value)}
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