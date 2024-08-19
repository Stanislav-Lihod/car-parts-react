import React from 'react';
import {useSelector} from "react-redux";
import Empty from "../../../components/Empty/Empty";
import {Link} from "react-router-dom";
import * as style from './Order.module.scss'

export default function Orders(props) {
  const {user} = useSelector(state => state.user)
  const {orders} = user

  return (
    <>
      {orders ? (
        <div>
          <div className={style.head}>
            <div className={style.item}>
              <div className={style.number}>Order No</div>
              <div>Date</div>
              <div className={style.amount}>Amount</div>
            </div>
          </div>
          <div className={style.items}>
            {orders.map(order => {
              const date = new Date(order.date);
              const formattedDate = date.toISOString().replace('T', ' ').slice(0, 19);
              return (
                <div key={order.id}>
                  <div className={style.item}>
                    <div className={style.number}># {order.id}</div>
                    <div>{formattedDate}</div>
                    <div className={style.amount}>{order.total_price} €</div>
                  </div>
                  <div className={style.body}>
                    {
                      order.parts.map(part =>(
                        <div className={`${style.item} ${style.part}`} key={part.id}>
                          <img src={part.image} alt={part.name}/>
                          <div className={style.name}>{part.id} - {part.name}</div>
                          <div className={style.amount}>{part.price}</div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Empty>
          You haven't placed any orders yet.{' '}
          <Link to={'/parts'}>Take a look at the parts we have available.</Link>
        </Empty>
      )}
    </>
  );
}
