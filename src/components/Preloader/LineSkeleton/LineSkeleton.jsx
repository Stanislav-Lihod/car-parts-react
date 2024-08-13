import React from 'react';
import * as style from './LineSkeleton.module.scss';

export default function LineSkeleton({length}) {
  return (
    <div className={`${style.skeletonLine} ${length ? style[length] : style.long}`}></div>
  );
};