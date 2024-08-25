import React from 'react';
import * as style from './Button.module.scss'

export const Button = ({children, maxWidth, bgColor, onClick, additionalStyle, type}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className=
        {`${style.button}
          ${maxWidth ? style.w__full : ''}
          ${bgColor ? style[bgColor] : style.yellow__blue}
          ${additionalStyle ? style[additionalStyle] : ''}
        `}
    >
      {children}
    </button>
  );
};