import React from 'react';
import Filter from "../../../Main/components/Filter/Filter";
import * as style from './CarFilter.module.scss'

function CarFilter() {
  return (
    <section className={style.filter}>
      <div className={style.filter__title}>Car</div>
      <Filter isPartsPage={true}/>
    </section>
  );
}

export default CarFilter;