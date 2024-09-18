import React from 'react';
import * as style from './Breadcrumbs.module.scss';
import { BreadcrumbsItem } from "./BreadcrumbsItem";
import { Link, generatePath } from "react-router-dom";
import LineSkeleton from "../Preloader/LineSkeleton/LineSkeleton";

export const Breadcrumbs = ({ isLoading, breadcrumbs }) => {
  return (
    <section className={style.breadcrumbs}>
      <div className='container'>
        {isLoading ? (
          <LineSkeleton length={'short'} />
        ) : (
          <div className={style.breadcrumbs__content}>
            <BreadcrumbsItem>
              <Link to={'/'}>Home</Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <Link to={'/parts'}>Parts</Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <Link to={generatePath('/parts', { 'car.brand': breadcrumbs.brand })}>
                {breadcrumbs.modification.brandName}
              </Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <Link to={generatePath('/parts', {
                'car.brand': breadcrumbs.brand,
                'car.model': breadcrumbs.model
              })}>
                {breadcrumbs.modification.modelName}
              </Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem last={true}>
              <Link to={generatePath('/parts', {
                'car.brand': breadcrumbs.brand,
                'car.model': breadcrumbs.model,
                'car.modification': breadcrumbs.modification.id
              })}>
                {breadcrumbs.modification.name} {`(${breadcrumbs.modification.yearStart} - ${breadcrumbs.modification.yearEnd})`}
              </Link>
            </BreadcrumbsItem>
          </div>
        )}
      </div>
    </section>
  );
};