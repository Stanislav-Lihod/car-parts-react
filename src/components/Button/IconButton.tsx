import React from 'react';
import * as style from './IconButton.module.scss'

export default function IconButton({children, onClick, styles, additionalClass = []}) {
  return (
    <button
      style={styles}
      className={`${style.button} ${additionalClass.length > 0? additionalClass.map(cls => style[cls]).join(' ') : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}