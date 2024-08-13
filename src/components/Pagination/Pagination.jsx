import React from 'react';
import * as style from './Pagination.module.scss'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Pagination(props) {
  const {searchParam} = useSelector(state => state.filters)
  const {pagination} = useSelector(state => state.parts)
  const {current_page, total_pages} = pagination

  return (
    <section className={style.pagination}>
      {
        current_page !== 1 && (
          <Link
            to={`/parts?page=${1}&${searchParam}`}
            className={`${style.pagination__item} ${current_page === 1 ? style.active : ''}`}
          >
            First
          </Link>
        )
      }
      {
        Array.from({length: total_pages}).map((_, index) => {
          if (index + 1 >= current_page - 2 && index + 1 <= current_page + 2) {
            return (
              <Link
                key={index}
                to={`/parts?page=${index + 1}&${searchParam}`}
                className={`${style.pagination__item} ${current_page === index + 1 ? style.active : ''}`}
              >
                {index + 1}
              </Link>
            );
          }
          return null;
        })
      }
      {
        current_page !== total_pages && (
          <Link
            to={`/parts?page=${total_pages}&${searchParam}`}
            className={`${style.pagination__item} ${current_page === total_pages ? style.active : ''}`}
          >
            Last
          </Link>
        )
      }

    </section>
  );
}