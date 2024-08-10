import React, {useEffect, useState} from "react";
import * as style from './Part.module.scss'
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs";
import {Button} from "../../components/Button/Button";
import PartShare from "./components/PartShare/PartShare";
import CarDescription from "./components/CarDescription/CarDescription";
import PartDescription from "./components/PartDescription/PartDescription";
import {useParams, useSearchParams} from "react-router-dom";
import axios from "axios";
import Empty from "../../components/Empty/Empty";

export const Part = () =>{
  const {id} = useParams()

  const [part, setPart] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(()=>{
    async function fetchData() {
      try {
        setLoading(true)
        const response = await axios.get(`https://9aaca2b44dbb58a9.mokky.dev/parts2?part_id=${id}`);
        setPart(response.data[0]);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching:', error.message);
      }
    };

    fetchData();
  },[])

  return(
    <main>
      <Breadcrumbs/>
      {
        part && Object.keys(part).length > 0 ? (
          <div className={`container ${style.main}`}>
            <div className={style.main__general}>
              <img
                src={part.image.full}
                alt={part.part_name}
              />
            </div>
            <div className={style.main__description}>
              <h1>{part.car.manufacturer} - {part.part_name.toUpperCase()}</h1>
              <div className={style.main__description__seller}> Top Seller Merstoja, UAB</div>
              <PartShare id={id}/>
              <div className={style.price}>
                <div className={style.price__general}>{part.price_final}</div>
                <span>incl. VAT</span>
                <div className={`${style.price__fee} mt-12`}>+ Service Fee: {part.service_fee} €</div>
                <div className={`${style.price__fee} mt-6`}>+ Delivery: {part.delivery_price}</div>
              </div>
              <Button
                maxWidth={true}
              >
                Buy
              </Button>
              <CarDescription/>
            </div>
          </div>
        ) : <Empty/>
      }
      <PartDescription
        part_name={part?.part_name}
        car_name={part?.car?.manufacturer}
        part_number={part?.manufacturer_code}
      />
    </main>
  )
}