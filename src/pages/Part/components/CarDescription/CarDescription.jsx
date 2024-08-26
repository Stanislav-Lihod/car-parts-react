import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import PartDescription from "../PartDescription/PartDescription";

export default function CarDescription ({part}){
  const {breadcrumbs} = useSelector(state => state.part)
  const [carInfo, setCarInfo] = useState('')

  useEffect(()=>{
    setCarInfo(part.car[0])
  },[])

  return(
    <PartDescription title={'Car Description'}>
      <dl>
        <>
          <dt>Manufacturer</dt>
          <dd>
            <Link
              to={`/parts?car.brand=${carInfo.brand}`}
            >
              {breadcrumbs?.modification?.brandName || '-'}
            </Link>
          </dd>
        </>
        <>
          <dt>Series</dt>
          <dd>
            <Link
              to={`/parts?car.brand=${carInfo.brand}&car.model=${carInfo.model}`}
            >
              {breadcrumbs?.modification?.modelName || '-'}
            </Link>
          </dd>
        </>
        <>
          <dt>Model</dt>
          <dd>
            <Link
              to={`/parts?car.brand=${carInfo.brand}&car.model=${carInfo.model}&car.modification=${carInfo.modification}`}
            >
              {breadcrumbs?.modification?.name || '-'}
            </Link>
          </dd>
        </>
        <>
          <dt>Year</dt>
          <dd>
            {`${breadcrumbs?.modification?.yearStart} - ${breadcrumbs?.modification?.yearEnd}`}
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