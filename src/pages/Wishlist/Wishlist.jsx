import React, {useEffect, useState} from 'react';
import * as style from "./Wishlist.module.scss";
import {fetchWishlistParts} from "../../store/redusers/wishlistSlice";
import {useDispatch, useSelector} from "react-redux";
import PartsSkeleton from "../../components/Preloader/PartsSkeleton/PartsSkeleton";
import Empty from "../../components/Empty/Empty";
import WishlistPart from "./components/WishlistPart";

export default function Wishlist(props) {
  const {isLoading, wishlist_parts, ID_partsInWishlist} = useSelector(state => state.wishlist)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchWishlistParts(ID_partsInWishlist.join('&part_id=')))
  }, [dispatch,ID_partsInWishlist]);

  const totalPrice = wishlist_parts.reduce((sum, item) => sum + item.price, 0).toFixed(2)

  return (
    <main className={`${style.wishlist} container`}>
      {ID_partsInWishlist.length > 0 ? (
        <>
          {
            isLoading ? (
              <>
                <PartsSkeleton/>
                <PartsSkeleton/>
                <PartsSkeleton/>
                <PartsSkeleton/>
              </>
            ):(
              <>
                <div className={style.title}>Wishlist</div>
                <div className={style.list__header}>
                  <div>Part</div>
                  <div>Manufacturer</div>
                  <div>Price</div>
                </div>
                <div className={style.list}>
                  {wishlist_parts.map(part => (
                    <WishlistPart
                      part={part}
                      key={part.part_id}
                    />
                  ))}
                </div>

                <div className={style.total}>
                  Total price: <span>{totalPrice} €</span>
                </div>
              </>
            )
          }
        </>
      ) : (
        <Empty additionalClass="w-400">There are no saved parts</Empty>
      )}
    </main>
  );
}