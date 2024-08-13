import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as style from './PreviewPart.module.scss'
import {ShoppingCartIcon, TrophyIcon} from "@heroicons/react/24/outline";
import {updateBasket} from "../../store/redusers/basketSlice";
import {useDispatch, useSelector} from "react-redux";
import IconButton from "../Button/IconButton";

export default function PreviewPart({id, part}){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    price_final,
    part_name,
    description,
    delivery_price,
    image,
    scrapheap
  } = part

  const [inBasket, setInBasket] = useState(false)
  const {ID_partsInBasket} = useSelector(state => state.basket)

  useEffect(() => {
    setInBasket(ID_partsInBasket.includes(id))
  }, [dispatch]);

  const addPartInCart = (e, id) =>{
    e.stopPropagation()
    e.preventDefault()
    if (!inBasket){
      setInBasket(true)
      dispatch(updateBasket({actionType: 'add', part: id}))
    } else {
      navigate(`/used-part/${id}`)
    }
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
          <div className={style.actions}>
            <IconButton
              additionalClass={inBasket && 'inBasket'}
              style={{
                bottom: 0,
                right: 0
              }}
              onClick={(e) => {addPartInCart(e, id)}}
            >
              <ShoppingCartIcon style={{width: '24px'}}/>
            </IconButton>
          </div>
        </div>
      </div>
    </Link>
  )
}