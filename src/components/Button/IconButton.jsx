import React from 'react';
import * as stl from './IconButton.module.scss'

function IconButton({children, onClick, style, additionalClass}) {
  const handleClick = (event) => {
    if (onClick){
      onClick(event, part.part_id);
    }
  };
  return (
    <button
      style={style}
      className={`${stl.button} ${additionalClass? stl[additionalClass] : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;