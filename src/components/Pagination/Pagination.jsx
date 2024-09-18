import React, {useEffect, useState} from 'react';
import * as style from './Pagination.module.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../Button/Button";
import {setCurrentFilter, updateFilter} from "../../store/redusers/filterSlice";

export default function Pagination({pagination}) {
  const {current_page = 1, total_pages = 1} = pagination
  const dispatch = useDispatch()

  const paginationHandler = (number)=>{
    dispatch(updateFilter({type: 'page', value: number === 1 ? '' : number}))
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // useEffect(() => {
  //   dispatch(updateFilter({type: 'page', value: page}))
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, [page]);

  return (
    <section className={style.pagination}>
      {
        current_page !== 1 ? (
          <Button
            onClick={()=>{paginationHandler(1)}}
            bgColor='clear'
          >
            First
          </Button>
        ) : null
      }
      {
        Array.from({length: total_pages}).map((_, index) => {
          if (index + 1 >= current_page - 2 && index + 1 <= current_page + 2) {
            return (
              <Button
                onClick={()=>{paginationHandler(index + 1)}}
                key={index}
                bgColor='clear'
                additionalStyle={[`${current_page === index + 1 ? 'active' : ''}`]}
              >
                {index + 1}
              </Button>
            );
          }
          return null;
        })
      }
      {
        current_page !== total_pages && (
          <Button
            onClick={()=>{paginationHandler(total_pages)}}
            bgColor='clear'
          >
            Last
          </Button>
        )
      }

    </section>
  );
}