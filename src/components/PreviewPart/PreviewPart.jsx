import React from "react";
import {Link} from "react-router-dom";
import * as style from './PreviewPart.module.scss'

export default function PreviewPart({id}){
  return(
    <Link
      to={`/used-part/${id}`}
      className={style.link}
    >
      <div className={style.part}>
        <div className={style.image}>
          <img
            src="https://images.ovoko.com/br/581x436/kli/0/0/0/0/5/3/0/9/4/4a3cfadd48e0b5d046d9768a046855ce-volkswagen_multivan_t5_sankabos_komplektas.jpg"
            alt="Name"
          />
        </div>
        <div className={style.content}>
          <h2 className={style.content__title}>Clutch set kit</h2>
          <div>Volkswagen Multivan T5 2007, 96kW, 2500cm3 Diesel Manual</div>
          <div className={`mt-6 ${style.content__price}`}>80.00 €</div>
          <div>+ Service Fee</div>
          <div>+ Delivery: 11.99 €</div>
          <div>Pasvalio raj., Lietuva</div>
        </div>
      </div>
    </Link>
  )
}