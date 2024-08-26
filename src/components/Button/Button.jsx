import React from 'react';
import * as style from './Button.module.scss'

export const Button = ({children, maxWidth, bgColor, onClick, additionalStyle = [], type, styles}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={styles}
      className=
        {`${style.button}
          ${maxWidth ? style.w__full : ''}
          ${bgColor ? style[bgColor] : style.yellow__blue}
          ${additionalStyle.length > 0? additionalStyle.map(cls => style[cls]).join(' ') : ''}
        `}
    >
      {children}
    </button>
  );
};