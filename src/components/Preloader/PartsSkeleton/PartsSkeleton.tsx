import React from 'react';
import * as style from './PartsSkeleton.module.scss';
import LineSkeleton from "../LineSkeleton/LineSkeleton";

export default function PartsSkeleton() {
  return (
    <div className={style.skeleton}>
      <div className={style.skeletonImage}></div>
      <div className={style.skeletonText}>
        <LineSkeleton/>
        <LineSkeleton length={'short'}/>
        <LineSkeleton length={'short'}/>
        <LineSkeleton length={'medium'}/>
        <LineSkeleton length={'short'}/>
      </div>
    </div>
  );
};