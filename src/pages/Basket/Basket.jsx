import React, {useEffect} from "react";
import * as style from './Basket.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchBasketParts, updateBasket} from "../../store/redusers/basketSlice";
import Empty from "../../components/Empty/Empty";
import BasketPart from "./components/BasketPart";

export const Basket = () =>{
  const dispatch = useDispatch()
  const {basket_parts, ID_partsInBasket} = useSelector(state => state.basket)

  useEffect(()=>{
    (ID_partsInBasket.length > 0 || basket_parts.length > 0) && dispatch(fetchBasketParts(ID_partsInBasket.join('&part_id=')))
  }, [dispatch, ID_partsInBasket])

  const totalParts = basket_parts.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  const totalDelivery = basket_parts.reduce((sum, item) => sum + Number(item.delivery_price.slice(0, -2)), 0).toFixed(2);
  const totalFee = basket_parts.reduce((sum, item) => sum + item.service_fee, 0).toFixed(2);
  const totalPrice = (parseFloat(totalParts) + parseFloat(totalDelivery) + parseFloat(totalFee)).toFixed(2);

  const removePart = (event, id) =>{
    event.target.disabled
    dispatch(updateBasket({actionType: 'remove', part: id}))
  }

  return(
    <section className={`${style.basket} container`}>
      {basket_parts.length > 0 ? (
        <div>
          <div className={style.title}>Shopping cart</div>

          {basket_parts.map(part => (
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
            <div className={`${style.total__text} ${style.total_price}`}>Total amount:	<span>{totalPrice} €</span></div>
          </div>
        </div>
      ) : (
        <Empty additionalClass="w-400">Shopping cart is empty</Empty>
      )}
    </section>
  )
}