import React from 'react';
import * as style from './RiskNotification.module.scss'
import {HandThumbUpIcon} from "@heroicons/react/24/outline";

export default function RiskNotification(props) {
  return (
    <section className={style.notification}>
      <div className={style.content}>
        <div className={style.icon}>
          <HandThumbUpIcon/>
        </div>
        Risk free shopping<br/>
        100% money back guarantee! Check our Return policy for more details
      </div>
    </section>
  );
}