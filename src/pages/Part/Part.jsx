import React from "react";
import * as style from './Part.module.scss'
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs";
import {Button} from "../../components/Button/Button";
import PartShare from "./components/PartShare/PartShare";
import CarDescription from "./components/CarDescription/CarDescription";
import PartDescription from "./components/PartDescription/PartDescription";
import {useParams} from "react-router-dom";

export const Part = () =>{
  const {id} = useParams()

  return(
    <main>
      <Breadcrumbs/>
      <div className={`container ${style.main}`}>
        <div className={style.main__general}>
          <img
            src="https://images.ovoko.com/bl/722x542/mtj/0/0/0/0/0/1/0/0/2/034edcbcec570db45c1858c73bd7d6c2-volkswagen_multivan_t5_oro_kondicionieriaus_oro_srauto_sklendes_varikliukas.jpg"
            alt="Name"
          />
        </div>
        <div className={style.main__description}>
          <h1>VOLKSWAGEN MULTIVAN T5 A/C AIR FLOW FLAP ACTUATOR/MOTOR 7A0819021</h1>
          <div className={style.main__description__seller}> Top Seller Merstoja, UAB</div>
          <PartShare id={id}/>
          <div className={style.price}>
            <div className={style.price__general}>80.00 €</div>
            <span>incl. VAT</span>
            <div className={`${style.price__fee} mt-12`}>+ Service Fee: 1.99 €</div>
            <div className={`${style.price__fee} mt-6`}>+ Delivery: 11.99 €</div>
          </div>
          <Button
            maxWidth={true}
          >
            Buy
          </Button>
          <CarDescription/>
        </div>
      </div>
      <PartDescription/>
    </main>
  )
}