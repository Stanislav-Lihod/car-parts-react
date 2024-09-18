import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import * as style from './BasketPayment.module.scss'
import {Button} from "../../../components/Button/Button";

export default function BasketPayment({nextStep}) {
  const navigate = useNavigate()
  const {isAuth, user} = useSelector(state => state.user)
  const {counter, totalPrice} = useSelector(state => state.basket)

  useEffect(() => {
    !isAuth && navigate('/user')
  }, []);

  return (
    <div className={style.payment}>
      <div className={style.column}>
        <div className={style.card}>
          <h3>Payment method</h3>
          <div className={style.paymentMethodItem}>
            <input type="radio" id="card1" name="payment" defaultChecked/>
            <label htmlFor="card1">Ending in : ...1111</label>
            <img src="https://static-00.iconduck.com/assets.00/mastercard-icon-512x396-e90vsnhk.png" alt="MasterCard" style={{height: "20px"}}/>
          </div>
        </div>
        <div className={style.card}>
          <h3>Method of Receipt</h3>
          <div className={style.methodOfReceiptItem}>
            <p>{user.first_name} {user.second_name.slice(0, 1)}.</p>
            <p>
              {`${user.zipCode ?? ''} ${user.city ?? ''} ${user.location ?? ''}`}
            </p>
          </div>
        </div>
      </div>
      <div className={style.card}>
        <h3 className={style.totalPrice}>Total <span>{totalPrice.totalPrice} €</span></h3>
        <div className={style.totalItem}>
          <p>Items <span>{counter}</span></p>
          <p>Shipping Cost <span>{totalPrice.totalDelivery} €</span></p>
        </div>
        <Button
          onClick={nextStep}
          maxWidth={'w_full'}
        >
          Pay {totalPrice.totalPrice} €
        </Button>
      </div>
    </div>
  );
}