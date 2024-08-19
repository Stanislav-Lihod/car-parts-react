import React from 'react';
import * as style from './Loading.module.scss'
function Loading(props) {
  return (
    <div className={style.showbox}>
      <div className={style.loader}>
        <svg className={style.circular} viewBox="0 0 50 50">
          <circle className={style.head} cx="25" cy="25" r="22.2" fill="none" strokeWidth="5.6" strokeMiterlimit="10"/>
          <circle className={style.chin} cx="25" cy="25" r="22.2" fill="none" strokeWidth="5.6" strokeMiterlimit="10"/>
          <circle className={style.smile} cx="25" cy="25" r="13.4" fill="none" strokeWidth="3.5" strokeMiterlimit="9"/>
        </svg>
      </div>
    </div>
  );
}

export default Loading;