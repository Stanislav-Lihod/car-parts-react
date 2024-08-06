import React from "react";
import * as style from './Parts.module.scss'
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs";
import PreviewPart from "../../components/PreviewPart/PreviewPart";
import ModelTitle from "./components/ModelTitle/ModelTitle";
import {Aside} from "./components/Aside/Aside";

export const Parts = () =>{
  return(
    <main className={style.main}>
      <Breadcrumbs/>
      <ModelTitle/>
      <div className={`container mt-20 ${style.content}`}>
        <Aside/>
        <div className={style.content__general}>
          {/*<CarFilter/>*/}
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <div>We found in the warehouse <b>4120</b> parts:</div>
              {/*<InputFilter className="w-48" placeholder="Sort"/>*/}
            </div>
            <div className={`${style.part__list} mt-15`}>
              <PreviewPart id={123}/>
              <PreviewPart id={321}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}