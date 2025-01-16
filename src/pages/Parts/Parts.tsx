import React, {useEffect, useState} from "react";
import * as style from './Parts.module.scss'
import PreviewPart from "../../components/PreviewPart/PreviewPart";
import ModelTitle from "./components/ModelTitle/ModelTitle";
import {Aside} from "./components/Aside/Aside";
import {useNavigate} from "react-router-dom";
import Empty from "../../components/Empty/Empty";
import CarFilter from "./components/CarFilter/CarFilter";
import {useDispatch, useSelector} from "react-redux";
import {
  decodeSearchParams,
  updateFilter,
} from "../../store/redusers/filterSlice";
import PartsSkeleton from "../../components/Preloader/PartsSkeleton/PartsSkeleton";
import LineSkeleton from "../../components/Preloader/LineSkeleton/LineSkeleton";
import Pagination from "../../components/Pagination/Pagination";
import {useFetchPartsQuery} from "../../services/PartsService";

export const Parts = () =>{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    isLoading,
    selectedFilters,
    searchParam,
    currentCarFilter
  } = useSelector(state => state.filters)

  const [totalParts, setTotalParts] = useState(0)
  const { data} = useFetchPartsQuery({...selectedFilters, ...currentCarFilter})

  useEffect(() => {
    dispatch(decodeSearchParams(location.search))
  }, []);

  useEffect(() => {
    navigate(`/parts${searchParam ? `?${searchParam}` : ''}`)
  }, [searchParam]);

  useEffect(() => {
    if (data?.meta){
      setTotalParts(data.meta.total_items)
    }
  }, [data]);

  const sortHandler = (type, value) => {
    dispatch(updateFilter({ type, value}))
  };

  return(
    <main className={style.main}>
      <ModelTitle/>
      <div className={`container ${style.content}`}>
        <Aside/>
        <div className={style.content__general}>
          <CarFilter />
          <div>
            <div className={style.content__sortBlock}>
              {isLoading? (
                <LineSkeleton length={'medium'}/>
              ): (
                <div>We found in the warehouse <b>{totalParts}</b> parts:</div>
              )}
              <select
                name="sortBy"
                value={selectedFilters['sortBy'] || ''}
                onChange={(e) => sortHandler(e.target.name, e.target.value)}
              >
                <option value="">Standart</option>
                <option value="price">Lowest price</option>
                <option value="-price">Highest price</option>
              </select>
            </div>

            <div className={style.part__list}>

              {isLoading ? (
                Array.from({ length: 9 }).map((_, index) => (
                  <PartsSkeleton key={index} />
                ))
              ) : (
                data?.items && data?.items.length > 0 ? (
                  data.items.map(part => (
                    <PreviewPart id={part.part_id} part={part} key={part.part_id} />
                  ))
                ) : (
                  <Empty>
                    We found no parts according to your request. Try to clarify the search.
                  </Empty>
                )
              )}
            </div>
            {
              data?.meta ? (
                <Pagination pagination={data.meta}/>
              ) : null
            }
          </div>
        </div>
      </div>
    </main>
  )
}