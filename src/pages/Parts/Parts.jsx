import React, {useEffect, useState} from "react";
import * as style from './Parts.module.scss'
import PreviewPart from "../../components/PreviewPart/PreviewPart";
import ModelTitle from "./components/ModelTitle/ModelTitle";
import {Aside} from "./components/Aside/Aside";
import {useLocation, useNavigate} from "react-router-dom";
import Empty from "../../components/Empty/Empty";
import CarFilter from "./components/CarFilter/CarFilter";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentFilter} from "../../store/redusers/filterSlice";
import PartsSkeleton from "../../components/Preloader/PartsSkeleton/PartsSkeleton";
import LineSkeleton from "../../components/Preloader/LineSkeleton/LineSkeleton";
import {fetchParts} from "../../store/redusers/partsSlice";
import Pagination from "../../components/Pagination/Pagination";

export const Parts = () =>{
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isInitialized, setIsInitialized] = useState(false);
  const {
    currentParams,
    searchParam
  } = useSelector(state => state.filters)

  const {
    parts,
    pagination,
    isLoading
  } = useSelector(state => state.parts)
  const totalParts = pagination.totalParts

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.forEach((value, key) => {
      dispatch(setCurrentFilter({ [key]: value }));
    });
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    dispatch(fetchParts(searchParams));
  }, [location.search]);

  const sortHandler = (e)=>{
    const tag = e.target.getAttribute('name')
    const params = {
      [tag]: e.target.value
    }
    dispatch(setCurrentFilter(params))
    console.log(searchParam)
    navigate(`/parts?${searchParam}`)
  }

  return(
    <main className={style.main}>
      <ModelTitle/>
      <div className={`container mt-20 ${style.content}`}>
        <Aside/>
        <div className={style.content__general}>
          <CarFilter />
          <div className="mt-6">
            <div className={style.content__sortBlock}>
              {isLoading ? (
                <LineSkeleton length={'medium'}/>
              ): (
                <div>We found in the warehouse <b>{totalParts}</b> parts:</div>
              )}
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
                Array.from({ length: 9 }).map((_, index) => (
                  <PartsSkeleton key={index} />
                ))
              ) : (
                parts && parts.length > 0 ? (
                  parts.map(part => (
                    <PreviewPart id={part.part_id} part={part} key={part.part_id} />
                  ))
                ) : (
                  <Empty>
                    We found no parts according to your request. Try to clarify the search.
                  </Empty>
                )
              )}
            </div>

            <Pagination/>
          </div>
        </div>
      </div>
    </main>
  )
}