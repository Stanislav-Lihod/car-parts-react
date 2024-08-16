import React, {useEffect} from 'react';
import {CheckBadgeIcon} from "@heroicons/react/24/outline";
import * as style from '../Basket.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {hideCounter, removeBasket} from "../../../store/redusers/basketSlice";
import {useNavigate} from "react-router-dom";

export default function BasketApprove(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isAuth} = useSelector(state => state.user)

  useEffect(() => {
    !isAuth && navigate('/user')
    dispatch(hideCounter())

    return () => dispatch(removeBasket())
  }, []);

  return (
    <div className={style.approve}>
      <CheckBadgeIcon/>
      <h2>Your order #1 was created</h2>
    </div>
  );
}