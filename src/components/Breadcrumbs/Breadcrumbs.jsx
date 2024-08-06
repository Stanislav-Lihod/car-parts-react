import React, {useState} from 'react';
import * as style from './Breadcrumbs.module.scss'
import {BreadcrumbsItem} from "./BreadcrumbsItem";

export const Breadcrumbs = () => {
  const [breadcrumbs, setBredcrumbs] = useState([
    'Home',
    'Car make catalog',
    'Volkswagen',
    'Volkswagen Multivan T5 (Multivan)'
  ])

  return (
    <section className={style.breadcrumbs}>
      <div className='container'>
        <div className={style.breadcrumbs__content}>
          {breadcrumbs.map((el, index) => (
            <BreadcrumbsItem
              key={index}
              last={index + 1 === breadcrumbs.length}
            >
              {el}
            </BreadcrumbsItem>
          ))}
        </div>
      </div>
    </section>
  );
};