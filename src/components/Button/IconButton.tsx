import React from 'react';
import * as style from './IconButton.module.scss'

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  styles?: React.CSSProperties;
  additionalClass?: string[];
}

export default function IconButton({children, onClick, styles, additionalClass = []}:IconButtonProps) {
  return (
    <button
      style={styles}
      className={`${style['button']} ${additionalClass.length > 0? additionalClass.map(cls => style[cls]).join(' ') : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}