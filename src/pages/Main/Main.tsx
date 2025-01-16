import React, {useEffect} from "react";
import * as style from './Main.module.scss'
import Filter from "./components/Filter/Filter";
import {useDispatch} from "react-redux";
import LineSkeleton from "../../components/Preloader/LineSkeleton/LineSkeleton";
import {clearFilters} from "../../store/redusers/filterSlice";
import {useFetchPartsQuery} from "../../services/PartsService";

export const Main = () =>{
  const dispatch = useDispatch()
  const { data} = useFetchPartsQuery()

  useEffect(()=>{
    dispatch(clearFilters())
  }, [dispatch])

  return (
    <main className={style.head}>
      <div className={`container ${style.content}`}>
        <h1>Used car parts online from <span>3,681</span> European sellers</h1>
        <div className={style.content__desc}>
          Choose from <span>{
            data?.meta.total_items ? (
              data?.meta.total_items
            ):(
              <LineSkeleton length={'extra_short'} style={{display: 'inline-block'}} />
            )
          }</span> competitively priced used car parts in one marketplace
        </div>
        <Filter/>
      </div>
    </main>
  )
}