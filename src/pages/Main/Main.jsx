import React, {useEffect} from "react";
import * as style from './Main.module.scss'
import Filter from "./components/Filter/Filter";
import {useDispatch, useSelector} from "react-redux";
import {fetchParts} from "../../store/redusers/partsSlice";
import LineSkeleton from "../../components/Preloader/LineSkeleton/LineSkeleton";

export const Main = () =>{
  const {pagination} = useSelector(state => state.parts)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchParts())
  }, [dispatch])

  return (
    <main className={style.head}>
      <div className={`container ${style.content}`}>
        <h1>Used car parts online from <span>3,681</span> European sellers</h1>
        <div className={style.content__desc}>
          Choose from <span>{
            pagination.totalParts ? (
              pagination.totalParts
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