import React, {useEffect, useState} from "react";
import * as style from './Part.module.scss'
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs";
import {Button} from "../../components/Button/Button";
import PartShare from "./components/PartShare/PartShare";
import CarDescription from "./components/CarDescription/CarDescription";
import PartGeneralNotice from "./components/PartGeneralNotice/PartGeneralNotice";
import {useNavigate, useParams} from "react-router-dom";
import Empty from "../../components/Empty/Empty";
import {useDispatch, useSelector} from "react-redux";
import {updateBasket} from "../../store/redusers/basketSlice";
import RiskNotification from "../../components/RiskNotification/RiskNotification";
import Loading from "../../components/Preloader/Loading";
import {updateWishlist} from "../../store/redusers/wishlistSlice";
import PartDetails from "./components/PartDetails/PartDetails";
import {useGetPartQuery} from "../../services/PartService";

export const Part = () =>{
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()
  const {idPartsInBasket} = useSelector(state => state.basket)
  const {idPartsInWishlist} = useSelector(state => state.wishlist)
  const { data, isLoading} = useGetPartQuery(id);
  const [part] = data || [];
  const [inBasket, setInBasket] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)

  useEffect(()=>{
    setInBasket(idPartsInBasket.includes(Number(id)))
    setInWishlist(idPartsInWishlist.includes(Number(id)))
  },[dispatch])

  const addBasket = (e) =>{
    e.preventDefault()
    if (inBasket){
      navigate('/basket')
    } else {
      setInBasket(true)
      dispatch(updateBasket({actionType: 'add', part: Number(id)}))
    }
  }
  const wishlistHandler = (e)=>{
    e.preventDefault()
    inWishlist
      ? dispatch(updateWishlist({actionType: 'remove', part: Number(id)}))
      : dispatch(updateWishlist({actionType: 'add', part: Number(id)}))

    setInWishlist(prev => !prev)
  }

  return(
    <main className={style.part}>
      {
        isLoading ? (
          <Loading/>
        ):(
          <>
            <Breadcrumbs id={part.modification}/>
            {
              part ? (
                <div className={`container ${style.main}`}>
                  <div className={style.main__general}>
                    <img
                      src={part.image.full}
                      alt={part.part_name}
                    />
                    <RiskNotification/>
                  </div>
                  <div className={style.main__description}>
                    <h1>{part.manufacturer} - {part.part_name.toUpperCase()}</h1>
                    <div className={style.main__description__seller}>
                      {part.scrapheap.top_seller ? (<span>Top seller </span>): null}
                      {part.scrapheap.title}
                    </div>
                    <PartShare
                      id={id}
                      wishlistHandler={wishlistHandler}
                      inWishlist={inWishlist}
                    />

                    <div className={style.price}>
                      <div className={style.price__general}>{part.price_final}</div>
                      <span>incl. VAT</span>
                      <div className={style.price__fee}>+ Service Fee: {part.service_fee} €</div>
                      <div className={style.price__fee}>+ Delivery: {part.delivery_price}</div>
                    </div>

                    <Button
                      onClick={addBasket}
                      additionalStyle={['w_full', inBasket ? 'blue__yellow' : 'yellow__blue']}
                      styles={{
                        marginTop: '20px'
                      }}
                    >
                      {inBasket ? 'Shopping cart' : 'Buy'}
                    </Button>
                    <PartDetails
                      part={part}
                    />
                    <CarDescription
                      part={part}
                    />
                  </div>
                </div>
              ) : <Empty/>
            }
            <PartGeneralNotice
              part_name={part.part_name || ''}
              car_name={part.manufacturer}
              part_number={part.manufacturer_code || ''}
            />
          </>
        )
      }
    </main>
  )
}