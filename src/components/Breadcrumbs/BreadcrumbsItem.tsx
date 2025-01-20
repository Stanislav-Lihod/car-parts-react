import React from 'react';
import * as style from './Breadcrumbs.module.scss'
import {ArrowRightIcon} from "@heroicons/react/16/solid";

interface BreadcrumbsItemProps {
  children: React.ReactNode,
  last?: Boolean
}

export const BreadcrumbsItem = ({children, last}: BreadcrumbsItemProps) => {

  return (
    <span className={style['breadcrumbs__item']}>
      {children}
      {!last ? <ArrowRightIcon className={style['breadcrumbs__arrow']}/> : null}
    </span>
  );
};