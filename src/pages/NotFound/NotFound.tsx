import React from 'react';
import * as style from './NotFound.module.scss'

export default function NotFound () {
  return (
    <main className={style.main}>
      <div className={`${style.container} container`}>
        <div className={style.content}>
          <h1>404 - Page not found</h1>
          <p>Sorry, but the page you are looking for does not exist.</p>
        </div>
      </div>
    </main>
  );
};