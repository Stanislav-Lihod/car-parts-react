import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import PartDescription from "../PartDescription/PartDescription";
import {useGetCarInfoQuery} from "../../../../services/PartService";
import Loading from "../../../../components/Preloader/Loading";

export default function CarDescription ({part}){
  const {data, isLoading} = useGetCarInfoQuery(part.modification)
  const [breadcrumbs] = data || [];
  const [modification, setModification] = useState({})

  useEffect(() => {
    if (breadcrumbs){
      setModification(breadcrumbs.modification.filter(item => item.id === part.modification)[0])
    }
  }, [breadcrumbs]);

  const getQueryString = (additionalParams = {}) => {
    const params = {
      brand: breadcrumbs.brand,
      ...additionalParams,
    };
    return new URLSearchParams(params).toString();
  };

  return(
    isLoading
      ? <Loading/>
      : <PartDescription title={'Car Description'}>
          <dl>
            <>
              <dt>Manufacturer</dt>
              <dd>
                <Link to={`/parts?${getQueryString()}`}>
                  {modification.brandName || '-'}
                </Link>
              </dd>
            </>
            <>
              <dt>Series</dt>
              <dd>
                <Link to={`/parts?${getQueryString({ model: breadcrumbs.model })}`}>
                  {modification.modelName || '-'}
                </Link>
              </dd>
            </>
            <>
              <dt>Model</dt>
              <dd>
                <Link to={`/parts?${getQueryString({ model: breadcrumbs.model, modification: modification.id })}`}>
                  {modification.name || '-'}
                </Link>
              </dd>
            </>
            <>
              <dt>Year</dt>
              <dd>
                {`${modification.yearStart} - ${modification.yearEnd}`}
              </dd>
            </>
            <>
              <dt>Model Year</dt>
              <dd>{part.year || '-'}</dd>
            </>
            <>
              <dt>Steering wheel position</dt>
              <dd>{part.rhd === '0' ? 'Left' : 'Right'}</dd>
            </>
            <>
              <dt>Fuel type</dt>
              <dd>{part.fuel_type !== 'not specified' ? part.fuel_type : 'Diesel'}</dd>
            </>
            <>
              <dt>Driving wheels</dt>
              <dd>{part.wheels.toUpperCase()}</dd>
            </>
            <>
              <dt>Gearbox type</dt>
              <dd>{part.gearbox_type || '-'}</dd>
            </>
            <>
              <dt>Engine capacity, cm3</dt>
              <dd>{part.capacity || '-'}</dd>
            </>
            <>
              <dt>Engine power, kW</dt>
              <dd>{part.power || '-'}</dd>
            </>
          </dl>
        </PartDescription>
  )
}