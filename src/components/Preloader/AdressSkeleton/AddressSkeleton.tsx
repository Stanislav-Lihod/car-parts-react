import React from 'react';
import * as style from './AddressSkeleton.module.scss'
import LineSkeleton from "../LineSkeleton/LineSkeleton";

export default function AddressSkeleton(props) {
  return (
    <div className={style.skeleton}>
      <div>
        <LineSkeleton/>
        <LineSkeleton/>
      </div>
      <div>
        <LineSkeleton/>
        <LineSkeleton/>
      </div>
      <div>
        <LineSkeleton/>
        <LineSkeleton/>
      </div>
      <div><LineSkeleton length={'short'}/></div>
    </div>
  );
}