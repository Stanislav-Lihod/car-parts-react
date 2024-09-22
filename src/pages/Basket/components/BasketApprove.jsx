import React, {useEffect} from 'react';
import {CheckBadgeIcon} from "@heroicons/react/24/outline";
import * as style from '../Basket.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {hideCounter, removeBasket} from "../../../store/redusers/basketSlice";
import {useNavigate} from "react-router-dom";
import {useLazyCheckUserQuery, useUpdateUserMutation} from "../../../services/UserService";
import {setUser} from "../../../store/redusers/userSlice";

export default function BasketApprove(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isAuth, isLoading, user} = useSelector(state => state.user)
  const {basketParts, totalPrice} = useSelector(state => state.basket)
  const [updateUser] = useUpdateUserMutation();
  const [trigger, { data: authData}] = useLazyCheckUserQuery();

  useEffect(() => {
    !isAuth && navigate('/user')

    const currentUserOrders = user.orders ?? []
    const currentParts = basketParts.map(part => {
      return {
        id: part.part_id,
        image: part.image.thumb,
        name: part.part_name,
        price: part.price_final
      }
    })

    const orders = [...currentUserOrders,
      { id: Date.now(),
        totalPrice: totalPrice.totalPrice,
        date: Date.now(),
        parts: currentParts
      }]

    userUpdate(orders)

    dispatch(hideCounter())

    return () => dispatch(removeBasket())
  }, []);

  useEffect(() => {
    if (user.email && user.password){
      trigger({
        email: user.email,
        password: user.password,
      })
    }
  }, [user]);

  useEffect(()=>{
    if (authData){
      dispatch(setUser(authData))
    }
  }, [authData])

  const userUpdate = async (orders) =>{
    const result = await updateUser({userId:user.id, body: {...user, orders}});
    if (result){
      dispatch(setUser(result))
    }
  }

  return (
    <>
      {isLoading ? (
        'Loading'
      ):(
        <div className={style.approve}>
          <CheckBadgeIcon/>
          <h2>Your order {Date.now()} was created</h2>
        </div>
      )}
    </>
  );
}