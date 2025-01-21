import React, { useEffect } from "react";
import BasketPart from "./BasketPart";
import * as style from "../Basket.module.scss";
import RiskNotification from "../../../components/RiskNotification/RiskNotification";
import { useDispatch, useSelector } from "react-redux";
import {fetchBasketParts, Part, setPrice, updateBasket} from "../../../store/redusers/basketSlice";
import PartsSkeleton from "../../../components/Preloader/PartsSkeleton/PartsSkeleton";
import { AppDispatch, RootState } from "../../../store/store";

export default function BasketParts() {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, basketParts, idPartsInBasket } = useSelector(
    (state: RootState) => state.basket
  ) as {
    isLoading: boolean;
    basketParts: Part[];
    idPartsInBasket: number[];
  };

  useEffect(() => {
    if (idPartsInBasket.length > 0 || basketParts.length > 0) {
      dispatch(fetchBasketParts(idPartsInBasket.join("&part_id=")));
    }
  }, [dispatch, idPartsInBasket]);

  const removePart = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.currentTarget.disabled = true;
    dispatch(updateBasket({ actionType: "remove", part: id }));
  };

  const totalParts = basketParts
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  const totalDelivery = basketParts
    .reduce((sum, item) => sum + parseFloat(item.delivery_price), 0)
    .toFixed(2);

  const totalFee = basketParts
    .reduce((sum, item) => sum + item.service_fee, 0)
    .toFixed(2);

  const totalPrice = (parseFloat(totalParts) + parseFloat(totalDelivery) + parseFloat(totalFee)).toFixed(2);

  useEffect(() => {
    dispatch(setPrice({
      totalPrice: parseFloat(totalPrice),
      totalDelivery: parseFloat(totalDelivery),
    }));
  }, [totalParts, totalDelivery]);

  return (
    <>
      {isLoading ? (
        <>
          <PartsSkeleton />
          <PartsSkeleton />
          <PartsSkeleton />
          <PartsSkeleton />
        </>
      ) : (
        <>
          {basketParts.map((part) => (
            <BasketPart part={part} key={part.part_id} onRemove={removePart} />
          ))}

          <div className={style["total"]}>
            <div className={style["total__text"]}>
              Total for the parts: <span>{totalParts} €</span>
            </div>
            <div className={style["total__text"]}>
              Total for delivery: <span>{totalDelivery} €</span>
            </div>
            <div className={style["total__text"]}>
              Service Fee: <span>{totalFee} €</span>
            </div>
            <div className={`${style["total__text"]} ${style["totalPrice"]}`}>
              Total amount: <span>{totalPrice} €</span>
            </div>
          </div>

          <RiskNotification />
        </>
      )}
    </>
  );
}