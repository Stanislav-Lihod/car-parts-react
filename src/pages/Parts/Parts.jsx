import React, {useEffect, useState} from "react";
import * as style from './Parts.module.scss'
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs";
import PreviewPart from "../../components/PreviewPart/PreviewPart";
import ModelTitle from "./components/ModelTitle/ModelTitle";
import {Aside} from "./components/Aside/Aside";
import axios from 'axios'
import {useParams, useSearchParams} from "react-router-dom";
import Empty from "../../components/Empty/Empty";

export const Parts = () =>{
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalParts, setTotalParts] = useState(0)
  const params = {
    limit: 9
  }
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.forEach((value,key) => {
    if (value !== ''){
      params[`car.${key}`] = value
    }
  })

  useEffect(()=>{
    async function fetchData() {
      try {
        setLoading(true)
        const response = await axios.get('https://9aaca2b44dbb58a9.mokky.dev/parts2',{params});
        setParts(response.data.items);
        setTotalParts(response.data.meta.total_items)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching:', error.message);
      }
    };

    fetchData();
  },[])

  return(
    <main className={style.main}>
      <Breadcrumbs/>
      <ModelTitle/>
      <div className={`container mt-20 ${style.content}`}>
        <Aside/>
        <div className={style.content__general}>
          {/*<CarFilter/>*/}
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <div>We found in the warehouse <b>{totalParts}</b> parts:</div>
              {/*<InputFilter className="w-48" placeholder="Sort"/>*/}
            </div>
            <div className={`${style.part__list} mt-15`}>
              {
                parts && parts.length > 0 ? (
                  parts.map(part => (
                    <PreviewPart id={part.part_id} part={part} key={part.part_id} />
                  ))
                ) : (
                  <Empty />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}