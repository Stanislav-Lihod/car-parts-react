import React from 'react';
import * as style from './ModelTitle.module.scss'
import LineSkeleton from "../../../../components/Preloader/LineSkeleton/LineSkeleton";

export default function ModelTitle () {

  return (
    <section className={style.model}>
      <div className="container">
        <div className={style.model__content}>
          Used car parts search
        </div>
      </div>
    </section>
  );
};