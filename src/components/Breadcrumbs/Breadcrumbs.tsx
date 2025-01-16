import React, {useEffect, useState} from 'react';
import * as style from './Breadcrumbs.module.scss';
import { BreadcrumbsItem } from "./BreadcrumbsItem";
import {Link} from "react-router-dom";
import LineSkeleton from "../Preloader/LineSkeleton/LineSkeleton";
import {useGetCarInfoQuery} from "../../services/PartService";

interface BreadcrumbsProps {
  id: number;
}
interface Modification {
  brandName: string;
  modelName: string;
  name: string;
  yearStart: number;
  yearEnd: number;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ id }) => {
  const {data, isLoading} = useGetCarInfoQuery(id)
  const [breadcrumbs] = data || [];
  const [modification, setModification] = useState<Modification | null>(null);

  useEffect(() => {
    if (breadcrumbs){
      const modified = breadcrumbs.modification.filter(item => item.id === id)[0];
      setModification(modified || null);
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
                {modification ? modification.brandName : ''}
              </Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <Link to={`/parts?${getQueryString({ model: breadcrumbs.model })}`}>
                {modification ? modification.modelName : ''}
              </Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem last={true}>
              <Link to={`/parts?${getQueryString({ model: breadcrumbs.model, modification: id })}`}>
                {modification ? `${modification.name} (${modification.yearStart} - ${modification.yearEnd})` : ''}
              </Link>
            </BreadcrumbsItem>
          </div>
        )}
      </div>
    </section>
  );
};