import React, {useEffect, useState} from 'react';
import * as style from './Filter.module.scss'
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import FilterSelect from "./components/FilterSelect";
import {Button} from "../../../../components/Button/Button";
import {useFetchBrandsQuery, useFetchModelsQuery, useFetchModificationQuery} from "../../../../services/GetCarsService";
import {updateCarFilter} from "../../../../store/redusers/filterSlice";

export default function Filter({isPartsPage}) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [carFilter, setCarFilter] = useState({  brand: '', model: '', modification: '' });
  const { isCarFilterLoading: isLoading ,currentCarFilter} = useSelector(state => state.filters)
  const { data: brands} = useFetchBrandsQuery();
  const { data: models} = useFetchModelsQuery(carFilter.brand, {
    skip: carFilter.brand === '',
  });
  const { data: modifications } = useFetchModificationQuery(
    { brand: carFilter.brand, model: carFilter.model },
    {skip: carFilter.brand === ''  || carFilter.model === ''});

  useEffect(() => {
    setCarFilter({...carFilter,...currentCarFilter})
  }, [currentCarFilter]);

  const searchButton = (e) =>{
    e.preventDefault()
    e.stopPropagation()
    dispatch(updateCarFilter(carFilter))
    !isPartsPage && navigate('/parts');
  }

  return (
    <section className={`${style.section} ${isLoading ? style.loading : ''}`}>
      <FilterSelect
        name="brand"
        value={carFilter.brand}
        onChange={(e) => {
          setCarFilter({
            brand: e.target.value,
            model: '',
            modification: ''
          })
        }}
        defaultOption="Brand"
        options={brands}
      />

      <FilterSelect
        name="model"
        value={carFilter.model}
        onChange={(e) => {
          setCarFilter({
            ...carFilter,
            model: e.target.value,
            modification: ''
          })
        }}
        defaultOption="Model"
        options={models?.models}
        disabled={!carFilter.brand}
      />

      <FilterSelect
        name="modification"
        value={carFilter.modification}
        // onChange={(e) => dispatch(setCurrentModification(e.target.value))}
        onChange={(e) => setCarFilter({...carFilter, modification: e.target.value})}
        defaultOption="Modification"
        options={modifications ? modifications[0].modification : []}
        disabled={!carFilter.model}
      />

      <Button onClick={searchButton}>
        {isPartsPage ? 'Filter Car' : 'Search'}
      </Button>

    </section>
  );
}