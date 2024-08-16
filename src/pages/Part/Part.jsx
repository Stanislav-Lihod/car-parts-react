import React, {useEffect, useState} from "react";
import * as style from './Part.module.scss'
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs";
import {Button} from "../../components/Button/Button";
import PartShare from "./components/PartShare/PartShare";
import CarDescription from "./components/CarDescription/CarDescription";
import PartDescription from "./components/PartDescription/PartDescription";
import {Link, useNavigate, useParams} from "react-router-dom";
import Empty from "../../components/Empty/Empty";
import {useDispatch, useSelector} from "react-redux";
import {updateBasket} from "../../store/redusers/basketSlice";
import {getBreadcrumbs, getPart} from "../../store/redusers/partSlice";
import RiskNotification from "../../components/RiskNotification/RiskNotification";

export const Part = () =>{
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()
  const {ID_partsInBasket} = useSelector(state => state.basket)
  const {part, isLoading, isBreadcrumbsLoading, breadcrumbs} = useSelector(state => state.part)

  const [inBasket, setInBasket] = useState(false)

  useEffect(()=>{
    setInBasket(ID_partsInBasket.includes(Number(id)))
    dispatch(getPart(id))
  },[dispatch])

  useEffect(() => {
    if (part.car){
      dispatch(getBreadcrumbs(part.car[0].modification))
    }
  }, [dispatch, part]);
  const addBasket = (e) =>{
    e.preventDefault()
    if (inBasket){
      navigate('/basket')
    } else {
      setInBasket(true)
      dispatch(updateBasket({actionType: 'add', part: id}))
    }
  }

  if (isLoading) return 'loading'

  return(
    <main>
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        isLoading={isBreadcrumbsLoading}
      />
      {
        part ? (
          <div className={`container ${style.main}`}>
            <div className={style.main__general}>
              <img
                src={part.image.full}
                alt={part.part_name}
              />
              <RiskNotification/>
            </div>
            <div className={style.main__description}>
              <h1>{part.car[0].manufacturer} - {part.part_name.toUpperCase()}</h1>
              <div className={style.main__description__seller}> Top Seller Merstoja, UAB</div>
              <PartShare id={id}/>
              <div className={style.price}>
                <div className={style.price__general}>{part.price_final}</div>
                <span>incl. VAT</span>
                <div className={`${style.price__fee} mt-12`}>+ Service Fee: {part.service_fee} €</div>
                <div className={`${style.price__fee} mt-6`}>+ Delivery: {part.delivery_price}</div>
              </div>
              <Button
                bgColor={inBasket && 'blue__yellow'}
                onClick={addBasket}
                maxWidth={true}
              >
                {inBasket ? 'Shopping cart' : 'Buy'}
              </Button>
              <CarDescription/>
            </div>
          </div>
        ) : <Empty/>
      }
      <PartDescription
        part_name={part.part_name || ''}
        car_name={(part.car && part.car.length > 0) ? part.car[0].manufacturer : ''}
        part_number={part.manufacturer_code || ''}
      />
    </main>
  )
}