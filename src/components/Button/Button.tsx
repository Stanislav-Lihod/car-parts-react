import React from 'react';
import * as style from './Button.module.scss'

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button" | "reset";
  additionalStyle?: string[];
  styles?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Button = ({children, type, onClick, additionalStyle = [], styles}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={styles}
      className=
        {`${style['button']}
          ${additionalStyle.length > 0? additionalStyle.map(cls => style[cls]).join(' ') : ''}
        `}
    >
      {children}
    </button>
  );
};