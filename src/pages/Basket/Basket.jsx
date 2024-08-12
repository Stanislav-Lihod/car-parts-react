import React, {useEffect, useState} from "react";
import * as style from './Basket.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchBasketParts, removePartInBasket} from "../../store/redusers/basketSlice";
import Empty from "../../components/Empty/Empty";
import {Link} from "react-router-dom";

export const Basket = () =>{
  const dispatch = useDispatch()
  const {basket_parts, parts} = useSelector(state => state.basket)

  useEffect(()=>{
    (parts.length > 0 || basket_parts.length > 0) && dispatch(fetchBasketParts(parts.join('&part_id=')))
  }, [dispatch, parts])

  const totalParts = basket_parts.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  const totalDelivery = basket_parts.reduce((sum, item) => sum + Number(item.delivery_price.slice(0, -2)), 0).toFixed(2);
  const totalFee = basket_parts.reduce((sum, item) => sum + item.service_fee, 0).toFixed(2);
  const totalPrice = (parseFloat(totalParts) + parseFloat(totalDelivery) + parseFloat(totalFee)).toFixed(2);

  const removePart = (id) =>{
    dispatch(removePartInBasket(String(id)))
  }

  return(
    <section className={`${style.basket} container`}>
      {basket_parts.length > 0 ? (
        <div>
          <div className={style.title}>Shopping cart</div>

          {basket_parts.map(part => (
            <div className={style.basket__part} key={part.part_id}>
              <button onClick={()=>{removePart(part.part_id)}}>Remove</button>
              <div className={style.part__title}>{part.scrapheap.title}</div>
              <div className={style.part__top}>
                <img src={part.image.thumb} alt={part.part_name}/>
                <div className={style.part__top__text}>
                  <Link to={`/used-part/${part.part_id}`}>{part.part_id} - {part.part_name}</Link>
                  <div dangerouslySetInnerHTML={{__html: part.description}}/>
                </div>
                <div className={style.part__top__price}>
                  {part.price_final}
                  <span>incl. VAT</span>
                </div>
              </div>
              <div className={style.part__bottom}>
                <div className={style.part__bottom__text}>Delivery (1 - 3 business
                  days): <span>{part.delivery_price}</span></div>
              </div>
            </div>
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