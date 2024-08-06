import React from "react";
import * as style from './Footer.module.scss'

export default function CopyingFooter(){
  return(
    <div className={style.footer__copying}>
      <div className="container">
        <p>2014 - 2024 © Autoparts All rights reserved<br/>
          Copying and distributing the information available on the website without a consent is prohibited
        </p>
      </div>
    </div>
  )
}