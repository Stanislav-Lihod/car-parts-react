import React from 'react';
import * as style from './Button.module.scss'

export const Button = ({children, maxWidth, bgColor}) => {
  return (
    <button
      className=
        {`${style.button}
          ${maxWidth && style.w__full}
          ${bgColor ? style[bgColor] : style.blue__yellow}
        `}>
      {children}
    </button>
  );
};