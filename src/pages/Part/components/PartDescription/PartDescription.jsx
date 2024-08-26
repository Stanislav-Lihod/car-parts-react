import React from 'react';
import * as style from './PartDescription.module.scss'
export default function PartDescription({title, children}) {
  return (
    <div className={style.details}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}