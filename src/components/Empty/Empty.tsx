import React from 'react';
import * as style from './Empty.module.scss'

interface EmptyProps{
  children?: React.ReactNode,
  additionalClass?: string;
}

export default function Empty({children, additionalClass}:EmptyProps) {
  return (
    <div className={`${style['empty']} ${additionalClass ? style[additionalClass] : ''}`}>
      {children}
    </div>
  );
}