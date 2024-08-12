import React from 'react';
import * as style from './Empty.module.scss'

export default function Empty({children, additionalClass}) {
  return (
    <div className={`${style.empty} ${additionalClass ? style[additionalClass] : ''}`}>
      {children}
    </div>
  );
}