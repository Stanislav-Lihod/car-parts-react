import React, {useEffect, useState} from 'react';
import * as style from './Breadcrumbs.module.scss';
import { BreadcrumbsItem } from "./BreadcrumbsItem";
import {Link} from "react-router-dom";
import LineSkeleton from "../Preloader/LineSkeleton/LineSkeleton";
import {useGetCarInfoQuery} from "../../services/PartService";

export const Breadcrumbs = ({id}) => {
  const {data, isLoading} = useGetCarInfoQuery(id)
  const [breadcrumbs] = data || [];
  const [modification, setModification] = useState({})

  useEffect(() => {
    if (breadcrumbs){
      setModification(breadcrumbs.modification.filter(item => item.id === id)[0])
    }
  }, [breadcrumbs]);

  const getQueryString = (additionalParams = {}) => {
    const params = {
      brand: breadcrumbs.brand,
      ...additionalParams,
    };
    return new URLSearchParams(params).toString();
  };

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
              <Link to={`/parts?${getQueryString()}`}>
                {modification.brandName}
              </Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <Link to={`/parts?${getQueryString({ model: breadcrumbs.model })}`}>
                {modification.modelName}
              </Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem last={true}>
              <Link to={`/parts?${getQueryString({ model: breadcrumbs.model, modification: id })}`}>
                {modification.name} {`(${modification.yearStart} - ${modification.yearEnd})`}
              </Link>
            </BreadcrumbsItem>
          </div>
        )}
      </div>
    </section>
  );
};