import React from 'react';
import * as style from './Button.module.scss'

export const Button = ({children, type, onClick, additionalStyle = [], styles}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={styles}
      className=
        {`${style.button}
          ${additionalStyle.length > 0? additionalStyle.map(cls => style[cls]).join(' ') : ''}
        `}
    >
      {children}
    </button>
  );
};