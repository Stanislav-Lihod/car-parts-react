import React, {useEffect} from 'react';
import {CheckBadgeIcon} from "@heroicons/react/24/outline";
import * as style from '../Basket.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {hideCounter, removeBasket} from "../../../store/redusers/basketSlice";
import {useNavigate} from "react-router-dom";
import {updateUser} from "../../../store/redusers/userSlice";

export default function BasketApprove(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isAuth, isLoading, user} = useSelector(state => state.user)
  const {basket_parts, total_price} = useSelector(state => state.basket)

  useEffect(() => {
    !isAuth && navigate('/user')

    const currentUserOrders = user.orders
    const currentParts = basket_parts.map(part => {
      return {
        id: part.part_id,
        image: part.image.thumb,
        name: part.part_name,
        price: part.price_final
      }
    })

    dispatch(
      updateUser(
        {
          orders: [...currentUserOrders,
            { id: 1,
              total_price: total_price.totalPrice,
              date: Date.now(),
              parts: currentParts
            }]}
      ))
    dispatch(hideCounter())

    return () => dispatch(removeBasket())
  }, []);

  return (
    <>
      {isLoading ? (
        'Loading'
      ):(
        <div className={style.approve}>
          <CheckBadgeIcon/>
          <h2>Your order #1 was created</h2>
        </div>
      )}
    </>
  );
}