import React from 'react';
import * as style from './LineSkeleton.module.scss';

interface LineSkeletonProps {
  length?: string;
  style?: React.CSSProperties;
}

export default function LineSkeleton({length, style: customStyle}: LineSkeletonProps) {
  return (
    <div
      className={`${style['skeletonLine']} ${length ? style[length] : style['long']}`}
      style={customStyle}
    ></div>
  );
};