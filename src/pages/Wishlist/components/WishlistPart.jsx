import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import * as style from '../Wishlist.module.scss'
import {ShoppingCartIcon} from "@heroicons/react/24/outline";
import IconButton from "../../../components/Button/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {updateBasket} from "../../../store/redusers/basketSlice";
import {updateWishlist} from "../../../store/redusers/wishlistSlice";
import {XMarkIcon} from "@heroicons/react/16/solid";

export default function WishlistPart({part}) {
  const dispatch = useDispatch()
  const  navigate = useNavigate()
  const [isInBasket, setIsInBasket] = useState(false)
  const {ID_partsInBasket} = useSelector(state => state.basket)

  useEffect(() => {
    setIsInBasket(ID_partsInBasket.includes(part.part_id))
  }, []);

  const addPartInCart = (e) =>{
    e.preventDefault()
    if (!isInBasket){
      setIsInBasket(true)
      dispatch(updateBasket({actionType: 'add', part: part.part_id}))
    } else {
      navigate(`/basket`)
    }
  }

  const removeFromWishlist = (e) =>{
    e.preventDefault()
    dispatch(updateWishlist({actionType: 'remove', part: part.part_id}))
  }

  return (
    <div className={style.part}>
      <div className={style.part__general}>
        <Link to={`/used-part/${part.part_id}`}>
          <img src={part.image.thumb} alt={part.part_name}/>
        </Link>
        <div className={style.part__general__content}>
          <div className={style.part__general__title}>{part.part_name}</div>
          <div className={style.part__general__code}>Item code in system: <Link to={`/used-part/${part.part_id}`}>{part.part_id}</Link></div>
          <div className={style.part__general__seller}>{part.scrapheap.title}</div>
        </div>
      </div>
      <div
        className={style.description}
        dangerouslySetInnerHTML={{__html: part.description}}/>
      <div
        className={style.actions}
      >
        <div className={style.price}>{part.price_final}</div>
        <IconButton
          additionalClass={[`${isInBasket ? 'inBasket' : ''}`]}
          style={{
            bottom: 0,
            right: 0
          }}
          onClick={addPartInCart}
        >
          <ShoppingCartIcon style={{width: '24px'}}/>
        </IconButton>
        <IconButton
          additionalClass={['clear']}
          style={{
            bottom: 0,
            right: 0
          }}
          onClick={removeFromWishlist}
        >
          <XMarkIcon style={{width: '16px'}}/>
        </IconButton>
      </div>
    </div>
  );
}