import React from "react";
import * as style from './Main.module.scss'
import Filter from "./components/Filter/Filter";

export const Main = () =>{
  return(
    <div>
      <div className={style.head}>
        <div className={`container ${style.content}`}>
          <h1>Used car parts online from <span>3,681</span> European sellers</h1>
          <div className={style.content__desc}>
            Choose from <span>18,772,750</span> competitively priced used car parts in one marketplace
          </div>
          <Filter/>
        </div>
      </div>
    </div>
  )
}