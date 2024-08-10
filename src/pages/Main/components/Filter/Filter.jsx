import React, {useEffect} from 'react';
import * as style from './Filter.module.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchBrands, fetchModels, fetchModification, setCurrentFilter, changeSearchParamsString} from "../../../../store/redusers/filterSlice";

export default function Filter(props) {
  const dispatch = useDispatch()

  //store variables
  const {
    brands,
    models,
    modifications,
    isFilterLoading,
    currentParams,
    searchParam
  } = useSelector(state => state.filters)
  const currentBrand = currentParams.brand
  const currentModel = currentParams.model

  useEffect(() => {
    dispatch(fetchBrands())
  }, []);

  useEffect(() => {
    dispatch(fetchModels(currentBrand.id))
  }, [dispatch, currentBrand.id]);

  useEffect(() => {
    dispatch(fetchModification(currentBrand.id, currentModel.id))
  }, [dispatch, currentBrand.id, currentModel.id]);

  const handler = (e)=>{
    const tag = e.target.getAttribute('name')
    const params = {
      [tag]: {
        id: e.target.value,
        name: e.target.selectedOptions[0].text
      }
    }
    dispatch(setCurrentFilter(params))
    dispatch(changeSearchParamsString())
  }

  return (
    <section className={style.section}>
      <div className={style.title}>Car parts search</div>
      <div>
        <select name="brand" id="brand" onChange={handler}>
          <option value="null">Select</option>
          {brands.map((item) => (
            <option
              value={item.id}
              key={item.id}
              name={item.brand}
            >
              {item.brand}
            </option>
          ))}
        </select>
        <select name="model" id="model" onChange={handler} disabled={currentBrand?.id === 'null'}>
          <option value="null">Select</option>
          {models?.map((item) => (
            <option
              value={item.id}
              key={item.id}
              name={item.title}
            >
              {item.title}
            </option>
          ))}
        </select>
        <select name="modification" id="modification" onChange={handler} disabled={currentModel?.id === 'null'}>
          <option value="null">Select</option>
          {modifications?.map((item) => (
            <option
              value={item.id}
              name={`${item.name} (${item.yearStart} - ${item.yearEnd})`}
              key={item.id}
            >
              {item.name} ({item.yearStart} - {item.yearEnd})
            </option>
          ))}
        </select>
        <button>
          <Link
            to={`/parts${searchParam.length > 0 ? '?' + searchParam : ''}`}
          >Search</Link>
        </button>
      </div>
    </section>
  );
}