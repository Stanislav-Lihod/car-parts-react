import React, {useEffect, useState} from 'react';
import * as style from './ModelTitle.module.scss'
import LineSkeleton from "../../../../components/Preloader/LineSkeleton/LineSkeleton";
import {useSelector} from "react-redux";

export default function ModelTitle () {
  const {searchParam, currentParams, brands, models, modifications} = useSelector(state => state.filters)
  const [carsLine, setCarsLine] = useState('')
  const {
    "car.brand": currentBrand,
    "car.model": currentModel,
    "car.modification": currentModification,
  } = currentParams;

  // useEffect(()=>{
  //   const brand = brands.find(b => b.id.toString() === currentBrand)?.brand || '';
  //   const model = models.find(m => m.id.toString() === currentModel)?.title || '';
  //   const modification = modifications.find(mod => mod.id.toString() === currentModification)?.name || '';
  //
  //   setCarsLine(`${brand} ${model} ${modification}`);
  // }, [searchParam])

  return (
    <section className={style.model}>
      <div className="container">
        <div className={style.model__content}>
          Used {carsLine} car parts search
        </div>
      </div>
    </section>
  );
};