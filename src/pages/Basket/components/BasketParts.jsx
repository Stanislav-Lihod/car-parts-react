import React, {useEffect} from 'react';
import BasketPart from "./BasketPart";
import * as style from "../Basket.module.scss";
import RiskNotification from "../../../components/RiskNotification/RiskNotification";
import {useDispatch, useSelector} from "react-redux";
import {fetchBasketParts, setPrice, updateBasket} from "../../../store/redusers/basketSlice";
import PartsSkeleton from "../../../components/Preloader/PartsSkeleton/PartsSkeleton";

export default function BasketParts(props) {
  const dispatch = useDispatch()
  const {isLoading, basketParts, idPartsInBasket} = useSelector(state => state.basket)

  useEffect(()=>{
    (idPartsInBasket.length > 0 || basketParts.length > 0) && dispatch(fetchBasketParts(idPartsInBasket.join('&part_id=')))
  }, [dispatch, idPartsInBasket])

  const removePart = (event, id) =>{
    event.target.disabled
    dispatch(updateBasket({actionType: 'remove', part: id}))
  }

  const totalParts = basketParts.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  const totalDelivery = basketParts.reduce((sum, item) => sum + Number(item.delivery_price.slice(0, -2)), 0).toFixed(2);
  const totalFee = basketParts.reduce((sum, item) => sum + item.service_fee, 0).toFixed(2);
  const totalPrice = (parseFloat(totalParts) + parseFloat(totalDelivery) + parseFloat(totalFee)).toFixed(2);


  useEffect(() => {
    dispatch(setPrice({totalDelivery,totalPrice}));
  }, [totalParts, totalDelivery]);
  return (
    <>
      {
        isLoading ? (
          <>
            <PartsSkeleton/>
            <PartsSkeleton/>
            <PartsSkeleton/>
            <PartsSkeleton/>
          </>
        ):(
          <>
            {basketParts.map(part => (
              <BasketPart
                part={part}
                key={part.part_id}
                onRemove={removePart}
              />
            ))}

            <div className={style.total}>
              <div className={style.total__text}>Total for the parts:	<span>{totalParts} €</span></div>
              <div className={style.total__text}>Total for delivery:	<span>{totalDelivery} €</span></div>
              <div className={style.total__text}>Service Fee: 	<span>{totalFee} €</span></div>
              <div className={`${style.total__text} ${style.totalPrice}`}>Total amount:	<span>{totalPrice} €</span></div>
            </div>

            <RiskNotification/>
          </>
        )
      }
    </>
  );
}