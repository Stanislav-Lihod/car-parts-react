import React from "react";
import {Link} from "react-router-dom";
import * as style from './PreviewPart.module.scss'
import {ShoppingCartIcon, TrophyIcon} from "@heroicons/react/24/outline";
import {addPartInBasket} from "../../store/redusers/basketSlice";
import {useDispatch} from "react-redux";
import {Button} from "../Button/Button";

export default function PreviewPart({id, part}){
  const dispatch = useDispatch();
  const {
    price_final,
    part_name,
    description,
    delivery_price,
    image,
    scrapheap
  } = part

  const addPartInCart = (id) =>{
    dispatch(addPartInBasket(id))
  }

  return(
    <Link
      to={`/used-part/${id}`}
      className={style.link}
    >
      <div className={style.part}>
        <div className={style.image}>
          <img
            src={image.full}
            alt={`${part_name}, ${description}`}
          />
        </div>
        <div className={style.content}>
          <h2 className={style.content__title}>{part_name}</h2>
          <div className={style.content__description} dangerouslySetInnerHTML={{__html: description}}/>
          <div className={`mt-6 ${style.content__price}`}>{price_final}</div>
          <div className={style.content__fee}>+ Service Fee</div>
          <div className={style.content__fee}>+ Delivery: {delivery_price}</div>
          {}
          <div className={style.content__seller}>
            {scrapheap.top_seller && <span><TrophyIcon/> Top seller </span>}
            {scrapheap.title}
          </div>
          <div className={style.content__region}>
            {scrapheap.city !== '' && `${scrapheap.city},`} {scrapheap.country}
          </div>
          <Button
            onClick={()=>{addPartInCart(id)}}
          >
            <ShoppingCartIcon/>
          </Button>
        </div>
      </div>
    </Link>
  )
}