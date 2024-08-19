import React from 'react';
import * as style from './LineSkeleton.module.scss';

export default function LineSkeleton({length, style: customStyle}) {
  return (
    <div
      className={`${style.skeletonLine} ${length ? style[length] : style.long}`}
      style={customStyle}
    ></div>
  );
};