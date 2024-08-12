import React, {useEffect, useState} from "react";
import * as style from './Parts.module.scss'
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs";
import PreviewPart from "../../components/PreviewPart/PreviewPart";
import ModelTitle from "./components/ModelTitle/ModelTitle";
import {Aside} from "./components/Aside/Aside";
import axios from 'axios'
import {useSearchParams} from "react-router-dom";
import Empty from "../../components/Empty/Empty";
import CarFilter from "./components/CarFilter/CarFilter";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentFilter} from "../../store/redusers/filterSlice";
import {fetchParts} from "../../store/redusers/partsSlice";

export const Parts = () =>{
  const dispatch = useDispatch()
  const [isInitialized, setIsInitialized] = useState(false);
  const {
    currentParams,
    isStoreData
  } = useSelector(state => state.filters)

  const {
    parts,
    pagination,
    isLoading
  } = useSelector(state => state.parts)
  const totalParts = pagination.totalParts

  // Search Params handler
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if(!isStoreData){
      searchParams.forEach((value, key) => {
        dispatch(setCurrentFilter([{ [key]: value }, false]));
      });
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (!isInitialized){
      dispatch(fetchParts(currentParams));
      setIsInitialized(true)
    }
  }, [dispatch, currentParams]);

  const sortHandler = (e)=>{
    const tag = e.target.getAttribute('name')
    const params = {
      [tag]: e.target.value
    }
    dispatch(setCurrentFilter([params, false]))
  }

  return(
    <main className={style.main}>
      <ModelTitle/>
      <div className={`container mt-20 ${style.content}`}>
        <Aside/>
        <div className={style.content__general}>
          <CarFilter />
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <div>We found in the warehouse <b>{totalParts}</b> parts:</div>
              <select
                name="sortBy"
                value={currentParams['sortBy']}
                onChange={sortHandler}
              >
                <option value="">Standart</option>
                <option value="price">Lowest price</option>
                <option value="-price">Highest price</option>
              </select>
            </div>

            <div className={`${style.part__list} mt-15`}>
              {isLoading ? (
                'loading'
              ) : (
                parts && parts.length > 0 ? (
                  parts.map(part => (
                    <PreviewPart id={part.part_id} part={part} key={part.part_id}/>
                  ))
                ) : (
                  <Empty>
                    We found no parts according to your request. Try to clarify the search.
                  </Empty>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}