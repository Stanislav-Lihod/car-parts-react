import React, {useState} from 'react';
import * as style from './Breadcrumbs.module.scss'
import {ArrowRightIcon} from "@heroicons/react/16/solid";

export const BreadcrumbsItem = ({children, last}) => {

  return (
    <span className={style.breadcrumbs__item}>
      {children}
      {!last ? <ArrowRightIcon className={style.breadcrumbs__arrow}/> : null}
    </span>
  );
};